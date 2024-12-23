import React from "react";
import {
  ArrowLeft,
  Users,
  Clock,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface LotDetailsProps {
  lot: {
    id: string;
    name: string;
    available: number;
    total: number;
    activeViewers?: number;
    predictions?: {
      time: string;
      predicted: number;
    }[];
  };
  onBack: () => void;
}

const LotDetails = ({ lot, onBack }: LotDetailsProps) => {
  const defaultPredictions = [
    { time: "1 hour", predicted: lot.total - lot.available - 20 },
    { time: "2 hours", predicted: lot.total - lot.available - 50 },
    { time: "3 hours", predicted: lot.total - lot.available + 30 },
  ];

  const predictions = lot.predictions || defaultPredictions;
  const activeViewers = lot.activeViewers || 12;

  const getColor = (used: number) => {
    const percentage = (used / lot.total) * 100;
    if (percentage >= 85) return "bg-[#FF453A]";
    if (percentage >= 60) return "bg-[#FFD60A]";
    return "bg-[#30D158]";
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F2F7]">
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#007AFF]" />
          </button>
          <h1 className="text-[32px] font-bold text-[#1C1C1E] -tracking-[0.02em]">
            {lot.name}
          </h1>
        </div>

        {/* Current Status */}
        <Card className="p-4 space-y-4 bg-white/60 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center">
            <span className="text-[22px] font-semibold -tracking-[0.02em]">
              {lot.available}
              <span className="text-[#1C1C1E]/60 text-[17px] ml-1.5">
                spots left
              </span>
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#007AFF]/10 rounded-full">
              <Users className="h-4 w-4 text-[#007AFF]" />
              <span className="text-[13px] font-medium text-[#007AFF]">
                {activeViewers} viewing
              </span>
            </div>
          </div>
          <Progress
            value={((lot.total - lot.available) / lot.total) * 100}
            className="h-2"
            indicatorClassName={getColor(lot.total - lot.available)}
          />
        </Card>

        {/* Predictions */}
        <div className="space-y-4">
          <h2 className="text-[17px] font-semibold text-[#1C1C1E]">
            Predicted Availability
          </h2>
          {predictions.map((pred, i) => (
            <Card
              key={i}
              className="p-4 space-y-3 bg-white/60 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1C1C1E]/40" />
                  <span className="text-[15px] text-[#1C1C1E]/80">
                    In {pred.time}
                  </span>
                </div>
                <span className="text-[15px] font-medium">
                  {pred.predicted} spots
                </span>
              </div>
              <Progress
                value={(pred.predicted / lot.total) * 100}
                className="h-1.5"
                indicatorClassName={getColor(pred.predicted)}
              />
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-[17px] font-semibold text-[#1C1C1E]">
            Quick Actions
          </h2>
          <Card className="divide-y divide-black/5 bg-white/60 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <button className="w-full flex items-center justify-between p-4 hover:bg-black/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-[#007AFF]" />
                </div>
                <span className="text-[15px] font-medium">
                  View Historical Data
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#1C1C1E]/30" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-black/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#30D158]/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-[#30D158]" />
                </div>
                <span className="text-[15px] font-medium">
                  Set Availability Alert
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#1C1C1E]/30" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LotDetails;
