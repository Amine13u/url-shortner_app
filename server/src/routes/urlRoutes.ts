import express from "express";
import {
  shortenUrl,
  redirectUrl,
  getAnalytics,
  getAllUrls,
  deleteUrl,
} from "../controllers/urlController";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/shorten/urls", getAllUrls);
router.get("/:shortId", redirectUrl);
router.get("/analytics/:shortId", getAnalytics);
router.delete("/urls/:shortId", deleteUrl);

export default router;
