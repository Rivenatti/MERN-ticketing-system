import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  render() {
    //---------------- Private route authentication (check if there is a token in the store)
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props => {
            return this.props.token === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
      );
    };

    return (
      <Router>
        <>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
