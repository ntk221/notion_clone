import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <ChakraProvider>
      <Outlet/>
    </ChakraProvider>
  )
}

export default AppLayout