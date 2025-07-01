import { jest, describe, expect, it, beforeEach } from "@jest/globals";
import { Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";
import { getJson } from "./static.controller";

jest.mock("fs");
jest.mock("path");

const mockedFs: any = fs as jest.Mocked<typeof fs>;
const mockedPath: any = path as jest.Mocked<typeof path>;

describe("getJson", () => {
    let mockRequest: Partial<Request<{ id: string }>>;
    let mockResponse: Partial<Response> | any;
    let responseJson: jest.Mock;
    let responseStatus: jest.Mock;

    beforeEach(() => {
        mockRequest = {params: { id: "test" }};
        responseJson = jest.fn();
        responseStatus = jest.fn(() => ({ json: responseJson }));
        mockResponse = { json: responseJson, status: responseStatus };
        jest.clearAllMocks();
    });

    it("should return JSON content when file exists", async () => {
        const mockData = { state: "active" };
        mockedFs.readFile.mockResolvedValue(JSON.stringify(mockData));
        mockedPath.join.mockReturnValue("/fake/path/test.json");
        await getJson(mockRequest as Request<{ id: string }>, mockResponse as Response);
        expect(mockedPath.join).toHaveBeenCalledWith(expect.any(String), "./../../../data/states/sp.json");
        expect(mockedFs.readFile).toHaveBeenCalledWith("/fake/path/test.json", "utf-8");
        expect(mockResponse.json).toHaveBeenCalledWith(mockData);
        expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should return 500 error when file read fails", async () => {
        mockedFs.readFile.mockRejectedValue(new Error("File read error"));
        mockedPath.join.mockReturnValue("/fake/path/test.json");
        await getJson(mockRequest as Request<{ id: string }>, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ err: "Failed to read JSON file" });
    });

    it("should handle invalid JSON content", async () => {
        mockedFs.readFile.mockResolvedValue("invalid json");
        mockedPath.join.mockReturnValue("/fake/path/test.json");
        await expect(getJson(mockRequest as Request<{ id: string }>, mockResponse as Response)).rejects.toThrow();
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
    });
});
