"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import apiClient from "@/lib/apiClient";
import { useRouter } from "@/lib/navigation";
import { Consumer } from "@/lib/types/consumer";
import Link from "next/link";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useEffect, useState } from "react";

export default function ConsumerConfirmPage({
  params,
}: {
  params: { consumerId: string };
}) {
  const [consumer, setConsumer] = useState<Consumer>();

  const router = useRouter();

  useEffect(() => {
    apiClient.get(`/consumers/${params.consumerId}`).then(({ data }) => {
      setConsumer(data);
    });
  }, []);

  useEffect(() => {
    if (consumer && consumer.isconfirmed) {
      return router.replace(`/consumers/${params.consumerId}`);
    }
  }, [consumer]);

  if (!consumer) return null;

  console.log(consumer);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-6 items-center">
      <div className="flex justify-center gap-2 w-full items-center">
        <h2 className="text-muted-foreground">Site name</h2>

        <h1 className="font-semibold text-lg">{consumer.name}</h1>
      </div>

      <h2 className="text-muted-foreground">Assigned solar power provider</h2>
      <Card className="w-[525px]">
        <CardHeader>
          <CardTitle>{consumer.provider.sitename}</CardTitle>
          <CardDescription>{consumer.provider.address}</CardDescription>
        </CardHeader>
        <CardContent>
          <Map
            provider={osm}
            boxClassname="w-full h-full"
            defaultCenter={consumer.provider.coordinates}
            defaultZoom={6}
            height={200}
          >
            <Marker anchor={consumer.provider.coordinates} offset={[0, 0]} />
          </Map>
        </CardContent>
      </Card>
      <Link href={"/dashboard/consumer"}>
        <Button variant={"outline"}>Back to dashboard</Button>
      </Link>
    </div>
  );
}
