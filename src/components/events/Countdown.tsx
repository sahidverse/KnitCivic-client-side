"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

interface CountdownProps {
  eventDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function AnimatedTimeUnit({ value, label }: TimeUnitProps) {
  const formattedValue = String(value).padStart(2, "0");

  const [displayed, setDisplayed] = useState(formattedValue);
  const [previous, setPrevious] = useState(formattedValue);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (formattedValue === displayed) return;

    setPrevious(displayed);
    setFlipping(true);

    const timer = setTimeout(() => {
      setDisplayed(formattedValue);
      setFlipping(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [formattedValue, displayed]);

  return (
    <div className="flex min-w-[64px] flex-col items-center gap-1.5">
      <div className="flip-clock">
        {!flipping ? (
          <div className="flip-static">{displayed}</div>
        ) : (
          <>
            <div className="flip-half flip-out">{previous}</div>

            <div className="flip-half flip-in">{formattedValue}</div>
          </>
        )}
      </div>

      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export default function Countdown({ eventDate }: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = new Date(eventDate).getTime() - Date.now();

    if (!Number.isFinite(difference) || difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!timeLeft) {
    return (
      <div className="flex items-center gap-2 text-sm font-semibold text-[#FF3475]">
        <Clock3 className="size-4" />
        Event Started
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      {/* Countdown Heading */}
      <div className="flex items-center gap-2">
        <Clock3 className="size-4 text-[#FF3475]" />

        <span className="text-sm font-semibold text-foreground">
          Event Starts In
        </span>
      </div>

      {/* Countdown Units */}
      <div className="flex items-start gap-2">
        {units.map((unit) => (
          <AnimatedTimeUnit
            key={unit.label}
            value={unit.value}
            label={unit.label}
          />
        ))}
      </div>
    </div>
  );
}
