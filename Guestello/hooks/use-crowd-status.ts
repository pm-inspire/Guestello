"use client";

import { useEffect, useState } from "react";

const statuses = ["low", "medium", "high"] as const;

export function useCrowdStatus(initial: "low" | "medium" | "high") {
  const [status, setStatus] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => {
        const nextIndex =
          (statuses.indexOf(prev) + 1 + Math.floor(Math.random() * 2)) %
          statuses.length;
        return statuses[nextIndex];
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return status;
}
