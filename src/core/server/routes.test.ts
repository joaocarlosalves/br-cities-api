import { jest, describe, expect, it } from "@jest/globals";
import { routesList } from "./routes";

jest.mock("../../endpoints", () => ({
    staticRoutes: "mockStaticRouter",
    statesRoutes: "mockStatesRouter"
}));

describe("routesList", () => {
    it("should have all expected routes with correct ids", () => {
        expect(routesList).toEqual([
            { id: "state", routes: "mockStatesRouter" },
            { id: "static", routes: "mockStaticRouter" }
        ]);
    });

    it("should contain 2 routes", () => expect(routesList).toHaveLength(2));

    it("should contain unique ids", () => {
        const ids = routesList.map((r) => r.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
});
