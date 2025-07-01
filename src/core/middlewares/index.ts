import { app } from "./../server";
import { security } from "./security";
import { limiter } from "./rateLimiter";
import disableCors from "./cors";

export function middlewares() {
    app.use(limiter);
    app.use(security);
    app.use(disableCors); 
};