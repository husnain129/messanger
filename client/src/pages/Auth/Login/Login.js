import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAuth from "../../../hooks/useAuth";
import s from "./Login.module.css";

function Login({ history }) {
  const api = useAuth();
  const { setToken } = useContext(AuthContext);
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
    (async () => {
      await api.login(user).then((d) => {
        if ((d.status = "success")) {
          setToken(d.token);
          history.push("/");
        }
      });
    })();
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
