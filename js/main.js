var xmlhttp = new XMLHttpRequest();

var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS,BCH,LTC,XRP,LINK,BNB,TRX,ETC,OKB,XMR&tsyms=USD";

var urlHistoricalBtc = "https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=1";
var urlHistoricalEth = "https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=1";
var urlHistoricalBch = "https://min-api.cryptocompare.com/data/histominute?fsym=BCH&tsym=USD&limit=1";
var urlHistoricalEos = "https://min-api.cryptocompare.com/data/histominute?fsym=EOS&tsym=USD&limit=1";
var urlHistoricalLtc = "https://min-api.cryptocompare.com/data/histominute?fsym=LTC&tsym=USD&&limit=1";
var urlHistoricalXrp = "https://min-api.cryptocompare.com/data/histominute?fsym=XRP&tsym=USD&&limit=1";

var urlHistoricalLink = "https://min-api.cryptocompare.com/data/histominute?fsym=LINK&tsym=USD&limit=1";
var urlHistoricalBnb = "https://min-api.cryptocompare.com/data/histominute?fsym=BNB&tsym=USD&limit=1";
var urlHistoricalTrx = "https://min-api.cryptocompare.com/data/histominute?fsym=TRX&tsym=USD&limit=1";
var urlHistoricalEtc = "https://min-api.cryptocompare.com/data/histominute?fsym=ETC&tsym=USD&limit=1";
var urlHistoricalOkb = "https://min-api.cryptocompare.com/data/histominute?fsym=OKB&tsym=USD&&limit=1";
var urlHistoricalXmr = "https://min-api.cryptocompare.com/data/histominute?fsym=XMR&tsym=USD&&limit=1";

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

    var bitcoin = json["BTC"]["USD"];
    var ether = json["ETH"]["USD"];
    var bitcoinCash = json["BCH"]["USD"];
    var EOS = json["EOS"]["USD"];
    var litecoin = json["LTC"]["USD"];
    var XRP = json["XRP"]["USD"];

    var chainLink = json["LINK"]["USD"];
    var binanceCoin = json["BNB"]["USD"];
    var tron = json["TRX"]["USD"];
    var etherClassic = json["ETC"]["USD"];
    var okex = json["OKB"]["USD"];
    var monero = json["XMR"]["USD"];


    document.getElementById("btcLast").innerHTML = bitcoin;
    document.getElementById("ethLast").innerHTML = ether;
    document.getElementById("bchLast").innerHTML = bitcoinCash;
    document.getElementById("eosLast").innerHTML = EOS;
    document.getElementById("ltcLast").innerHTML = litecoin;
    document.getElementById("xrpLast").innerHTML = XRP;

    document.getElementById("linkLast").innerHTML = chainLink;
    document.getElementById("bnbLast").innerHTML = binanceCoin;
    document.getElementById("trxLast").innerHTML = tron;
    document.getElementById("etcLast").innerHTML = etherClassic;
    document.getElementById("okbLast").innerHTML = okex;
    document.getElementById("xmrLast").innerHTML = monero;

    document.getElementById("lastUpdated").innerHTML = time;

    colorText("btcLast", urlHistoricalBtc);
    colorText("ethLast", urlHistoricalEth);
    colorText("bchLast", urlHistoricalEth);
    colorText("eosLast", urlHistoricalEth);
    colorText("ltcLast", urlHistoricalEth);
    colorText("xrpLast", urlHistoricalXrp);

    colorText("linkLast", urlHistoricalLink);
    colorText("bnbLast", urlHistoricalBnb);
    colorText("trxLast", urlHistoricalTrx);
    colorText("etcLast", urlHistoricalEtc);
    colorText("okbLast", urlHistoricalOkb);
    colorText("xmrLast", urlHistoricalXmr);
}

