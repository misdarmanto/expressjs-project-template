import express, { Express, Request, Response } from "express";
import { middleware } from "../../middlewares";
import { findAllAdmin, findOneAdmin } from "../../controllers/admin/find";
import { loginAdmin } from "../../controllers/admin/login";
import { createAdmin } from "../../controllers/admin/creat";
import { updateAdmin } from "../../controllers/admin/update";
import { removeAdmin } from "../../controllers/admin/remove";

export const adminRouter = (app: Express) => {
	const router = express.Router();
	app.use("/api/v1/admin", middleware.useAuthorization, router);
	router.get("/list", (req: Request, res: Response) => findAllAdmin(req, res));
	router.get("/detail/:adminId", (req: Request, res: Response) =>
		findOneAdmin(req, res)
	);
	router.post("/login", (req: Request, res: Response) => loginAdmin(req, res));
	router.post("/", (req: Request, res: Response) => createAdmin(req, res));
	router.patch("/", (req: Request, res: Response) => updateAdmin(req, res));
	router.delete("/", (req: Request, res: Response) => removeAdmin(req, res));
};
