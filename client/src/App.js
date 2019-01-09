// React
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

// Routes
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/footer";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import UserTicketEdit from "./components/UserDashboard/UserTicketEdit/UserTicketEdit";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Logout from "./components/Logout/Logout";
import Ticket from "./components/Ticket/AdminTicket/AdminTicket";

class App extends Component {
  render() {
    // ---------------- Private route authentication
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
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute
                exact
                path="/admin-dashboard"
                component={AdminDashboard}
              />
              v
              <PrivateRoute exact path="/dashboard" component={UserDashboard} />
              <PrivateRoute exact path="/edit/:id" component={UserTicketEdit} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/adminTicket" component={Ticket} />
            </Switch>
          </div>
          <Footer />
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.loggerReducer.token
  };
};

export default connect(mapStateToProps)(App);
