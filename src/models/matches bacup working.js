const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js')

const Matches = function () {
  this.matches = [];
  this.home_team_country = [];
  this.matchesData = null;
  this.foundMatchesData = null;
};

// get full matches data set and publish match data for team
Matches.prototype.getData = function () {
  const request = new Request("https://worldcup.sfg.io/matches");
  request.get((data) => {
    this.matches = data
    PubSub.publish('Matches:all-matches-ready', data)
    console.log(data);

    PubSub.subscribe('SelectView:change', (event) => {
      const teamIndex = event.detail;
      console.log(teamIndex);
      this.publishMatchesByTeam(teamIndex);
    });
    this.publishTeams(this.matches);
  });
};

// Publishes the unique list of home teams
Matches.prototype.publishTeams = function (data) {
  this.matchesData = data;
  this.home_team_country = this.uniqueTeamList();
  PubSub.publish('Matches:teamList-ready', this.home_team_country);
  // console.log(this.home_team_country);
};

// Prepares array of all home teams - not unique :
Matches.prototype.teamList = function () {
const fullList = this.matchesData.map(match => match.home_team_country);
return fullList;
};

// Creates the array of unique home teams
Matches.prototype.uniqueTeamList = function () {
  return this.teamList().filter((team, index, array) => {
    return array.indexOf(team) === index;
  });
};

// Filters all match data by home team.
Matches.prototype.matchesByTeam = function (teamIndex) {
  const selectedTeam = this.home_team_country[teamIndex];
      console.log(selectedTeam);
  return this.matchesData.filter((matches) => {
    return (matches.home_team_country === selectedTeam) || (matches.away_team_country === selectedTeam);
    console.log(this.matchesData);
  });
};

// Publishes match data for home team
Matches.prototype.publishMatchesByTeam = function (teamIndex) {
  const foundMatches = this.matchesByTeam(teamIndex);
  PubSub.publish('Matches:byteam-ready', foundMatches);
  console.log(foundMatches);
};

module.exports = Matches;
