"use client";

export default function TankRecommendationCard({ analysis, plan }: { analysis:any, plan:any }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-amber-300">Recommended Tank & System</h3>
      {!analysis && <p className="text-gray-400">No analysis data available. Run analysis first.</p>}

      {analysis && (
        <div className="mt-3">
          <p className="text-gray-300">Suggested Tank Size: <strong>{analysis.tankSize ?? "—"} L</strong></p>
          <p className="text-gray-400 mt-2">Suggested Tank Type: <strong>{plan?.tankType ?? "RCC / Plastic (TBD by model)"}</strong></p>
          <p className="text-gray-500 mt-2 italic text-sm">Reason: Placeholder explanation generated from analysis.</p>
        </div>
      )}
    </div>
  );
}
