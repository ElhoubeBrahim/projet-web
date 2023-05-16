import express from "express";
import { articlesRoutes } from "./articles";
import { categoriesRoutes } from "./categories";
import { commentsRoutes } from "./comments";

const router = express.Router();

router.use("/articles", articlesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/comments", commentsRoutes);

export default router;
