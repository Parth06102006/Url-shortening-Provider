import { Router } from "express";
import { createShortURL, deleteURL, getOriginalURL, stats, updateURL } from "../controllers/url.controller.js";


const router = Router();

router.post('/shorten',createShortURL);
router.get('/shorten/:shortId',getOriginalURL);
router.put('/shorten/:shortId',updateURL);
router.delete('/shorten/:shortId',deleteURL);
router.get('/shorten/:shortId/stats',stats);

export default router;