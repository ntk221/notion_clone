import React from 'react'
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { Outlet }from "react-router-dom"

const AuthLayout = () => {
  return (
    <ChakraProvider>     
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box maxW="300px" w="full" px="6" py="8" rounded="lg" boxShadow="lg">
          <Outlet />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default AuthLayout