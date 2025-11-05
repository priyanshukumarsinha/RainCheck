"use client";

export default function BudgetEstimator({ analysis, plan }: { analysis?: any, plan?: any }) {
  return (
    <div>
      <h4 className="font-semibold">Budget Estimate</h4>
      <p className="text-gray-300">Estimated installation cost: <strong>₹{analysis?.economicAnalysis?.installationCost ?? "—"}</strong></p>
      <p className="text-sm text-gray-500">Detailed breakdown will be provided by the model.</p>
    </div>
  );
}
