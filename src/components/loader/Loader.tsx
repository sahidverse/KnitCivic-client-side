"use client";
import React, { useEffect, useState } from "react";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force a 5-second artificial delay when the website starts up
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  // Once loading completes, render the actual website layout/content
  return <>{children}</>;
}
