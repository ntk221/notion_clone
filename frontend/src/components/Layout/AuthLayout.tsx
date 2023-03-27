import React from 'react'
import { Flex, Box } from "@chakra-ui/react";
import { Outlet }from "react-router-dom"

const AuthLayout = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box maxW="400px" w="full" px="6" py="8" rounded="lg" boxShadow="lg">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default AuthLayout