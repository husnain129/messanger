import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useAuth from "../../../hooks/useAuth";
import s from "./SignUp.module.css";
function SignUp({ history }) {
  const { setToken } = useContext(AuthContext);
  const api = useAuth();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    gender: "",
  });

  const {
    firstName,
    lastName,
    username,
    email,
    password,
    passwordConfirm,
    gender,
  } = user;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    (async () => {
      await api.signUp(user).then((d) => {
        if ((d.status = "success")) {
          setToken(d.token);
          history.push("/editProfile");
        }
      });
    })();
  };

  return (
    <div className={s.container}>
      <div className={s.divider}>
        <div className={s.form}>
          <div className={s.flex}>
            <p>First Name</p>
            <input
              name="firstName"
              onChange={handleChange}
              type="text"
              value={firstName}
              className={s.input_long}
            />
          </div>
          <div className={s.flex}>
            <p>Last Name</p>
            <input
              name="lastName"
              onChange={handleChange}
              type="text"
              value={lastName}
              className={s.input_long}
            />
          </div>
          <div className={s.flex}>
            <p>Username</p>
            <input
              name="username"
              onChange={handleChange}
              type="text"
              value={username}
              className={s.input_long}
            />
          </div>
          <div className={s.flex}>
            <p>Email</p>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              value={email}
              className={s.input_long}
            />
          </div>
          <div className={s.flex}>
            <p>Password</p>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              value={password}
              className={s.input_long}
            />
          </div>
          <div className={s.flex}>
            <p>Password Confirm</p>
            <input
              name="passwordConfirm"
              onChange={handleChange}
              type="password"
              value={passwordConfirm}
              className={s.input_long}
            />
          </div>
          <div className={s.flex}>
            <p>Gender</p>
            <select
              className={s.select}
              value={gender}
              name="gender"
              onChange={handleChange}
            >
              <option>Gender</option>
              <option>male</option>
              <option>female</option>
            </select>
          </div>
          <div className={s.btn} onClick={handleSubmit}>
            <p>Sign Up</p>
          </div>
          <div className={s.optional}>
            <p>
              Already have an account then click
              <Link to="/auth/login" className={s.optionalLink}>
                <span>login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
