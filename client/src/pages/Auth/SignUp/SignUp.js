import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { clearState, signupUser, userSelector } from "../../../redux/UserSlice";
import s from "./SignUp.module.css";
function SignUp({ history }) {
  const { user, isSuccess, isError, errorMessage } = useSelector(userSelector);
  const { setToken, setUserContext } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [userD, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const {
    username,
    email,
    password,
    passwordConfirm,
  } = userD;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(signupUser(userD));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
    }
    if (isSuccess) {
      dispatch(clearState());
      setToken(user.token);
      setUserContext(user);
      history.push("/editProfile");
    }
  }, [isError, isSuccess, dispatch]);

  return (
    <div className={s.container}>
      <div className={s.divider}>
        <div className={s.form}>
          
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
