import { Router } from "express";
import { getJson } from "./static.controller";

export const staticRoutes: Router = Router();

staticRoutes.get("/state/:id", getJson);