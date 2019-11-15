// BNB 360 days chart
var url = "https://min-api.cryptocompare.com/data/histoday?fsym=BNB&tsym=USD&limit=365&aggregate=1&e=CCCAGG";


d3.json(url).get(function(error, d) {

    var data = d.Data;
    data.forEach(function(d) {
        d.time = new Date(d.time * 1000)
    });

    if (error) throw error;

    // set the dimensions and margins of the graph
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = parseInt(d3.select("#chart-area").style("width")) - margin.left - margin.right,
        height = parseInt(d3.select("#chart-area").style("height")) - margin.top - margin.bottom;
    //height = 500 - margin.top - margin.bot
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) {
            return x(d.time);
        })
        .y(function(d) {
            return y(d.close);
        });

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .call(responsivefy);

    // scale the range of the data
    x.domain(d3.extent(data, function(d) {
        return d.time;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.close;
    })]);

    // add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // add the dots with tooltips
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3)
        .attr("cx", function(d) {
            return x(d.time);
        })
        .attr("cy", function(d) {
            return y(d.close);
        })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.time.toLocaleDateString() + "<br/>" + "£" + d.close)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

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

var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS,BCH,LTC,XRP,BNB&tsyms=USD";
var urlHistoricalBtc = "https://min-api.cryptocompare.com/data/histominute?fsym=BNB&tsym=USD&limit=1";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        parseJsonFromCryptoCompare(json);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function parseJsonFromCryptoCompare(json) {
    var time = "<i>Last Updated : " + Date() + "</i>";
    var bnbereum = json["BNB"]["USD"];

    document.getElementById("bnbLast").innerHTML = bnbereum;
    document.getElementById("lastUpdated").innerHTML = time;

    colorText("bnbLast", urlHistoricalBtc);

}


function colorText(elementId, url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            updateColors(json, elementId);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function updateColors(json, elementId) {

        if (elementId == "bnbLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("bnbLast").innerHTML)) {
                $("#bnbTicker").css("color", "green");
                document.getElementById("bnbArrow").innerHTML = "<img src='../img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#bnbTicker").css("color", "red");
                document.getElementById("bnbArrow").innerHTML = "<img src='../img/arrow-r.png' style='max-width:12px;'>";
            }
        } else {
            alert("ERROR: " + elementId);
        }

    }
};

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.gbnbours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

(function getData() {
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BNB&tsyms=USD";
    url = encodeURI(url);
    console.log(url);

    $.getJSON(url, function(data) {

            var hbnb_crypto_data = '';
            var lbnb_crypto_data = '';
            var pcbnb_crypto_data = '';
            var mcbnb_crypto_data = '';

            $.each(data.RAW, function(key, value) {

                var twodigit = value.USD.MKTCAP;
                twodigit = shortenLargeNumber(twodigit);

                var twodigitper = value.USD.CHANGEPCT24HOUR;
                twodigitper = shortenLargeNumber(twodigitper);

                lbnb_crypto_data += value.USD.LOWDAY;
                hbnb_crypto_data += value.USD.HIGHDAY;
                pcbnb_crypto_data += twodigitper;
                mcbnb_crypto_data += twodigit;

            });

            $('#bnbHigh').html(hbnb_crypto_data);
            $('#bnbLow').html(lbnb_crypto_data);
            $('#bnbPct').html(pcbnb_crypto_data);
            $('#bnbMkc').html(mcbnb_crypto_data);

        })

        .done(function() {
            console.log('getJSON request succeeded');
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
            console.log("incoming" + jqXHR.responseText);
        })

        .always(function() {
            console.log('getJSON request ended!');
        });
})();


/*
 * Shorten number to thousands, millions, billions, etc.
 * http://en.wikipedia.org/wiki/Metric_prefix */

function shortenLargeNumber(num, digits) {

    const abbrev = ['', 'K', 'M', 'B', 'T'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(num)) / 3)
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1))
    const suffix = abbrev[order];

    return (num / Math.pow(10, order * 3)).toFixed(2) + suffix;

}

///////