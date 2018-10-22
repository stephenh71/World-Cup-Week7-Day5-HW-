const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js')

const Matches = function () {
  this.matches = []
};

// get full matches data set and publish match data for team and calls total stats function
Matches.prototype.getData = function () {
  const request = new Request("https://worldcup.sfg.io/matches");
  request.get((data) => {
    this.matches = data
    PubSub.publish('Matches:all-matches-ready', data)
    // console.log(data);

    PubSub.subscribe('SelectView:change', (event) => {
      const teamIndex = event.detail;
      // console.log(teamIndex);
      this.publishMatchesByTeam(teamIndex);
    });
    this.publishTeams();
    this.totalStat();
  });
};

// Publishes the unique list of home teams
Matches.prototype.publishTeams = function () {
  this.home_team_country = this.uniqueTeamList().sort();
  PubSub.publish('Matches:teamList-ready', this.home_team_country);
  // console.log(this.home_team_country);
};

// Prepares array of all home teams - not unique :
Matches.prototype.teamList = function () {
const fullList = this.matches.map(match => match.home_team_country);
return fullList;
};

// Creates the array of unique home teams
Matches.prototype.uniqueTeamList = function () {
  return this.teamList().filter((team, index, array) => {
    return array.indexOf(team) === index;
  });
};

// Filters all match data by team and calls team stats function
Matches.prototype.matchesByTeam = function (teamIndex) {
  const selectedTeam = this.home_team_country[teamIndex];
      // console.log(selectedTeam);
  const foundMatches = this.matches.filter((matches) => {
    return (matches.home_team_country === selectedTeam) || (matches.away_team_country === selectedTeam);
  });
  this.teamStat(foundMatches, selectedTeam);
  return(foundMatches);
};

// Publishes match data for home team
Matches.prototype.publishMatchesByTeam = function (teamIndex) {
  const publishMatches = this.matchesByTeam(teamIndex);
  PubSub.publish('Matches:byTeam-ready', publishMatches);
  // console.log(publishMatches);
  return(publishMatches);
};


Matches.prototype.teamStat = function (teamMatches, selectedTeam) {
  teamStats = {};

  const team = selectedTeam;
  teamStats.team = team;

  const stage = teamMatches[teamMatches.length-1].stage_name;
  teamStats.stage = stage;


  const totalMatches = teamMatches.length;
  teamStats.matches = totalMatches;

  const teamGoals = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team.goals;
    }
      return runningTotal + match.away_team.goals;
    }
    ,0);
  teamStats.goals = Math.round(teamGoals/totalMatches*10)/10;

  const teamAttempts = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team_statistics.attempts_on_goal;
    }
      return runningTotal + match.away_team_statistics.attempts_on_goal;
    }
    ,0);
  teamStats.attempts = Math.round(teamAttempts/totalMatches*10)/10;

  const teamOnTarget = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team_statistics.on_target;
    }
      return runningTotal + match.away_team_statistics.on_target;
    }
    ,0);
  teamStats.onTarget = Math.round(teamOnTarget/totalMatches*10)/10;

  const teamFouls = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team_statistics.fouls_committed;
    }
      return runningTotal + match.away_team_statistics.fouls_committed;
    }
    ,0);
  teamStats.fouls = Math.round(teamFouls/totalMatches*10)/10;

  const teamYellows = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team_statistics.yellow_cards;
    }
      return runningTotal + match.away_team_statistics.yellow_cards;
    }
    ,0);
  teamStats.yellows = Math.round(teamYellows/totalMatches*10)/10;

  const teamReds = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team_statistics.red_cards;
    }
      return runningTotal + match.away_team_statistics.red_cards;
    }
    ,0);
  teamStats.reds = Math.round(teamReds/totalMatches*10)/10;

  const teamPossession = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team_statistics.ball_possession;
    }
      return runningTotal + match.away_team_statistics.ball_possession;
    }
    ,0);
  teamStats.posession = Math.round(teamPossession/totalMatches*1)/1;

  const teamPassAccuracy = teamMatches.reduce((runningTotal, match) => {
    if(match.home_team_country === selectedTeam){
      return runningTotal + match.home_team_statistics.pass_accuracy;
    }
      return runningTotal + match.away_team_statistics.pass_accuracy;
    }
    ,0);
  teamStats.passAccuracy = Math.round(teamPassAccuracy/totalMatches*1)/1;

  PubSub.publish('Team:stats-ready', teamStats)
  console.log(teamStats);
  return teamStats
};

Matches.prototype.totalStat = function () {
  totalStats = {};

  const totalMatches = this.matches.length*2;
  totalStats.matches = totalMatches;

  const totalGoals = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team.goals + match.away_team.goals;
  },0);
  totalStats.goals = Math.round(totalGoals/totalMatches*10)/10;

  const totalAttempts = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team_statistics.attempts_on_goal + match.away_team_statistics.attempts_on_goal;
  },0);
  totalStats.attempts = Math.round(totalAttempts/totalMatches*10)/10;

  const totalOnTarget = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team_statistics.on_target + match.away_team_statistics.on_target;
  },0);
  totalStats.onTarget = Math.round(totalOnTarget/totalMatches*10)/10;

  const totalFouls = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team_statistics.fouls_committed + match.away_team_statistics.fouls_committed;
  },0);
  totalStats.fouls = Math.round(totalFouls/totalMatches*10)/10;

  const totalYellows = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team_statistics.yellow_cards + match.away_team_statistics.yellow_cards;
  },0);
  totalStats.yellows = Math.round(totalYellows/totalMatches*10)/10;

  const totalReds = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team_statistics.red_cards + match.away_team_statistics.red_cards;
  },0);
  totalStats.reds = Math.round(totalReds/totalMatches*10)/10;

  const totalPosession = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team_statistics.ball_possession + match.away_team_statistics.ball_possession;
  },0);
  totalStats.posession = Math.round(totalPosession/totalMatches*10)/10;

  const totalPassAccuracy = this.matches.reduce((runningTotal, match) => {
    return runningTotal + match.home_team_statistics.pass_accuracy + match.away_team_statistics.pass_accuracy;
  },0);
  totalStats.passAccuracy = Math.round(totalPassAccuracy/totalMatches*10)/10;

  PubSub.publish('Total:stats-ready', totalStats)
  console.log(totalStats);
  return totalStats;
};

module.exports = Matches;
