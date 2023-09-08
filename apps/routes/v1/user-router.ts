import express, { Express, Request, Response } from "express";

export const userRoutes = (app: Express) => {
	const route = express.Router();
	app.use("/api/v1/users", route);
};
