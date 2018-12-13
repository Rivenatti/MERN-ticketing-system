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
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
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
    flexShrink: 0
  }
};

class Dashboard extends Component {
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
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Josh Snow</Typography>
            <Typography className={classes.secondaryHeading}>
              Internet connection problem.
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
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
)(withStyles(styles)(Dashboard));
