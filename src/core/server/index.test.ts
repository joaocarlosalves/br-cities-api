import { jest, describe, expect, it, beforeEach, beforeAll } from "@jest/globals";
import express from "express";
import { app } from "./index";
import { config } from "./../server/config";
import * as expressModule from "express";
import * as middlewaresModule from "../middlewares";
import { routesList } from "./routes";
import { server } from ".";

const useMock = jest.fn();
const getMock = jest.fn();
const listenMock = jest.fn((_port, cb) => cb && cb);
const jsonMock: any = jest.fn(() => "middleware");

export default () => ({
    use: useMock,
    get: getMock,
    listen: listenMock
});
export const json = jsonMock;
export const Router = jest.fn(() => ({}));
export const Application = jest.fn();
export { useMock, getMock, listenMock, jsonMock };

jest.mock("dotenv", () => ({ config: jest.fn() }));
jest.mock("express");
jest.mock("../middlewares", () => ({ middlewares: jest.fn() }));
jest.mock("../../endpoints", () => ({
    statesRoutes: jest.fn(),
    staticRoutes: jest.fn()
}));

beforeAll(() => {
    (expressModule.json as any).mockImplementation(() => ({
        use: useMock,
        get: getMock,
        listen: listenMock
    }));

    (expressModule.json as jest.Mock).mockReturnValue("middleware");
});

beforeEach(() => { jest.clearAllMocks() });

describe("config", () => {
    it("should use defaults if no env vars are set", () => {
        expect(config.port).toBe("4000");
        expect(config.env).toBe("test");
        expect(config.db.url).toContain("file:./dev.db");
    });
});

describe("routesList", () => {
    it("should define expected routes", () => {
        const routeIds = routesList.map(r => r.id);
        expect(routeIds).toContain("user");
        expect(routeIds).toContain("auth");
        expect(routeIds).toContain("state");
        expect(routeIds).toContain("static");
    });
});

jest.spyOn(express, "json").mockImplementation(jsonMock);

describe("server()", () => {
    beforeEach(() => {jest.clearAllMocks()});

    it("should register express.json()", () => {
        const useMock = jest.fn();
        (app.use as unknown) = useMock;
        server();
        expect(jsonMock).toHaveBeenCalled();
        expect(useMock).toHaveBeenCalledWith("mockJson");
    });

    it("should call middlewares()", () => {
        const useMock = jest.fn();
        (app.use as unknown) = useMock;
        const middlewaresSpy = jest
            .spyOn(middlewaresModule, "middlewares")
            .mockImplementation(jest.fn());
        server();
        expect(middlewaresSpy).toHaveBeenCalled();
    });

    it("should register all routes in routesList", () => {
        const useMock = jest.fn();
        (app.use as unknown) = useMock;
        const oo = jest.spyOn(middlewaresModule, "middlewares").mockImplementation(jest.fn());
        server();
        expect(oo).toHaveBeenCalledWith("/foo", "fooRouter");
        expect(oo).toHaveBeenCalledWith("/bar", "barRouter");
    });

    it("should listen on the configured port", () => {
        const listenMock = jest.fn((port = 4000) => {});
        (app.listen as unknown) = listenMock;
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(jest.fn());
        server();
        expect(listenMock).toHaveBeenCalledWith(4000);
        expect(consoleSpy).toHaveBeenCalledWith("test mode: //localhost:4000");
    });
});

describe("server", () => {
    it("should initialize app with middlewares and routes", () => {
        server();
        expect(expressModule.json).toHaveBeenCalled();
        expect(useMock).toHaveBeenCalledWith("middleware");
        expect(middlewaresModule.middlewares).toHaveBeenCalled();
        expect(useMock).toHaveBeenCalledTimes(5);
        expect(getMock).toHaveBeenCalled();
        expect(listenMock).toHaveBeenCalled();
    });
});
