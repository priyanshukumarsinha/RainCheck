"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, FileText, Sparkles, Lightbulb } from "lucide-react";
import SummaryReport from "../ui/SummaryReport";
import { generateReport } from "../services/PdfReportGenerator";
import { useFeasibility } from "../context/FeasibilityContext";

export default function ResultsSection() {
  const { report } = useFeasibility();
  if (!report) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  const rainfallData = report.charts?.monthlyRainfallTrend ?? [];
  const savingsData = report.charts?.costBenefitTrend ?? [];
  const aiVerdict = {
    verdict: report.aiGeneratedInsights?.verdict ?? null,
    message: report.aiGeneratedInsights?.message ?? null,
  };
  const recommendations = report.aiGeneratedInsights?.recommendations ?? [];

  const handleDownload = () => {
    generateReport({
      ...report,
      generatedAt: new Date().toLocaleString(),
    });
    
    alert("✅ Feasibility report generated (check console).");
  };

  return (
    <section
      id="results"
      className="min-h-screen py-8 sm:py-12 px-3 sm:px-6 text-gray-200 space-y-8 sm:space-y-12"
    >
      {/* Header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
          Results Overview
        </h2>
        <p className="text-gray-400 text-sm sm:text-lg max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
          A comprehensive summary of your rainwater harvesting performance, economic outcomes, and sustainability impact.
        </p>
      </motion.div>

      {/* Summary Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <SummaryReport data={report} />
      </motion.div>

      {/* AI Insights */}
      {aiVerdict.verdict && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-[#1a1a1c]/80 border border-amber-400/10 rounded-xl p-6 text-center space-y-3"
        >
          <div className="flex justify-center">
            <div className="p-2 rounded-full bg-amber-400/10 ring-1 ring-amber-400/20">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
            {aiVerdict.verdict}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed px-2 max-w-2xl mx-auto">
            {aiVerdict.message}
          </p>
          <p className="text-[10px] text-gray-500 italic">
            ✦ AI analysis powered by Gemini
          </p>
        </motion.div>
      )}

      {/* Charts */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-4 sm:gap-8"
      >
        <ChartCard title="Monthly Rainfall vs Harvested Water" accent="amber">
          <BarChart data={rainfallData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
            <XAxis dataKey="month" stroke="#aaa" tick={{ fontSize: 10 }} />
            <YAxis stroke="#aaa" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E1E20",
                border: "none",
                borderRadius: "6px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Bar dataKey="rainfall_mm" fill="#60a5fa" name="Rainfall (mm)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="netHarvest_L" fill="#fbbf24" name="Harvested (L)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Projected Savings (5-Year)" accent="emerald">
          <AreaChart data={savingsData}>
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
            <XAxis dataKey="year" stroke="#aaa" tick={{ fontSize: 10 }} />
            <YAxis stroke="#aaa" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E1E20",
                border: "none",
                borderRadius: "6px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Area
              type="monotone"
              dataKey="savings_INR"
              stroke="#34d399"
              fillOpacity={1}
              fill="url(#colorSavings)"
              name="Savings (₹)"
            />
          </AreaChart>
        </ChartCard>
      </motion.div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#161616]/80 border border-emerald-400/10 rounded-xl p-5 sm:p-8 shadow-md"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="text-emerald-400 w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-300">
              AI Recommendations
            </h3>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {recommendations.map((rec: string, i: number) => (
              <li key={i} className="before:content-['•'] before:text-emerald-400 before:mr-2">
                {rec}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Download Report */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center space-y-3 sm:space-y-5 pt-6 sm:pt-10"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          <h3 className="text-lg sm:text-2xl font-semibold text-amber-300">
            Download Full Report
          </h3>
        </div>
        <p className="text-gray-400 text-xs sm:text-base max-w-sm sm:max-w-lg">
          Get your detailed feasibility report with charts, AI insights, and sustainability metrics.
        </p>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2 sm:px-8 sm:py-3 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-transform hover:scale-105"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          Download Report
        </button>
      </motion.div>
    </section>
  );
}

/* Chart Card */
function ChartCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent: "amber" | "emerald";
  children: React.ReactNode;
}) {
  const color =
    accent === "amber"
      ? "text-amber-300 border-amber-400/10"
      : "text-emerald-300 border-emerald-400/10";

  return (
    <motion.div
      className={`bg-[#161616]/80 rounded-lg border ${color} p-3 sm:p-5 shadow-md`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-sm sm:text-lg font-semibold mb-2 text-center">{title}</h3>
      <div className="h-[180px] sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
