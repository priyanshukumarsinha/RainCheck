"use client";

export default function VendorRecommendationPanel({ analysis, plan }: { analysis?:any, plan?:any }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-amber-300">Vendors & Suppliers</h3>
      <p className="text-gray-400 mt-2">This panel lists recommended installers, tank suppliers, and contractors (mock data).</p>
      <ul className="mt-3 list-disc list-inside text-gray-300">
        <li>Local Installer A — Contact: 99999 00000</li>
        <li>Tank Supplier B — Contact: 88888 11111</li>
      </ul>
    </div>
  );
}
