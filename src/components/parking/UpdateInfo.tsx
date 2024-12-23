import React from "react";
import { Clock } from "lucide-react";

interface UpdateInfoProps {
  lastUpdated: Date;
  nextRefresh?: Date;
  className?: string;
}

const UpdateInfo = ({
  lastUpdated,
  nextRefresh,
  className = "",
}: UpdateInfoProps) => {
  const [, setForceUpdate] = React.useState(0);

  React.useEffect(() => {
    // Update every second to keep the relative time fresh
    const intervalId = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // difference in seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const formatNextRefresh = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((date.getTime() - now.getTime()) / 1000); // difference in seconds

    if (diff <= 0) return "any moment";
    if (diff < 60) return `${diff}s`;
    return `${Math.ceil(diff / 60)}m`;
  };

  return (
    <div
      className={`flex items-center gap-1.5 text-[13px] text-[#003087]/60 ${className}`}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>
        Updated {formatLastUpdated(lastUpdated)}
        {nextRefresh && ` · Next update in ${formatNextRefresh(nextRefresh)}`}
      </span>
    </div>
  );
};

export default UpdateInfo;
