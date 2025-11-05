"use client";

export default function SubsidyEligibilityChecker({ analysis, plan }: { analysis:any, plan:any }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-amber-300">Subsidies & Incentives</h3>
      {analysis ? (
        <div className="mt-3 text-gray-300">
          <p>Eligibility (quick check): <strong>{analysis.economicAnalysis?.subsidyEligible ? "Likely eligible" : "Not eligible"}</strong></p>
          <p className="text-gray-400 mt-2 text-sm">Click the "View Details" below for scheme-by-scheme instructions.</p>
        </div>
      ) : (
        <p className="text-gray-400">Feasibility report required to determine subsidy eligibility.</p>
      )}
    </div>
  );
}
