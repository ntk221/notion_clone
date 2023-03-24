import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

const SignupForm: React.FC = () => {
  const handleSubmit = () => {console.log("hoge")};
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
        <SubmitButton onSubmit={handleSubmit} />
    </form>
  );
};

export default SignupForm;
