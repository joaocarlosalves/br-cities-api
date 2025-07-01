import { jest, describe, expect, it } from "@jest/globals";

jest.mock("./../src/core/server", () => ({ server: jest.fn() }));

describe("index entrypoint", () => {
    it("should call server when index is run", async () => {
        await import("./index");
        const { server } = require("./../src/core/server");
        expect(server).toHaveBeenCalled();
    });
});
