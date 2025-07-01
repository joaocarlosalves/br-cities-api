import { jest, describe, expect, it } from "@jest/globals";
import { Router } from "express";
import * as controller from "./states.controller";
import * as routesModule from "./states.routes";

jest.mock("../src/states.controller", () => ({
    getStates: jest.fn(),
    getState: jest.fn(),
    getCities: jest.fn()
}));

describe("statesRoutes", () => {
    it("should register GET / with getStates handler", () => {
        const router: any = routesModule.statesRoutes as Router;
        const route: any = router.stack.find((r) => r.route?.path === "/" && r.route.methods.get);
        expect(route).toBeTruthy();
        expect(route.route.stack[0].handle).toBe(controller.getStates);
    });

    it("should register GET /:uf with getState handler", () => {
        const router: any = routesModule.statesRoutes as Router;
        const route = router.stack.find((r) => r.route?.path === "/:uf" && r.route.methods.get);
        expect(route).toBeTruthy();
        expect(route.route.stack[0].handle).toBe(controller.getState);
    });

    it("should register GET /:uf/cities{/:page}{/:limit} with getCities handler", () => {
        const router: any = routesModule.statesRoutes as Router;
        const route: any = router.stack.find((r) => r.route?.path === "/:uf/cities{/:page}{/:limit}" && r.route.methods.get);
        expect(route).toBeTruthy();
        expect(route.route.stack[0].handle).toBe(controller.getCities);
    });
});
