"use client";

export default function TimelineAndTasksBoard({ plan }: { plan?: any }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-amber-300">Installation Roadmap</h3>
      <ol className="mt-3 list-decimal list-inside text-gray-300">
        <li>Site inspection & load check</li>
        <li>Tank procurement</li>
        <li>Filtration & first-flush installation</li>
        <li>Piping & overflow/recharge setup</li>
        <li>Testing & commissioning</li>
      </ol>
    </div>
  );
}
