// Cant make google charts work - can make it work if code is embedded into the html but struggling to call the function drawChart or know where the verious elements go if it is not fully incorporated into the html:

const PubSub = require('../helpers/pub_sub.js');

const Chart = function () {
};

Chart.prototype.drawChart = function () {

      var data = new google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ]);

      var options = {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        bars: 'horizontal',
        vAxis: {format: 'decimal'},
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, null);
};

module.exports = Chart;
