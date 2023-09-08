import express, { Express, Request, Response } from "express";
import * as academic from "../../controllers/academic";

export const academicRoutes = (app: Express) => {
	const route = express.Router();
	app.use("/api/v1/academics", route);
	route.get("/", (req: Request, res: Response) => academic.findAll(req, res));
	route.get("/detail/:id", (req: Request, res: Response) => academic.findOne(req, res));
	route.post("/", (req: Request, res: Response) => academic.create(req, res));
	// route.post("/register", (req: Request, res: Response) => auth.register(req, res));
	// route.post("/login", (req: Request, res: Response) => auth.login(req, res));
	// route.get("/me/:id", (req: Request, res: Response) => auth.findOne(req, res));
};
