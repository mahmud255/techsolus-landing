(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
            date: null,
            offset: null
        }, options);

        if (!settings.date) {
            $.error('Date is not defined.');
        }

        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 02/24/2025 12:00:00.');
        }

        var container = this;
        var timeZone = +0;
        if ($('.site-config').attr('data-date-timezone') && ($('.site-config').attr('data-date-timezone') != '')) {
            timeZone = $('.site-config').attr('data-date-timezone');
        }

        var currentDate = function () {
            var date = new Date();
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000) - (360000 * 100) + (360000 * 10) * timeZone;
            return new Date(utc + (3600000 * settings.offset));
        };

        function countdown() {
            var target_date = new Date(settings.date), 
                current_date = currentDate();
            
            var difference = target_date - current_date;

            if (difference < 0) {
                clearInterval(interval);
                if (callback && typeof callback === 'function') callback();
                return;
            }

            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

            days = (String(days).length >= 2) ? days : '0' + days;
            hours = (String(hours).length >= 2) ? hours : '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            var ref_days = (days === 1) ? 'day' : 'days',
                ref_hours = (hours === 1) ? 'hour' : 'hours',
                ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                ref_seconds = (seconds === 1) ? 'second' : 'seconds';

            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        };

        // Start countdown with a standard interval of 1000ms (1 second)
        var interval = setInterval(countdown, 1000);
    };

})(jQuery);

