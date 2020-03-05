import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topbar from "./component/layout-component/Topbar";

import MarketPlace from "./component/MarketPlace";
import Post from "./component/Post";

const Router = () => (
  <BrowserRouter>
    <Topbar />
    <Switch>
      <Route path="/" exact component={MarketPlace} />
      <Route path="/post/:id" component={Post} />
    </Switch>
  </BrowserRouter>
);

export default Router;
