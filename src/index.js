import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/select2/dist/css/select2.min.css";
import "assets/vendor/quill/dist/quill.core.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-pro-react.scss?v1.0.0";
import "assets/css/util.css";
import Home from "./views/pages/reusableComponents/home/Home";
import CountryDetail from "./views/pages/reusableComponents/countryDetail/CountryDetail";

ReactDOM.render(
  <BrowserRouter>
    <Switch>

      <Route path="/country/:uniqueId"
             render={props => <CountryDetail {...props} />}/>

      <Route path="/"
             render={props => <Home {...props} />}/>
      <Redirect from="*" to="/"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
