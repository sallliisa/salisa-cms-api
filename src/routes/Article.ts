import express from "express";
import controller from "../controllers/Article";

const router = express.Router();

router.post("/newarticle", controller.createArticle);
router.get("/articles", controller.getAllArticles);
router.get("/article/:articleId", controller.getArticle);
router.delete("/deletearticle/:articleId", controller.deleteArticle);
router.post("/editarticle/:articleId", controller.editArticle);

export = router;
