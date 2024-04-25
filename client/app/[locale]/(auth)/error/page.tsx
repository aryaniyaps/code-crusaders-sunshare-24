"use client";
import { FlowError } from "@ory/client";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import kratos from "@/lib/kratos";
import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const [error, setError] = useState<FlowError | string>();

  // Get ?id=... from the URL
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    // If the router is not ready yet, or we already have an error, do nothing.
    if (error) {
      return;
    }

    kratos
      .getFlowError({ id: String(id) })
      .then(({ data }) => {
        setError(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
          // The error id could not be found. Let's just redirect home!
          case 403:
          // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
          case 410:
            // The error id expired. Let's just redirect home!
            return router.push("/");
        }

        return Promise.reject(err);
      });
  }, [id, router, error]);

  if (!error) {
    return null;
  }

  return (
    <>
      <div className="w-full flex flex-col">
        <h1 className="text-lg font-semibold">An error occurred</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
      <div className="w-full">
        <Link href="/" passHref>
          <Button>Go back</Button>
        </Link>
      </div>
    </>
  );
}
