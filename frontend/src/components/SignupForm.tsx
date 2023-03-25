import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import axios from "axios";

const SignupForm: React.FC = () => {
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form;
    if (!form) return; 
    const formData = new FormData(form);
    try {
        const response = await axios.post('/api/register', formData);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
  };
  return (
    <form>
        <div>
            <InputField type="text" placeholder="ユーザー名" />
        </div>
        <div>
            <InputField type="password" placeholder="パスワード" />
        </div>
        <div>
            <InputField type="email" placeholder="メールアドレス" />
        </div>
        <SubmitButton onClick={handleSubmit} />
    </form>
  );
};

export default SignupForm;
