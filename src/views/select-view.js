const PubSub = require('../helpers/pub_sub');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

// subscribes to unique team list and publishes a change in the unique team list menu
SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Matches:teamList-ready', (event) => {
    this.populateSelect(event.detail);
    // console.log(event.detail);
  });

  this.selectElement.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

// populating team dropdown.  Team comes from the channel subscribed to above.
SelectView.prototype.populateSelect = function (teams) {
  teams.forEach((team, index) => {
    const option = this.createTeamOption(team, index);
    this.selectElement.appendChild(option);
  })
};

// creating team dropdown
SelectView.prototype.createTeamOption = function (team, index) {
  const option = document.createElement('option');
  option.textContent = team;
  option.value = index;
  return option;
};

module.exports = SelectView;
