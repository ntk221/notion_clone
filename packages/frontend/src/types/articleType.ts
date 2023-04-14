import { Document } from 'mongoose';

export interface IArticle extends Document {
    _id: string;
    author: string;
    body: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  }
  