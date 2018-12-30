// React
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
  // Redirect
} from "react-router-dom";

// Routes
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/footer";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
  render() {
    //---------------- Private admin route authentication (check if there is a token in the store)
    // const PrivateRoute = ({ component: Component, ...rest }) => {
    //   return (
    //     <Route
    //       {...rest}
    //       render={props => {
    //         return this.props.token === true ? (
    //           <Component {...props} />
    //         ) : (
    //           <Redirect to="/" />
    //         );
    //       }}
    //     />
    //   );
    // };

    return (
      <Router>
        <>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
