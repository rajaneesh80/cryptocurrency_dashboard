var gainOrLossChart = dc.pieChart('#gain-loss-chart');
var fluctuationChart = dc.barChart('#fluctuation-chart');
var quarterChart = dc.pieChart('#quarter-chart');
var dayOfWeekChart = dc.rowChart('#day-of-week-chart');
var moveChart = dc.lineChart('#monthly-move-chart');
var volumeChart = dc.barChart('#monthly-volume-chart');
var monthlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');

if (!navigator.onLine) {
  alert('This website need to be connected to internet in order to work properly');
}

// Bitcoinn 30 days 
var url = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=366&aggregate=1&e=CCCAGG";

d3.json(url).get(function(error, d) {
   var data = d.Data;
   for (var i = 0; i < data.length; i++) {
        //console.log(data[i].time);
    var numberFormat = d3.format('.2f');   
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

var dateGroup = dateDimension.group().reduceSum(function(d){ return d.close; });

/// High

var dateHighGroup = dateDimension.group().reduceSum(function(d){ return d.high; });

/// Low

var dateLowGroup = dateDimension.group().reduceSum(function(d){ return d.low; });
//console.log(dateDimension);

// Find first and last date
var minDate = dateDimension.bottom(1)[0].time;
var maxDate = dateDimension.top(1)[0].time;

////////

// Dimension by month
//https://stackoverflow.com/questions/47575119/how-to-get-month-name-from-an-html-date-input-value

var monthlyDimension = ndx.dimension(function (d) {

  var date = d.time;
  //console.log(date);

  var month = date.split("-");
  //console.log(month);

  var getMonthName = month[2]
  //  console.log(getMonthName);
    
  return getMonthName;
});

var minMonth = monthlyDimension .bottom(1)[0].time;
var maxMonth = monthlyDimension .top(1)[0].time;


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

////
console.log(monthlyPerformanceGroup);
// Group by total movement within month

var monthlyMoveGroup = monthlyDimension.group().reduceSum(function (d) {
  return Math.abs(d.close - d.open);
});

console.log(monthlyMoveGroup);

// Group by total volume within move, and scale down result

var volumeByMonthGroup = monthlyDimension.group().reduceSum(function (d) {
  return d['volumeto (Currency)'] / 100000000;
});

var indexAvgByMonthGroup = monthlyDimension.group().reduce(function (p, v) {
    ++p.days;
    p.total += (v.open + v.close) / 2;
    p.avg = Math.round(p.total / p.days);
    return p;
  }, 

  function (p, v) {
    --p.days;
    p.total -= (v.open + v.close) / 2;
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
  //console.log(d.open > d.close ? 'Loss' : 'Gain')
  return d.open > d.close ? 'Loss' : 'Gain';
}); 

// Produce counts records in the dimension

var gainOrLossGroup = gainOrLoss.group(); 

// Determine a histogram of percent changes

var fluctuation = ndx.dimension(function (d) {
  return Math.round((d.close - d.open) / d.open * 100);
});

var fluctuationGroup = fluctuation.group(); 

//////////

// summerize volume by quarter
var quarter = ndx.dimension(function (d) {

var date = d.time;
//console.log(date);
var month = date.split("-");
//console.log(month);
var getMonthName = month[2];
//console.log(getMonthName[1]);
//console.log(getMonthName);
//['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

return getMonthName;
});

console.log(quarter);

var quarterGroup = quarter.group().reduceSum(function (d) {
  //console.log(d.volumeto);
  return d.volumeto;
});

console.log(quarterGroup);

// Counts per weekday

var dayOfWeek = ndx.dimension(function (d) {

  var date = d.time;
  //console.log(date);

  var days = date.split("-");
  //console.log(month);

  var getDaysName = days[0];
  //console.log(getDaysName);
  return getDaysName + '.' + getDaysName;

});

var dayOfWeekGroup = dayOfWeek.group();
 
/////////


// #### Pie/Donut Chart
// Create a pie chart and use the given css selector as anchor. You can also specify
// an optional chart group for this chart to be scoped within. When a chart belongs
// to a specific group then any interaction with such chart will only trigger redraw
// on other charts within the same chart group.

gainOrLossChart 
  .width(180) // (optional) define chart width, :default = 200
  .height(180) // (optional) define chart height, :default = 200
  .radius(80) // define pie radius
  .innerRadius(10)
  .dimension(gainOrLoss ) // set dimension
  .group(gainOrLossGroup) // set group

  /* (optional) by default pie chart will use group.key as its label
  * but you can overwrite it with a closure */

  .label(function (d) {
    if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
      return d.key + '(0%)';
    }
    var label = d.key;
    if (all.value()) {
      label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
    }
    return label;
  })

  // (optional) whether chart should render labels, :default = true
  .renderLabel(true)
  // (optional) if inner radius is used then a donut chart will be generated instead of pie chart
  //.innerRadius(40)
  // (optional) define chart transition duration, :default = 350
  .transitionDuration(500)
  // (optional) define color array for slices
  //.colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
  // (optional) define color domain to match your data domain if you want to bind data or color
  .colorDomain([-1750, 1644])
  // (optional) define color value accessor
  .colorAccessor(function(d, i){return d.value;});

  quarterChart
    .width(180)
    .height(180)
    .radius(80)
    .innerRadius(30)
    .dimension(quarter)
    .group(quarterGroup);


// table
    var dataTable = dc.dataTable("#table1")
      .width(1160)
      .height(300)
      .dimension(dateDimension)
      .showGroups(false)
      // .size(5)
      .group(function(d){ return d.close; })

      .columns([{label:'Time',format: function(d){return d.time }},
                      'close',
                      'high',
                      'low',
                      'open'])

      .sortBy(function(d){ return d.close; })
      .order(d3.ascending);

///
    //#### Bubble Chart
    //Create a bubble chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with such chart will only trigger redraw
    //on other charts within the same chart group.
    /* dc.bubbleChart('#yearly-bubble-chart', 'chartGroup') */

    monthlyBubbleChart
        .width(990) // (optional) define chart width, :default = 200
        .height(250)  // (optional) define chart height, :default = 200
        .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(monthlyDimension)

        //Bubble chart expect the groups are reduced to multiple values which would then be used
        //to generate x, y, and radius for each key (bubble) in the group
        .group(monthlyPerformanceGroup)
        .colors(colorbrewer.RdYlGn[9]) // (optional) define color function or array for bubbles
        .colorDomain([-500, 500]) 
        //(optional) define color domain to match your data domain if you want to bind data or
        //color
        //##### Accessors
        //Accessor functions are applied to each value returned by the grouping
        //
        //* `.colorAccessor` The returned value will be mapped to an internal scale to determine a fill color
        //* `.keyAccessor` Identifies the `X` value that will be applied against the `.x()` to identify pixel location
        //* `.valueAccessor` Identifies the `Y` value that will be applied agains the `.y()` to identify pixel location
        //* `.radiusValueAccessor` Identifies the value that will be applied agains the `.r()` determine radius size,
        //*   by default this maps linearly to [0,100]
        .colorAccessor(function (d) {
            return d.value.absGain;
        })
        .keyAccessor(function (p) {
            return p.value.absGain;
        })
        .valueAccessor(function (p) {
            return p.value.percentageGain;
        })
        .radiusValueAccessor(function (p) {
            return p.value.fluctuationPercentage;
        })
        .maxBubbleRelativeSize(0.3)
        .x(d3.scale.linear().domain([-2500, 2500]))
        .y(d3.scale.linear().domain([-100, 100]))
        .r(d3.scale.linear().domain([0, 4000]))
        //##### Elastic Scaling

        //`.elasticX` and `.elasticX` determine whether the chart should rescale each axis to fit data.
        //The `.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit
        //domains as the Accessors.

        .elasticY(true)
        .elasticX(true)
        .yAxisPadding(100)
        .xAxisPadding(500)
        .renderHorizontalGridLines(true) // (optional) render horizontal grid lines, :default=false
        .renderVerticalGridLines(true) // (optional) render vertical grid lines, :default=false
        .xAxisLabel('BTC Gain') // (optional) render an axis label below the x axis
        .yAxisLabel('BTC Gain %') // (optional) render a vertical axis lable left of the y axis

        //#### Labels and  Titles
        //Labels are displaed on the chart for each bubble. Titles displayed on mouseover.
        .renderLabel(true) // (optional) whether chart should render labels, :default = true
        .label(function (p) {
            return p.key;
        })
        .renderTitle(true) // (optional) whether chart should render titles, :default = false

      /*  .title(function (p) {
            return [
                p.key,
                'Index Gain: ' + numberFormat(p.value.absGain),
                'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
                'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
            ].join('\n');
        })*/

         .title(function (p) {
            return [
                p.key, 
                'Index Gain: ' 
                + numberFormat(p.value.absGain), 'Index Gain in Percentage: ' 
                + numberFormat(p.value.percentageGain) 
                + '%', 'Fluctuation / Index Ratio: ' 
                + numberFormat(p.value.fluctuationPercentage) 
                + '%'].join('\n');
              })

        //#### Customize Axis
        //Set a custom tick format. Note `.yAxis()` returns an axis object, so any additional method chaining applies
        //to the axis, not the chart.
        .yAxis().tickFormat(function (v) {
            return v + '%';
        });
///

    //#### Row Chart

    dayOfWeekChart
        .width(180)
        .height(180)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .dimension(dayOfWeek)
        .group(dayOfWeekGroup)
        
        // assign colors to each value in the x scale domain
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        .label(function (d) {
            return d.key.split('.')[1];
        })
        // title sets the row text
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .xAxis().ticks(4);


////

    //#### Bar Chart
    // Create a bar chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    /* dc.barChart('#volume-month-chart') */
    fluctuationChart.width(420)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(fluctuation)
        .group(fluctuationGroup)
        .elasticY(true)
        // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
        .centerBar(true)
        // (optional) set gap between bars manually in px, :default=2
        .gap(1)
        // (optional) set filter brush rounding
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scale.linear().domain([-25, 25]))
        .renderHorizontalGridLines(true)
        // customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], 
            s = '';
            s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
            return s;
        });

         // Customize axis
        fluctuationChart.xAxis()
        .tickFormat(function (v) { 
          return v + '%'; 
        });

        fluctuationChart.yAxis().ticks(5);

