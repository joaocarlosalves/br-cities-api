import { jest, describe, expect, it, beforeEach } from "@jest/globals";
import { app } from "./../server/index";
import {security} from "./security";
import {limiter} from "./rateLimiter";
import disableCors from "./cors";
import { middlewares } from "./";

describe("middlewares", () => {
    beforeEach(() => { jest.clearAllMocks() });

    it("should register all middlewares with app.use", () => {
        const useMock: any = jest.fn();
        app.use = useMock;
        middlewares();
        expect(useMock).toHaveBeenCalledWith(limiter);
        expect(useMock).toHaveBeenCalledWith(security);
        expect(useMock).toHaveBeenCalledWith(disableCors);
        expect(useMock).toHaveBeenCalledTimes(3);
    });
});
