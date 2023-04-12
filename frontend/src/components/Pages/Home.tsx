import React, { useContext } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArticleContext, UserContext } from "../../contexts/contexts";
import { createArticle } from "../../api/articlesApi";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { setSelectedArticle, setUserArticles } = useContext(ArticleContext);


  const handleCreateArticle = async () => {
    try {
      const response = await createArticle("","", user.id);

      await setSelectedArticle(response);

      const addedArticle = response;

      await setUserArticles((prev) => [...prev, addedArticle]);

      navigate(`/dashboard/article/${response._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
    >
      <Button onClick={handleCreateArticle}>新規記事を作成</Button>
    </Box>
  );
};

export default Home;
