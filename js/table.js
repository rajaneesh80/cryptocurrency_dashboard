(function getData() {
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,EOS,BCH,LINK,BNB,TRX,LTC,ETC,OKB&tsyms=USD&aggregate=2";
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

//////

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

    var time = date + ' ' + month + ' ' + year;
    return time;
};

/////

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

////// end ////////////////