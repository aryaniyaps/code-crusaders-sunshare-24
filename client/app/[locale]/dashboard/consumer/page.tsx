"use client";

import ConsumerDashboard from "@/components/dashboard/consumer/consumer-dashboard";
import useCurrentSession from "@/lib/hooks/useCurrentSession";
import { useRouter } from "@/lib/navigation";
import { useEffect } from "react";

export default function ConsumerDashBoardPage() {
  const { data: session } = useCurrentSession();

  const router = useRouter();

  useEffect(() => {
    if (session && session.identity?.traits.isProvider) {
      //  TODO: redirect
      return router.replace("/dashboard/provider");
    }
  }, [session]);

  if (!session) return null;

  return <ConsumerDashboard />;
}
