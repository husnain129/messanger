import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { AuthContext } from "./context/AuthContext";
import s from "./Global.module.css";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import EditProfile from "./pages/editProfile/EditProfile";
import Home from "./pages/Home";
import Messanger from "./pages/Messanger";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { token } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    console.log("as,db,asdnlsda");
  }, [history]);
  return (
    <div className={s.layout}>
      <Router>
        {token && <Sidebar />}
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signUp" component={SignUp} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/messanger" component={Messanger} />
        <PrivateRoute path="/editProfile" component={EditProfile} />
      </Router>
    </div>
  );
}

export default App;
