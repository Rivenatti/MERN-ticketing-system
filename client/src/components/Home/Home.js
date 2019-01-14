import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Material-UI
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    margin: "15vh 0"
  },

  heading: {
    marginTop: 20,
    textAlign: "center"
  },

  content: {
    marginTop: 20,
    padding: 10
  },

  link: {
    textDecoration: "none"
  },

  button: {
    textDecoration: "none",
    marginTop: 20
  }
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6} className={classes.container}>
          <Typography variant="h2" className={classes.heading}>
            Welcome
          </Typography>

          <Typography variant="subtitle1" className={classes.content}>
            This is a full version of the ticketing system project. This project
            was created in purpose to learn and practice MERN stack (MySQL,
            Express, React.js, Node.js) with Redux.js.
            <br />
            <br />
            To create an account click on 'login' button bellow and then click
            on 'create an account' at the bottom of the opened page.
            <br />
            To create an admin account, create normal account and then in
            database in 'users' table change user role to 'admin'.
            <br />
            <br />I hope you enjoyed my project. For more projects you can check
            out my GitHub page.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: 20, textAlign: "center" }}
          >
            {this.props.token ? (
              this.props.role === "user" ? (
                <Link to="/dashboard" className={classes.link}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/admin-dashboard" className={classes.link}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Admin dashboard
                  </Button>
                </Link>
              )
            ) : (
              <Link to="/login" className={classes.link}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  // onClick={() => this.props.history.push('/login')}
                >
                  Login
                </Button>
              </Link>
            )}

            <a
              href="https://github.com/Rivenatti/MERN-ticketing-system"
              style={{ marginLeft: 20 }}
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                GitHub
              </Button>
            </a>
          </Typography>
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.loggerReducer.token,
    role: state.loggerReducer.role
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
