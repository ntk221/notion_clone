import React from "react";
import { Box, Flex, Text, VStack, Stack, Button } from "@chakra-ui/react";
import { IArticle } from "../types/articleType";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { deleteArticle } from "../api/articlesApi";
import { createArticle } from "../api/articlesApi";
import { UserContext, ArticleContext } from "../contexts/contexts";

type SideBarProps = {
  username: string;
  userArticles: IArticle[];
};

const SideBar: React.FC<SideBarProps> = ({ username, userArticles }) => {
  const navigate = useNavigate();

  const { setSelectedArticle, setUserArticles } = useContext(ArticleContext);

  const handleArticleClick = (article: IArticle) => {
    setSelectedArticle(article);
    setUserArticles([
      article,
      ...userArticles.filter((a) => a._id !== article._id),
    ]);
    navigate(`/dashboard/article/${article._id}`);
  };

  const handleDeleteClick = (article: IArticle) => {
    setUserArticles(userArticles.filter((a) => a._id !== article._id));
    setSelectedArticle(null);
    deleteArticle(article);
    navigate(`/dashboard`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/`);
  };

  return (
    <Box minH="100vh" borderRight="1px" borderColor="gray.200" px="4" style={{ flexShrink: 0, width: "200px" }}>
      <Flex alignItems="left" justifyContent={"space-between"} mb="2" mt="3">
        <Text fontSize="md" fontWeight="bold">
          {username}
        </Text>
        <IconButton
          icon={<FiLogOut />}
          variant="ghost"
          colorScheme="gray"
          aria-label="Plus"
          w={5}
          size="s"
          onClick={() => handleLogout()}
        />
      </Flex>
      <Stack>
        {userArticles.length > 0 ? (
          <UserArticleList
            articles={userArticles}
            handleArticleClick={handleArticleClick}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          <Text color="gray.400">No notes yet.</Text>
        )}
      </Stack>
    </Box>
  );
};

export default SideBar;

type UserArticleListProps = {
  articles: IArticle[];
  handleArticleClick: (article: IArticle) => void;
  handleDeleteClick: (article: IArticle) => void;
};

const UserArticleList: React.FC<UserArticleListProps> = ({
  articles,
  handleArticleClick,
  handleDeleteClick,
}) => {
  const user = useContext(UserContext);
  const { setUserArticles } = useContext(ArticleContext);

  const handleCreateArticle = async () => {
    try {
      const response = await createArticle("", "", user.id);

      await setUserArticles((prev) => [response, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      maxW="200px"
      w="full"
      minH="100vh"
      px="4"
    >
      <Flex alignItems="left" justifyContent="space-between" mt="4">
        <Box
          flex="1"
          textAlign={"center"}
          fontSize="sm"
          fontWeight="bold"
          mb="4"
          color={"gray400"}
        >
          記事一覧
        </Box>
        <IconButton
          icon={<SmallAddIcon w={5} h={5} opacity="0.80" color={"gray.600"} />}
          variant="ghost"
          colorScheme="gray"
          aria-label="Plus"
          size="xs"
          onClick={() => handleCreateArticle()}
        />
      </Flex>
      <VStack spacing={0.8} align="stretch">
        {articles.map((article) => (
          <Flex key={article._id} alignItems="center">
            <Button
              key={article._id}
              size="md"
              fontSize={"sm"}
              variant="ghost"
              colorScheme="blue"
              onClick={() => handleArticleClick(article)}
              style={{ wordWrap: "break-word" }}
              whiteSpace="normal"
              flex="1"
            >
              {article.title ? article.title : "無題"}
            </Button>
            <IconButton
              icon={<DeleteIcon opacity="0.16" />}
              variant="ghost"
              colorScheme="gray"
              aria-label="Close"
              size="xs"
              onClick={() => handleDeleteClick(article)}
            />
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};
