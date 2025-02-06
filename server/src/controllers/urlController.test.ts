import { Request, Response } from "express";
import { shortenUrl, redirectUrl, getAnalytics } from "./urlController";
import Url from "../models/Url";

jest.mock("../models/Url"); // Mock the Url model

describe("URL Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      redirect: jest.fn(),
    };
  });

  describe("shortenUrl", () => {
    it("should return 400 for an invalid URL", async () => {
      req.body = { longUrl: "invalid-url" };

      await shortenUrl(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid URL" });
    });
  });

  describe("redirectUrl", () => {
    it("should redirect to the original URL", async () => {
      req.params = { shortId: "ABC123" };
      (Url.findOne as jest.Mock).mockResolvedValue({
        longUrl: "https://example.com",
        clicks: 0,
        save: jest.fn(),
      });

      await redirectUrl(req as Request, res as Response);

      expect(res.redirect).toHaveBeenCalledWith("https://example.com");
    });

    it("should return 404 for a non-existent short ID", async () => {
      req.params = { shortId: "NONEXISTENT" };
      (Url.findOne as jest.Mock).mockResolvedValue(null);

      await redirectUrl(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "URL not found" });
    });
  });

  describe("getAnalytics", () => {
    it("should return the click count for a short ID", async () => {
      req.params = { shortId: "ABC123" };
      (Url.findOne as jest.Mock).mockResolvedValue({ clicks: 5 });

      await getAnalytics(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ clicks: 5 });
    });

    it("should return 404 for a non-existent short ID", async () => {
      req.params = { shortId: "NONEXISTENT" };
      (Url.findOne as jest.Mock).mockResolvedValue(null);

      await getAnalytics(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "URL not found" });
    });
  });
});