////

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

        if (elementId == "btcLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("btcLast").innerHTML)) {
                $("#btcTicker").css("color", "green");
                document.getElementById("btcArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#btcTicker").css("color", "red");
                document.getElementById("btcArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "ethLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("ethLast").innerHTML)) {
                $("#ethTicker").css("color", "green");
                document.getElementById("ethArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#ethTicker").css("color", "red");
                document.getElementById("ethArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "bchLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("bchLast").innerHTML)) {
                $("#bchTicker").css("color", "green");
                document.getElementById("bchArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#bchTicker").css("color", "red");
                document.getElementById("bchArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "eosLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("eosLast").innerHTML)) {
                $("#eosTicker").css("color", "green");
                document.getElementById("eosArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#eosTicker").css("color", "red");
                document.getElementById("eosArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "ltcLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("ltcLast").innerHTML)) {
                $("#ltcTicker").css("color", "green");
                document.getElementById("ltcArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#ltcTicker").css("color", "red");
                document.getElementById("ltcArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "xrpLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("xrpLast").innerHTML)) {
                $("#xrpTicker").css("color", "green");
                document.getElementById("xrpArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#xrpTicker").css("color", "red");
                document.getElementById("xrpArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "linkLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("xrpLast").innerHTML)) {
                $("#linkTicker").css("color", "green");
                document.getElementById("linkArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#linkTicker").css("color", "red");
                document.getElementById("linkArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "bnbLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("bnbLast").innerHTML)) {
                $("#bnbTicker").css("color", "green");
                document.getElementById("bnbArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#bnbTicker").css("color", "red");
                document.getElementById("bnbArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "trxLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("trxLast").innerHTML)) {
                $("#trxTicker").css("color", "green");
                document.getElementById("trxArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#trxTicker").css("color", "red");
                document.getElementById("trxArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "etcLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("etcLast").innerHTML)) {
                $("#etcTicker").css("color", "green");
                document.getElementById("etcArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#etcTicker").css("color", "red");
                document.getElementById("etcArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "okbLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("okbLast").innerHTML)) {
                $("#okbTicker").css("color", "green");
                document.getElementById("okbArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#okbTicker").css("color", "red");
                document.getElementById("okbArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else if (elementId == "xmrLast") {
            var oldVal = json["Data"][0]["close"];
            if (Number(oldVal) < Number(document.getElementById("xmrLast").innerHTML)) {
                $("#xmrTicker").css("color", "green");
                document.getElementById("xmrArrow").innerHTML = "<img src='img/arrow-g.png' style='max-width:12px;'>";
            } else {
                $("#xmrTicker").css("color", "red");
                document.getElementById("xmrArrow").innerHTML = "<img src='img/arrow-r.png' style='max-width:12px;'>";
            }
        } else {
            alert("ERROR: " + elementId);
        }

    }
};

///

function getNews() {
    var url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
    url = encodeURI(url);
    console.log(url);

    $.getJSON(url, function(data) {
            var everything;
            everything = "";
            $.each(data.Data, function(i, item) {
                var time = item.published_on;
                time = timeConverter(time);
                everything += "<div class='row' style='padding: 5px;'>";
                everything += "<div class='col-sm-12 col-md-2'> <img src='" + item.imageurl + "' alt='fail' class='img-fluid'> </div>";
                everything += "<div class='col-sm-12 col-md-10'>" + time + '\xa0\xa0\xa0\xa0\xa0' + "<a href=" + item.url + ' target="_blank">' + item.title + "</a><div style='font-size: 12px;'>" + item.body + "</div></div>";
                everything += "</div>";
            });

            $("#allNews").html(everything);

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
}

//

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

// Summary Table

(function getData() {
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,EOS,BCH,LINK,BNB,TRX,LTC,ETC,OKB&tsyms=USD";
    url = encodeURI(url);
    console.log(url);

    $.getJSON(url, function(data) {

            var crypto_data = '';

            $.each(data.RAW, function(key, value) {



                // https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900

                var twodigit = value.USD.MKTCAP;
                twodigit = shortenLargeNumber(twodigit);

                var twodigitper = value.USD.CHANGEPCT24HOUR;
                twodigitper = shortenLargeNumber(twodigitper);

                var twodigitsup = value.USD.SUPPLY;
                twodigitsup = shortenLargeNumber(twodigitsup);

                /*
                var twodigitcurvalue = value.USD.PRICE;
                twodigitcurvalue     = shortenLargeNumber(twodigitcurvalue);
                */
                var twodigitcurhigh = value.USD.HIGHDAY;
                twodigitcurhigh = shortenLargeNumber(twodigitcurhigh);

                var twodigitcurlow = value.USD.LOWDAY;
                twodigitcurlow = shortenLargeNumber(twodigitcurlow);

                crypto_data += '<tr>';

                crypto_data += '<td class="text-center">' + key + '</td>';
                crypto_data += '<td class="text-center">' + '<img src="https://www.cryptocompare.com' + '/' + value.USD.IMAGEURL + '?width=50' + '">' + ' </td>';
                crypto_data += '<td class="text-center">' + '$' + ' ' + value.USD.PRICE + '</td>';
                crypto_data += '<td class="text-center">' + '$' + ' ' + twodigitcurhigh + '</td>';
                crypto_data += '<td class="text-center">' + '$' + ' ' + twodigitcurlow + '</td>';
                crypto_data += '<td class="text-center">' + '$' + ' ' + twodigit + '</td>';
                crypto_data += '<td class="text-center">' + twodigitper + ' ' + '%' + '</td>';
                crypto_data += '<td class="text-center">' + '$' + ' ' + twodigitsup + '</td>';

                crypto_data += '<td class="text-center">' + '<img src="https://images.cryptocompare.com/sparkchart/' + key + '/USD/latest.png?ts=value.USD.LASTUPDATE">' + ' </td>';

                crypto_data += '</tr>';
            });

            $('#crypto_table').append(crypto_data);


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

// Summary Table End

/*
 * Shorten number to thousands, millions, billions, etc.
 * http://en.wikipedia.org/wiki/Metric_prefix
 */

function shortenLargeNumber(num, digits) {


    const abbrev = ['', 'K', 'M', 'B', 'T'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(num)) / 3)
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1))
    const suffix = abbrev[order];

    return (num / Math.pow(10, order * 3)).toFixed(2) + suffix;

};

////// end ///////