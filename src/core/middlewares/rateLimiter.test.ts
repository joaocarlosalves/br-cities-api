import { jest, describe, expect, it } from "@jest/globals";
import rateLimit from "express-rate-limit";
import { limiter } from "./rateLimiter";

jest.mock("express-rate-limit");

describe("Rate limiter configuration", () => {
    it("should call express-rate-limit with correct options", () => {
        expect(limiter).toHaveBeenCalledWith({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            message: "Too much request from this IP. Try again later.",
        });
    });
});
