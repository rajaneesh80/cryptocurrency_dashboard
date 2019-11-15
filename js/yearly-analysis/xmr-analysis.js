//XMR Analysis
var gainOrLossChart = dc.pieChart('#gain-loss-chart');
var fluctuationChart = dc.barChart('#fluctuation-chart');
var monthlyChart = dc.pieChart('#monthly-chart');
var dayOfWeekChart = dc.rowChart('#day-of-week-chart');
var monthlyBubbleChart = dc.bubbleChart('#monthly-bubble-chart');


//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

if (!navigator.onLine) {
    alert('This website need to be connected to internet in order to work properly');
}

// ETH 365 days 
var url = "https://min-api.cryptocompare.com/data/histoday?fsym=XMR&tsym=USD&limit=365&aggregate=1&e=CCCAGG";

document.getElementById('container').style.display = 'block';


d3.json(url).get(function(error, d) {
    var data = d.Data;
    for (var i = 0; i < data.length; i++) {
        //console.log(data[i].time);
        var numberFormat = d3.format('.2f');
        var dateFormat = d3.time.format('%m/%d/%Y');
    }
    data.forEach(function(d) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dayname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        d.time = new Date(d.time * 1000);
        //console.log(d.time)
        d.time = dayname[d.time.getDay()] + '-' + d.time.getDate() + '-' + months[d.time.getMonth()] + '-' + d.time.getFullYear();
        //console.log(d.time)
    });
    if (error) throw error;
    //console.log(data)

    //Create Crossfilter Dimensions and Groups

    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    //print_filter(ndx);
    //print_filter(all);

    // dimension by full date

    var dateDimension = ndx.dimension(function(d) {
        return d.time;
    });
    //print_filter(dateDimension);


    // Find first and last date
    var minDate = dateDimension.bottom(1)[0].time;
    var maxDate = dateDimension.top(1)[0].time;



    // Dimension by month
    //https://stackoverflow.com/questions/47575119/how-to-get-month-name-from-an-html-date-input-value

    var monthlyDimension = ndx.dimension(function(d) {

        var date = d.time;
        //console.log(date);

        var month = date.split("-");
        //console.log(month);

        var getMonthName = month[2]
        //  console.log(getMonthName);

        return getMonthName;
    });

    //print_filter(monthlyDimension);

    // Maintain running tallies by month as filters are applied or removed
    var monthlyPerformanceGroup = monthlyDimension.group().reduce(
        /* callback for when data is added to the current filter results */
        function(p, v) {
            ++p.count;
            p.absGain += v.close - v.open;
            p.fluctuation += Math.abs(v.close - v.open);
            p.sumIndex += (v.open + v.close) / 2;
            p.avgIndex = p.sumIndex / p.count;
            p.percentageGain = p.avgIndex ? p.absGain / p.avgIndex * 100 : 0;
            p.fluctuationPercentage = p.avgIndex ? p.fluctuation / p.avgIndex * 100 : 0;
            //console.log(p.fluctuationPercentage);
            return p;
        },

        /* callback for when data is removed from the current filter results */

        function(p, v) {
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
        function() {
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

    //console.log(monthlyPerformanceGroup);

    //print_filter(monthlyPerformanceGroup);

    // Create categorical dimension

    var gainOrLoss = ndx.dimension(function(d) {
        //console.log(d.open > d.close ? 'Loss' : 'Gain')
        return d.open > d.close ? 'Loss' : 'Gain';
    });

    // Produce counts records in the dimension

    var gainOrLossGroup = gainOrLoss.group();

    // Determine a histogram of percent changes

    var fluctuation = ndx.dimension(function(d) {
        return Math.round((d.close - d.open) / d.open * 100);
    });

    var fluctuationGroup = fluctuation.group();

    //////////

    var monthlyMove = ndx.dimension(function(d) {
        return Math.round((d.close - d.open) / d.open * 100);
    });

    var monthlyMoveGroup = monthlyDimension.group().reduceSum(function(d) {
        return Math.abs(d.close - d.open);
    });
    //console.log(monthlyMoveGroup);

    // summerize volume by Month
    var monthly = ndx.dimension(function(d) {

        var date = d.time;
        //console.log(date);
        var month = date.split("-");
        //console.log(month);
        var getMonthName = month[2];
        return getMonthName;
    });

    //console.log(monthly);

    var monthlyGroup = monthly.group().reduceSum(function(d) {
        return d.volumeto;
    });

    //console.log(monthlyGroup);

    // Counts per weekday

    var dayOfWeek = ndx.dimension(function(d) {

        var date = d.time;
        //console.log(date);

        var days = date.split("-");
        //console.log(month);

        var getDaysName = days[0];
        //console.log(getDaysName);
        return getDaysName + '.' + getDaysName;

    });

    var dayOfWeekGroup = dayOfWeek.group();

    // #### Pie/Donut Chart
    // Create a pie chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.

    gainOrLossChart
        .width(240) // (optional) define chart width, :default = 200
        .height(180) // (optional) define chart height, :default = 200
        .radius(80) // define pie radius
        .innerRadius(10)
        .dimension(gainOrLoss) // set dimension
        .group(gainOrLossGroup) // set group

        /* (optional) by default pie chart will use group.key as its label
         * but you can overwrite it with a closure */

        .label(function(d) {
            if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
                return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        })

        .legend(dc.legend().x(180).y(5).itemHeight(12).gap(3))


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
        .colorAccessor(function(d, i) {
            return d.value;
        });

    monthlyChart
        .width(240)
        .height(190)
        .radius(80)
        .innerRadius(30)
        .dimension(monthly)
        .group(monthlyGroup)
        .legend(dc.legend().x(199).y(5).itemHeight(10).gap(3))
    //.legend(dc.legend().x(230).y(5).itemHeight(12).gap(5));


    // table
    var dataTable = dc.dataTable("#table1")
        //.width(410)
        //.height(300)
        .dimension(dateDimension)
        .showGroups(false)
        // .size(5)
        .group(function(d) {
            return d.close;
        })

        .columns([{
                label: 'Time',
                format: function(d) {
                    return d.time
                }
            },
            'close',
            'high',
            'low',
            'open'
        ])

        .sortBy(function(d) {
            return d.time;
        })
        .order(d3.descending);

    /*   cities.sort(function(a, b){
        return a["index"]-b["index"];
    });*/

    /*    .sortBy(function(x, y){
       return d3.ascending(x.close, y.close);
    })
    */
    ///
    //#### Bubble Chart
    //Create a bubble chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with such chart will only trigger redraw
    //on other charts within the same chart group.
    /* dc.bubbleChart('#yearly-bubble-chart', 'chartGroup') */

    monthlyBubbleChart
        //.width(640) // (optional) define chart width, :default = 200
        //.height(300)  // (optional) define chart height, :default = 200
        .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
        .margins({
            top: 25,
            right: 5,
            bottom: 45,
            left: 50
        })
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
        .colorAccessor(function(d) {
            return d.value.absGain;
        })
        .keyAccessor(function(p) {
            return p.value.absGain;
        })
        .valueAccessor(function(p) {
            return p.value.percentageGain;
        })
        .radiusValueAccessor(function(p) {
            return p.value.fluctuationPercentage;
        })
        .maxBubbleRelativeSize(0.5)
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
        .xAxisLabel('XMR Gain $') // (optional) render an axis label below the x axis
        .yAxisLabel('XMR Gain %') // (optional) render a vertical axis lable left of the y axis


        //#### Labels and  Titles
        //Labels are displaed on the chart for each bubble. Titles displayed on mouseover.
        .renderLabel(true) // (optional) whether chart should render labels, :default = true
        .label(function(p) {
            return p.key;
        })
        .renderTitle(true) // (optional) whether chart should render titles, :default = false


        .title(function(p) {
            return [
                p.key,
                'Index Gain: ' +
                numberFormat(p.value.absGain), 'Index Gain in Percentage: ' +
                numberFormat(p.value.percentageGain) +
                '%', 'Fluctuation / Index Ratio: ' +
                numberFormat(p.value.fluctuationPercentage) +
                '%'
            ].join('\n');
        })

        //#### Customize Axis
        //Set a custom tick format. Note `.yAxis()` returns an axis object, so any additional method chaining applies
        //to the axis, not the chart.
        .yAxis().tickFormat(function(v) {
            return v + '%';
        })

    /* apply_resizing(fluctuationChart);*/
    ///

    //#### Row Chart

    dayOfWeekChart
        //.width(640)
        //.height(280)
        .margins({
            top: 10,
            left: 5,
            right: 5,
            bottom: 30
        })
        .dimension(dayOfWeek)
        .group(dayOfWeekGroup)


        // assign colors to each value in the x scale domain
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])

        .label(function(d) {
            return d.key.split('.')[1];
        })
        // title sets the row text
        .title(function(d) {
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

    fluctuationChart
        //.width(240)
        //.height(220)
        .margins({
            top: 10,
            right: 5,
            bottom: 50,
            left: 30
        })
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
        .filterPrinter(function(filters) {
            var filter = filters[0],
                s = '';
            s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
            return s;
        });

    // Customize axis
    fluctuationChart.xAxis()
        .tickFormat(function(v) {
            return v + '%';
        });

    fluctuationChart.yAxis().ticks(5)

    /*apply_resizing(fluctuationChart);*/


    // #### Rendering
    dc.renderAll();


});