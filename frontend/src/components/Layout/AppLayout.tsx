import React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <ChakraProvider>
      <Box display={"flex"}>
        <Outlet/>
      </Box>
    </ChakraProvider>
  )
}

export default AppLayout
