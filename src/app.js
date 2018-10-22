const Matches = require ('./models/matches.js');
const SelectView = require('./views/select-view.js');
const InfoView = require('./views/info-view.js');
const GraphView = require('./views/graph-view.js');
const Chart = require('./views/google-charts.js');

document.addEventListener('DOMContentLoaded', () => {
  // console.log('JavaScript Loaded');

  const selectElement = document.querySelector('select#countries');

  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const Container = document.querySelector('#country');

  const infoView = new InfoView(Container);
  infoView.bindEvents();

  const Container2 = document.querySelector('#table');

  const graphView = new GraphView(Container2);
  graphView.bindEvents();

  const matches = new Matches();
  matches.getData();
});
