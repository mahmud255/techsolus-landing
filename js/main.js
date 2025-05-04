(function ($) {
    "use strict";

    // Smooth scroll area
    $(".right-details-content , .left-contact-content").niceScroll({
        cursorwidth: "0px"
    });

    // Countdown timer
    if ($('.clock-countdown').length > 0) {
        $('.clock-countdown').downCount({
            date: $('.site-config').attr('data-date'),
            offset: +6 // you can change this to your timezone
        }, function () {
            // Callback if needed after countdown
        });
    }

    // Typed effect (if used)
    $(".cd-headline.letters").each(function () {
        var words = $(this).find(".cd-words-wrapper b").map(function () {
            return $(this).text();
        }).get();

        if (words.length) {
            new Typed(".cd-words-wrapper", {
                strings: words,
                typeSpeed: 60,
                backSpeed: 40,
                loop: true
            });
        }
    });

    // Content scroll containers
    var $content = $('.right-details-content');
    var $contentContact = $('.left-contact-content');

    $('.info-button').on('click', function () {
        $content.addClass('content-open');
        return false;
    });

    $('.contact-button').on('click', function () {
        $contentContact.addClass('content-open');
        return false;
    });

    $('.push-content-close').on('click', function () {
        $content.removeClass('content-open');
        $contentContact.removeClass('content-open');
    });

    $content.css({ 'overflow-x': 'hidden', 'overflow-y': 'scroll' });
    $contentContact.css({ 'overflow-x': 'hidden', 'overflow-y': 'scroll' });

})(jQuery);

// Preloader fade out
jQuery(window).on('load', function () {
    $(".preeloader").fadeOut(700);
});

