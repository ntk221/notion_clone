import React, { useContext } from "react";
import { ArticleContext } from "../../contexts/contexts";
import { useState } from "react";
import { Box, Button, FormControl, Input, Textarea } from "@chakra-ui/react";
import { useEffect } from "react";
import { IArticle } from "../../types/articleType";
import { updateArticle } from "../../api/articlesApi";

const Article = () => {
  const { selectedArticle, userArticles, setSelectedArticle, setUserArticles } =
    useContext(ArticleContext);
  const [editTitle, setEditTitle] = useState(selectedArticle?.title || "");
  const [editBody, setEditBody] = useState(selectedArticle?.body || "");

  useEffect(() => {
    if (selectedArticle) {
      setEditTitle(selectedArticle.title);
      setEditBody(selectedArticle.body);
    }
  }, [selectedArticle]);

  if (!selectedArticle) {
    return <div>No article selected</div>;
  }

  const handleUpdate = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    const response = await updateArticle(editTitle, editBody, selectedArticle);

    if (!response) {
      return;
    }

    const updatedArticles = userArticles.map((article) => {
      if (article._id === selectedArticle._id) {
        return {
          ...article,
          title: editTitle,
          body: editBody,
        };
      }
      return article;
    }) as IArticle[];

    setUserArticles(updatedArticles);
    setSelectedArticle(response.data);
  };

  return (
    <Box fontSize="xl" mt="20" pl="20" w="70%" mx="auto">
      <FormControl as="form" onSubmit={handleUpdate}>
        <Box width="100%">
          <Input
            type="text"
            fontSize={"4xl"}
            fontWeight="bold"
            id="title"
            name="title"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            placeholder="Title"
            variant="unstyled"
            size="xl"
            borderColor="blue.400"
          />
        </Box>
        <Box width="100%">
          <Textarea
            id="body"
            name="body"
            value={editBody}
            onChange={(event) => setEditBody(event.target.value)}
            rows={10}
            placeholder="Body"
            size="xl"
            fontWeight="normal"
            fontSize={"lg"}
            variant="unstyled"
            resize="vertical"
            h="200px"
            borderColor="blue.400"
          ></Textarea>
        </Box>
        <br />
        <Button type="submit">Update</Button>
      </FormControl>
    </Box>
  );
};

export default Article;
