// React
import React, { Component } from "react";
// import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { RESET_STATE } from "../../actions/actions";

// Material-UI
import {
  AppBar,
  Tabs,
  Tab,
  Button,
  Typography,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from "@material-ui/core";
import AnnoucementIcon from "@material-ui/icons/Announcement";
import BuildIcon from "@material-ui/icons/Build";
import DoneIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";

// Material UI custom styles
const styles = {
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: 18
  },

  secondaryHeading: {
    fontSize: 18
  },

  expansionBar: {
    overflow: "hidden",
    margin: "1vh 0",
    backgroundColor: "#ddd"
  },

  expansionPanelDetails: {
    flexDirection: "column",
    backgroundColor: "#fff"
  },

  expansionPanelActions: {
    backgroundColor: "#fff"
  },

  ticketDate: {
    padding: "1vh 0",
    fontSize: 17
  },

  ticketStatus: {
    padding: "1vh 0",
    fontSize: 17
  },

  ticketBody: {
    padding: "2vh 0 0 0"
  }
};

class AdminDashboard extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  componentWillMount = () => {
    this.props.onMountResetState();
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <>
        <AppBar position="static" color="default">
          <Tabs
            //   value={value}
            // onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered={true}
            scrollable={false}
          >
            <Tab label="New" icon={<AnnoucementIcon />} />
            <Tab label="In progress" icon={<BuildIcon />} />
            <Tab label="Done" icon={<DoneIcon />} />
            <Tab label="Cancelled" icon={<CancelIcon />} />
          </Tabs>
        </AppBar>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
          className={classes.expansionBar}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Josh Snow</Typography>
            <Typography className={classes.secondaryHeading}>
              Internet connection problem.
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <Divider />
            <Typography className={classes.ticketDate}>
              Date: 14.12.2018
            </Typography>
            <Typography className={classes.ticketStatus}>
              Status: New
            </Typography>

            <Typography className={classes.ticketStatus}>
              Description:
            </Typography>
            <Typography variant="body1" className={classes.ticketBody}>
              I can't reach certain website on my laptop. I can ping it from my
              command terminal, but my browser always throws an error: "503
              service unavailable".
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions className={classes.expansionPanelActions}>
            <Button size="small" color="primary">
              Start
            </Button>

            <Button size="small">Cancel</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onMountResetState: () => dispatch({ type: RESET_STATE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminDashboard));
