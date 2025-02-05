import { Request, Response } from "express";
import Url from "../models/Url";
import {
  isValidUrl,
  generateQRCode,
  generateShortId,
} from "../services/urlService";

export const shortenUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { longUrl } = req.body;

  if (!isValidUrl(longUrl)) {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  const shortId = await generateShortId();
  const qrCode = await generateQRCode(`http://localhost:3000/${shortId}`);

  const url = new Url({ longUrl, shortId, qrCode });
  await url.save();

  res.json({ shortUrl: `http://localhost:3000/${shortId}`, qrCode });
};

export const redirectUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { shortId } = req.params;

  const url = await Url.findOne({ shortId });
  if (!url) {
    res.status(404).json({ error: "URL not found" });
    return;
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.longUrl);
};

export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { shortId } = req.params;

  const url = await Url.findOne({ shortId });
  if (!url) {
    res.status(404).json({ error: "URL not found" });
    return;
  }

  res.json({ clicks: url.clicks });
};
