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

  });
})(jQuery);
