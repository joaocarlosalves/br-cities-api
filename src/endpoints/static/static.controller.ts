import { Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";

export const getJson = async(_req: Request<{ id: string }>, res: Response) => {
    const file = path.join(__dirname, `./../../../data/states/${ _req.params.id }.json`);
    const content = await fs.readFile(file, "utf-8");
    const json = JSON.parse(content);

    if(!file) res.status(500).json({ err: "Failed to read JSON file" });
    
    res.json(json);
};