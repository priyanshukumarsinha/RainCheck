"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { generateFeasibilityReport } from "../lib/feasibility";
import { generateRecommendationsWithGemini } from "../lib/recommendations";
import { generateDecisionWithGemini } from "../lib/generateDecisionWithGemini";
import robustMock from "../mock/rwh_report.json";

/* ---------------------------------------------
   🎯 INPUT SCHEMA
--------------------------------------------- */
interface FeasibilityInput {
  roofArea_m2: number;
  annualRainfall_mm: number;
  tankSize_L: number;
  householdSize: number;
  avgDailyUse_L: number;
  roofType: string;
  installationCost_INR: number;
  waterCost_INR_L: number;
  city: string;
}

/* ---------------------------------------------
   📊 REPORT SCHEMA (Partial)
--------------------------------------------- */
interface FeasibilityReport {
  reportId: string;
  userDetails: Record<string, any>;
  locationData: Record<string, any>;
  catchmentAnalysis: Record<string, any>;
  waterDemand: Record<string, any>;
  financials: Record<string, any>;
  environmentalImpact: Record<string, any>;
  reliability: Record<string, any>;
  charts: Record<string, any>;
  climateTrend: Record<string, any>;
  aiGeneratedInsights: Record<string, any>;
  summary: Record<string, any>;
}

/* ---------------------------------------------
   🧮 Default Input
--------------------------------------------- */
const defaultInput: FeasibilityInput = {
  roofArea_m2: 120,
  annualRainfall_mm: 850,
  tankSize_L: 8000,
  householdSize: 4,
  avgDailyUse_L: 135,
  roofType: "Concrete",
  installationCost_INR: 36000,
  waterCost_INR_L: 0.02,
  city: "Noida",
};

/* ---------------------------------------------
   🧠 Context Setup
--------------------------------------------- */
const FeasibilityContext = createContext<any>(null);

export function FeasibilityProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState<FeasibilityInput>(defaultInput);
  const [report, setReport] = useState<FeasibilityReport | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------------------------------------
     ⚙️ Generate Full Feasibility Report
  --------------------------------------------- */
  const generateReport = async () => {
    setLoading(true);
    try {
      // Step 1: Generate base feasibility model (hydrology + finance)
      const baseReport = generateFeasibilityReport(input);

      // Step 2: AI analysis (verdict + recommendations)
      const [aiVerdict, aiRecs] = await Promise.all([
        generateDecisionWithGemini(baseReport),
        generateRecommendationsWithGemini(baseReport),
      ]);

      // Step 3: Merge everything into a clean, standardized object
      const mergedReport: FeasibilityReport = {
        ...robustMock,
        reportId: `RWH-${new Date().getFullYear()}-${input.city.toUpperCase()}-${Math.floor(
          Math.random() * 1000
        )}`,

        userDetails: {
          city: input.city,
          occupants: input.householdSize,
          roofType: input.roofType,
          roofArea_m2: input.roofArea_m2,
        },

        locationData: {
          city: input.city,
          averageAnnualRainfall_mm: input.annualRainfall_mm,
        },

        catchmentAnalysis: {
          effectiveCatchmentArea_m2: input.roofArea_m2,
          runoffCoefficient: baseReport.hydrology.runoffCoefficient,
          annualHarvestableWater_kL: baseReport.hydrology.annualHarvestable_L / 1000,
          netAnnualHarvest_kL: baseReport.hydrology.netAnnualHarvest_L / 1000,
          recommendedTankSize_L: input.tankSize_L,
        },

        waterDemand: {
          dailyConsumption_L: input.householdSize * input.avgDailyUse_L,
          annualDemand_L: baseReport.summary.annualDemand_kL * 1000,
          avgDailyUse_L: input.avgDailyUse_L,
        },

        financials: {
          installationCost_INR: input.installationCost_INR,
          annualSavings_INR: baseReport.financials.annualSavings_INR,
          paybackYears: baseReport.financials.paybackYears,
          roi_percent: baseReport.financials.roi_percent,
          netSavings10yr: baseReport.financials.netSavings10yr,
          subsidyEligible: baseReport.financials.subsidyEligible,
        },

        environmentalImpact: {
          groundwaterRecharge_L: baseReport.environmentalImpact.groundwaterRecharge_L,
          co2Saved_tons_perYear: baseReport.environmentalImpact.co2Saved_tons_perYear,
          tankerTripsAvoided: baseReport.environmentalImpact.tankerTripsAvoided,
        },

        reliability: baseReport.reliability,

        climateTrend: baseReport.climateTrend,

        charts: {
          monthlyRainfallTrend: baseReport.charts.monthlyRainfallTrend,
          costBenefitTrend: baseReport.charts.costBenefitTrend,
        },

        summary: {
          city: input.city,
          roofArea_m2: input.roofArea_m2,
          annualRainfall_mm: input.annualRainfall_mm,
          annualHarvest_kL: baseReport.summary.annualHarvest_kL,
          annualDemand_kL: baseReport.summary.annualDemand_kL,
          coverage_percent: baseReport.summary.coverage_percent,
          roi_percent: baseReport.summary.roi_percent,
          payback_years: baseReport.summary.payback_years,
          score: baseReport.score,
          finalVerdict: baseReport.summary.finalVerdict,
        },

        aiGeneratedInsights: {
          verdict: aiVerdict?.verdict ?? "Feasibility Unknown",
          message: aiVerdict?.message ?? "AI analysis unavailable.",
          recommendations: aiRecs ?? [],
        },
      };

      // Step 4: Update context state
      setReport(mergedReport);
      setRecommendations(mergedReport.aiGeneratedInsights.recommendations);
    } catch (err) {
      console.error("❌ Error generating report:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------------
     🧩 Context Value
  --------------------------------------------- */
  const value = useMemo(
    () => ({
      input,
      setInput,
      report,
      recommendations,
      loading,
      generateReport,
    }),
    [input, report, recommendations, loading]
  );

  return (
    <FeasibilityContext.Provider value={value}>
      {children}
    </FeasibilityContext.Provider>
  );
}

/* ---------------------------------------------
   🔌 Hook Export
--------------------------------------------- */
export function useFeasibility() {
  return useContext(FeasibilityContext);
}
