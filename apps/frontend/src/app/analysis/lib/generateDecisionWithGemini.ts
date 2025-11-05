// /lib/generateDecisionWithGemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini model safely
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * 🔮 Generate an AI-based decision summary using Gemini.
 * Returns fallback heuristic decision if Gemini is unavailable or fails.
 */
export async function generateDecisionWithGemini(report: any) {
  // --- Fallback if API key not set ---
  if (!genAI) {
    console.warn("⚠️ Gemini API key missing — using fallback AI insights.");
    return fallbackDecision(report);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an expert in sustainable water management and rainwater harvesting design.
Based on the following project data, provide:
1. A short feasibility verdict: "Highly Feasible", "Moderately Feasible", or "Low Feasibility".
2. A concise explanation (2–3 sentences) addressing rainfall, ROI, reliability, and recharge.

Project Data:
${JSON.stringify(report, null, 2)}

Output strictly as valid JSON (no markdown, no commentary):
{
  "verdict": "Highly Feasible",
  "message": "Good rainfall, ROI, and recharge potential. Minor improvements to tank sizing recommended."
}
`.trim();

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // 🧹 Clean Gemini response (handles ```json``` and rogue control chars)
    const cleaned = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/[\u0000-\u001F]+/g, "")
      .trim();

    // 🧠 Safe JSON parsing
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ Gemini returned invalid JSON:", cleaned);
      parsed = fallbackDecision(report);
    }

    // ✅ Schema validation
    if (!parsed?.verdict || !parsed?.message) {
      return fallbackDecision(report);
    }

    return parsed;
  } catch (err) {
    console.error("❌ Gemini Decision Error:", err);
    return fallbackDecision(report);
  }
}

/* -----------------------------------
   🧩 Local heuristic fallback decision
----------------------------------- */
function fallbackDecision(report: any) {
  const score = Number(report.score ?? report.summary?.score ?? 0);
  const roi = Number(report.financials?.roi_percent ?? 0);
  const reliability = Number(report.reliability?.reliability_percent ?? 0);
  const coverage = Number(report.summary?.coverage_percent ?? 0);

  let verdict = "Feasibility Unknown";
  let message = "Insufficient data to determine system feasibility.";

  // --- Heuristic logic ---
  if (score >= 75 || (roi >= 10 && reliability >= 80)) {
    verdict = "Highly Feasible";
    message = `Excellent rainfall potential, ROI of ${roi}% and strong reliability (${reliability}%). This site is well-suited for RWH with minimal optimization.`;
  } else if (score >= 50) {
    verdict = "Moderately Feasible";
    message = `Moderate performance — ${coverage}% coverage and ROI near ${roi}%. Improving tank size or recharge rate could enhance results.`;
  } else if (score > 0) {
    verdict = "Low Feasibility";
    message = `Low ROI (${roi}%) or insufficient rainfall detected. Consider smaller-scale recharge structures or roof optimization.`;
  }

  return { verdict, message };
}
