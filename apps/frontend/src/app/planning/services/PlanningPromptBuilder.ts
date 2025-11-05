/**
 * PlanningPromptBuilder
 * ----------------------
 * Builds a clean, structured prompt for generating a Rainwater Harvesting Implementation Plan.
 *
 * Input: analysis JSON (from feasibility module) + user preferences
 * Output: prompt string (to send to model) + helper mockCallModel for testing
 */

export default class PlanningPromptBuilder {
  /**
   * Builds the model prompt from feasibility data & user preferences.
   */
  static build({
    analysis,
    preferences,
  }: {
    analysis: any;
    preferences: any;
  }): string {
    if (!analysis) throw new Error("Missing analysis data for plan generation.");

    const { budget, goal, maintenance, timeframe } = preferences;

    // Extract key analysis insights
    const roofArea = analysis?.roofArea || "unknown";
    const annualRainfall = analysis?.annualRainfall || "unknown";
    const annualHarvest = analysis?.annualHarvest || "unknown";
    const tankSize = analysis?.tankSize || "unknown";
    const feasibility = analysis?.feasibility || "not specified";
    const savings = analysis?.economicAnalysis?.netSavings10yr || "unknown";
    const rechargePotential = analysis?.environmentalImpact?.groundwaterRecharge || "unknown";
    const climateTrend = analysis?.climateTrend?.climateResilience || "unknown";

    // Build the structured prompt
    const prompt = `
You are an expert in sustainable water management and rainwater harvesting systems. 
Your task is to generate a clear, detailed, and actionable **Implementation Plan** 
for a household or small community based on the following data:

### Feasibility Report (Input Data)
- Roof Area: ${roofArea} sq.m
- Annual Rainfall: ${annualRainfall} mm
- Estimated Harvest: ${annualHarvest} L/year
- Recommended Tank Size: ${tankSize} L
- Feasibility Category: ${feasibility}
- Economic Savings (10 years): ${savings}
- Groundwater Recharge Potential: ${rechargePotential}
- Climate Resilience Trend: ${climateTrend}

### User Preferences
- Budget: ${budget}
- Goal: ${goal} water dependency
- Maintenance Style: ${maintenance}
- Implementation Timeframe: ${timeframe}

### Expected Output
Respond ONLY in the following JSON format:

{
  "tank": {
    "recommendedSizeL": number,
    "type": "string",
    "alternatives": ["string"],
    "justification": "string"
  },
  "filtration": {
    "firstFlush": "string",
    "filters": ["string"],
    "notes": "string"
  },
  "cost": {
    "estimatedINR": number,
    "installationINR": number,
    "subsidyINR": number,
    "netCostINR": number
  },
  "subsidies": [
    {
      "scheme": "string",
      "eligible": boolean,
      "docsRequired": ["string"],
      "applyUrl": "string"
    }
  ],
  "vendors": [
    {
      "name": "string",
      "distanceKm": number,
      "specialty": "string"
    }
  ],
  "timeline": [
    {
      "step": "string",
      "durationDays": number,
      "owner": "string"
    }
  ],
  "maintenance": {
    "tasks": ["string"],
    "frequency": "string"
  },
  "meta": {
    "confidence": number,
    "notes": "string"
  }
}

Return **only** valid JSON (no markdown, no explanations).
`;

    return prompt.trim();
  }

  /**
   * Mock function for testing (simulates a model response)
   * Used before real API integration.
   */
  static async mockCallModel(prompt: string) {
    console.log("🔍 Mock model called with prompt:\n", prompt.slice(0, 500) + "...");

    // Simulated delay to mimic LLM processing
    await new Promise((res) => setTimeout(res, 1200));

    // Mock structured output
    return JSON.stringify(
      {
        tank: {
          recommendedSizeL: 8000,
          type: "RCC",
          alternatives: ["HDPE Modular", "Underground Concrete"],
          justification: "Based on rainfall and roof area, RCC tanks are cost-effective and durable.",
        },
        filtration: {
          firstFlush: "3 mm mesh diverter",
          filters: ["Sand filter", "Charcoal filter"],
          notes: "Ensures removal of debris and organic matter before storage.",
        },
        cost: {
          estimatedINR: 42000,
          installationINR: 6000,
          subsidyINR: 15000,
          netCostINR: 33000,
        },
        subsidies: [
          {
            scheme: "City RWH Rebate",
            eligible: true,
            docsRequired: ["Property ID", "Aadhaar", "Installation Invoice"],
            applyUrl: "https://gov.example.in/rwh-subsidy",
          },
        ],
        vendors: [
          {
            name: "EcoTank Solutions",
            distanceKm: 5,
            specialty: "Tank fabrication & installation",
          },
          {
            name: "GreenFlow Filters",
            distanceKm: 3,
            specialty: "Filter system setup",
          },
        ],
        timeline: [
          { step: "Site survey & design", durationDays: 5, owner: "Vendor" },
          { step: "Material procurement", durationDays: 3, owner: "User" },
          { step: "Tank installation", durationDays: 4, owner: "Vendor" },
          { step: "Testing & verification", durationDays: 2, owner: "User" },
        ],
        maintenance: {
          tasks: ["Clean filter", "Check first-flush valve", "Inspect tank for cracks"],
          frequency: "Every 6 months",
        },
        meta: {
          confidence: 0.92,
          notes: "Plan optimized for medium budget & partial dependency goal.",
        },
      },
      null,
      2
    );
  }
}
