"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";

interface FreeTrialCounterProps {
  apiLimit: number | null;
}
const FreeTrialCounter = ({ apiLimit = 0 }: FreeTrialCounterProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return <div className="px-3">
    
    <Card className="bg-white/30 border-0">
      <CardContent className="py-6">
        <div className="text-center text-sm  mb-4 space-y-2"></div>
      </CardContent>
    </Card>
  </div>;
};

export default FreeTrialCounter;
