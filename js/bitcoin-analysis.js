var gainOrLossChart = dc.pieChart('#gain-loss-chart');
var fluctuationChart = dc.barChart('#fluctuation-chart');
var quarterChart = dc.pieChart('#quarter-chart');
var dayOfWeekChart = dc.rowChart('#day-of-week-chart');
var moveChart = dc.lineChart('#monthly-move-chart');
var volumeChart = dc.barChart('#monthly-volume-chart');
var yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');

// Bitcoinn 30 days 
var url = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100&aggregate=3&e=CCCAGG";

d3.json(url).get(function(error, d) {
   var data = d.Data;
   for (var i = 0; i < data.length; i++) {
        //console.log(data[i].time);
        
    }
    data.forEach(function(d){
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var dayname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      d.time = new Date(d.time*1000);
      d.time = dayname[d.time.getDay()]+'-'+d.time.getDate()+'-'+months[d.time.getMonth()]+'-'+d.time.getFullYear();
    
  });
    if (error) throw error;
    //console.log(data)

//Create Crossfilter Dimensions and Groups

var ndx = crossfilter(data);
var all = ndx.groupAll();
//console.log(ndx);

// dimension by full date

var dateDimension = ndx.dimension(function(d){return d.time;});
//console.log(dateDimension);

// Find first and last date
var minDate = dateDimension.bottom(1)[0].time;
var maxDate = dateDimension.top(1)[0].time;

// Dimension by month
//https://stackoverflow.com/questions/47575119/how-to-get-month-name-from-an-html-date-input-value

  var monthlyDimension = ndx.dimension(function (d) {

  var date = d.time;
  console.log(date);

  var month = date.split("-");
  //console.log(month);

  
  var getMonthName = month[2]
  console.log(getMonthName);
    
  return getMonthName;
  });

  ////////

// Maintain running tallies by month as filters are applied or removed
var monthlyPerformanceGroup = monthlyDimension.group().reduce(
/* callback for when data is added to the current filter results */
function (p, v) {
  ++p.count;
  p.absGain += v.close - v.open;
  p.fluctuation += Math.abs(v.close - v.open);
  p.sumIndex += (v.open + v.close) / 2;
  p.avgIndex = p.sumIndex / p.count;
  p.percentageGain = p.avgIndex ? p.absGain / p.avgIndex * 100 : 0;
  p.fluctuationPercentage = p.avgIndex ? p.fluctuation / p.avgIndex * 100 : 0;
  return p;
},
/* callback for when data is removed from the current filter results */
function (p, v) {
  --p.count;
  p.absGain -= v.close - v.open;
  p.fluctuation -= Math.abs(v.close - v.open);
  p.sumIndex -= (v.open + v.close) / 2;
  p.avgIndex = p.count ? p.sumIndex / p.count : 0;
  p.percentageGain = p.avgIndex ? p.absGain / p.avgIndex * 100 : 0;
  p.fluctuationPercentage = p.avgIndex ? p.fluctuation / p.avgIndex * 100 : 0;
  return p;
},
/* initialize p */
function () {
  return {
    count: 0,
    absGain: 0,
    fluctuation: 0,
    fluctuationPercentage: 0,
    sumIndex: 0,
    avgIndex: 0,
    percentageGain: 0
  };
}); 


// Dimension by month

var moveMonths = ndx.dimension(function (d) {

  var date = d.time;
  //console.log(date);

  var month = date.split("-");
  //console.log(month);

  
  var getMonthName = month[1]
  //console.log(getMonthName);
    
  return getMonthName;
}); 

// Group by total movement within month

var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
  return Math.abs(d.close - d.open);
}); 

// Group by total volume within move, and scale down result

var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
  return d['Volume (Currency)'] / 100000000;
});

var indexAvgByMonthGroup = moveMonths.group().reduce(function (p, v) {
  ++p.days;
  p.total += (v.open + v.close) / 2;
  p.avg = Math.round(p.total / p.days);
  return p;
}, 

function (p, v) {
  --p.days;
  p.total -= (v.Open + v.Close) / 2;
  p.avg = p.days ? Math.round(p.total / p.days) : 0;
  return p;
}, 

function () {
  return {
    days: 0,
    total: 0,
    avg: 0
  };
}); 

// Create categorical dimension

var gainOrLoss = ndx.dimension(function (d) {
  return d.open > d.close ? 'Loss' : 'Gain';
}); 

// Produce counts records in the dimension

var gainOrLossGroup = gainOrLoss.group(); 

// Determine a histogram of percent changes

var fluctuation = ndx.dimension(function (d) {
  return Math.round((d.Close - d.Open) / d.Open * 100);
});
var fluctuationGroup = fluctuation.group(); 

//////////

// Counts per weekday

var dayOfWeek = ndx.dimension(function (d) {

  var date = d.time;
  //console.log(date);

  var days = date.split("-");
  //console.log(month);

  
  var getDaysName = days[0];
  //console.log(getDaysName);
    
  return getDaysName;

});

var dayOfWeekGroup = dayOfWeek.group();
 
/////////
});