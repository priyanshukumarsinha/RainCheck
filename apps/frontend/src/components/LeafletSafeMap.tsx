"use client";

import dynamic from "next/dynamic";

// Dynamically import only the MapContainer (client-side only)
export const LeafletSafeMap = dynamic(
  () => import("./LeafletMapCore"),
  { ssr: false }
);
