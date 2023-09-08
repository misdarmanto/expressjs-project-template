import { Express, Request, Response } from "express";
import { index } from "../../controllers";
import { userRoutes } from "./user-router";
import { academicRoutes } from "./academic-route";
import { uploadFileRoutes } from "./upload-file-route";

export const appRouterV1 = (app: Express) => {
	app.get("/api/v1", (req: Request, res: Response) => index(req, res));
	userRoutes(app);
	academicRoutes(app);
	uploadFileRoutes(app);
};
