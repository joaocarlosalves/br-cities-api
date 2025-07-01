import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStates = async() =>  {
    try {
        const states: {} = await prisma.state.findMany();
        if (!states) return ({ error: "States not found" });
        return states;
    } catch {
        return { error: "Failed to fetch states" };
    };
};

export const getOneState: {} = async(uf: string) =>  {
    try {
        const state = await prisma.state.findUnique({ where: { uf } });
        if (!state) return ({ error: "State not found" });
        return state;
    } catch {
        return { error: "Failed to fetch state" };
    };
};

export const getStateCities: {} = async(uf: string, page: number = 1, limit: number = 100) =>  {        
    const take = limit, skip = (page - 1) * limit;
    try {
        const cities = await prisma.state.findUnique({
            where: { uf },
            include: {
                cities: { skip, take, orderBy: { name: "asc" } }
            }
        });
        if (!cities) return ({ error: "Cities not found" });
        return cities;
    } catch {
        return { error: "Failed to fetch cities" };
    };
};