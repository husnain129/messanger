import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { clearState, loginUser, userSelector } from "../../../redux/UserSlice";
import s from "./Login.module.css";

function Login({ history }) {
  const { user, isSuccess, isError, errorMessage } = useSelector(userSelector);
  const { setToken, setUserContext } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [userd, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userd;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(loginUser(userd));
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
      history.push("/");
    }
  }, [isError, isSuccess, dispatch]);

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
        <div className={s.optional}>
          <p>
            If new user then click
            <Link to="/auth/signUp" className={s.optionalLink}>
              <span>register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
