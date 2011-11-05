(function($) {
  function mergeDefaults(params) {
    return $.extend({
      duration: 3600,
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

            tminus.data("tminus.settings").tick_event();

            if (tminus.tminusTimeRemaining() <= 0) {
              tminus.tminusTickEvent();
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
      $(this).data("tminus.state", "not_started")
        .data("tminus.time_remaining", $(this).tminusDuration());
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
  });
})(jQuery);
