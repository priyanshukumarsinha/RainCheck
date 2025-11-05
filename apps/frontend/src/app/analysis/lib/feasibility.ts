// /lib/feasibility.ts
/**
 * Generate a robust, realistic rainwater harvesting feasibility report
 * using hydrological, economic, and environmental modeling.
 */
export function generateFeasibilityReport(input: {
  roofArea_m2: number;
  annualRainfall_mm: number;
  tankSize_L: number;
  householdSize: number;
  installationCost_INR: number;
  avgDailyUse_L?: number;
  waterCost_INR_L?: number;
  roofType?: string;
}) {
  const {
    roofArea_m2,
    annualRainfall_mm,
    tankSize_L,
    householdSize,
    installationCost_INR,
    avgDailyUse_L = 135,
    waterCost_INR_L = 0.02,
    roofType = "Concrete",
  } = input;

  /* -----------------------------------
     🧮 Roof runoff efficiency
  ----------------------------------- */
  const runoffCoefficients: Record<string, number> = {
    Concrete: 0.85,
    "Metal Sheet": 0.9,
    Tile: 0.8,
    Asbestos: 0.82,
    Other: 0.75,
  };
  const runoffCoefficient = runoffCoefficients[roofType] ?? 0.85;

  /* -----------------------------------
     🌧️ Hydrology model
  ----------------------------------- */
  const firstFlushLossPercent = 0.05;
  const evaporationLossPercent = 0.02;

  const annualHarvestable_L = roofArea_m2 * annualRainfall_mm * runoffCoefficient;
  const netAnnualHarvest_L = Math.max(
    0,
    annualHarvestable_L * (1 - firstFlushLossPercent - evaporationLossPercent)
  );

  const dailyUse_L = householdSize * avgDailyUse_L;
  const annualDemand_L = dailyUse_L * 365;

  const harvestUtilization_percent =
    annualDemand_L > 0 ? (netAnnualHarvest_L / annualDemand_L) * 100 : 0;

  const overflowLoss_L = Math.max(0, netAnnualHarvest_L - tankSize_L);
  const rechargeFraction = 0.4;
  const groundwaterRecharge_L = netAnnualHarvest_L * rechargeFraction;

  /* -----------------------------------
     🌦️ Climate Projection
  ----------------------------------- */
  const avgDeclineRate_mmPerYear = 5;
  const projectedRainfall_mm = Array.from({ length: 10 }, (_, i) =>
    Math.max(0, Math.round(annualRainfall_mm - i * avgDeclineRate_mmPerYear))
  );
  const climateResilience = Math.max(0, 100 - avgDeclineRate_mmPerYear * 0.8);

  /* -----------------------------------
     💰 Financial Model
  ----------------------------------- */
  const annualSavings_INR = Math.round(netAnnualHarvest_L * waterCost_INR_L);
  const paybackYears =
    annualSavings_INR > 0 ? Number((installationCost_INR / annualSavings_INR).toFixed(1)) : null;
  const roi_percent =
    installationCost_INR > 0
      ? Number(((annualSavings_INR / installationCost_INR) * 100).toFixed(1))
      : 0;
  const netSavings10yr = Math.round(annualSavings_INR * 10 - installationCost_INR);

  // 5-year trend (savings grow 3% per year)
  const costBenefitTrend = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    return {
      year,
      cost_INR: installationCost_INR,
      savings_INR: Math.round(annualSavings_INR * Math.pow(1.03, i)),
    };
  });

  /* -----------------------------------
     🌱 Environmental Impact
  ----------------------------------- */
  const co2Saved_kg_perYear = Number(((netAnnualHarvest_L / 1000) * 2.5).toFixed(1));
  const co2Saved_tons_perYear = Number((co2Saved_kg_perYear / 1000).toFixed(3));
  const tankerCapacity_L = 5000;
  const tankerTripsAvoided = Math.round(netAnnualHarvest_L / tankerCapacity_L);

  /* -----------------------------------
     📊 Reliability Estimate
  ----------------------------------- */
  const reliability_percent = Math.round(
    Math.min(
      95,
      Math.max(
        25,
        50 +
          Math.min(30, (tankSize_L / 10000) * 30) +
          Math.min(15, (harvestUtilization_percent / 100) * 15)
      )
    )
  );

  /* -----------------------------------
     📈 Monthly Rainfall & Harvest Chart
  ----------------------------------- */
  const monthlyDistribution = [
    0.02, 0.025, 0.03, 0.04, 0.07, 0.15, 0.28, 0.22, 0.10, 0.05, 0.02, 0.02,
  ];
  const totalDist = monthlyDistribution.reduce((a, b) => a + b, 0);
  const normalizedDist = monthlyDistribution.map((v) => v / totalDist);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthlyRainfallTrend = months.map((m, i) => ({
    month: m,
    rainfall_mm: Math.round(annualRainfall_mm * normalizedDist[i]),
    harvested_L: Math.round(annualHarvestable_L * normalizedDist[i]),
    netHarvest_L: Math.round(netAnnualHarvest_L * normalizedDist[i]),
  }));

  /* -----------------------------------
     🧮 Feasibility Score (0–100)
  ----------------------------------- */
  const coverageScore = Math.min(30, (harvestUtilization_percent / 100) * 30);
  const paybackScore = paybackYears ? Math.max(0, Math.min(25, (10 / paybackYears) * 25)) : 0;
  const reliabilityScore = Math.min(25, (reliability_percent / 100) * 25);
  const environmentalScore = Math.min(20, (co2Saved_kg_perYear / (netAnnualHarvest_L / 1000)) * 5);

  const finalScore = Math.round(Math.min(100, coverageScore + paybackScore + reliabilityScore + environmentalScore));
  const category =
    finalScore >= 75 ? "Feasible" : finalScore >= 50 ? "Marginal" : "Not Feasible";

  /* -----------------------------------
     📋 Summary Snapshot
  ----------------------------------- */
  const summary = {
    annualHarvest_kL: Number((netAnnualHarvest_L / 1000).toFixed(2)),
    annualDemand_kL: Number((annualDemand_L / 1000).toFixed(2)),
    coverage_percent: Number(harvestUtilization_percent.toFixed(1)),
    roi_percent,
    reliability_percent,
    payback_years: paybackYears,
    finalVerdict: category,
  };

  /* -----------------------------------
     ✅ Return full structured report
  ----------------------------------- */
  return {
    score: finalScore,
    category,
    hydrology: {
      roofArea_m2,
      runoffCoefficient,
      annualHarvestable_L: Math.round(annualHarvestable_L),
      netAnnualHarvest_L: Math.round(netAnnualHarvest_L),
      overflowLoss_L: Math.round(overflowLoss_L),
      firstFlushLossPercent,
      evaporationLossPercent,
      groundwaterRecharge_L: Math.round(groundwaterRecharge_L),
      harvestUtilization_percent: Number(harvestUtilization_percent.toFixed(2)),
    },
    financials: {
      installationCost_INR,
      annualSavings_INR,
      paybackYears,
      roi_percent,
      netSavings10yr,
      costBenefitTrend,
      subsidyEligible: installationCost_INR > 30000,
    },
    environmentalImpact: {
      groundwaterRecharge_L: Math.round(groundwaterRecharge_L),
      co2Saved_kg_perYear,
      co2Saved_tons_perYear,
      tankerTripsAvoided,
      urbanFloodReduction_percent: 2.5,
    },
    reliability: {
      reliability_percent,
      assumptions: {
        tankInfluence: "Larger tanks improve supply reliability during dry months.",
        rainfallSpread: "Regions with balanced rainfall have higher year-round reliability.",
      },
    },
    climateTrend: {
      baseRainfall_mm: annualRainfall_mm,
      projectedRainfall_mm,
      avgDeclineRate_mmPerYear,
      climateResilience,
    },
    charts: {
      monthlyRainfallTrend,
      costBenefitTrend,
    },
    summary,
    recommendations: [],
  };
}
