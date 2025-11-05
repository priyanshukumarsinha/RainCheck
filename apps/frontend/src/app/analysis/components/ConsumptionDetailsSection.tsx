"use client";

import { motion } from "framer-motion";
import { useFeasibility } from "../context/FeasibilityContext";
import { useState, useEffect } from "react";
import { Droplets, Gauge, Home, Cloud, Coins } from "lucide-react";

export default function ConsumptionDetailsSection() {
  const { input, setInput, generateReport, loading, report } = useFeasibility();
  const [autoFillFlash, setAutoFillFlash] = useState(false);
  const [scrollPending, setScrollPending] = useState(false);
  const [generated, setGenerated] = useState(false);

  /* ✨ Highlight prefilled values */
  useEffect(() => {
    setAutoFillFlash(true);
    const timer = setTimeout(() => setAutoFillFlash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  /* 📜 Scroll to "insights" after report generation */
  useEffect(() => {
    if (report && scrollPending) {
      const el = document.getElementById("insights");
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setScrollPending(false);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 4000);
    }
  }, [report, scrollPending]);

  /* Derived values */
  const totalDailyUse = input.householdSize * input.avgDailyUse_L;
  const monthlyUse = totalDailyUse * 30;
  const annualHarvest_kL = Math.round((input.annualRainfall_mm * input.roofArea_m2 * 0.85) / 1000);

  /* 🧠 Generate full feasibility report */
  const handleGenerate = async () => {
    if (loading) return;
    setScrollPending(true);
    await generateReport();
  };

  /* ✅ Safe number parsing */
  const parseValue = (val: string) => (val === "" ? 0 : Number(val));

  return (
    <motion.section
      id="consumption"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* --- Header --- */}
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-3xl font-semibold text-amber-400">
          2. Water Consumption & Site Details
        </h2>
        <p className="text-gray-400 text-sm">
          Provide your household and cost details. RainCheck will use these
          to estimate rainwater harvesting potential, system cost, and payback.
        </p>
      </div>

      {/* --- Input Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <InputField
          label="Number of Occupants"
          type="number"
          value={input.householdSize}
          onChange={(v: string) =>
            setInput((p: any) => ({ ...p, householdSize: parseValue(v) }))
          }
          autoFlash={autoFillFlash}
          icon={<Home className="w-4 h-4 text-amber-400" />}
        />

        <InputField
          label="Average Daily Use (L/person)"
          type="number"
          value={input.avgDailyUse_L}
          onChange={(v: string) =>
            setInput((p: any) => ({ ...p, avgDailyUse_L: parseValue(v) }))
          }
          autoFlash={autoFillFlash}
          icon={<Gauge className="w-4 h-4 text-emerald-400" />}
        />

        <InputField
          label="Roof Area (m²)"
          type="number"
          value={input.roofArea_m2}
          onChange={(v: string) =>
            setInput((p: any) => ({ ...p, roofArea_m2: parseValue(v) }))
          }
          autoFlash={autoFillFlash}
          icon={<Droplets className="w-4 h-4 text-blue-400" />}
        />

        <InputField
          label="Annual Rainfall (mm)"
          type="number"
          value={input.annualRainfall_mm}
          onChange={(v: string) =>
            setInput((p: any) => ({ ...p, annualRainfall_mm: parseValue(v) }))
          }
          autoFlash={autoFillFlash}
          icon={<Cloud className="w-4 h-4 text-cyan-400" />}
        />

        <InputField
          label="Tank Capacity (L)"
          type="number"
          value={input.tankSize_L}
          onChange={(v: string) =>
            setInput((p: any) => ({ ...p, tankSize_L: parseValue(v) }))
          }
          autoFlash={autoFillFlash}
          icon={<Gauge className="w-4 h-4 text-amber-400" />}
        />

        <InputField
          label="Installation Cost (₹)"
          type="number"
          value={input.installationCost_INR}
          onChange={(v: string) =>
            setInput((p: any) => ({
              ...p,
              installationCost_INR: parseValue(v),
            }))
          }
          autoFlash={autoFillFlash}
          icon={<Coins className="w-4 h-4 text-yellow-400" />}
        />

        <InputField
          label="City / Location"
          type="text"
          value={input.city || ""}
          onChange={(v: string) => setInput((p: any) => ({ ...p, city: v }))}
          autoFlash={autoFillFlash}
          icon={<Cloud className="w-4 h-4 text-gray-400" />}
        />

        <div>
          <label className="block text-xs uppercase text-gray-400">Roof Type</label>
          <select
            value={input.roofType}
            onChange={(e) =>
              setInput((p: any) => ({ ...p, roofType: e.target.value }))
            }
            className="mt-2 w-full bg-transparent border-b-2 px-1 py-2 text-lg text-gray-100 border-amber-400/20 focus:border-amber-400"
          >
            {["Concrete", "Metal Sheet", "Tile", "Asbestos", "Other"].map((t) => (
              <option key={t} className="bg-[#0B0B0C]" value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Summary & Action --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-4 border-t border-amber-400/10 text-center space-y-3"
      >
        <p className="text-gray-300 text-sm sm:text-base">
          Estimated water use:{" "}
          <span className="text-amber-300 font-semibold">
            {totalDailyUse.toLocaleString()} L/day
          </span>{" "}
          (~{monthlyUse.toLocaleString()} L/month)
        </p>

        {input.annualRainfall_mm > 0 && input.roofArea_m2 > 0 && (
          <p className="text-xs text-gray-500">
            With {input.annualRainfall_mm} mm rainfall and {input.roofArea_m2} m² roof,
            potential harvest ≈{" "}
            <span className="text-emerald-400">{annualHarvest_kL} kL/year</span>
          </p>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 px-6 py-2 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Generate Feasibility Report"}
        </button>

        {generated && (
          <p className="text-xs text-emerald-400 pt-2 animate-pulse">
            ✅ Report generated successfully! Scroll down for insights.
          </p>
        )}
      </motion.div>
    </motion.section>
  );
}

/* --- Generic Input Field --- */
function InputField({ label, type, value, onChange, step, autoFlash, icon }: any) {
  return (
    <div>
      <label className="block text-xs uppercase text-gray-400">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-0 ml-1">{icon}</div>}
        <input
          type={type}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-2 w-full bg-transparent border-b-2 px-6 py-2 text-lg text-gray-100 focus:outline-none ${
            autoFlash
              ? "border-cyan-400"
              : "border-amber-400/20 focus:border-amber-400"
          }`}
        />
      </div>
    </div>
  );
}
