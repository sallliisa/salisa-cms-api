import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../models/Article";

const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, date, content } = req.body;
  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title,
    date,
    content,
  });

  try {
    const result = await article.save();
    res.status(201).json({ article: result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.articleId;
  try {
    const article = await Article.findById(articleId);
    if (article) {
      res.status(200).json({ article });
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const articleId = req.params.articleId;

  try {
    const result = await Article.findByIdAndDelete(articleId);
    res.status(200).json({ message: "Successfully deleted article" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const editArticle = async (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.articleId;
  const { title, date, content } = req.body;
  try {
    const result = await Article.findByIdAndUpdate(articleId, {
      title,
      date,
      content,
    });
    res.status(200).json({ message: "Successfully updated article" });
  } catch (error) {
    res.status(500).json({ message: "Error while updating article", error });
  }
};

export default {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  editArticle,
};
