// React
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import createTicketApi from "../../api/createTicket";
import getUserTicketsApi from "../../api/getUserTickets";

// Redux
import { connect } from "react-redux";

// Actions
import { RESET_STATE, TICKET_INPUT_CHANGED } from "../../actions/actions";

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
  ExpansionPanelActions,
  Paper,
  TextField,
  Grid
} from "@material-ui/core";
import AnnoucementIcon from "@material-ui/icons/Announcement";
import AddIcon from "@material-ui/icons/AddCircle";
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
    margin: "1vh 0"
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
  },

  paper: {
    marginTop: "17vh",
    textAlign: "center"
  },

  formWrapper: {
    padding: 20
  },

  form: {
    display: "flex",
    flexDirection: "column"
  },

  formButton: {
    width: "50%",
    margin: "20px auto 0px auto"
  }
};

class AdminDashboard extends Component {
  state = {
    expanded: null,
    activeTab: 0
  };

  // On mounting reset previous state
  componentWillMount = () => {
    this.props.onMountResetState();
  };

  // Active tab change
  handleActiveChange = (event, activeTab) => {
    this.setState({ activeTab });
  };

  // Tab expanded panel change
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  // Handle new ticket form submit
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { activeTab, expanded } = this.state;

    this.props.userTickets.length === 0 &&
      this.props.getTickets(this.props.userID);
    console.log(this.props);

    return (
      <>
        {console.log(this.props)}
        {/* ---------- "MY TICKETS" TAB ---------- */}
        <AppBar position="static" color="default">
          <Tabs
            value={activeTab}
            onChange={this.handleActiveChange}
            indicatorColor="primary"
            textColor="primary"
            centered={true}
            scrollable={false}
          >
            <Tab label="My tickets" icon={<AnnoucementIcon />} />
            <Tab label="New ticket" icon={<AddIcon />} />
          </Tabs>
        </AppBar>
        {activeTab === 0 && (
          <div>
            {this.props.userTickets.map(ticket => {
              return (
                <div key={ticket.ticketID}>
                  <ExpansionPanel
                    expanded={expanded === ticket.ticketID}
                    onChange={this.handleChange(ticket.ticketID)}
                    className={classes.expansionBar}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>Me</Typography>
                      <Typography className={classes.secondaryHeading}>
                        {ticket.title}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                      className={classes.expansionPanelDetails}
                    >
                      <Divider />
                      <Typography className={classes.ticketDate}>
                        Date:{" "}
                        {ticket.dateOfCreation
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </Typography>
                      <Typography className={classes.ticketStatus}>
                        Status: {ticket.status}
                      </Typography>

                      <Typography className={classes.ticketStatus}>
                        Description:
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.ticketBody}
                      >
                        {ticket.description}
                      </Typography>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions
                      className={classes.expansionPanelActions}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          this.props.history.push(`/edit/${ticket.ticketID}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button size="small">Cancel</Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 1 && (
          <>
            <Grid container>
              <Grid item xs={1} sm={3} md={4} />
              <Grid item xs={10} sm={6} md={4}>
                <Paper className={classes.paper}>
                  {/* WRAPPER FOR PADDING */}
                  <div className={classes.formWrapper}>
                    {/* FORM TITLE */}
                    <Typography variant="h5">Create new ticket</Typography>

                    {/* FORM */}
                    <form
                      onSubmit={event =>
                        this.props.handleSubmit(
                          event,
                          this.props.userID,
                          this.props.ticketTitle,
                          this.props.ticketDescription,
                          this.props.ticketCreationDate,
                          "new",
                          this.props.history
                        )
                      }
                      className={classes.form}
                    >
                      {/* TICKET TITLE */}
                      <TextField
                        required
                        id="title"
                        name="title"
                        label="Ticket title"
                        className={classes.textField}
                        margin="normal"
                        value={this.props.ticketTitle}
                        onChange={this.props.onInputChange}
                      />

                      {/* TICKET DESCRIPTION */}
                      <TextField
                        required
                        id="description"
                        name="description"
                        label="Ticket description"
                        multiline
                        rows="4"
                        margin="normal"
                        value={this.props.ticketDescription}
                        onChange={this.props.onInputChange}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.formButton}
                      >
                        Send
                      </Button>
                    </form>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={1} sm={3} md={4} />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticketTitle: state.ticketReducer.title,
    ticketDescription: state.ticketReducer.description,
    ticketCreationDate: state.ticketReducer.created,
    userID: state.loggerReducer.userID,
    userTickets: state.ticketReducer.userTickets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMountResetState: () => dispatch({ type: RESET_STATE }),

    onInputChange: event => {
      dispatch({
        type: TICKET_INPUT_CHANGED,
        name: event.target.name,
        value: event.target.value
      });
    },

    handleSubmit: (
      event,
      _userID,
      _title,
      _description,
      _dateOfCreation,
      _status,
      _history
    ) => {
      dispatch({
        type: RESET_STATE
      });

      createTicketApi.createTicket(
        dispatch,
        _userID,
        _title,
        _description,
        _dateOfCreation,
        _status,
        _history
      );
    },

    getTickets: userID => {
      return getUserTicketsApi.getUserTickets(dispatch, userID);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminDashboard));
