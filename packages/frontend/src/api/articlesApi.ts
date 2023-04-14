import axios from "axios";
import { IArticle } from "../types/articleType";

export const fetchArticles = async (userId : string) => {
    try {
      const response = await axios.get("/articles", {
        params : {
            userId: userId
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const updateArticle = async(editTitle : string, editBody : string, selectedArticle : IArticle) => {
  try {
        const response = await axios.put(`/articles/${selectedArticle._id}`, {
        title: editTitle,
        body: editBody,

      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

export  const createArticle = async (title : string, body : string, author : string) => {
    const response = await axios.post(`/articles`, {
      title,
      body,
      author,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data as IArticle;
  };

export const deleteArticle = async(selectedArticle : IArticle) => {
  try {
        const response = await axios.delete(`/articles/${selectedArticle._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
