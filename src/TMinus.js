(function($) {
  function mergeDefaults(params) {
    return $.extend({
      duration: 3600,
      tick_event: function() {},
      termination_event: function() {},
      expiration_event: function() {},
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
        .data("tminus.settings", settings);

      return this;
    },

    tminusStart: function() {
      var tminus = this;

      return this.each(function() {
        tminus.text("3600")
          .data("tminus.state", "running");

        var intervalId = setInterval(function() {
          if (tminus.IsRunning()) {
            tminus.tminusDecrementCounter();

            if (tminus.tminusTimeRemaining() == 0) {
// fire expiration event
            }

          // fire tick event
          // check status
          // fire expiration event if necessary
          // terminate if necessary
          // update display
          }
          else {
            clearInterval(intervalId);
          }
        }, 1000);
      });
    },

    tminusTimeRemaining: function() {
      return this.data("tminus.time_remaining");
    },

    tminusDecrementCounter: function() {
      var timeleft = this.tminusTimeRemaining() - 1;
      this.data("tminus.time_remaining", timeleft);
      return this.tminusTimeRemaining();
    },

    tminusStatus: function() {
      return this.data("tminus.state");
    },

    tminusIsRunning: function() {
      if (this.tminusStatus() == "running") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusIsPaused: function() {
      if (this.tminusStatus() == "paused") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusIsNotStarted: function() {
      if (this.tminusStatus() == "not_started") {
        return true;
      }
      else {
        return false;
      }
    }
  });
})(jQuery);
