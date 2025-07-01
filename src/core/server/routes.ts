import { Router } from "express";
import { staticRoutes, statesRoutes } from "./../../endpoints";

type TRoutesList = { id: string, routes: Router };

export const routesList: TRoutesList[] = [
    { "id": "state", "routes": statesRoutes },
    { "id": "static", "routes": staticRoutes }
];