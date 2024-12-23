import React from "react";
import { ChevronRight } from "lucide-react";
import LotDetails from "./parking/LotDetails";

interface ParkingLot {
  id: string;
  name: string;
  available: number;
  total: number;
}

const defaultLots: ParkingLot[] = [
  { id: "a", name: "Structure A", available: 4, total: 600 },
  { id: "b", name: "Structure B", available: 100, total: 600 },
  { id: "c", name: "Visitor Lot", available: 380, total: 400 },
];

function Home() {
  const [selectedLot, setSelectedLot] = React.useState<ParkingLot | null>(null);

  const getColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100;
    if (percentage >= 85) return "text-[#FF453A]";
    if (percentage >= 60) return "text-[#FFD60A]";
    return "text-[#30D158]";
  };

  if (selectedLot) {
    return <LotDetails lot={selectedLot} onBack={() => setSelectedLot(null)} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#F2F2F7]">
      <div className="max-w-md mx-auto flex flex-col px-4 py-8 space-y-4">
        <h1 className="text-[32px] font-bold text-[#1C1C1E] -tracking-[0.02em]">
          Parking Status
        </h1>

        {defaultLots.map((lot) => (
          <div
            key={lot.id}
            className="flex items-center justify-between p-4 cursor-pointer
                       bg-white/60 backdrop-blur-xl border border-white/20
                       rounded-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]
                       hover:bg-white/80 transition-all duration-300
                       active:scale-[0.98]"
            onClick={() => setSelectedLot(lot)}
          >
            <div className="space-y-1">
              <span className="text-[17px] font-semibold text-[#1C1C1E]">
                {lot.name}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getColor(lot.available, lot.total).replace("text-", "bg-")}`}
                />
                <span className="text-[15px] text-[#1C1C1E]/60">
                  {lot.available} spots available
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-[17px] font-semibold ${getColor(lot.available, lot.total)}`}
              >
                {Math.round((lot.available / lot.total) * 100)}%
              </span>
              <ChevronRight className="h-5 w-5 text-[#1C1C1E]/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
