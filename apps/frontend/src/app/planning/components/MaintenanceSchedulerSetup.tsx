"use client";

export default function MaintenanceSchedulerSetup({ plan }: { plan?: any }) {
  return (
    <div>
      <h4 className="font-semibold">Maintenance Scheduler</h4>
      <p className="text-gray-400 text-sm">Link this plan to O&M module to create maintenance reminders and logs.</p>
    </div>
  );
}
