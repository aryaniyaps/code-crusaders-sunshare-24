import { z } from "zod";

// TODO: fill in provider schemas
export const providerSchema = z.object({
  sitename: z.string(),
  address: z.string(),
  district: z.string(),
  state: z.string(),
  country: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  unitsavailable: z.number(),
});

export const createProviderSchema = z.object({});

export const updateProviderSchema = z.object({});
