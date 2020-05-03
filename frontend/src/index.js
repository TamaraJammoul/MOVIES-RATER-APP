import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/" component={Login} />
      <Route exact path="/movies/" component={App} />
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
