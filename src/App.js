import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Updateuser from "./pages/updateuser/Updateuser";
import Registerchatbot from "./pages/registerchatbot/Registerchatbot";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/updateuser">
          <Updateuser />
        </Route>
        <Route path="/registerchatbot/:username/:chatbotMaster">
          <Registerchatbot />
        </Route>
        <Route path="/profile/:username/:chatbotKey">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
