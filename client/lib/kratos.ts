import {
  Configuration as FetchConfiguration,
  FrontendApi as FetchFrontendApi,
} from "@ory/client-fetch";
import { Configuration, FrontendApi } from "@ory/kratos-client";
import { env } from "./env";

const basePath =
  typeof window === undefined
    ? env.INTERNAL_KRATOS_URL
    : env.NEXT_PUBLIC_EXTERNAL_KRATOS_URL;

const kratos = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: { withCredentials: true, mode: "cors" },
  })
);

export default kratos;

export const kratosFetch = new FetchFrontendApi(
  new FetchConfiguration({
    basePath,
    credentials: "include",
  })
);
