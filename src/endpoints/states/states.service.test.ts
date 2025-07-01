import { jest, describe, expect, it, afterEach } from "@jest/globals";
import { getAllStates, getOneState, getStateCities } from "./states.service";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
    const mPrisma: any = {
        state: {
            findMany: jest.fn(),
            findUnique: jest.fn()
        }
    };
    return { PrismaClient: jest.fn(() => mPrisma) };
});

describe("states.service", () => {
    const prismaMock: any = new PrismaClient();

    afterEach(() => {jest.clearAllMocks()});

    describe("getAllStates", () => {
        it("should return states when found", async () => {
            prismaMock.state.findMany.mockResolvedValue([{ uf: "SP" }]);
            const result = await getAllStates();
            expect(prismaMock.state.findMany).toHaveBeenCalled();
            expect(result).toEqual([{ uf: "SP" }]);
        });

        it("should return error when no states found", async () => {
            prismaMock.state.findMany.mockResolvedValue(null);
            const result = await getAllStates();
            expect(result).toEqual({ error: "States not found" });
        });

        it("should return error on exception", async () => {
            prismaMock.state.findMany.mockRejectedValue(new Error("DB fail"));
            const result: {} = await getAllStates();
            expect(result).toEqual({ error: "Failed to fetch states" });
        });
    });

    describe("getOneState", () => {
        it("should return state when found", async () => {
            prismaMock.state.findUnique.mockResolvedValue({ uf: "SP" });
            // @ts-ignore
            const result = await getOneState("SP");
            expect(prismaMock.state.findUnique).toHaveBeenCalledWith({ where: { uf: "SP" } });
            expect(result).toEqual({ uf: "SP" });
        });

        it("should return error when state not found", async () => {
            prismaMock.state.findUnique.mockResolvedValue(null);
            // @ts-ignore
            const result = await getOneState("XX");
            expect(result).toEqual({ error: "State not found" });
        });

        it("should return error on exception", async () => {
            prismaMock.state.findUnique.mockRejectedValue(new Error("DB fail"));
            // @ts-ignore
            const result = await getOneState("SP");
            expect(result).toEqual({ error: "Failed to fetch state" });
        });
    });

    describe("getStateCities", () => {
        it("should return cities when found", async () => {
            prismaMock.state.findUnique.mockResolvedValue({ uf: "SP", cities: [] });
            // @ts-ignore
            const result = await getStateCities("SP", 2, 50);
            expect(prismaMock.state.findUnique).toHaveBeenCalledWith({
                where: { uf: "SP" },
                include: {
                    cities: {
                        skip: 50, 
                        take: 50,
                        orderBy: { name: "asc" }
                    }
                }
            });
            expect(result).toEqual({ uf: "SP", cities: [] });
        });

        it("should return error when cities not found", async () => {
            prismaMock.state.findUnique.mockResolvedValue(null);
            // @ts-ignore
            const result = await getStateCities("XX", 1, 100);
            expect(result).toEqual({ error: "Cities not found" });
        });

        it("should return error on exception", async () => {
            prismaMock.state.findUnique.mockRejectedValue(new Error("DB fail"));
            // @ts-ignore
            const result = await getStateCities("SP", 1, 100);
            expect(result).toEqual({ error: "Failed to fetch cities" });
        });
    });
});
