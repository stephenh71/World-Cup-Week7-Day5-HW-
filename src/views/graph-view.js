const PubSub = require('../helpers/pub_sub.js');
// const GoogleCharts = require('./google-charts');

const GraphView = function (container) {
  this.container = container;
  event.detail = [];
};

GraphView.prototype.bindEvents = function () {
  PubSub.subscribe('Team:stats-ready', (event) => {
    const stats = event.detail;
    console.log(stats);
    this.clearList();
    this.renderGraphView(stats);
  });
};

GraphView.prototype.clearList = function () {
  this.container.innerHTML = '';
  // const tableHead = document.querySelector('th');
  // while(tableHead.firstChild){tableHead.removeChild(tableHead.firstChild)};
};

GraphView.prototype.renderGraphView = function (stats) {

  const name = document.createElement('h2');
    if(stats.team === "France"){
    name.textContent = `France won the Final`;
    };
  name.textContent = `${stats.team} reached the ${stats.stage}`;
  this.container.appendChild(name);

  const heading = document.createElement('h3');
  heading.textContent = `Stats - average per game :`;
  this.container.appendChild(heading);

  const linebreak1 = document.createElement("br");
  heading.appendChild(linebreak1);

  const attempts = this.createDetailListItem('Attempts on goal  ', stats.attempts);
  this.container.appendChild(attempts);

  const onTarget = this.createDetailListItem('Attempts on target ', stats.onTarget);
  this.container.appendChild(onTarget);

  const goals = this.createDetailListItem('Goals ', stats.goals);
  this.container.appendChild(goals);

  const linebreak2 = document.createElement("br");
  goals.appendChild(linebreak2);

  const fouls = this.createDetailListItem('Fouls ', stats.fouls);
  this.container.appendChild(fouls);

  const yellows = this.createDetailListItem('Yellow cards ', stats.yellows);
  this.container.appendChild(yellows);

  const linebreak3 = document.createElement("br");
  yellows.appendChild(linebreak3);

  const posession = this.createDetailListItem('Posession (%) ', stats.posession);
  this.container.appendChild(posession);

  const passAccuracy = this.createDetailListItem('Pass Accuracy (%) ', stats.passAccuracy);
  this.container.appendChild(passAccuracy);


  // const goals = this.createTableItem('Goals', stats.goals, stats.reds);
};

GraphView.prototype.createDetailListItem = function (label, property) {

  const element = document.createElement('h4');
  element.textContent = `${label} : ${property}`;
  const linebreak = document.createElement("br");
  element.appendChild(linebreak);
  return element;
};

// GraphView.prototype.createTableItem = function (label, team, tournament) {
//   const container = document.createElement('tr');
//
//   const element1 = document.createElement('td');
//   element1.textContent = `${label}`;
//   container.appendChild(element1);
//
//   const element2 = document.createElement('td');
//   element2.textContent = `${team}`;
//   container.appendChild(element2);
//
//   const element3 = document.createElement('td');
//   element3.textContent = `${tournament}`;
//   container.appendChild(element3);
//
//   const startPoint = document.querySelector('#lastrow');
//   startPoint.appendChild(container);
// };

module.exports = GraphView;
