import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import s from "./Global.module.css";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Home from "./pages/Home";
import Messanger from "./pages/Messanger";
import PrivateRoute from "./PrivateRoute";

function App() {
  const token = "";

  return (
    <div className={s.layout}>
      <Router>
        {token && <Sidebar />}
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signUp" component={SignUp} />
        <PrivateRoute path="/" component={Home} />
        <PrivateRoute path="/messanger" component={Messanger} />
      </Router>
    </div>
  );
}

export default App;
