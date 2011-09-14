describe("The TMinus plugin", function() {
  var $tminus;

  beforeEach(function() {
    loadFixtures('tminus.html');
    $tminus = $('#timer');
  });

  describe("tminusInit", function() {
    describe("using defaults", function() {
      it("sets some default values", function() {
        $tminus.tminusInit({});
        empty_function = function() {};

        expect($tminus.data("tminus.state")).toEqual("not_started");
        expect($tminus.data("tminus.duration")).toEqual(3600);
        expect($tminus.data("tminus.settings").tick_event()).
          toEqual(empty_function());
        expect($tminus.data("tminus.settings").termination_event()).
          toEqual(empty_function());
        expect($tminus.data("tminus.settings").expiration_event()).
          toEqual(empty_function());
      });
    });

    describe("with passed parameters", function() {
      it("overwrites default values", function() {
        empty_function = function() {};

        $tminus.tminusInit({
          duration: 10,
          tick_event: function() { return "tick" },
          termination_event: function() { return "termination" },
          expiration_event: function() { return "expiration" },
        });

        expect($tminus.data("tminus.state")).toEqual("not_started");
        expect($tminus.data("tminus.duration")).toEqual(10);
        expect($tminus.data("tminus.settings").tick_event()).toEqual("tick");
        expect($tminus.data("tminus.settings").termination_event())
          .toEqual("termination");
        expect($tminus.data("tminus.settings").expiration_event())
          .toEqual("expiration");
      });
    });

  });

  describe("tminusStart", function() {
    beforeEach(function() {
      $tminus.tminusInit();
      $tminus.tminusStart();
    });

    it("sets elements' text value to the formatted duration", function() {
      expect($tminus.text()).toEqual("3600");
    })

    it("sets status to 'running'", function() {
      expect($tminus.data("tminus.state")).toEqual("running");
    });
  });

  describe("tminusTerminate", function() {
  });

  describe("tminusExpire", function() {
  });

  describe("tminusPause", function() {
  });

  describe("tminusReset", function() {
  });

  describe("tminusStatus", function() {
    it("returns tminus.state value", function() {
      expect($tminus.tminusStatus()).toBeUndefined();
      $tminus.data("tminus.state", "running");
      expect($tminus.tminusStatus()).toEqual("running");
    });
  });

  describe("tminusIsRunning", function() {
    it("returns true if timer is running", function() {
      $tminus.data("tminus.state", "running");
      expect($tminus.tminusIsRunning()).toBeTruthy();
    })

    it("returns false if timer is not running", function() {
      expect($tminus.tminusIsRunning()).toBeFalsy();
    })
  });

  describe("tminusIsPaused", function() {
    it("returns true if timer is paused", function() {
      $tminus.data("tminus.state", "paused");
      expect($tminus.tminusIsPaused()).toBeTruthy();
    })

    it("returns false if timer is not paused", function() {
      expect($tminus.tminusIsPaused()).toBeFalsy();
    })
  });

  describe("tminusIsNotStarted", function() {
    it("returns true if timer is not started", function() {
      $tminus.data("tminus.state", "not_started");
      expect($tminus.tminusIsNotStarted()).toBeTruthy();
    })

    it("returns false if timer is not started", function() {
      expect($tminus.tminusIsNotStarted()).toBeFalsy();
    })
  });
});
