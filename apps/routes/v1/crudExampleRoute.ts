import express, { Express, Request, Response } from "express";
import { crudExampleController } from "../../controllers/crudExample";

export const crudExampleRoutes = (app: Express) => {
	const route = express.Router();
	app.use("/api/v1/crud-example", route);

	route.get("/list", (req: Request, res: Response) =>
		crudExampleController.findAll(req, res)
	);
	route.get("/detail/:crudExampleId", (req: Request, res: Response) =>
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
