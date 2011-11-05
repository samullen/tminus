(function($) {
  function mergeDefaults(params) {
    return $.extend({
      duration: 3600,
      time_format: "%M:%S",
      tick_event: function() {},
      termination_event: function() {},
      expire_event: function() {},
    }, params);
  }

  $.fn.extend({
    tminusInit: function(params) {
      var settings = mergeDefaults(params);
      var tminus = this;

      tminus
        .data("tminus.state", "not_started")
        .data("tminus.duration", settings.duration)
        .data("tminus.time_format", settings.time_format)
        .data("tminus.time_remaining", settings.duration)
        .data("tminus.settings", settings)
        .text(tminus.tminusTimeRemaining());

      return tminus;
    },

    tminusStart: function() {
      var tminus = this;
      tminus.data("tminus.state", "running");

      return tminus.each(function() {
        var intervalId = setInterval(function() {
          if (tminus.tminusIsRunning()) {
            tminus.tminusDecrementCounter();

            if (tminus.tminusTimeRemaining() > 0) {
              tminus.tminusTickEvent();
            }
            else if (tminus.tminusTimeRemaining() <= 0) {
              tminus.tminusExpireEvent();
              tminus.tminusTerminate();
            }

            tminus.text(tminus.tminusTimeRemaining);
          }
          else {
            clearInterval(intervalId);
          }
        }, 1000);
      });
    },

    tminusTickEvent: function() {
      $(this).data("tminus.settings").tick_event();
    },

    tminusExpireEvent: function() {
      $(this).data("tminus.settings").expire_event();
    },

    tminusTerminate: function() {
      $(this).data("tminus.state", "not_started");
    },

    tminusExpire: function() {
      $(this).data("tminus.state", "expired")
        .data("tminus.time_remaining", 0);
    },

    tminusReset: function() {
      $(this).data("tminus.state", "not_started")
        .data("tminus.time_remaining", $(this).tminusDuration());
    },

    tminusPause: function() {
      $(this).data("tminus.state", "paused");
    },

    tminusDuration: function() {
      return $(this).data("tminus.duration");
    },

    tminusTimeRemaining: function() {
      return $(this).data("tminus.time_remaining");
    },

    tminusDecrementCounter: function() {
      var timeleft = $(this).tminusTimeRemaining() - 1;
      $(this).data("tminus.time_remaining", timeleft);
      return $(this).tminusTimeRemaining();
    },

    tminusStatus: function() {
      return $(this).data("tminus.state");
    },

    tminusIsRunning: function() {
      if ($(this).tminusStatus() == "running") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusIsPaused: function() {
      if ($(this).tminusStatus() == "paused") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusIsNotStarted: function() {
      if ($(this).tminusStatus() == "not_started") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusIsExpired: function() {
      if (this.tminusStatus() == "expired") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusFormattedTimeRemaining: function() {
      time_remaining = $(this).tminusTimeRemaining();
      time_string = $(this).tminusTimeFormat();

      seconds = time_remaining % 60;
      minutes = ((time_remaining - seconds) % 3600 / 60);
      hours   = ((time_remaining - (minutes * 60) - seconds) % 86400 / 3600);
      days    = (time_remaining - (hours * 3600) - (minutes * 60) - seconds) / 86400;

      time_string = time_string.replace(/\%s/, seconds);
      time_string = time_string.replace(/\%S/, ("0" + seconds).slice(-2));
      time_string = time_string.replace(/\%m/, minutes);
      time_string = time_string.replace(/\%M/, ("0" + minutes).slice(-2));
      time_string = time_string.replace(/\%h/, hours);
      time_string = time_string.replace(/\%H/, ("0" + hours).slice(-2));
      time_string = time_string.replace(/\%d/, days);
      time_string = time_string.replace(/\%D/, ("0" + days).slice(-2));

      return(time_string);
    },

    tminusTimeFormat: function() {
      return $(this).data("tminus.time_format");
    },
  });
})(jQuery);
