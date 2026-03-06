"use client";

import { useState, useMemo, useCallback } from "react";
import { calcMonthlyPayment, calcAmortizationSchedule, formatMAD } from "@/lib/finance";

interface SimulatorState {
  amount: number;
  rate: number;
  duration: number; // in years
}

export function useSimulator(defaults: SimulatorState) {
  const [state, setState] = useState(defaults);

  const months = state.duration * 12;

  const monthlyPayment = useMemo(
    () => calcMonthlyPayment(state.amount, state.rate, months),
    [state.amount, state.rate, months]
  );

  const totalCost = useMemo(
    () => Math.round(monthlyPayment * months * 100) / 100,
    [monthlyPayment, months]
  );

  const totalInterest = useMemo(
    () => Math.round((totalCost - state.amount) * 100) / 100,
    [totalCost, state.amount]
  );

  const schedule = useMemo(
    () => calcAmortizationSchedule(state.amount, state.rate, months),
    [state.amount, state.rate, months]
  );

  const setAmount = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, amount }));
  }, []);

  const setRate = useCallback((rate: number) => {
    setState((prev) => ({ ...prev, rate }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setState((prev) => ({ ...prev, duration }));
  }, []);

  return {
    ...state,
    months,
    monthlyPayment,
    totalCost,
    totalInterest,
    schedule,
    setAmount,
    setRate,
    setDuration,
    formatted: {
      monthlyPayment: formatMAD(monthlyPayment),
      totalCost: formatMAD(totalCost),
      totalInterest: formatMAD(totalInterest),
      amount: formatMAD(state.amount),
    },
  };
}
