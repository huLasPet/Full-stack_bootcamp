import React from "react";
import { Input } from "./Input.jsx";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";

function LoginForm() {
  return (
    <form className="form">
      <Header />
      <Input type="text" name="username" placeholder="Username" />
      <Input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
      <Footer />
    </form>
  );
}

export { LoginForm };
