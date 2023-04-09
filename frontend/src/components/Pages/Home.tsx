import React, { useContext } from 'react';
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { ArticleContext } from '../Layout/AppLayout';
import axios from "axios";
import { UserContext } from '../Layout/AppLayout';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user  = useContext(UserContext);
  const { setSelectedArticle, setUserArticles } = useContext(ArticleContext);

  const handleCreateArticle = async () => {
    try {
      const response = await axios.post("/articles", {
        title: "",
        body: "",
        author: user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Contyent-Type": "application/json",
          Accept: "application/json",
        },
      });
      
      setSelectedArticle(response.data);

      const addedArticle = response;

      setUserArticles((prev) => [...prev, addedArticle.data]);

      navigate(`/dashboard/article/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return ( 
    <Box display="flex" alignItems="center" justifyContent="center" w="100%">
      <Button onClick={handleCreateArticle}>新規記事を作成</Button>
    </Box>
  )
}

export default Home;