/////

  moveChart
  .renderArea(true)
  .width(990)
  .height(200)
  .transitionDuration(1000)
  .margins({top: 30, right: 50, bottom: 25, left: 40})
  .dimension(monthlyDimension)
  // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart"
  .mouseZoomable(true) 
  .rangeChart(volumeChart)
  .x(d3.time.scale()
  .domain([new Date(minDate), new Date(maxDate)]))
  .round(d3.time.month.round)
  .xUnits(d3.time.Months)
  .elasticY(true)
  .renderHorizontalGridLines(true) 
  // ##### Legend
  // Position the legend relative to the chart origin and specify items' height and separation.
  .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5)).brushOn(false) 
  // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
  // legend.
  // The `.valueAccessor` will be used for the base layer
  .group(indexAvgByMonthGroup, 'Monthly Index Average')
  .valueAccessor(function (d) {
    return d.value.avg;
  }) 
  // Stack additional layers with `.stack`. The first paramenter is a new group.
  // The second parameter is the series name. The third is a value accessor.
  .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
    return d.value;
  })
  //.stack(monthlyMoveGroup)
  // Title can be called by any stack layer.
  .title(function (d) {
    var value = d.value.avg ? d.value.avg : d.value;

    if (isNaN(value)) {
      value = 0;
    }

    return dateFormat(d.key) + '\n' + numberFormat(value);
  });

  volumeChart
  .width(990)
  .height(40)
  .margins({top: 0, right: 50, bottom: 20, left: 40})
  .dimension(monthlyDimension)
  .group(volumeByMonthGroup)
  .centerBar(true)
  .gap(1)
  .x(d3.time.scale()
  .domain([new Date(minDate), new Date(maxDate)]))
  .round(d3.time.month.round)
  .alwaysUseRounding(true)
  //.xUnits(d3.time.Months)
  .yAxisLabel('Billions $');


dc.renderAll();

});