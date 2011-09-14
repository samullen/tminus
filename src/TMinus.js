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
        .data("tminus.settings", settings);

      return this;
    },

    tminusStart: function() {
      var tminus = this;

      tminus.text("3600")
        .data("tminus.state", "running");
    },

    tminusStatus: function() {
      var tminus = this;
      
      return tminus.data("tminus.state");
    },

    tminusIsRunning: function() {
      var tminus = this;

      if (tminus.tminusStatus() == "running") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusIsPaused: function() {
      var tminus = this;

      if (tminus.tminusStatus() == "paused") {
        return true;
      }
      else {
        return false;
      }
    },

    tminusIsNotStarted: function() {
      var tminus = this;

      if (tminus.tminusStatus() == "not_started") {
        return true;
      }
      else {
        return false;
      }
    }
  });
})(jQuery);
