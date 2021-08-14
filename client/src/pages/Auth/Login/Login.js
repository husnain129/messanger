import React, { useState } from "react";
import s from "./Login.module.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    console.log("email = ", email);
    console.log("password = ", password);
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <div className={`${s.subject} ${s.flex}`}>
          <p>Email</p>
          <input
            value={email}
            name="email"
            onChange={handleChange}
            type="email"
            className={s.input_long}
          />
        </div>
        <div className={`${s.subject} ${s.flex}`}>
          <p>Password</p>
          <input
            value={password}
            name="password"
            onChange={handleChange}
            type="password"
            className={s.input_long}
          />
        </div>
        <div className={s.btn} onClick={handleSubmit}>
          <p>Login</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
