import mongoose, { Document, Schema } from "mongoose";

export interface IArticle {
  title: string;
  date: string;
  content: string;
}

export interface IArticleModel extends IArticle, Document {}

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IArticleModel>("Article", ArticleSchema);
