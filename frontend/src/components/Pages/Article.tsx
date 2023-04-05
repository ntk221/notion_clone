import React from 'react'
import { Box, Button } from "@chakra-ui/react";
import axios from 'axios';

type ArticleProps = {
    userId: string;
}

const Article: React.FC<ArticleProps> = ({ userId }) => {
    const handleCreateArticle = async () => {
        try {
            const response = await axios.post("/articles", {
                title: "無題",
                body: "ここに記事の内容を書いてください",
                author: userId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Contyent-Type": "application/json",
                    Accept: "application/json",
                },
            });
            console.log(response.data);
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

export default Article