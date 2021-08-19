import React, { useContext } from "react";
// import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
// import { userSelector } from "./redux/UserSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { _token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        _token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
