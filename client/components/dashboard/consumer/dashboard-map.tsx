"use client";

import apiClient from "@/lib/apiClient";
import { Provider } from "@/lib/types/provider";
import { Map, Overlay, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";

export default function DashboardMap() {
  const [providers, setProviders] = useState<Provider[]>();

  useEffect(() => {
    apiClient.get("/providers").then(({ data }) => {
      setProviders(data);
    });
  }, []);

  if (!providers) return null;

  return (
    <div className="h-full w-full">
      <Map
        provider={osm}
        boxClassname="w-full h-full"
        defaultCenter={[13.01311, 80.23634]}
        defaultZoom={6}
      >
        {providers.map((provider) => {
          return (
            <Overlay
              anchor={provider.coordinates}
              offset={[15, 20]}
              key={provider.id}
            >
              <Button>{provider.sitename}</Button>
            </Overlay>
          );
        })}
        <ZoomControl />
      </Map>
    </div>
  );
}
