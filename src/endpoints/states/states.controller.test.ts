import { jest, describe, expect, it, afterEach } from "@jest/globals";
import { getStates, getState, getCities } from "./states.controller";
import * as statesService from "./states.service";
import { Request, Response } from "express";

describe("States Controller", () => {
  const mockRes = () => {
    const res: any = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {jest.clearAllMocks()});

  describe("getStates", () => {
    it("should return states with 200 when found", async () => {
      const fakeStates = [{ uf: "SP" }];
      jest.spyOn(statesService, "getAllStates").mockResolvedValue(fakeStates);
      const res = mockRes();
      await getStates({} as Request, res);
      expect(statesService.getAllStates).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeStates);
    });

    it("should return error when states not found", async () => {
        // @ts-ignore
      jest.spyOn(statesService, "getAllStates").mockResolvedValue(null);
      const res = mockRes();
      const result = await getStates({} as Request, res);
      expect(result).toEqual({ error: "States not found" });
    });
  });

  describe("getState", () => {
    it("should return one state with 200 when found", async () => {
      const fakeState: any = [{ uf: "SP" }];
      // @ts-ignore
      jest.spyOn(statesService, "getOneState").mockResolvedValue(fakeState);
      const req = { params: { uf: "sp" } } as unknown as Request;
      const res = mockRes();
      await getState(req, res);
      expect(statesService.getOneState).toHaveBeenCalledWith("SP");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeState);
    });

    it("should return error when state not found", async () => {
        // @ts-ignore
      jest.spyOn(statesService, "getOneState").mockResolvedValue(null);
      const req = { params: { uf: "sp" } } as unknown as Request;
      const res = mockRes();
      const result = await getState(req, res);
      expect(result).toEqual({ error: "State not found" });
    });
  });

  describe("getCities", () => {
    it("should return cities with 200 when found", async () => {
      const fakeCities = [{ city: "São Paulo" }];
      // @ts-ignore
      jest.spyOn(statesService, "getStateCities").mockResolvedValue(fakeCities);
      const req = {params: { uf: "sp", page: "2", limit: "50" }} as unknown as Request;
      const res = mockRes();
      await getCities(req, res);
      expect(statesService.getStateCities).toHaveBeenCalledWith("SP", 2, 50);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeCities);
    });

    it("should use default page and limit when parsing fails", async () => {
      const fakeCities = [{ city: "São Paulo" }];
      // @ts-ignore
      jest.spyOn(statesService, "getStateCities").mockResolvedValue(fakeCities);
      const req = {params: { uf: "sp", page: "NaN", limit: "" }} as unknown as Request;
      const res = mockRes();
      await getCities(req, res);
      expect(statesService.getStateCities).toHaveBeenCalledWith("SP", 1, 1000);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeCities);
    });

    it("should return error when cities not found", async () => {
        // @ts-ignore
      jest.spyOn(statesService, "getStateCities").mockResolvedValue(null);
      const req = { params: { uf: "sp", page: "1", limit: "50" } } as unknown as Request;
      const res = mockRes();
      const result = await getCities(req, res);
      expect(result).toEqual({ error: "Cities not found" });
    });
  });
});
