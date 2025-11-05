// /lib/recommendations.ts
/**
 * Generates intelligent rainwater harvesting recommendations using Gemini AI.
 * Falls back to a local heuristic model if Gemini fails or returns empty output.
 */

export async function generateRecommendationsWithGemini(data: any): Promise<string[]> {
  // --- Safe value extraction ---
  const roofArea = Number(data?.roofArea ?? data?.roofArea_m2 ?? 0);
  const rainfall = Number(data?.annualRainfall ?? data?.annualRainfall_mm ?? 0);
  const harvest = Number(Math.round(data?.annualHarvest ?? data?.hydrology?.netAnnualHarvest_L ?? 0));
  const score = Number(data?.score ?? 0);
  const category = String(data?.category ?? "Unknown");

  const payback = Number(
    data?.economicAnalysis?.paybackPeriod ??
      data?.financials?.paybackYears ??
      0
  );

  const roi = Number(
    data?.economicAnalysis?.roi ??
      data?.financials?.roi_percent ??
      0
  );

  const resilience = Number(
    data?.climateTrend?.climateResilience ??
      data?.climate?.resilience ??
      0
  );

  const co2 = Number(
    data?.environmentalImpact?.co2Saved_tons_perYear ??
      data?.environmentalImpact?.co2SavedTons ??
      0
  );

  const subsidy =
    data?.economicAnalysis?.subsidyEligible ??
    data?.financials?.subsidyEligible ??
    false;

  // --- Construct safe Gemini prompt ---
  const prompt = `
You are an expert in sustainable water systems and urban hydrology.
Analyze the following feasibility data for a household rainwater harvesting project
and provide 5–7 short, actionable, *engineering and economic* recommendations
that can improve overall efficiency, payback, and sustainability.

DATA SUMMARY
- Roof Area: ${roofArea} m²
- Annual Rainfall: ${rainfall} mm
- Harvest Potential: ${harvest.toLocaleString()} L/year
- Feasibility Score: ${score} (${category})
- Payback Period: ${isFinite(payback) ? payback.toFixed(1) : "N/A"} years
- ROI: ${roi.toFixed(1)}%
- Climate Resilience: ${resilience.toFixed(1)}%
- CO₂ Saved: ${co2.toFixed(2)} tons/year
- Subsidy Eligible: ${subsidy ? "Yes" : "No"}

OUTPUT FORMAT
Return only plain bullet points, each recommendation concise and clear.
Do not number or format with Markdown. No extra commentary.
  `.trim();

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY!,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // 🔹 Clean & split Gemini output
    const lines = text
      .split("\n")
      .map((r: string) => r.replace(/^[-*•]\s*/, "").trim())
      .filter(Boolean);

    // 🔸 Gemini empty or invalid → use fallback
    if (lines.length === 0) {
      return generateFallbackRecommendations({
        roofArea,
        rainfall,
        roi,
        score,
        resilience,
      });
    }

    return lines;
  } catch (err) {
    console.error("❌ Gemini Recommendation Error:", err);
    return generateFallbackRecommendations({ roofArea, rainfall, roi, score, resilience });
  }
}

/* -----------------------------------
   🔧 Local Fallback Recommendation Generator
----------------------------------- */
function generateFallbackRecommendations({
  roofArea,
  rainfall,
  roi,
  score,
  resilience,
}: {
  roofArea: number;
  rainfall: number;
  roi: number;
  score: number;
  resilience: number;
}) {
  const recs: string[] = [];

  // Rainfall-specific
  if (rainfall < 700) {
    recs.push("Install recharge pits or soakaways to improve groundwater retention in low-rainfall zones.");
  } else {
    recs.push("Use a first-flush diverter and mesh filter to maintain good harvested water quality.");
  }

  // Catchment optimization
  if (roofArea < 100) {
    recs.push("Add adjacent roofs or paved areas to increase total catchment area.");
  } else if (roofArea > 200) {
    recs.push("Divide collection into multiple inlets to prevent overflow losses.");
  }

  // Financial optimization
  if (roi < 5) {
    recs.push("Leverage local municipal or state subsidies to improve ROI and reduce payback period.");
  } else {
    recs.push("Consider integrating greywater reuse for even higher long-term savings.");
  }

  // Climate resilience
  if (resilience < 70) {
    recs.push("Install modular storage or dual-tank systems to handle rainfall variability.");
  } else {
    recs.push("Monitor tank inflow/outflow to fine-tune resilience and efficiency under changing rainfall patterns.");
  }

  // General best practices
  if (score >= 75) {
    recs.push("Perform annual gutter and tank maintenance to sustain current performance levels.");
  } else {
    recs.push("Inspect and realign downpipes to reduce conveyance losses and improve efficiency.");
  }

  // IoT / Monitoring
  recs.push("Add IoT-based water level sensors for smarter tank management and usage tracking.");

  return recs;
}
