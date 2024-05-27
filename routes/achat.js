import express from "express";
import { getAll, addOnce } from "../controllers/achat.js";
const router = express.Router();

router.route("/").get(getAll).post(addOnce);

export default router;
