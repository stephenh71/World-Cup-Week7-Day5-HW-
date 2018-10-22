const PubSub = require('../helpers/pub_sub.js');
const InfoViewNested = require('./info-view-nested');

const InfoView = function (container) {
  this.container = container;
  event.detail = [];
};

InfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Matches:byTeam-ready', (event) => {
    console.log(event.detail);
    this.teamMatches = event.detail
    this.clearList();
    this.renderInfoNestedViews(event.detail);
  });
};

InfoView.prototype.clearList = function () {
  this.container.innerHTML = '';
};

InfoView.prototype.renderInfoNestedViews = function (matches) {
  matches.forEach((match) => {
    const matchItem = this.createMatchListItem(match);
    this.container.appendChild(matchItem);
  });
};

InfoView.prototype.createMatchListItem = function (match) {
  const infoViewNested = new InfoViewNested();
  const infoDetail = infoViewNested.createInfoDetail(match);
  return infoDetail;
};

module.exports = InfoView;
