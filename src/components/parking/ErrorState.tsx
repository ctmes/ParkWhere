import React from "react";
import { WifiOff, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

const ErrorState = ({
  message = "Unable to connect to parking services",
  onRetry,
  isRetrying = false,
}: ErrorStateProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 py-8 space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <WifiOff className="h-8 w-8 text-red-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#003087]">
            Connection Error
          </h2>
          <p className="text-[15px] text-[#003087]/60">{message}</p>
        </div>
        <Button
          onClick={onRetry}
          disabled={isRetrying}
          className="bg-[#003087] hover:bg-[#003087]/90 text-white"
        >
          <RefreshCcw
            className={`h-4 w-4 mr-2 ${isRetrying ? "animate-spin" : ""}`}
          />
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
