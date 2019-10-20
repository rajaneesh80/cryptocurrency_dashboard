(function getData() {
  var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,EOS,BCH,LINK,BNB,TRX,LTC,ETC,OKB&tsyms=USD&aggregate=2";
  url = encodeURI(url);
  console.log(url);

  $.getJSON(url,function(data) {

      var crypto_data = '';

      $.each(data.RAW, function(key, value){

        var time_1 = value.USD.LASTUPDATE ;
        time_1 = timeConverter(time_1);

        var time_2 = value.USD.LASTUPDATE ;
        time_2 = timeConverter_1(time_2);
        console.log(time_2 );

        // https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
        
        var twodigit = value.USD.MKTCAP;
        twodigit     = shortenLargeNumber(twodigit);

        var twodigitper = value.USD.CHANGEPCT24HOUR;
        twodigitper     = shortenLargeNumber(twodigitper);

        var twodigitsup = value.USD.SUPPLY;
        twodigitsup     = shortenLargeNumber(twodigitsup);

        /*
        var twodigitcurvalue = value.USD.PRICE;
        twodigitcurvalue     = shortenLargeNumber(twodigitcurvalue);
        */
        var twodigitcurhigh = value.USD.HIGHDAY;
        twodigitcurhigh     = shortenLargeNumber(twodigitcurhigh);

        var twodigitcurlow = value.USD.LOWDAY;
        twodigitcurlow     = shortenLargeNumber(twodigitcurlow);

          crypto_data += '<tr>';

          crypto_data += '<td class="text-center">'+key+'</td>';
          crypto_data += '<td class="text-center">'+ '<img src="https://www.cryptocompare.com' + '/'+value.USD.IMAGEURL+'?width=50'+'">'+' </td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' + value.USD.PRICE+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' +twodigitcurhigh+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' +twodigitcurlow+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' + twodigit+'</td>';
          crypto_data += '<td class="text-center">'+ twodigitper +' ' + '%'+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' +twodigitsup+'</td>';
          
          crypto_data += '<td class="text-center">'+ '<img src="https://images.cryptocompare.com/sparkchart/'+key+'/USD/latest.png?ts=time_2">'+' </td>';
          
          crypto_data += '</tr>';
      });

      $('#crypto_table').append(crypto_data);
    

  })

  .done(function() {console.log('getJSON request succeeded'); })

  .fail(function(jqXHR, textStatus, errorThrown) {
  console.log('getJSON request failed! ' + textStatus);
  console.log("incoming"+jqXHR.responseText);
  })

  .always(function() {console.log('getJSON request ended!');});
})();

  function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();

      var time = date + ' ' + month + ' ' + year ;
    return time;
  }

    function timeConverter_1(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();

      var time = year + '-' + month + '-' + date ;
    return time;
  }


/**
 * Shorten number to thousands, millions, billions, etc.
 * http://en.wikipedia.org/wiki/Metric_prefix
 *
 * @param {number} num Number to shorten.
 * @param {number} [digits=0] The number of digits to appear after the decimal point.
 * @returns {string|number}
 *
 * @example
 * // returns '12.5k'
 * shortenLargeNumber(12543, 1)
 *
 * @example
 * // returns '-13k'
 * shortenLargeNumber(-12567)
 *
 * @example
 * // returns '51M'
 * shortenLargeNumber(51000000)
 *
 * @example
 * // returns 651
 * shortenLargeNumber(651)
 *
 * @example
 * // returns 0.12345
 * shortenLargeNumber(0.12345)
 */
function shortenLargeNumber(num, digits) {
/*    var units = ['k', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;*/

  const abbrev = ['', 'K', 'M', 'B', 'T'];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(num)) / 3)
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ))
  const suffix = abbrev[order];

  return (num / Math.pow(10, order * 3)).toFixed(2) + suffix;

}


/*
  $( document ).ready(function() {
 $.getJSON("crypto_data.json", function(data){ 
     var crypto_data = '';
      $.each(data, function(key, value){
          crypto_data += '<tr>';
          crypto_data += '<td>'+value.name+'</td>';
          crypto_data += '<td>'+value.gender+'</td>';
          crypto_data += '<td>'+value.designation+'</td>';
          crypto_data += '</tr>';
      });
      $('#employee_table').append(crypto_data);    
  });
 });


*/

//////