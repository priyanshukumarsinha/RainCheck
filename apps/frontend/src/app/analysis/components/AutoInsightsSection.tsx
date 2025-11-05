"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import {
  Droplets, Gauge, Wallet, Leaf, Truck, Sparkles, Lightbulb,
} from "lucide-react";
import { useFeasibility } from "../context/FeasibilityContext";
import { generateDecisionWithGemini } from "../lib/generateDecisionWithGemini";

export default function AutoInsightsSection() {
  const { report } = useFeasibility();
  const [aiDecision, setAiDecision] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  if (!report) return null;

  const fadeIn = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

  /* -----------------------------------
     🧩 Extract data from structured report
  ----------------------------------- */
  const totalHarvest_kL = report.summary?.annualHarvest_kL ?? 0;
  const supplyCoverage = report.summary?.coverage_percent ?? 0;
  const savings = report.financials?.annualSavings_INR ?? 0;
  const co2 = report.environmentalImpact?.co2Saved_tons_perYear ?? 0;
  const tankerTrips = report.environmentalImpact?.tankerTripsAvoided ?? 0;
  const recharge_kL = (report.environmentalImpact?.groundwaterRecharge_L ?? 0) / 1000;
  const reliability = report.reliability?.reliability_percent ?? 70;
  const roi = report.financials?.roi_percent ?? 0;

  const rainfallTrend = report.charts?.monthlyRainfallTrend ?? [];
  const costBenefit = report.charts?.costBenefitTrend ?? [];
  const recommendations = report.aiGeneratedInsights?.recommendations ?? [];

  /* -----------------------------------
     🤖 AI / Gemini verdict
  ----------------------------------- */
  useEffect(() => {
    if (report) {
      setLoading(true);
      generateDecisionWithGemini(report)
        .then((res) => setAiDecision(res))
        .catch(() =>
          setAiDecision({
            verdict: "Feasibility Unknown",
            message: "Gemini could not generate insights right now.",
          })
        )
        .finally(() => setLoading(false));
    }
  }, [report]);

  /* -----------------------------------
     📈 Derived analytics
  ----------------------------------- */
  const tankReliability = [
    { size: 2000, reliability: 45 },
    { size: 4000, reliability: 65 },
    { size: 6000, reliability: 78 },
    { size: 8000, reliability: 86 },
    { size: 10000, reliability: 92 },
  ];

  const waterBalance = [
    { label: "Rainfall", volume: report.climateTrend?.baseRainfall_mm ?? 0 },
    { label: "Harvestable", volume: totalHarvest_kL },
    { label: "Utilized", volume: (totalHarvest_kL * supplyCoverage) / 100 },
    { label: "Recharge", volume: recharge_kL },
  ];

  const sustainability = [
    { metric: "ROI", value: roi },
    { metric: "CO₂", value: co2 * 10 },
    { metric: "Reliability", value: reliability },
    { metric: "Recharge", value: recharge_kL },
    { metric: "Utilization", value: supplyCoverage },
  ];

  /* -----------------------------------
     🧠 Render
  ----------------------------------- */
  return (
    <section
      id="insights"
      className="min-h-screen text-gray-200 py-8 sm:py-12 px-3 sm:px-6 space-y-10 sm:space-y-14"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl sm:text-2xl font-semibold text-center text-amber-400"
      >
        3. Auto Insights
      </motion.h2>

      {/* 🔹 Summary Stats */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5"
      >
        {[
          { icon: <Droplets className="text-amber-400 w-5 h-5" />, label: "Harvest", value: `${totalHarvest_kL.toLocaleString()} kL` },
          { icon: <Gauge className="text-emerald-400 w-5 h-5" />, label: "Coverage", value: `${supplyCoverage}%` },
          { icon: <Wallet className="text-blue-400 w-5 h-5" />, label: "Savings", value: `₹${savings.toLocaleString()}` },
          { icon: <Leaf className="text-green-400 w-5 h-5" />, label: "CO₂ Saved", value: `${co2.toFixed(2)}t` },
          { icon: <Truck className="text-red-400 w-5 h-5" />, label: "Tanker Trips", value: `${tankerTrips}` },
        ].map((s, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            whileHover={{ scale: 1.03 }}
            className="bg-[#161616]/70 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all border border-amber-400/10 hover:border-amber-400/30"
          >
            {s.icon}
            <p className="mt-1 text-[11px] text-gray-400">{s.label}</p>
            <p className="text-sm sm:text-base font-semibold text-amber-300">{s.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔹 Chart grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard title="Monthly Rainfall vs Harvest">
          <AreaChart data={rainfallTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#999" tick={{ fontSize: 10 }} />
            <YAxis stroke="#999" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Area type="monotone" dataKey="rainfall_mm" stroke="#60a5fa" fill="#60a5fa40" name="Rainfall (mm)" />
            <Area type="monotone" dataKey="netHarvest_L" stroke="#F59E0B" fill="#F59E0B40" name="Harvest (L)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Tank Size vs Reliability">
          <LineChart data={tankReliability}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="size" stroke="#999" tick={{ fontSize: 10 }} />
            <YAxis stroke="#999" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="reliability" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Cost vs Benefit (5-Year)">
          <LineChart data={costBenefit}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="year" stroke="#999" tick={{ fontSize: 10 }} />
            <YAxis stroke="#999" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line dataKey="cost_INR" stroke="#F59E0B" name="Cost" />
            <Line dataKey="savings_INR" stroke="#10B981" name="Savings" />
          </LineChart>
        </ChartCard>

        <ChartCard title="Water Balance">
          <BarChart data={waterBalance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="label" stroke="#999" tick={{ fontSize: 10 }} />
            <YAxis stroke="#999" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="volume" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Sustainability Metrics">
          <RadarChart data={sustainability}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="metric" stroke="#999" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis stroke="#999" />
            <Radar dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
          </RadarChart>
        </ChartCard>
      </div>

      {/* 🔹 AI Verdict */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="rounded-xl bg-[#141416]/90 border border-amber-400/10 shadow-md p-5 sm:p-8 text-center"
      >
        {loading ? (
          <p className="text-gray-400 text-sm">Analyzing with Gemini...</p>
        ) : aiDecision ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-2 rounded-full bg-amber-400/10 ring-1 ring-amber-400/20">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
              {aiDecision.verdict}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
              {aiDecision.message}
            </p>
            <p className="text-[10px] text-gray-500 italic">✦ AI insights powered by Gemini</p>
          </div>
        ) : (
          <p className="text-gray-500 text-xs italic">Awaiting AI recommendation...</p>
        )}
      </motion.div>

      {/* 🔹 AI Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#1A1A1C]/80 border border-emerald-400/10 rounded-xl p-5 sm:p-8 shadow-md"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="text-emerald-400 w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-300">
              AI Recommendations
            </h3>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
            {recommendations.map((rec: string, i: number) => (
              <li key={i} className="before:content-['•'] before:text-emerald-400 before:mr-2">
                {rec}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </section>
  );
}

/* 📊 Compact reusable chart wrapper */
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-[#161616]/80 rounded-lg border border-amber-400/10 p-3 sm:p-5"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-sm sm:text-base font-medium mb-2 text-amber-300 text-center">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={180}>
        {children}
      </ResponsiveContainer>
    </motion.div>
  );
}
