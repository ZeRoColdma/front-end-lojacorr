import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import LoginPage from "../src/pages/Login/index";
import Index from "../src/pages/Index/index";
import Register from "../src/pages/Register/index";

import { isAuthenticated } from "./service/auth";

export default function Routes() {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/index" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}
