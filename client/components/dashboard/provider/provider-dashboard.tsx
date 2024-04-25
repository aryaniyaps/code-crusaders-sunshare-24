"use client";

import apiClient from "@/lib/apiClient";
import { Provider } from "@/lib/types/provider";
import { useEffect, useState } from "react";
import ProviderList from "./provider-list";

export default function ProviderDashboard() {
  const [providers, setProviders] = useState<Provider[]>();

  useEffect(() => {
    apiClient.get("/providers/@me").then(({ data }) => {
      setProviders(data);
    });
  }, []);

  if (!providers) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <ProviderList providers={providers} />
    </div>
  );
}
