const dateFormat = require('dateformat');
const InfoViewNested = function () {
}

InfoViewNested.prototype.createInfoDetail = function (match) {
  const matchDetail = document.createElement('div');
  matchDetail.classList.add('match-detail');

 const penalties = () => {
    if (match.stage_name != "First stage"){
     if(match.home_team.goals === match.away_team.goals){
       return `Penalties: ${match.home_team_country}  (${match.home_team.penalties}) , ${match.away_team_country}  (${match.away_team.penalties})`;
     };
    };
   return ""
  };

  const linebreak1 = document.createElement("br");
  matchDetail.appendChild(linebreak1);

  const countryName = document.createElement('h3');
  countryName.textContent = `${match.home_team_country} (${match.home_team.goals}) v  ${match.away_team_country} (${match.away_team.goals})`;
  matchDetail.appendChild(countryName);

  const extratimeresult = document.createElement('h4');
  extratimeresult.textContent = `${penalties()}`;
  matchDetail.appendChild(extratimeresult);

  const detailsList = document.createElement('ul');

  const stage = this.createDetailListItem('Round', match.stage_name);
  detailsList.appendChild(stage);

  const matchDate = this.createDetailListItem('Date', dateFormat(match.datetime,"fullDate"));
  detailsList.appendChild(matchDate);

  const venue = this.createDetailListItem('Location', match.venue);
  detailsList.appendChild(venue);

  const attendance = this.createDetailListItem('Attendance', match.attendance);
  detailsList.appendChild(attendance);

  // const linebreak2 = document.createElement("br");
  // detailsList.appendChild(linebreak2);

  matchDetail.appendChild(detailsList);
  return matchDetail;
};

InfoViewNested.prototype.createDetailListItem = function (label, property) {
  const element = document.createElement('li');
  element.textContent = `${label} : ${property}`;
  return element;
};




module.exports = InfoViewNested;
