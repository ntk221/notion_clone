import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AuthHome = () => {
  return (
    <Flex direction="column" align="center" justify="center" h="30vh">
      <Box mb="4">
        <Text>Notion Clone App!</Text>
      </Box>
      <Box>
        <Button as={Link} to="/login" colorScheme="blue" mb="2">
          ログイン
        </Button>
      </Box>
      <Box>
        <Button as={Link} to="/signup" colorScheme="green">
          新規登録
        </Button>
      </Box>
    </Flex>
  );
};

export default AuthHome;