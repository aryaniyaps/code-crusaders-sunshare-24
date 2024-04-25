import { Configuration, FrontendApi } from "@ory/kratos-client";
import { env } from "../env.js";

const kratos = new FrontendApi(
  new Configuration({
    basePath: env.KRATOS_URL,
    baseOptions: {
      withCredentials: true,
    },
  })
);

export default kratos;
