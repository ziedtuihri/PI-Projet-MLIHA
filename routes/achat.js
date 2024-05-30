import express from "express";
import { getAll, addOnce, updateOne } from "../controllers/achat.js";
const router = express.Router();

router.route("/").get(getAll).post(addOnce);
router.route("/:idAchat/:idProduit").put(updateOne);

export default router;
