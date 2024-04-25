"use client";

import useCurrentSession from "@/lib/hooks/useCurrentSession";
import { useRouter } from "@/lib/navigation";
import { useEffect } from "react";

export default function DashBoardPage() {
  const { data: session } = useCurrentSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (!session.identity?.traits.isProvider) {
        //  TODO: redirect
        return router.replace("/dashboard/provider");
      }
      router.replace("/dashboard/consumer");
    }
  }, [session]);
}
