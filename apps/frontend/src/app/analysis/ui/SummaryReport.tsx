"use client";

import { motion } from "framer-motion";

interface SummaryReportProps {
  data: any;
}

export default function SummaryReport({ data }: SummaryReportProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // --- Extract key metrics safely ---
  const city = data?.summary?.city ?? "—";
  const roofArea = data?.summary?.roofArea_m2 ?? data?.catchmentAnalysis?.effectiveCatchmentArea_m2 ?? 0;
  const rainfall = data?.summary?.annualRainfall_mm ?? data?.locationData?.averageAnnualRainfall_mm ?? 0;
  const harvest = Math.round(
  ((data?.summary?.annualHarvest_kL ?? data?.catchmentAnalysis?.annualHarvestableWater_kL ?? 0) * 1000)
);
  const tank = data?.catchmentAnalysis?.recommendedTankSize_L ?? 0;
  const savings = data?.financials?.annualSavings_INR ?? 0;
  const score = data?.summary?.score ?? data?.score ?? 0;
  const category =
    data?.summary?.finalVerdict ??
    (score >= 75 ? "Feasible" : score >= 50 ? "Marginal" : "Not Feasible");

  const summaryItems = [
    { label: "City", value: city },
    { label: "Roof Area", value: `${roofArea.toLocaleString()} m²` },
    { label: "Annual Rainfall", value: `${rainfall.toLocaleString()} mm` },
    { label: "Harvest Potential", value: `${harvest.toLocaleString()} L` },
    { label: "Recommended Tank Size", value: `${tank.toLocaleString()} L` },
    { label: "Annual Savings", value: `₹${savings.toLocaleString()}` },
    { label: "Feasibility Score", value: `${score}/100` },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const getCategoryText = (cat: string) => {
    switch (cat) {
      case "Feasible":
      case "Highly Feasible":
        return {
          color: "text-emerald-400",
          msg: "Excellent parameters for RWH. Strong rainfall and good ROI make this a viable investment.",
        };
      case "Marginal":
      case "Moderately Feasible":
        return {
          color: "text-amber-400",
          msg: "Moderate feasibility. Slight improvement in tank size or recharge efficiency recommended.",
        };
      default:
        return {
          color: "text-red-400",
          msg: "Low feasibility at current parameters. Consider increasing roof area or rainfall capture efficiency.",
        };
    }
  };

  const { color: decisionColor, msg: decisionMsg } = getCategoryText(category);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
      className="backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-amber-400/10 shadow-lg shadow-black/20"
    >
      <h3 className="text-2xl font-semibold text-amber-300 mb-6">
        Feasibility Summary
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {summaryItems.map((item, index) => (
          <motion.div
            key={item.label}
            variants={fadeIn}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="p-4 rounded-xl bg-gradient-to-br from-[#141416] to-[#1C1C1F] border border-amber-400/5 hover:border-amber-400/20 transition-all"
          >
            <p className="text-gray-400 text-xs uppercase">{item.label}</p>
            <p
              className={`text-lg font-semibold text-gray-100 mt-1 tracking-tight ${
                item.label === "Feasibility Score" ? getScoreColor(score) : ""
              }`}
            >
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Decision Section */}
      <div className="mt-10 border-t border-gray-800 pt-6 space-y-2">
        <h4 className="text-xl font-semibold text-gray-100 mb-1">Decision</h4>
        <p className={`font-medium ${decisionColor}`}>{decisionMsg}</p>

        {/* Optional Progress Bar */}
        <div className="w-full bg-gray-800/50 h-2 rounded-full mt-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8 }}
            className={`h-2 ${
              score >= 75
                ? "bg-emerald-400"
                : score >= 50
                ? "bg-amber-400"
                : "bg-red-400"
            }`}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
}
