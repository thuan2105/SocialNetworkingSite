import express from "express";
import { login, register } from "../controllers/authController.js";
import { upload } from "../utils/fileStorage.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", upload.single("picture"), register);

export default router;
