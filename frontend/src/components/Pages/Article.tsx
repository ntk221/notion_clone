import React, { useContext } from 'react';
import { ArticleContext } from '../Layout/AppLayout';
import { useState } from 'react';
import { Box, Button, FormControl, Input, Textarea } from '@chakra-ui/react';
import { useEffect } from 'react';

const Article = () => {

  const { selectedArticle, userArticles, setSelectedArticle } = useContext(ArticleContext);
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


  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    // ここに記事の更新処理を書く
    const updatedArticle = userArticles.map((article) => {
      if (article._id === selectedArticle._id) {
        return {
          ...article,
          title: editTitle,
          body: editBody,
        };
      }
      return article;
    });
    // 編集フォームをリセット
    setEditTitle("");
    setEditBody("");
    setSelectedArticle(null);
  }

  return (
    <Box fontSize="xl" mt="4" w="80%" mx="auto">
      <FormControl as="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="title"
          name="title"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          placeholder="Title"
          variant="unstyled"
          size="lg"
          fontWeight="normal"
          borderColor="blue.400"
        />
        <br />
        <Textarea
          id="body"
          name="body"
          value={editBody}
          onChange={(event) => setEditBody(event.target.value)}
          rows={10}
          placeholder="Body"
          size="lg"
          fontWeight="normal"
          variant="unstyled"
          resize="vertical"
          h="200px"
          borderColor="blue.400"
        ></Textarea>
        <br />
        <Button type="submit">Update</Button>
      </FormControl>
    </Box>
  );
}

export default Article;
