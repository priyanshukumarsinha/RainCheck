"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useFeasibility } from "../context/FeasibilityContext";
import RainfallDataCard from "../ui/RainfallDataCard";
import { mockRainfallData } from "../mock/mockRainfallData";

// Dynamic import for map (no SSR)
const MapWithPolygon = dynamic(() => import("../ui/MapWithPolygon"), {
  ssr: false,
});

export default function LocationAndMapSection() {
  const { input, setInput } = useFeasibility();

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [rainfallData, setRainfallData] = useState<any>(mockRainfallData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [roofArea, setRoofArea] = useState<number | null>(null);

  /** 🌍 Handle location access */
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setPermissionGranted(true);
        setLoading(false);

        // Optionally use reverse geocoding (mock for now)
        const mockCity = "Noida";
        const mockRainfall = 850;

        setRainfallData({
          city: mockCity,
          annualRainfall: mockRainfall,
          source: "Mock dataset",
          lastYear: 870,
        });

        // Update context
        setInput((prev: any) => ({
          ...prev,
          city: mockCity,
          annualRainfall_mm: mockRainfall,
        }));
      },
      (err) => {
        console.error("Location error:", err);
        setError("Unable to retrieve your location. Showing mock data.");
        setPermissionGranted(false);
        setLoading(false);

        // Fallback: Use mock rainfall + city
        setInput((prev: any) => ({
          ...prev,
          city: mockRainfallData.city,
          annualRainfall_mm: mockRainfallData.annualRainfall,
        }));
      }
    );
  };

  /** 🗺️ Handle roof area updates from the map polygon (optional) */
  const handlePolygonAreaChange = (area_m2: number) => {
    setRoofArea(area_m2);
    setInput((prev: any) => ({
      ...prev,
      roofArea_m2: area_m2,
    }));
  };

  /** 🔄 Auto-fetch location if permission already granted */
  useEffect(() => {
    if (navigator.geolocation && navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((result) => {
          if (result.state === "granted") {
            setPermissionGranted(true);
            navigator.geolocation.getCurrentPosition((pos) => {
              const coords = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              };
              setUserLocation(coords);
              setInput((prev: any) => ({
                ...prev,
                city: "Bengaluru",
                annualRainfall_mm: 950,
              }));
            });
          }
        })
        .catch(() => {
          console.warn("Permission API not available");
        });
    }
  }, []);

  return (
    <section id="location" className="space-y-8 px-6 text-gray-300">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-400">
          1. Identify Your Location
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Pin your house or draw a polygon around your rooftop to calculate your catchment area.
          RainCheck automatically fetches rainfall data based on your location — or uses mock data if unavailable.
        </p>
      </div>

      {/* Map + Buttons */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-center gap-3">
          <button
            onClick={handleUseMyLocation}
            className="px-4 py-2 rounded-md border border-amber-400 text-amber-400 text-sm hover:bg-amber-400 hover:text-black transition-colors"
            disabled={loading}
          >
            {loading ? "Locating..." : "Use My Current Location"}
          </button>
          <button
            onClick={() => alert("Roof drawing feature coming soon!")}
            className="px-4 py-2 rounded-md border border-cyan-400 text-cyan-400 text-sm hover:bg-cyan-400 hover:text-black transition-colors"
          >
            Draw Roof Area
          </button>
        </div>

        {error && (
          <p className="text-center text-sm text-amber-400">
            {error}
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden border border-gray-800"
        >
          <MapWithPolygon onAreaChange={handlePolygonAreaChange} />
        </motion.div>

        <p className="text-center text-xs text-gray-500">
          You can pan, zoom, or redraw anytime.
        </p>
      </div>

      {/* Rainfall Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <RainfallDataCard
          rainfall={rainfallData}
          locationGranted={permissionGranted && !!userLocation}
        />
      </motion.div>

      {/* Summary Text */}
      {roofArea && (
        <p className="text-center text-sm text-gray-400">
          ✅ Roof area captured: <span className="text-amber-300">{roofArea.toFixed(1)} m²</span>
        </p>
      )}
    </section>
  );
}
