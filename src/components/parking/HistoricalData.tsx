import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HistoricalDataProps {
  lot: {
    id: string;
    name: string;
    total: number;
  };
  onBack: () => void;
}

const HistoricalData = ({ lot, onBack }: HistoricalDataProps) => {
  // Mock historical data - in a real app this would come from an API
  const historicalData = [
    { time: "8 AM", used: Math.floor(lot.total * 0.3) },
    { time: "10 AM", used: Math.floor(lot.total * 0.7) },
    { time: "12 PM", used: Math.min(Math.floor(lot.total * 1.2), lot.total) }, // Over capacity
    { time: "2 PM", used: Math.floor(lot.total * 0.8) },
    { time: "4 PM", used: Math.floor(lot.total * 0.5) },
    { time: "6 PM", used: Math.floor(lot.total * 0.2) },
  ];

  const getQueueInfo = (used: number) => {
    const overflow = used - lot.total;
    return overflow > 0 ? overflow : 0;
  };

  const getColor = (used: number) => {
    const percentage = (used / lot.total) * 100;
    if (percentage <= 15) return "bg-red-600";
    if (percentage <= 40) return "bg-[#DAAA00]";
    return "bg-green-500";
  };

  const getTextColor = (used: number) => {
    const percentage = (used / lot.total) * 100;
    if (percentage >= 85) return "text-red-600";
    if (percentage >= 60) return "text-[#DAAA00]";
    return "text-green-500";
  };

  const peakUsage = Math.max(
    ...historicalData.map((d) => (d.used / lot.total) * 100),
  );
  const avgUsage = Math.round(
    historicalData.reduce(
      (acc, curr) => acc + (curr.used / lot.total) * 100,
      0,
    ) / historicalData.length,
  );
  const peakTime = historicalData.find(
    (d) => (d.used / lot.total) * 100 === peakUsage,
  )?.time;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#003087]/5 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#003087]" />
          </button>
          <div>
            <h1 className="text-[32px] font-bold text-[#003087] -tracking-[0.02em]">
              Historical Data
            </h1>
            <p className="text-[15px] text-[#003087]/60">{lot.name}</p>
          </div>
        </div>

        {/* Today's Overview */}
        <div className="space-y-4">
          <h2 className="text-[17px] font-semibold text-[#003087]">
            Today's Overview
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 space-y-1 bg-white border-[#003087]/5 shadow-[0_8px_32px_rgba(0,48,135,0.04)]">
              <span className="text-[13px] text-[#003087]/60">Peak Time</span>
              <p className="text-[15px] font-semibold text-[#003087]">
                {peakTime}
              </p>
            </Card>
            <Card className="p-3 space-y-1 bg-white border-[#003087]/5 shadow-[0_8px_32px_rgba(0,48,135,0.04)]">
              <span className="text-[13px] text-[#003087]/60">Peak Usage</span>
              <p
                className={`text-[15px] font-semibold ${getTextColor(Math.floor((peakUsage / 100) * lot.total))}`}
              >
                {Math.round(peakUsage)}%
              </p>
            </Card>
            <Card className="p-3 space-y-1 bg-white border-[#003087]/5 shadow-[0_8px_32px_rgba(0,48,135,0.04)]">
              <span className="text-[13px] text-[#003087]/60">Avg. Usage</span>
              <p
                className={`text-[15px] font-semibold ${getTextColor(Math.floor((avgUsage / 100) * lot.total))}`}
              >
                {avgUsage}%
              </p>
            </Card>
          </div>
        </div>

        {/* Hourly Breakdown */}
        <div className="space-y-4">
          <h2 className="text-[17px] font-semibold text-[#003087]">
            Hourly Breakdown
          </h2>
          {historicalData.map((data, i) => {
            const queueCount = getQueueInfo(data.used);
            return (
              <Card
                key={i}
                className="p-4 space-y-3 bg-white border-[#003087]/5 shadow-[0_8px_32px_rgba(0,48,135,0.04)]"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[15px] text-[#003087]/80">
                    {data.time}
                  </span>
                  <span
                    className={`text-[15px] font-medium ${getTextColor(data.used)}`}
                  >
                    {Math.round((data.used / lot.total) * 100)}% full
                    {queueCount > 0 ? (
                      <span className="text-red-600 ml-2">
                        ({queueCount} in queue)
                      </span>
                    ) : (
                      ` (${Math.max(0, lot.total - data.used)} spots)`
                    )}
                  </span>
                </div>
                <Progress
                  value={Math.min((data.used / lot.total) * 100, 100)}
                  className="h-1.5"
                  indicatorClassName={getColor(data.used)}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;
