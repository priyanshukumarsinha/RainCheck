"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject } from "geojson";
import type L from "leaflet";

// Disable SSR for react-leaflet
const MapContainer = dynamic(
  async () => (await import("react-leaflet")).MapContainer,
  { ssr: false }
);
const TileLayer = dynamic(
  async () => (await import("react-leaflet")).TileLayer,
  { ssr: false }
);
const GeoJSON = dynamic(
  async () => (await import("react-leaflet")).GeoJSON,
  { ssr: false }
);

// ✅ Water data for each state
const stateData: Record<
  string,
  { rainfall: number; stress: number; population: string }
> = {
  Maharashtra: { rainfall: 950, stress: 72, population: "123M" },
  Gujarat: { rainfall: 820, stress: 68, population: "70M" },
  Rajasthan: { rainfall: 530, stress: 85, population: "81M" },
  Karnataka: { rainfall: 970, stress: 60, population: "68M" },
  TamilNadu: { rainfall: 960, stress: 58, population: "76M" },
  Kerala: { rainfall: 3000, stress: 30, population: "35M" },
  Punjab: { rainfall: 650, stress: 74, population: "30M" },
  Bihar: { rainfall: 1100, stress: 66, population: "124M" },
  WestBengal: { rainfall: 1750, stress: 55, population: "102M" },
  UttarPradesh: { rainfall: 960, stress: 70, population: "231M" },
  MadhyaPradesh: { rainfall: 1180, stress: 62, population: "85M" },
};

// Normalize names for matching (handles spaces, punctuation, etc.)
const normalizeName = (name: string) =>
  name ? name.replace(/\s+/g, "").replace(/[^\w]/g, "").toLowerCase() : "";

// Get color based on water stress
const getColor = (stress: number) =>
  stress > 80
    ? "#EF4444"
    : stress > 65
    ? "#F59E0B"
    : stress > 50
    ? "#FCD34D"
    : "#4ADE80";

// Generate random fallback data for missing states
const randomData = () => ({
  stress: Math.floor(Math.random() * 40) + 45,
  rainfall: Math.floor(Math.random() * 1500) + 600,
  population: `${Math.floor(Math.random() * 80) + 20}M`,
});

export default function LeafletMapCore() {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [geojsonRef, setGeojsonRef] = useState<L.GeoJSON<any> | null>(null);

  // Load GeoJSON
  useEffect(() => {
    fetch("/india_states.geojson")
      .then((r) => r.json())
      .then((data) => {setGeoData(data); console.log(data);})
      .catch((e) => console.error("Failed to load GeoJSON", e));
  }, []);

  const style = (feature: any) => {
    const name = feature.properties?.NAME_1;
    const key = normalizeName(name);
    const data =
      Object.entries(stateData).find(
        ([k]) => normalizeName(k) === key
      )?.[1] || randomData();
    return {
      fillColor: getColor(data.stress),
      weight: 1,
      color: "#222",
      fillOpacity: 0.8,
    };
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const name = feature.properties?.NAME_1;
    const key = normalizeName(name);
    const data =
      Object.entries(stateData).find(
        ([k]) => normalizeName(k) === key
      )?.[1] || randomData();

    layer.bindTooltip(
      `
        <div style="font-family:Inter;padding:6px 8px;">
          <strong style="color:#FFD580;font-size:15px;">${name}</strong><br/>
          🌧️ Rainfall: ${data.rainfall} mm/yr<br/>
          💧 Water Stress: ${data.stress}%<br/>
          👥 Population: ${data.population}
        </div>
      `,
      {
        sticky: true,
        direction: "top",
        className: "custom-tooltip",
      }
    );

    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          weight: 2,
          color: "#FFD580",
          fillOpacity: 1,
        });
      },
      mouseout: (e) => {
        if (geojsonRef) geojsonRef.resetStyle(e.target);
      },
    });
  };

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-lg border border-[#2a2a2a] bg-[#0B0B0C]">
      {geoData ? (
        <MapContainer
          center={[22.5, 79]}
          zoom={5}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <GeoJSON
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
            ref={setGeojsonRef}
          />
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-400">
          Loading water stress map...
        </div>
      )}

      {/* ✅ Floating Legend */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="absolute bottom-4 right-4 bg-[#111]/80 backdrop-blur-sm rounded-xl p-3 text-xs text-gray-300 shadow-md border border-[#333] z-[1000]"
>
  <div className="font-semibold text-gray-100 mb-1">
    Water Stress Level
  </div>
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
