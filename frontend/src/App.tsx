import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/InputField";
import InputField from "./components/InputField";
import SubmitButton from "./components/SubmitButton";

function App() {
  return (
    <div className="App">
      <InputField type="text" placeholder="ユーザー名" />
      <InputField type="text" placeholder="パスワード" />
      <InputField type="text" placeholder="メールアドレス" />
      <SubmitButton onSubmit={() => console.log("hoge")} />
    </div>
  );
}

export default App;
