import React, { useState, FormEvent } from "react";
import axios, { formToJSON } from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const jsonData = formToJSON(formData);
    try {
      const response = await axios.post("/signup", jsonData, {
        headers: { "Content-type": "application/json" },
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(response);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.error);
        setErrorMessage(error.response?.data.error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Box>
      {errorMessage && (
        <Text color="red" mb="4">
          {errorMessage}
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl id="username">
            <FormLabel>ユーザー名</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Eメール</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" w="full">
            登録する
          </Button>
        </VStack>
      </form>
      <Text mt="4">
        アカウントをお持ちですか？{" "}
        <Link href="/login" color="blue">
          ログイン
        </Link>
      </Text>
    </Box>
  );
};

export default SignupForm;
