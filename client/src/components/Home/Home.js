import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Material-UI
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    marginTop: "15vh"
  },

  heading: {
    marginTop: 20,
    textAlign: "center"
  },

  content: {
    marginTop: 20,
    padding: 10
  },

  button: {
    marginTop: 20
  }
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <Grid container className={classes.container}>
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          <Typography variant="h2" className={classes.heading}>
            Welcome
          </Typography>

          <Typography variant="subtitle1" className={classes.content}>
            This is a demo version of the ticketing system project. You can log
            in as an administrator or a customer. Registration functionality is
            disabled for privacy security. For full functionality download
            project from my GitHub.
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
                >
                  Login
                </Button>
              </Link>
            )}

            <a
              href="https://github.com/Rivenatti/MERN-ticketing-system"
              style={{ marginLeft: 20 }}
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
