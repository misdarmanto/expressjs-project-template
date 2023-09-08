import express, { Express, Request, Response } from "express";
import * as user from "../../controllers/user";

export const userRoutes = (app: Express) => {
	const route = express.Router();
	app.use("/api/v1/users", route);
	route.get("/", (req: Request, res: Response) => user.findOne(req, res));
	route.get("/students/registered", (req: Request, res: Response) =>
		user.findAllStudent(req, res)
	);
	// route.get("/detail:id", (req: Request, res: Response) => user.findOne(req, res));
	// route.post("/", (req: Request, res: Response) => user.create(req, res));
	// route.post("/register", (req: Request, res: Response) => auth.register(req, res));
	// route.post("/login", (req: Request, res: Response) => auth.login(req, res));
	// route.get("/me/:id", (req: Request, res: Response) => auth.findOne(req, res));
};
