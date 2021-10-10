import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
