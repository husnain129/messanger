import { useContext, useState } from "react";
import { BiPhoneIncoming } from "react-icons/bi";
import { FiPhoneOff } from "react-icons/fi";
import { IconContext } from "react-icons/lib";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import VideoCall from "./components/videoCall/VideoCall";
import { AuthContext } from "./context/AuthContext";
import s from "./Global.module.css";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import EditProfile from "./pages/editProfile/EditProfile";
import Home from "./pages/Home";
import Messanger from "./pages/Messanger";
import PrivateRoute from "./PrivateRoute";
function App() {
  const { _token } = useContext(AuthContext);
  const [receiveCall, setReceiveCall] = useState(true);
  const [call, setCall] = useState(false);
  return (
    <div className={s.layout}>
      {call && <VideoCall call={call} setCall={setCall} />}
      <Router>
        {_token && <Sidebar />}
        {_token && receiveCall && (
          <>
            <div className={s.call}>
              <img
                src="https://www.leftoye.com/wp-content/uploads/2021/04/Emma-Watson.png"
                alt="emma"
                className={s.image}
              />
              <div className={s.iconContainer}>
                <div
                  className={s.icons}
                  onClick={() => {
                    setCall(true);
                    setReceiveCall(false);
                  }}
                  style={{ backgroundColor: "green" }}
                >
                  <IconContext.Provider value={{ color: "white" }}>
                    <BiPhoneIncoming size={26} />
                  </IconContext.Provider>
                </div>
                <div className={s.icons} style={{ backgroundColor: "red" }}>
                  <IconContext.Provider value={{ color: "white" }}>
                    <FiPhoneOff size={26} />
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          </>
        )}
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
