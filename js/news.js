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


var xmlhttp = new XMLHttpRequest();

var url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";

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
    document.getElementById("lastUpdated").innerHTML = time;
};

//// end //////////////////