/*var find_query = function () {
    var _map = window.location.search.substr(1).split('&').map(function (a) {
        return a.split('=');
    }).reduce(function (p, v) {
        if (v.length > 1)
            p[v[0]] = decodeURIComponent(v[1].replace(/\+/g, " "));
        else
            p[v[0]] = true;
        return p;
    }, {});
    return function (field) {
        return _map[field] || null;
    };
}();

var resizeMode = find_query('resize') || 'widhei';

function apply_resizing(chart, adjustX, adjustY, onresize) {
    if (resizeMode.toLowerCase() === 'viewbox') {
        chart
            .width(200)
            .height(150)
            .useViewBoxResizing(true);
        d3.select(chart.anchor()).classed('fullsize', true);
    } else {
        adjustX = adjustX || 0;
        adjustY = adjustY || adjustX || 0;
        chart
            .width(window.innerWidth - adjustX)
            .height(window.innerHeight - adjustY);
        window.onresize = function () {
            if (onresize) {
                onresize(chart);
            }
            chart
                .width(window.innerWidth - adjustX)
                .height(window.innerHeight - adjustY);

            if (chart.rescale) {
                chart.rescale();
            }
            chart.redraw();
        };
    }
}*/