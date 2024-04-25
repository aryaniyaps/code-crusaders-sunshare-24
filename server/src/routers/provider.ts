import { Request, Response, Router } from "express";
import { db } from "../lib/db.js";
import authMiddleware from "../middleware/auth.js";
import { validateData } from "../middleware/validate-data.js";
import { providerSchema } from "../schemas/providers.js";
const providerRouter = Router();

providerRouter.use(authMiddleware);

// TODO: register provider routes here
providerRouter.get("/", async (req: Request, res: Response) => {
  const providers = await db.provider.findMany();
  res.json(providers);
});

providerRouter.post(
  "/",
  validateData(providerSchema),
  async (req: Request, res: Response) => {
    await db.provider.create({
      data: {
        userid: req.userId!,
        sitename: req.body.sitename,
        address: req.body.address,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        coordinates: req.body.coordinates,
        unitsavailable: req.body.unitsavailable,
      },
    });
  }
);

providerRouter.get("/@me", async (req: Request, res: Response) => {
  const providers = await db.provider.findMany({
    where: { userid: req.userId! },
  });
  res.json(providers);
});

providerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const providers = await db.provider.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch providers" });
  }
});

export default providerRouter;
