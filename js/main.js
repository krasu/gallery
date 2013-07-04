$(function () {
    var enableImpress = true

    for (var i = 0; i <= 8; i++) {
        $('#step-').clone().attr('id', 'step-' + i).appendTo('#impress')
    }
    for (var i = 0; i < 7; i++) {
        $('#cutout-').clone().attr('id', '').appendTo($('#overview .wheel'))
    }

    $('#step-, #cutout-').remove()

    var elems = $('.step.img'),
        radius = 2000;

    elems.each(function (i, elem) {
        var theta = -i / (elems.length - 1) * 2 * Math.PI,
            x = Math.round(radius * Math.cos(theta)),
            y = Math.round(radius * Math.sin(theta)),
            rotation = Math.round(theta / (2 * Math.PI) * 360 - 90);

        $(elem).attr({
            'data-x': x,
            'data-y': y,
            'data-rotate-z': rotation
        })
    })

    elems = $('.cutout'),
        radius = 450;
console.log($('.cutout'))
    var increase = Math.PI * 2 / elems.length;
    var angle = 0;

    elems.each(function (i, elem) {
        var theta = i / (elems.length - 1) * 2 * Math.PI,
            x = radius * Math.cos(angle) + radius,
            y = radius * Math.sin(angle) + radius,
            rotation = Math.round(theta / (2 * Math.PI) * 360 - 90);

        console.log(theta)
        $(elem).css({
            'top': x,
            'left': y,
//            '-webkit-transform': 'rotate(' + rotation + 'deg)'
        })

        angle += increase;
    })


    $('#overview').attr({
        'data-x': 0,
        'data-y': 0,
        'data-scale': 5
    })

    enableImpress && impress().init();
})
