import helmet from "helmet";
import { RequestHandler } from "express";

export const security: RequestHandler[] = [
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: []
            }
        },
        crossOriginEmbedderPolicy: true,
        crossOriginResourcePolicy: { policy: "same-origin" },
        referrerPolicy: { policy: "no-referrer" }
    })
];