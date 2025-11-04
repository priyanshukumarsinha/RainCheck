"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject } from "geojson";

// ✅ Dynamic imports disable SSR for Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((m) => m.GeoJSON),
  { ssr: false }
);

// ✅ Sample state-wise data
interface StateData {
  [key: string]: {
    rainfall: number;
    stress: number;
    population: string;
  };
}

const stateData: StateData = {
  Maharashtra: { rainfall: 950, stress: 72, population: "123M" },
  Gujarat: { rainfall: 820, stress: 68, population: "70M" },
  Rajasthan: { rainfall: 530, stress: 85, population: "81M" },
  Karnataka: { rainfall: 970, stress: 60, population: "68M" },
  TamilNadu: { rainfall: 960, stress: 58, population: "76M" },
  Kerala: { rainfall: 3000, stress: 30, population: "35M" },
  Punjab: { rainfall: 650, stress: 74, population: "30M" },
  Bihar: { rainfall: 1100, stress: 66, population: "124M" },
  WestBengal: { rainfall: 1750, stress: 55, population: "102M" },
};

// ✅ Water stress color logic
const getColor = (stress: number) =>
  stress > 80
    ? "#EF4444" // severe
    : stress > 65
    ? "#F59E0B" // high
    : stress > 50
    ? "#FCD34D" // moderate
    : "#4ADE80"; // low

export default function LeafletMapClient() {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);

  // ✅ Load GeoJSON from public folder
  useEffect(() => {
    fetch("/india_state.geojson")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load GeoJSON");
        return r.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading GeoJSON:", err));
  }, []);

  if (!geoData)
    return (
      <div className="text-center text-gray-400 py-10 animate-pulse">
        Loading map...
      </div>
    );

  // ✅ Define style per state
  const style = (feature: any) => {
    const name = feature.properties?.st_nm;
    const stress = stateData[name]?.stress || 40;
    return {
      fillColor: getColor(stress),
      weight: 1,
      color: "#1f1f1f",
      fillOpacity: 0.8,
    };
  };

  // ✅ Define tooltip + hover behaviour
  const onEachFeature = (feature: any, layer: any) => {
    const name = feature.properties?.st_nm;
    const data = stateData[name];
    if (!data) return;

    const tooltipContent = `
      <div style="font-family:Inter;padding:6px 8px;line-height:1.4;">
        <strong style="color:#FFD580;font-size:15px;">${name}</strong><br/>
        🌧️ Rainfall: ${data.rainfall} mm/yr<br/>
        💧 Water Stress: ${data.stress}%<br/>
        👥 Population: ${data.population}
      </div>
    `;

    layer.bindTooltip(tooltipContent, {
      sticky: true,
      direction: "top",
      className: "custom-tooltip",
    });

    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "#FFD580",
          fillOpacity: 1,
        });
      },
      mouseout: (e: any) => {
        const layer = e.target;
        layer.setStyle(style(feature));
      },
    });
  };

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-lg border border-[#2a2a2a] bg-[#0B0B0C]">
      <MapContainer
        center={[22.5, 79]}
        zoom={5}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ backgroundColor: "#0B0B0C" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON data={geoData as any} style={style} onEachFeature={onEachFeature} />
      </MapContainer>

      {/* ✅ Floating legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-4 right-4 bg-[#111]/80 backdrop-blur-sm rounded-xl p-3 text-xs text-gray-300 shadow-md border border-[#333]"
      >
        <div className="font-semibold text-gray-100 mb-1">Water Stress Level</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#4ADE80]" /> Low
          <span className="w-3 h-3 rounded-sm bg-[#FCD34D]" /> Moderate
          <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" /> High
          <span className="w-3 h-3 rounded-sm bg-[#EF4444]" /> Severe
        </div>
      </motion.div>
    </div>
  );
}
