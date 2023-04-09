import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Stack,
  Button,
} from "@chakra-ui/react";
import { IArticle } from "../types/articleType";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ArticleContext } from "./Layout/AppLayout";

type SideBarProps = {
  username: string;
  userArticles: IArticle[];
};

const SideBar: React.FC<SideBarProps> = ({ username, userArticles }) => {
  const navigate = useNavigate();

  const { setSelectedArticle } = useContext(ArticleContext);

  const handleArticleClick = (article: IArticle) => {
    setSelectedArticle(article);
    navigate(`/dashboard/article/${article._id}`);
  };

  return (
    <Box w="250px" h="100vh" borderRight="1px" borderColor="gray.200" px="4">
      <Flex alignItems="center" mt="4">
        <Text fontSize="xl" fontWeight="bold">
          {username}
        </Text>
      </Flex>
      <Box mt="8">
        <Stack mt="4">
          {userArticles.length > 0 ? (
            <Box>
              <Box flex="1" textAlign="left" mb={2}>
                Notes
              </Box>
              <VStack spacing={0}>
                {userArticles.map((article) => (
                  <Button
                    key={article._id}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => handleArticleClick(article)}
                  >
                    {article.title ? article.title : "無題"}
                  </Button>
                ))}
              </VStack>
            </Box>
          ) : (
            <Text color="gray.400">No notes yet.</Text>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default SideBar;
