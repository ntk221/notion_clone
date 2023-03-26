import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import axios, { formToJSON } from "axios";

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
      <div>
        <InputField
          type="text"
          placeholder="ユーザー名"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <InputField
          type="password"
          placeholder="パスワード"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <InputField
          type="email"
          placeholder="メールアドレス"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <SubmitButton onClick={handleSubmit} />
    </form>
  );
};

export default SignupForm;
