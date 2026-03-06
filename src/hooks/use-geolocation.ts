"use client";

import { useState, useEffect } from "react";
import { CITIES } from "@/lib/constants";

interface GeolocationResult {
  citySlug: string | null;
  cityName: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Auto-detect user's nearest Moroccan city using GPS
 * Falls back to null if permission denied or not available
 */
export function useGeolocation(): GeolocationResult {
  const [result, setResult] = useState<GeolocationResult>({
    citySlug: null,
    cityName: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setResult({
        citySlug: null,
        cityName: null,
        loading: false,
        error: "Géolocalisation non supportée",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Find nearest city
        let nearestCity: (typeof CITIES)[number] = CITIES[0];
        let minDistance = Infinity;

        for (const city of CITIES) {
          const dist = Math.sqrt(
            Math.pow(city.lat - latitude, 2) +
              Math.pow(city.lng - longitude, 2)
          );
          if (dist < minDistance) {
            minDistance = dist;
            nearestCity = city;
          }
        }

        setResult({
          citySlug: nearestCity.slug,
          cityName: nearestCity.nameFr,
          loading: false,
          error: null,
        });
      },
      () => {
        setResult({
          citySlug: null,
          cityName: null,
          loading: false,
          error: null, // Silently fail — geo is optional
        });
      },
      { timeout: 5000, maximumAge: 300000 }
    );
  }, []);

  return result;
}
