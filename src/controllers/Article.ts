import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../models/Article";

const createArticle = (req: Request, res: Response, next: NextFunction) => {
  const { title, date, content } = req.body;
  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title,
    date,
    content,
  });

  return article
    .save()
    .then((article) => res.status(201).json({ article }))
    .catch((error) => res.status(500).json({ error }));
};

const getAllArticles = (req: Request, res: Response, next: NextFunction) => {
  return Article.find()
    .then((articles) =>
      articles
        ? res.status(200).json({ articles })
        : res.status(404).json({ message: "No articles have been made" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getArticle = (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.articleId;

  return Article.findById(articleId)
    .then((article) =>
      article
        ? res.status(200).json({ article })
        : res.status(404).json({ message: "Article not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.articleId;

  return Article.findByIdAndDelete(articleId)
    .then(() =>
      res.status(200).json({ message: "Successfully deleted article" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createArticle, getAllArticles, getArticle, deleteArticle };
