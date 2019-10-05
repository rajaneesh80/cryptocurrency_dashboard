var xmlhttp = new XMLHttpRequest();

  var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS,BCH,LTC,XRP&tsyms=USD";
  var urlHistoricalBtc = "https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=1";
  var urlHistoricalEth = "https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=1";
  var urlHistoricalBch = "https://min-api.cryptocompare.com/data/histominute?fsym=BCH&tsym=USD&limit=1";
  var urlHistoricalEos = "https://min-api.cryptocompare.com/data/histominute?fsym=EOS&tsym=USD&limit=1";
  var urlHistoricalLtc = "https://min-api.cryptocompare.com/data/histominute?fsym=LTC&tsym=USD&&limit=1";
  var urlHistoricalXrp = "https://min-api.cryptocompare.com/data/histominute?fsym=XRP&tsym=USD&&limit=1";

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
                var bitcoin = json["BTC"]["USD"];
                var ether = json["ETH"]["USD"];
                var bitcoinCash = json["BCH"]["USD"];
                var EOS = json["EOS"]["USD"];
                var litecoin = json["LTC"]["USD"];
                var XRP = json["XRP"]["USD"];
                document.getElementById("btcLast").innerHTML = bitcoin;
                document.getElementById("ethLast").innerHTML = ether;
                document.getElementById("bchLast").innerHTML = bitcoinCash;
                document.getElementById("eosLast").innerHTML = EOS;
                document.getElementById("ltcLast").innerHTML = litecoin;
                document.getElementById("xrpLast").innerHTML = XRP;
                document.getElementById("lastUpdated").innerHTML = time;
                
                colorText("btcLast",urlHistoricalBtc);
                colorText("ethLast",urlHistoricalEth);
                colorText("bchLast",urlHistoricalEth);
                colorText("eosLast",urlHistoricalEth);
                colorText("ltcLast",urlHistoricalEth);
                colorText("xrpLast",urlHistoricalXrp);
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
                  if (elementId == "btcLast") {
                    var oldVal = json["Data"][0]["close"];
                    if (Number(oldVal) < Number(document.getElementById("btcLast").innerHTML)) {
                       $("#btcTicker").css("color", "green");
                       document.getElementById("btcArrow").innerHTML = "<img src='img/logo.png' style='max-width:12px;'>";
                    }
                    else {
                      $("#btcTicker").css("color", "red");
                      document.getElementById("btcArrow").innerHTML = "<img src='img/logo.png' style='max-width:12px;'>";
                    }
                  }
                  else if (elementId == "ethLast") {
                    var oldVal = json["Data"][0]["close"];
                    if (Number(oldVal) < Number(document.getElementById("ethLast").innerHTML)) {
                       $("#ethTicker").css("color", "green");
                       document.getElementById("ethArrow").innerHTML = "";
                    }
                    else {
                      $("#ethTicker").css("color", "red");
                      document.getElementById("ethArrow").innerHTML = "";
                    }
                  }
                  else if (elementId == "bchLast") {
                    var oldVal = json["Data"][0]["close"];
                    if (Number(oldVal) < Number(document.getElementById("bchLast").innerHTML)) {
                       $("#bchTicker").css("color", "green");
                       document.getElementById("bchArrow").innerHTML = "";
                    }
                    else {
                      $("#bchTicker").css("color", "red");
                      document.getElementById("bchArrow").innerHTML = "";
                    }
                  }
                  else if (elementId == "eosLast") {
                    var oldVal = json["Data"][0]["close"];
                    if (Number(oldVal) < Number(document.getElementById("eosLast").innerHTML)) {
                       $("#eosTicker").css("color", "green");
                       document.getElementById("eosArrow").innerHTML = "";
                    }
                    else {
                      $("#eosTicker").css("color", "red");
                      document.getElementById("eosArrow").innerHTML = "";
                    }
                  }
                  else if (elementId == "ltcLast") {
                    var oldVal = json["Data"][0]["close"];
                    if (Number(oldVal) < Number(document.getElementById("ltcLast").innerHTML)) {
                       $("#ltcTicker").css("color", "green");
                       document.getElementById("ltcArrow").innerHTML = "";
                    }
                    else {
                      $("#ltcTicker").css("color", "red");
                      document.getElementById("ltcArrow").innerHTML = "";
                    }
                  }
                  else if (elementId == "xrpLast") {
                    var oldVal = json["Data"][0]["close"];
                    if (Number(oldVal) < Number(document.getElementById("xrpLast").innerHTML)) {
                       $("#xrpTicker").css("color", "green");
                       document.getElementById("xrpArrow").innerHTML = "";
                    }
                    else {
                      $("#xrpTicker").css("color", "red");
                      document.getElementById("xrpArrow").innerHTML = "";
                    }
                  }
                  else {
                    alert("ERROR: " + elementId);
                  }
                  
                }
              };


  function getNews() {
                  var url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
                  url = encodeURI(url);
              
                  console.log(url);
                  $.getJSON(url,function(data) {
                  
                      var everything;
                      everything = "";
                      $.each(data.Data, function(i, item) {
                         var time = item.published_on;
                         time = timeConverter(time);
                         everything +=  "<div class='col-sm-12'><img src='" + item.imageurl + "' alt='fail' class='img-fluid'> </div>";
                         everything +=  "<div class='col-sm-12'>" + time + '\xa0\xa0\xa0\xa0\xa0' +  "<a href=" + item.url + ' target="_blank">' + item.title + "</a><div style='font-size: 12px;'>" + item.body + "</div></div>";
                         everything += "</div>";
                      });
                     
                      $("#allNews").html(everything);
                  })
                  .done(function() {console.log('getJSON request succeeded'); })
                  .fail(function(jqXHR, textStatus, errorThrown) {
                      console.log('getJSON request failed! ' + textStatus);
                      console.log("incoming"+jqXHR.responseText);
                  })
                  .always(function() {console.log('getJSON request ended!');
                  });
              }

  function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
      var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }