import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topbar from "./component/layout-component/Topbar";

import MarketPlace from "./component/MarketPlace";
import Post from "./component/Post";
import PostCreation from "./component/PostCreation";
import Chat from "./component/Chat";

const Router = () => (
  <BrowserRouter>
    {/* <Topbar /> */}
    <Switch>
      <Route
        path="/"
        exact
        render={props => (
          <Fragment>
            <Topbar {...props} />
            <MarketPlace {...props} />
          </Fragment>
        )}
      />
      <Route
        path="/post"
        exact
        render={props => (
          <Fragment>
            <Topbar {...props} />
            <PostCreation {...props} />
          </Fragment>
        )}
      />
      <Route
        path="/post/:id"
        exact
        render={props => (
          <Fragment>
            <Topbar {...props} />
            <Post {...props} />
          </Fragment>
        )}
      />
      <Route
        path="/chat/:userId/:otherId"
        exact
        render={props => (
          <Fragment>
            <Topbar {...props} />
            <Chat {...props} />
          </Fragment>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
