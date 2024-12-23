import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WeeklyEventsProps {
  onBack: () => void;
}

const WeeklyEvents = ({ onBack }: WeeklyEventsProps) => {
  // Mock events data - in a real app this would come from an API
  const events = [
    {
      id: 1,
      name: "Open Day",
      date: "Mon, 15 July",
      time: "9:00 AM - 4:00 PM",
      location: "Entire Campus",
      expectedAttendance: 5000,
      impactedLots: [
        { name: "Bayliss Parking", expectedOccupancy: 95 },
        { name: "Reid Library", expectedOccupancy: 90 },
        { name: "EZONE Lot A", expectedOccupancy: 100 },
      ],
    },
    {
      id: 2,
      name: "Engineering Career Fair",
      date: "Wed, 17 July",
      time: "10:00 AM - 2:00 PM",
      location: "EZONE",
      expectedAttendance: 800,
      impactedLots: [
        { name: "EZONE Lot A", expectedOccupancy: 100 },
        { name: "Bayliss Parking", expectedOccupancy: 75 },
      ],
    },
    {
      id: 3,
      name: "Graduation Ceremony",
      date: "Fri, 19 July",
      time: "2:00 PM - 5:00 PM",
      location: "Winthrop Hall",
      expectedAttendance: 1200,
      impactedLots: [
        { name: "Reid Library", expectedOccupancy: 95 },
        { name: "Bayliss Parking", expectedOccupancy: 85 },
      ],
    },
  ];

  const getImpactColor = (occupancy: number) => {
    if (occupancy >= 90) return "text-red-600";
    if (occupancy >= 75) return "text-[#DAAA00]";
    return "text-green-500";
  };

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
              Upcoming Events
            </h1>
            <p className="text-[15px] text-[#003087]/60">Next 7 days</p>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="p-4 space-y-4 bg-white border-[#003087]/5 shadow-[0_8px_32px_rgba(0,48,135,0.04)]"
            >
              <div className="space-y-2">
                <h3 className="text-[17px] font-semibold text-[#003087]">
                  {event.name}
                </h3>
                <div className="flex items-start gap-3 text-[13px] text-[#003087]/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.expectedAttendance.toLocaleString()} expected
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[15px] font-medium text-[#003087]">
                  Parking Impact
                </h4>
                <div className="space-y-2">
                  {event.impactedLots.map((lot) => (
                    <div key={lot.name} className="space-y-1">
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-[#003087]/80">{lot.name}</span>
                        <span
                          className={`font-medium ${getImpactColor(lot.expectedOccupancy)}`}
                        >
                          {lot.expectedOccupancy}% expected
                        </span>
                      </div>
                      <Progress
                        value={lot.expectedOccupancy}
                        className="h-1"
                        indicatorClassName={getImpactColor(
                          lot.expectedOccupancy,
                        ).replace("text-", "bg-")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyEvents;
