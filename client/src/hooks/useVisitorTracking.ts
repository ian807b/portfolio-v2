import { useCallback, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { trackVisitor, getVisitorCount } from "@/lib/api";
import type { VisitorStats } from "@/types";

/**
 * Hook for visitor tracking. Tracks page views and provides visitor count data.
 */
export function useVisitorTracking() {
  const hasTracked = useRef(false);

  // Query for visitor count (public, cached)
  const {
    data: stats,
    isLoading,
  } = useQuery<VisitorStats>({
    queryKey: ["visitorCount"],
    queryFn: getVisitorCount,
    staleTime: 60 * 1000, // 1 minute
    retry: 1,
  });

  // Mutation for tracking a page view
  const trackMutation = useMutation({
    mutationFn: trackVisitor,
  });

  const trackPageView = useCallback(
    (path: string) => {
      // Only track once per session per path
      if (hasTracked.current) return;
      hasTracked.current = true;

      trackMutation.mutate(path);
    },
    [trackMutation]
  );

  // Track session duration via sendBeacon on unload
  useEffect(() => {
    const startTime = Date.now();

    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      const data = JSON.stringify({ path: window.location.pathname, duration });
      navigator.sendBeacon("/api/visitors/duration", data);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return {
    trackPageView,
    visitorCount: stats?.totalVisitors ?? 0,
    todayVisitors: stats?.todayVisitors ?? 0,
    isLoading,
  };
}
