"use client";

import { useCounter } from "@/hooks/use-counter";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
}: AnimatedCounterProps) {
  const { count, ref } = useCounter(end, duration);

  return (
    <div className="text-center">
      <span ref={ref} className="block text-4xl md:text-5xl font-bold text-white">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="mt-2 block text-sm text-gray-300">{label}</span>
    </div>
  );
}
