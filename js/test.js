(function getData() {
  var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,EOS,BCH,LINK,BNB,TRX,LTC,ETC,OKB&tsyms=USD";
  url = encodeURI(url);
  console.log(url);

  $.getJSON(url,function(data) {

      var crypto_data = '';

      $.each(data.RAW, function(key, value){

        var time_1 = value.USD.LASTUPDATE ;
        time_1 = timeConverter(time_1);

          crypto_data += '<tr>';

          crypto_data += '<td class="text-center">'+key+'</td>';
          crypto_data += '<td class="text-center">'+ '<img src="https://www.cryptocompare.com' + '/'+value.USD.IMAGEURL+'?width=50'+'">'+' </td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' + value.USD.PRICE+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' +value.USD.HIGHDAY+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' +value.USD.LOWDAY+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' + value.USD.MKTCAP+'</td>';
          crypto_data += '<td class="text-center">'+ value.USD.CHANGEPCT24HOUR +' ' + '%'+'</td>';
          crypto_data += '<td class="text-center">'+ '$' + ' ' +value.USD.SUPPLY+'</td>';
          
          crypto_data += '<td class="text-center">'+ '<img src="https://images.cryptocompare.com/sparkchart/'+key+'/USD/latest.png?ts=time_1">'+' </td>';
          
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