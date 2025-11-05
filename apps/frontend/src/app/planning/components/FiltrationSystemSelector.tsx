"use client";

export default function FiltrationSystemSelector({ plan }: { plan?: any }) {
  return (
    <div>
      <h4 className="font-semibold">Filtration & Pretreatment</h4>
      <ul className="mt-2 text-gray-300 list-disc list-inside">
        <li>First-flush diverter</li>
        <li>Sand / gravel filter</li>
        <li>Leaf screen and coarse mesh</li>
        <li>Optional UV / cartridge for potable use</li>
      </ul>
      <p className="text-sm text-gray-500 mt-2">Select components based on intended use and budget.</p>
    </div>
  );
}
