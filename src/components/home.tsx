import React from "react";
import { ChevronRight, Calendar } from "lucide-react";
import LotDetails from "./parking/LotDetails";
import WeeklyEvents from "./parking/WeeklyEvents";
import { ThemeToggle } from "./theme-toggle";

interface ParkingLot {
  id: string;
  name: string;
  available: number;
  total: number;
}

const lots: ParkingLot[] = [
  { id: "a", name: "Bayliss Parking", available: 4, total: 600 },
  { id: "b", name: "Reid Library", available: 100, total: 600 },
  { id: "c", name: "EZONE Lot A", available: 380, total: 400 },
];

function Home() {
  const [selectedLot, setSelectedLot] = React.useState<ParkingLot | null>(null);
  const [showingEvents, setShowingEvents] = React.useState(false);

  const getColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100;
    if (percentage >= 85) return "text-red-600";
    if (percentage >= 60) return "text-[#DAAA00]";
    return "text-green-500";
  };

  if (selectedLot) {
    return (
      <LotDetails
        lot={{ ...selectedLot }}
        onBack={() => setSelectedLot(null)}
      />
    );
  }

  if (showingEvents) {
    return <WeeklyEvents onBack={() => setShowingEvents(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-md mx-auto flex flex-col px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-[#003087] dark:text-white -tracking-[0.02em]">
            Parking Status
          </h1>
          <div className="flex gap-3">
            <ThemeToggle />
            <button
              onClick={() => setShowingEvents(true)}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#003087]/5 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <Calendar className="h-5 w-5 text-[#003087] dark:text-white" />
            </button>
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=UWA"
              alt="UWA Logo"
              className="h-8 w-8 rounded-full bg-[#003087]"
            />
          </div>
        </div>

        {lots.map((lot) => (
          <div
            key={lot.id}
            className="flex items-center justify-between p-4 cursor-pointer
                     bg-white dark:bg-gray-800 border border-[#003087]/5 dark:border-white/5
                     rounded-[18px] shadow-[0_8px_32px_rgba(0,48,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                     hover:bg-[#003087]/[0.02] dark:hover:bg-white/[0.02] transition-all duration-300
                     active:scale-[0.98]"
            onClick={() => setSelectedLot(lot)}
          >
            <div className="space-y-1">
              <span className="text-[17px] font-semibold text-[#003087] dark:text-white">
                {lot.name}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getColor(
                    lot.available,
                    lot.total,
                  ).replace("text-", "bg-")}`}
                />
                <span className="text-[15px] text-[#003087]/60 dark:text-white/60">
                  {lot.available} / {lot.total} spots available
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-[17px] font-semibold ${getColor(
                  lot.available,
                  lot.total,
                )}`}
              >
                {Math.round(((lot.total - lot.available) / lot.total) * 100)}%
              </span>
              <ChevronRight className="h-5 w-5 text-[#003087]/30 dark:text-white/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
