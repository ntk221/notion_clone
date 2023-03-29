import React from 'react';
import { Box, Text, Button, VStack} from "@chakra-ui/react";

interface SidebarProps {
    userName: string;
    articles: string[];
    onNewArticleClick: () => void;
}

const SideBar: React.FC<SidebarProps> = ({ userName, articles, onNewArticleClick}) => {
  return (
    <Box w="200px" h="100vh" bgColor="gray.100" p="4">
        <Text fontSize="xl" fontWeight="bold" mb="8">
            {userName}
        </Text>
        <VStack spacing="4" align="stretch">
            <Text fontWeight="bold">記事一覧</Text>
            {
                articles.map((article) => (
                    <Text key={article}>{article}</Text>
                ))
            }
        </VStack>
        <Button
        colorScheme="blue"
        mt="8"
        w="full"
        onClick={onNewArticleClick}
        >
            新規記事を作成
        </Button>
    </Box>
  )
}

export default SideBar