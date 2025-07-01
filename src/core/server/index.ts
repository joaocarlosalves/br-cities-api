import express, { Application } from "express";
import { config } from "./config";
import { middlewares } from "./../middlewares";
import { routesList } from "./routes";

export const app: Application = express();

export function server() {
    app.use(express.json());

    middlewares();

    routesList.map(({ id, routes }) => app.use(`/${ id }`, routes));
    
    app.listen(config.port);
};