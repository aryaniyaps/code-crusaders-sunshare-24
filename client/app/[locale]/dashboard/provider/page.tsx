"use client";

import ProviderDashboard from "@/components/dashboard/provider/provider-dashboard";
import useCurrentSession from "@/lib/hooks/useCurrentSession";
import { useRouter } from "@/lib/navigation";
import { useEffect } from "react";

export default function ProviderDashBoardPage() {
  const { data: session } = useCurrentSession();

  const router = useRouter();

  useEffect(() => {
    if (session && !session.identity?.traits.isProvider) {
      //  TODO: redirect
      return router.replace("/dashboard/consumer");
    }
  }, [session]);

  if (!session) return null;

  return <ProviderDashboard />;
}
