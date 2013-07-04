$(function () {
    var enableImpress = true,
        impressEl = $('#impress'),
        frame = $('.frame'),
        stepTpl = $('#step-')

    for (var i = 0; i <= 8; i++) {
        stepTpl.clone().attr('id', 'step-' + i).appendTo(impressEl)
    }
    stepTpl.remove()

    var images = $('.step.img'),
        radius = 2000;

    images.each(function (i, elem) {
        var theta = -i / (images.length - 1) * 2 * Math.PI,
            x = Math.round(radius * Math.cos(theta)),
            y = Math.round(radius * Math.sin(theta)),
            rotation = Math.round(theta / (2 * Math.PI) * 360 - 90);

        $(elem).attr({
            'data-x': x,
            'data-y': y,
            'data-rotate-z': rotation
        })
    })

    $('#overview').attr({
        'data-x': 0,
        'data-y': 0,
        'data-scale': 5
    })

    function replaceFrame() {
        var computedStyle = window.getComputedStyle(impressEl[0], null),
            matrix = computedStyle.getPropertyValue('transform')
                || computedStyle.getPropertyValue('-moz-transform')
                || computedStyle.getPropertyValue('-webkit-transform')
                || computedStyle.getPropertyValue('-ms-transform')
                || computedStyle.getPropertyValue('-o-transform'),
            data = [1];

        if (matrix != 'none') data = matrix.split('(')[1].split(')')[0].split(',');

        frame.css({
            width: 1100 * data[0],
            height: 700 * data[0]
        })

        frame.css({
            top: Math.max(0, (($(window).height() - frame.outerHeight()) / 2)),
            left: Math.max(0, (($(window).width() - frame.outerWidth()) / 2))
        })
    }

    enableImpress && impress().init();
    replaceFrame()
    $(window).on('resize', replaceFrame);
})
