import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topbar from "./component/Topbar";

import MarketPlace from "./component/MarketPlace";
import Post from "./component/Post";
import PostCreation from "./component/PostCreation";
import Register from "./component/Register";
import Chat from "./component/Chat";
import Profile from "./component/Profile";
class Router extends React.Component {
  state = {
    keywords: []
  };
  onSearchSubmit = value => {
    this.setState({ keywords: value });
  };
  render() {
    const { keywords } = this.state;
    return (
      <BrowserRouter>
        {/* <Topbar /> */}
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Fragment>
                <Topbar onSearchSubmit={this.onSearchSubmit} {...props} />
                <MarketPlace keywords={keywords} {...props} />
              </Fragment>
            )}
          />
          <Route
            path="/post"
            exact
            render={props => (
              <Fragment>
                <Topbar onSearchSubmit={this.onSearchSubmit} {...props} />
                <PostCreation {...props} />
              </Fragment>
            )}
          />
          <Route
            path="/post/:id"
            exact
            render={props => (
              <Fragment>
                <Topbar onSearchSubmit={this.onSearchSubmit} {...props} />
                <Post {...props} />
              </Fragment>
            )}
          />
          <Route
            path="/register"
            exact
            render={props => (
              <Fragment>
                <Topbar onSearchSubmit={this.onSearchSubmit} {...props} />
                <Register {...props} />
              </Fragment>
            )}
          />
          <Route
            path="/user/:id"
            exact
            render={props => (
              <Fragment>
                <Topbar onSearchSubmit={this.onSearchSubmit} {...props} />
                <Profile {...props} />
              </Fragment>
            )}
          />
          <Route
            path="/chat/:userId/:otherId"
            exact
            render={props => (
              <Fragment>
                <Topbar onSearchSubmit={this.onSearchSubmit} {...props} />
                <Chat {...props} />
              </Fragment>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
