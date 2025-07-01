import { jest, describe, expect, it } from "@jest/globals";
import { getJson } from "./static.controller";
import { Router } from "express";
import { staticRoutes } from "./static.routes";

jest.mock("express", () => ({ Router: jest.fn(() => ({ get: jest.fn() })) }));
jest.mock("./static.controller", () => ({ getJson: jest.fn() }));

describe("staticRoutes", () => {
    it("should configure GET /states/:id route with getJson controller", () => {
        expect(Router).toHaveBeenCalled();
        expect(staticRoutes.get).toHaveBeenCalledWith("/states/:id", getJson);
        expect(staticRoutes.get).toHaveBeenCalledTimes(1);
    });

    it("should use the correct HTTP method and path", () => {
        const mockGet = staticRoutes.get as jest.Mock;
        const [routePath, routeHandler] = mockGet.mock.calls[0];
        expect(routePath).toBe("/states/:id");
        expect(routeHandler).toBe(getJson);
    });

    it("should register GET /states/:id with getJson handler", () => {
        // @ts-ignore - acessar stack privada do Express Router
        const router: any = routesModule.staticRoutes as Router;
        // @ts-ignore - acessar stack privada do Express Router
        const route: any = router.stack.find((r) => r.route?.path === "/states/:id" && r.route?.methods.get);
        expect(route).toBeTruthy();
        // @ts-ignore - acessar stack privada do Express Router
        expect(route.route.stack[0].handle).toBe(controller.getJson);
    });

    it("should configure GET /states/:id route with getJson controller", () => {
        expect(Router).toHaveBeenCalled();
        expect(staticRoutes.get).toHaveBeenCalledWith("/states/:id", getJson);
        expect(staticRoutes.get).toHaveBeenCalledTimes(1);
    });

    it("should use the correct HTTP method and path", () => {
        const mockGet = staticRoutes.get as jest.Mock;
        const [routePath, routeHandler] = mockGet.mock.calls[0];
        expect(routePath).toBe("/states/:id");
        expect(routeHandler).toBe(getJson);
    });
});
