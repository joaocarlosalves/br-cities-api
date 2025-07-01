import { jest, describe, expect, it, beforeEach, afterAll } from "@jest/globals";

describe("Config", () => {
    const ORIGINAL_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...ORIGINAL_ENV };
    });

    afterAll(() => {process.env = ORIGINAL_ENV});

    it("should use environment variables if they exist", () => {
        process.env.PORT = "8080";
        process.env.NODE_ENV = "production";
        process.env.JWT_SECRET = "mysecret";
        process.env.JWT_ACCESS = "30m";
        process.env.JWT_REFRESH = "14d";
        process.env.DATABASE_URL = "postgres://localhost:5432/mydb";

        const { config } = require("../src/config");

        expect(config).toEqual({
            port: "8080",
            env: "production",
            jwt: {
                secret: "mysecret",
                access: "30m",
                refresh: "14d",
            },
            db: {
                url: "postgres://localhost:5432/mydb"
            }
        });
    });

    it("should use default values if env vars are not set", () => {
        delete process.env.PORT;
        delete process.env.NODE_ENV;
        delete process.env.JWT_SECRET;
        delete process.env.JWT_ACCESS;
        delete process.env.JWT_REFRESH;
        delete process.env.DATABASE_URL;

        const { config } = require("../src/config");

        expect(config).toEqual({
            port: 4000,
            env: "development",
            jwt: {
                secret: "50e26421009df257eee158947287cc4e5365f401ffedc95e75f6cb816c4ff7a0",
                access: "15m",
                refresh: "7d",
            },
            db: {
                url: "file:./data.db"
            }
        });
    });
});
