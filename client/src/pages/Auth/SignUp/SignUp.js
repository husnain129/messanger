import React, { useState } from "react";
import s from "./SignUp.module.css";
function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    gender,
  } = user;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("firstName = ", firstName);
    console.log("lastName = ", lastName);
    console.log("username = ", username);
    console.log("email = ", email);
    console.log("password = ", password);
    console.log("confirmPassword = ", confirmPassword);
  };

  return (
    <div className={s.container}>
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
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={confirmPassword}
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
      </div>
    </div>
  );
}

export default SignUp;
