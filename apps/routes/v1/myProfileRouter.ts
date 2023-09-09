import express, { Express, Request, Response } from "express";
import { middleware } from "../../middlewares";
import { findMyProfile } from "../../controllers/my-profile/find";
import { updateMyProfile } from "../../controllers/my-profile/update";

export const myProfileRouter = (app: Express) => {
	const router = express.Router();
	app.use("/api/v1/my-profile", middleware.useAuthorization, router);
	router.get("/", (req: Request, res: Response) => findMyProfile(req, res));
	router.patch("/", (req: Request, res: Response) => updateMyProfile(req, res));
};
