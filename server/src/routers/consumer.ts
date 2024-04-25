import { Request, Response, Router } from "express";
import { db } from "../lib/db.js";
import authMiddleware from "../middleware/auth.js";
import { validateData } from "../middleware/validate-data.js";
import { purchaseEnergySchema } from "../schemas/consumers.js";
import { findNearbyLocations } from "../utils/location.js";

const consumerRouter = Router();
consumerRouter.use(authMiddleware);

consumerRouter.get("/", async (req: Request, res: Response) => {
  const consumers = await db.consumer.findMany();
  res.json(consumers);
});

consumerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const consumers = await db.consumer.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        provider: {
          select: {
            sitename: true,
            address: true,
            unitsavailable: true,
            coordinates: true,
          },
        },
      },
    });
    res.json(consumers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch consumer" });
  }
});

consumerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    await db.consumer.delete({
      where: { id: Number(req.params.id), userid: req.userId },
    });
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch consumer" });
  }
});

consumerRouter.post(
  "/purchase-energy",
  validateData(purchaseEnergySchema),
  async (req: Request, res: Response) => {
    try {
      const providers = await db.provider.findMany();
      const consumerCoordinates = req.body.coordinates;

      // Find nearby providers within a radius of 50 km
      const nearbyProviders = findNearbyLocations(
        providers.map((provider) => ({
          name: provider.sitename,
          lon: provider.coordinates[0],
          lat: provider.coordinates[1],
          id: provider.id,
        })),
        consumerCoordinates[0],
        consumerCoordinates[1],
        100
      );

      if (nearbyProviders.length === 0) {
        return res
          .status(404)
          .json({ error: "No nearby providers found within 100 km radius" });
      }

      // Get the name of the nearest provider
      const nearestProvider = nearbyProviders[0];

      // Create a new consumer with the nearest provider's information
      const newConsumer = await db.consumer.create({
        data: {
          userid: req.userId!,
          name: req.body.sitename,
          powergained: req.body.powergained,
          coordinates: req.body.coordinates,
          provider: {
            connect: {
              id: nearestProvider.id,
            },
          },
        },
      });

      res.status(201).json({
        nearestProviderName: nearestProvider.name,
        consumer: newConsumer,
      });
    } catch (error) {
      console.error("Error creating consumer:", error);
      res.status(500).json({ error: "Failed to create consumer" });
    }
  }
);

// TODO: register consumer routes here
consumerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const consumers = await db.consumer.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(consumers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch providers" });
  }
});

export default consumerRouter;
