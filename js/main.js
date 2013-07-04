$(function () {
    var enableImpress = true,
        impressEl = $('#impress'),
        frame = $('.frame'),
        stepTpl = $('#step-')


    for (var i = 0; i < 8; i++) {
        stepTpl.clone().attr('id', 'step-' + i).appendTo(impressEl)
    }
    stepTpl.remove()

    var steps = $('.step').not('#overview'),
        radius = 2000;

    var increase = Math.PI * 2 / steps.length, angle = 160;
    steps.each(function (i, elem) {
        var x = radius * Math.cos(angle) + radius * 2,
            y = radius * Math.sin(angle) + radius * 2,
            rotation = Math.round(angle / (2 * Math.PI) * 360 - 90);

        $(elem).attr({
            'data-x': x,
            'data-y': y,
            'data-rotate-z': rotation
        })

        angle += increase;
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
