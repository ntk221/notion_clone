import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import Article from "./Article";
import axios from "axios";
import fetchArticles from "../../api/articleApi";
import getUserData from "../../api/userApi";

const DashBoard = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    id: "",
  });

  const [userArticles, setUserArticles] = useState([]);

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
    <>
      <SideBar
        username={userData.username}
        notes={["記事1", "記事２", "記事３"]}
        onNoteClick={(note: string) => {
          console.log(note);
        }}
      />
      <Article userId={userData.id} />
    </>
  );
};

export default DashBoard;
