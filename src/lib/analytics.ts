/**
 * Analytics helper — wraps Plausible custom events + internal tracking
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

function trackPlausible(event: string, props?: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }
}

function trackInternal(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      props,
      page: window.location.pathname,
    }),
  }).catch(() => {});
}

export function trackLeadCapture(source: string, product: string) {
  trackPlausible("LeadCapture", { source, product });
  trackInternal("lead_capture", { source, product });
}

export function trackSimulation(type: string) {
  trackPlausible("Simulation", { type });
  trackInternal("simulation", { type });
}

export function trackProContact(method: "whatsapp" | "phone" | "form", proSlug?: string) {
  trackPlausible("ProContact", { method, pro: proSlug || "unknown" });
  trackInternal("pro_contact", { method, proSlug });
}

export function trackToolUsage(tool: string) {
  trackPlausible("ToolUsage", { tool });
  trackInternal("tool_usage", { tool });
}

export function trackComparatorStep(step: number, product?: string) {
  trackPlausible("ComparatorStep", { step: String(step), product: product || "" });
  trackInternal("comparator_step", { step, product });
}
