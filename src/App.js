import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { compose, splitEvery } from 'ramda';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class App extends Component {
  state = {
    players: '',
    numTeams: 2,
    teams: undefined,
  };

  handleNumTeamsChange = (e) =>
    this.setState({ numTeams: e.target.value });

  handlePlayersChange = (e) =>
    this.setState({ players: e.target.value });

  submitForm = (e) =>
    this.setState({
      teams: randomizeTeams(
        this.state.players,
        this.state.numTeams,
      )
    });

  render() {
    const { classes } = this.props;
    const { players, numTeams, teams } = this.state;
    return (
      <form noValidate autoComplete="false" className={classes.root}>
        <Grid container spacing={8}>

          <Grid item xs={12}>
            <TextField
              value={numTeams}
              onChange={this.handleNumTeamsChange}
              className={classes.textField}
              label="Number of Teams"
              select
            >
              <MenuItem key={2} value={2}>2</MenuItem>
              <MenuItem key={3} value={3}>3</MenuItem>
              <MenuItem key={4} value={4}>4</MenuItem>
              <MenuItem key={5} value={5}>5</MenuItem>
            </TextField>
            <TextField
              label="Players"
              className={classes.textField}
              value={players}
              onChange={this.handlePlayersChange}
              helperText="A comma-separated list of player names."
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={this.submitForm} onSubmit={this.submitForm}>Create Teams</Button>
          </Grid>
          {
            teams &&
            teams.map((team, idx) => (
              <Grid key={idx} item xs={12}>
                <Typography variant="title">Team {idx + 1}</Typography>
                <Typography>{ team.join(', ') }</Typography>
              </Grid>
            ))
          }
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(App)

const randomizeTeams = (players, numTeams) => compose(
  players => splitEvery(players.length / numTeams, players),
  players => shuffle(players),
  players => players.split(','),
)(players);

/**
 * https://stackoverflow.com/a/2450976/1593258
*/
const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
