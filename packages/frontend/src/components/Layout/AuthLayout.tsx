import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/check-auth", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setToken(localStorage.getItem("token"));
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      checkAuth();
    }
  }, [token]);

  if (token) return null;

  return (
    <ChakraProvider>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box maxW="300px" w="full" px="6" py="8" rounded="lg" boxShadow="lg">
          <Outlet />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default AuthLayout;
