import { z } from "zod";

// TODO: fill in consumer schemas
export const purchaseEnergySchema = z.object({
  sitename: z.string(),
  powergained: z.number(),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const createConsumerSchema = z.object({});

export const updateConsumerSchema = z.object({});
