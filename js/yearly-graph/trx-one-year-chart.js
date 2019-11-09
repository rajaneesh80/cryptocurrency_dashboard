// Bitcoinn 360 days chart


var url = "https://min-api.cryptocompare.com/data/histoday?fsym=TRX&tsym=USD&limit=366&aggregate=3&e=CCCAGG";


  d3.json(url).get(function(error, d) {

    var data = d.Data;
    data.forEach(function(d){ d.time = new Date(d.time * 1000) });

    if (error) throw error;

var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom, 
    width = 600 - margin.left - margin.right;

var tooltip = d3.select('body')
.append('div')
.style('position', 'absolute')
.style('padding', '0 10px')
.style('background', 'white')
.style('opacity', 0)

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(responsivefy)
    
var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");

    var x = d3.scaleTime()
        .range([0, width])

    var y = d3.scaleLinear()
        .range([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.close); });

    x.domain(d3.extent(data, function(d) { return d.time; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    var bisectDate = d3.bisector(function(d) { return d.time; }).left;

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        

    g.append("g")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#0d146e")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);

    function responsivefy(svg) { 
              
            // Container is the DOM element, svg is appended. 
            // Then we measure the container and find its 
            // aspect ratio. 
            const container = d3.select(svg.node().parentNode), 
                width = parseInt(svg.style('width'), 12), 
                height = parseInt(svg.style('height'), 10), 
                aspect = width / height; 
                  
            // Add viewBox attribute to set the value to initial size 
            // add preserveAspectRatio attribute to specify how to scale  
            // and call resize so that svg resizes on page load 

            svg.attr('viewBox', `0 0 ${width} ${height}`). 
            attr('preserveAspectRatio', 'xMinYMid'). 
            call(resize); 
              
            d3.select(window).on('resize.' + container.attr('id'), resize); 
   
            function resize() { 
                const targetWidth = parseInt(container.style('width')); 
                svg.attr('width', targetWidth); 
                svg.attr('height', Math.round(targetWidth / aspect)); 
            } 
        } 

});

  ////////////


var xmlhttp = new XMLHttpRequest();

  var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,trx,EOS,BCH,LTC,XRP,TRX&tsyms=USD";
  var urlHistoricalBtc = "https://min-api.cryptocompare.com/data/histominute?fsym=TRX&tsym=USD&limit=1";
  
      xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4  &&  this.status == 200) {
                  var json = JSON.parse(this.responseText);
                  parseJsonFromCryptoCompare(json);
                }       
              };
              
      xmlhttp.open("GET", url, true);
      xmlhttp.send();

function parseJsonFromCryptoCompare(json) {
  var time = "<i>Last Updated : " + Date() + "</i>";
  var trxereum = json["TRX"]["USD"];

  document.getElementById("trxLast").innerHTML = trxereum;
  document.getElementById("lastUpdated").innerHTML = time;
                
  colorText("trxLast",urlHistoricalBtc);

}
              

function colorText(elementId, url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4  &&  this.status == 200) {
      var json = JSON.parse(this.responseText);
      updateColors(json, elementId);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

    function updateColors(json, elementId) {

      if (elementId == "trxLast") {
        var oldVal = json["Data"][0]["close"];
        if (Number(oldVal) < Number(document.getElementById("trxLast").innerHTML)) {
          $("#trxTicker").css("color", "green");
          document.getElementById("trxArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
        }
        else {
          $("#trxTicker").css("color", "red");
          document.getElementById("trxArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
        }
      }

      else {
        alert("ERROR: " + elementId);
      }
                  
  }
};

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.gtrxours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

(function getData() {
  var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=TRX&tsyms=USD";
  url = encodeURI(url);
  console.log(url);

  $.getJSON(url,function(data) {

      var htrx_crypto_data = '';
      var ltrx_crypto_data = '';
      var pctrx_crypto_data = '';
      var mctrx_crypto_data = '';

      $.each(data.RAW, function(key, value){

        ltrx_crypto_data += value.USD.LOWDAY;
        htrx_crypto_data += value.USD.HIGHDAY;
        pctrx_crypto_data += value.USD.CHANGEPCT24HOUR;
        mctrx_crypto_data += value.USD.MKTCAP;

      });

      $('#trxHigh').html(htrx_crypto_data);
      $('#trxLow').html(ltrx_crypto_data);
      $('#trxPct').html(pctrx_crypto_data);
      $('#trxMkc').html(mctrx_crypto_data);

    })

  .done(function() {console.log('getJSON request succeeded'); })

  .fail(function(jqXHR, textStatus, errorThrown) {
  console.log('getJSON request failed! ' + textStatus);
  console.log("incoming"+jqXHR.responseText);
  })

  .always(function() {console.log('getJSON request ended!');});
})();

  function yearTimeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();

      var time = date + ' ' + month + ' ' + year ;
    return time;
  }


///////
