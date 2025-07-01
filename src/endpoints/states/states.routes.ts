import { Router } from "express";
import { getCities, getState, getStates } from "./states.controller";

export const statesRoutes: Router = Router();

statesRoutes.get("/", getStates);
statesRoutes.get("/:uf", getState);
statesRoutes.get("/:uf/cities{/:page}{/:limit}", getCities);