import React, { useState } from "react";
import axios, { formToJSON } from "axios";
import { Button, FormControl, FormLabel, Input, Stack }from "@chakra-ui/react" 

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

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form;
    if (!form) return;
    const formData = new FormData(form);
    const jsonData = formToJSON(formData);
    try {
      const response = await axios.post("/signup", jsonData, {
        headers: { "Content-type": "application/json" },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form>
      <Stack spacing={4}>
        <FormControl id="username">
          <FormLabel>ユーザー名</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
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
        <FormControl id="email">
        <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          アカウント作成
        </Button>
      </Stack>
    </form>
  );
};

export default SignupForm;
