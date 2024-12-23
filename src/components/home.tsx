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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const getColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100;
    if (percentage >= 85) return "text-red-600";
    if (percentage >= 60) return "text-[#DAAA00]";
    return "text-green-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#003087] flex items-center justify-center">
        <div className="text-center space-y-4">
          <img
            src="https://www.web.uwa.edu.au/__data/assets/image/0003/3525195/UWA-Full-Ver-CMYK-White.png"
            alt="UWA Logo"
            className="w-48 mx-auto"
          />
          <h2 className="text-white/90 text-xl font-medium">Campus Parking</h2>
        </div>
      </div>
    );
  }

  if (selectedLot) {
    return <LotDetails lot={selectedLot} onBack={() => setSelectedLot(null)} />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-md mx-auto flex flex-col px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-[#003087] -tracking-[0.02em]">
            Parking Status
          </h1>
          <img
            src="https://www.web.uwa.edu.au/__data/assets/image/0003/3525195/UWA-Full-Ver-CMYK-White.png"
            alt="UWA Logo"
            className="h-8"
          />
        </div>

        {defaultLots.map((lot) => (
          <div
            key={lot.id}
            className="flex items-center justify-between p-4 cursor-pointer
                       bg-white border border-[#003087]/5
                       rounded-[18px] shadow-[0_8px_32px_rgba(0,48,135,0.04)]
                       hover:bg-[#003087]/[0.02] transition-all duration-300
                       active:scale-[0.98]"
            onClick={() => setSelectedLot(lot)}
          >
            <div className="space-y-1">
              <span className="text-[17px] font-semibold text-[#003087]">
                {lot.name}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getColor(lot.available, lot.total).replace("text-", "bg-")}`}
                />
                <span className="text-[15px] text-[#003087]/60">
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
              <ChevronRight className="h-5 w-5 text-[#003087]/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
