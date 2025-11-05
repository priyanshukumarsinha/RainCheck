"use client";

export default function RiskWarnings({ analysis }: { analysis?: any }) {
  return (
    <div>
      <h4 className="font-semibold text-red-300">Risk & Safety Notes</h4>
      <ul className="mt-2 text-gray-300 list-disc list-inside">
        <li>Check rooftop structural load capacity before installing heavy tanks.</li>
        <li>Ensure mosquito-proofing and avoid stagnant water.</li>
        <li>Follow local plumbing codes for recharge works.</li>
      </ul>
    </div>
  );
}
