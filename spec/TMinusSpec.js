describe("The TMinus plugin", function() {
  var $tminus;

  beforeEach(function() {
    loadFixtures('tminus.html');
    $tminus = $('#timer');
  });

  describe("initTimer", function() {
    describe("using defaults", function() {
      it("sets some default values", function() {
        $tminus.initTimer({});
        empty_function = function() {};

        expect($tminus.data("tminus.state")).toEqual("not_started");
        expect($tminus.data("tminus.duration")).toEqual(3600);
        expect($tminus.data("tminus.settings").tick_event).toEqual(empty_function);
        expect($tminus.data("tminus.settings").termination_event).toEqual({});
        expect($tminus.data("tminus.settings").expiration_event).toEqual({});
      });
    });
  });
});
