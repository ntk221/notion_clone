import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import fetchArticles from "../../api/articlesApi";
import getUserData from "../../api/userApi";
import { User } from "../../types/userType";
import { IArticle } from "../../types/articleType";

export const UserContext = createContext<User>({
  id: "",
  username: "",
  email: "",
});

type ArticleContextValue = {
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

const AppLayout = () => {

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    id: "",
  });
  const [userArticles, setUserArticles] = useState<IArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(null);

  // ログインしているユーザーの情報を取得して，stateにセットする
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserData = async () => {
        const userData = await getUserData();
        setUserData(userData);
      };
      fetchUserData();
    } else {
      navigate("/");
    }
  }, []);

  // ユーザーの記事一覧を取得して，stateにセットする
  useEffect(() => {
    const getArticles = async () => {
      try {
        const articles = await fetchArticles(userData.id); // fetchArticlesを呼び出し
        setUserArticles(articles); // 取得した記事一覧をstateにセット
      } catch (error) {
        console.log(error);
      }
    };
    if (userData.id) {
      getArticles();
    }
  }, [userData]);

  const navigate = useNavigate();

  return (
    <ChakraProvider>
      <Box display={"flex"}>
        <ArticleContext.Provider
          value={{
            userArticles,
            selectedArticle,
            setSelectedArticle,
            setUserArticles,
          }}
        >
          <UserContext.Provider value={userData}>
            <SideBar username={userData.username} userArticles={userArticles} />
            <Outlet />
          </UserContext.Provider>
        </ArticleContext.Provider>
      </Box>
    </ChakraProvider>
  );
};

export default AppLayout;
