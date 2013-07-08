$(function () {
    var impressEl = $('#impress'),
        frame = $('.frame'),
        initFrameSize = {
            width: frame.width(),
            height: frame.height()
        },
        steps = $('.step').not('#overview'),
        radius = 2000;

    var increase = Math.PI * 2 / steps.length, angle = 0;
    steps.each(function (i, elem) {
        var x = radius * Math.cos(angle) + radius * 2,
            y = radius * Math.sin(angle) + radius * 2,
            rotation = Math.round(angle / (2 * Math.PI) * 360 - 90);

        $(elem).attr({
            'data-x': x,
            'data-y': y,
            'data-rotate-z': rotation
        })

        angle -= increase;
    })

    function replaceFrame(scale) {
        scale = scale || 1

        frame.css({
            width: initFrameSize.width * scale,
            height: initFrameSize.height * scale
        })

        frame.css({
            top: Math.max(0, (($(window).height() - frame.outerHeight()) / 2)),
            left: Math.max(0, (($(window).width() - frame.outerWidth()) / 2))
        })
    }

    replaceFrame()
    $(window)
        .on('keyup', function (event) {
            if (event.which != 27) return

            window.location = 'index.html'
        })
        .on('load', function () {
            $('.bg').find('.preload').remove().end().removeClass('loading')
            impress().init();
        })

    impressEl.on('scaled', function (event) {
        replaceFrame(event.originalEvent.detail)
    })
})
