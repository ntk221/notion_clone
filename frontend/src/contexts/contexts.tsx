import React from "react";
import { User } from "../types/userType";
import { IArticle } from "../types/articleType";
import { createContext } from "react";

export const UserContext = createContext<User>({
  id: "",
  username: "",
  email: "",
});

export type ArticleContextValue = {
  userArticles: IArticle[];
  selectedArticle: IArticle | null;
  setSelectedArticle: React.Dispatch<React.SetStateAction<IArticle | null>>;
  setUserArticles: React.Dispatch<React.SetStateAction<IArticle[]>>;
};

export const ArticleContext = createContext<ArticleContextValue>({
  userArticles: [],
  selectedArticle: null,
  setSelectedArticle: () => {},
  setUserArticles: () => {},
});
