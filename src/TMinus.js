(function($) {
  function init(params) {
    return $.extend({
      duration: 3600,
      tick_event: function() {},
      termination_event: {},
      expiration_event: {},
    }, params);
  }

  $.fn.extend({
    initTimer: function(params) {
      var settings = init(params);
      var tminus = this;

      tminus.
        data("tminus.state", "not_started").
        data("tminus.duration", settings.duration).
        data("tminus.settings", settings);

      return this;
    },
  });
})(jQuery);
