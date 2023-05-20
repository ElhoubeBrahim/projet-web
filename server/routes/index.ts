import express from "express";
import { articlesRoutes } from "./articles";
import { authRoutes } from "./auth";
import { categoriesRoutes } from "./categories";
import { commentsRoutes } from "./comments";
import { usersRoutes } from "./users";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/articles", articlesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/comments", commentsRoutes);

export default router;
