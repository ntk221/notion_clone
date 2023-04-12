import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../api/articlesApi";
import getUserData from "../../api/userApi";
import { IArticle } from "../../types/articleType";
import { ArticleContext } from "../../contexts/contexts";
import { UserContext } from "../../contexts/contexts";

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
        const articles : IArticle[] = await fetchArticles(userData.id); // fetchArticlesを呼び出し
        setUserArticles(articles.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())); // 取得した記事一覧をstateにセット
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
      <Box display={"flex"} height="100vh" >
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
