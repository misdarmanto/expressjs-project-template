import express, { Express, Request, Response } from "express";
import { crudExampleController } from "../../controllers/crudExample";

export const crudExampleRoutes = (app: Express) => {
	const route = express.Router();
	app.use("/api/v1/crudExample", route);

	route.get("/", (req: Request, res: Response) =>
		crudExampleController.findAll(req, res)
	);
	route.get("/detail/:id", (req: Request, res: Response) =>
		crudExampleController.findOne(req, res)
	);
	route.post("/", (req: Request, res: Response) =>
		crudExampleController.create(req, res)
	);
	route.patch("/", (req: Request, res: Response) =>
		crudExampleController.update(req, res)
	);
	route.delete("/", (req: Request, res: Response) =>
		crudExampleController.remove(req, res)
	);
};
