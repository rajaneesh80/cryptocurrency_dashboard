// Bitcoinn 30 days 
var url = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=5&aggregate=3&e=CCCAGG";

d3.json(url).get(function(error, d) {
  var data = d.Data;
  data.forEach(function(d){
    d.time = new Date(d.time * 1000);
  });
    if (error) throw error;
    //console.log(data)
var facts = crossfilter(data);
console.log(facts)

/// Close
var dateDimension = facts.dimension(function(d){ return d.time; });
var dateGroup = dateDimension.group().reduceSum(function(d){ return d.close; });

var minDate = dateDimension.bottom(1)[0].time;
var maxDate = dateDimension.top(1)[0].time;

/// High

var dateHighGroup = dateDimension.group().reduceSum(function(d){ return d.high; });

/// Low

var dateLowGroup = dateDimension.group().reduceSum(function(d){ return d.low; });

/*var minHighDate = dateHighDimension.bottom(1)[0].time;
var maxHighDate = dateHighDimension.top(1)[0].time;*/

var lineChart= dc.lineChart("#chart")
    .width(680)
    .height(300)
    .margins({top:10,bottom:30,right:10,left:70})
    .dimension(dateDimension)
    .group(dateLowGroup ,"Low")
    .stack(dateHighGroup,"High")
    .title(function(d){ return d.key + ': $'+d.value; })
    .yAxisLabel("Value in USD($)")
    .renderHorizontalGridLines(true)
    .renderArea(true)
    .legend(dc.legend().x(650).y(5).itemHeight(12).gap(5))
    .x(d3.time.scale().domain([minDate,maxDate]))

    .brushOn(false)
    .renderDataPoints(true)
   
    lineChart.yAxis().ticks(12);
    lineChart.xAxis().ticks(5);

    ////

    var pieChart = dc.pieChart("#chart2")
    .width(360)
    .height(200)
    .radius(50)
    .innerRadius(30)
    .renderLabel(false)
    .title(function(d){ return d.key + ': $'+d.value; })
    .colors(d3.scale.category10())
    .transitionDuration(1500)
    .dimension(dateDimension)
    .group(dateGroup,"close")
    .legend(dc.legend().x(230).y(5).itemHeight(12).gap(5));

    ///

    var barChart = dc.barChart("#chart3")
    .width(680)
    .height(300)
    .margins({top:10,bottom:30,right:10,left:70})
    .brushOn(false)
    .dimension(dateDimension)
    .group(dateHighGroup,"High")
    .title(function(d){ return d.key + ': $'+d.value; })
    .x(d3.time.scale().domain([minDate, maxDate]))
    
    .barPadding(0.5)
    .yAxisLabel("This is the Y Axis!")
    

    barChart.yAxis().ticks(4);
    barChart.xAxis().ticks(2);

   


dc.renderAll();

});

 