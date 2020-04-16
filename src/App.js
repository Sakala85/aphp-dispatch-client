import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import ClientVue from "./clientVue/clientVue";
import DispatchVue from "./dispatchVue/dispatchVue";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact>
        <div className="App">
          <ClientVue />
        </div>
      </Route>
      <Route path="/dispatch" exact>
        <div className="App">
          <DispatchVue />
        </div>
      </Route>
      <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
