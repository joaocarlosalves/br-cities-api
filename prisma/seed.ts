import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import path from "path";
import { stateUFs } from "./../data/statesUfs";

const prisma = new PrismaClient();

const normalizeStateName = (stateName: string): string => stateName.trim().toUpperCase();

const seedStatesAndCities = async() => {
    const geoJsonPath = path.join(__dirname, "./../data/cidades_coordenadas_json.geojson");
    const geoJson = JSON.parse(await fs.readFile(geoJsonPath, "utf-8"));
    const states: Record<string, number> = {};

    for (const feature of geoJson.features) {
        const {
            CD_GEOCODM: code,
            NM_MUNICIP: name,
            NM_MICRO: microRegion,
            NM_MESO: mesoRegion,
            NM_UF: stateName,
            LAT: latitude,
            LONG: longitude,
            ALT: altitude,
        } = feature.properties;

        const { type: geometryType, coordinates } = feature.geometry;

        if (!states[stateName]) {
            const stateName = normalizeStateName(feature.properties.NM_UF);
            const uf = stateUFs[stateName];

            if (!uf) throw new Error(`UF não encontrado para o estado: ${stateName}`);            
            
            const state = await prisma.state.upsert({
                where: { uf },
                update: {},
                create: { name: stateName, uf }
            });
            
            states[stateName] = state.id;
        };

        await prisma.city.create({
            data: {
                code,
                name,
                microRegion,
                mesoRegion,
                latitude,
                longitude,
                altitude,
                geometryType,
                coordinates: JSON.stringify(coordinates),
                stateId: states[stateName]
            }
        });
    };

    console.log("Estados e cidades inseridos com sucesso!");
};

async function main() {
    try {
        console.log("Iniciando seed...");
        await seedStatesAndCities();
        console.log("Seed concluído!");
    } catch (error) {
        console.error("Erro ao executar seed:", error);
    } finally {
        console.log("Desconectando do banco de dados...");
        await prisma.$disconnect();
    };
};

main();