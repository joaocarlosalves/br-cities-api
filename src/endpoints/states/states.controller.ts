import { Request, Response } from "express";
import { getAllStates, getOneState, getStateCities } from "./states.service";

type TTCities = { uf: string, page: string, limit: string };

export const getStates: any = async(req: Request, res: Response) => {
    let states: [] = await getAllStates().then((res: any) => res);        
    if(!states) return { error: "States not found" };
    return res.status(200).json(states);
};

export const getState: any = async(req: Request<{ uf: string }>, res: Response) => {
    // @ts-ignore
    let state: [] = await getOneState(req.params.uf.toUpperCase()).then((res: any) => res);
    if(!state) return { error: "State not found" };
    return res.status(200).json(state);
};

export const getCities: any = async(req: Request<TTCities>, res: Response) => {
    const { uf, page, limit } = req.params;
    // @ts-ignore
    let cities: [] = await getStateCities(uf.toUpperCase(), parseInt(page) || 1, parseInt(limit) || 1000).then((res: any) => res);
    if(!cities) return { error: "Cities not found" };
    return res.status(200).json(cities);
};