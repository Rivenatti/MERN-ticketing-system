import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./NotFound.scss";

class NotFound extends Component {
  //------------ SET TIME HERE ------------
  state = {
    counter: 3
  };

  componentDidMount = () => {
    const intervalId = setInterval(this.countdown, 1000);
    this.setState({ intervalId });
  };

  countdown = () => this.setState({ counter: this.state.counter - 1 });

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  render() {
    const { location } = this.props;
    const { counter } = this.state;
    return (
      <div className="NotFound">
        <div className="container">
          <p>
            Page
            <br />
            <code>
              {location.pathname}
              <br /> not found.
              <br />
              <br />
            </code>
            Redirecting to homepage in {counter} seconds
          </p>
          <div className="dot dot1" />
          <div className="dot dot2" />
          <div className="dot dot3" />
          {counter === 0 && <Redirect to="/" />}
        </div>
      </div>
    );
  }
}

export default NotFound;
