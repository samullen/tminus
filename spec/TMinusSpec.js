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
        expect($tminus.data("tminus.settings").expire_event()).
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
          expire_event: function() { return "expiration" },
        });

        expect($tminus.data("tminus.state")).toEqual("not_started");
        expect($tminus.data("tminus.duration")).toEqual(10);
        expect($tminus.data("tminus.settings").tick_event()).toEqual("tick");
        expect($tminus.data("tminus.settings").termination_event())
          .toEqual("termination");
        expect($tminus.data("tminus.settings").expire_event())
          .toEqual("expiration");
      });
    });

  });

  describe("tminusStart", function() {
    it("sets status to 'running'", function() {
      $tminus.tminusInit().tminusStart();
      expect($tminus.data("tminus.state")).toEqual("running");
    });

    it("sets elements' text value to the formatted duration", function() {
      $tminus.tminusInit().tminusStart();
      expect($tminus.text()).toEqual("3600");
    })

//    it("calls a tick event if applicable", function() {
//      $tminus.tminusInit({ 
//        tick_event: function() {console.log("tick event")} 
//      }).tminusStart();
//
//      spyOn($tminus, "tminusTickEvent");
//      expect($tminus.tminusTickEvent).toHaveBeenCalled();
//    });
//
//    it("calls the expire event if time-left is zero", function() {
//      $tminus.tminusInit({ 
//        duration: 1,
//        expire_event: function() {console.log("expiration event")} 
//      }).tminusStart();
//
//      spyOn($tminus, "tminusExpireEvent");
//
//      expect($tminus.tminusExpireEvent).toHaveBeenCalled();
//    });
  });

  describe("tminusExpire", function() {
    beforeEach(function() {
      $tminus.tminusInit();
      $tminus.tminusStart();
    });

    it("sets time remaining to zero", function() {
      expect($tminus.tminusIsRunning()).toBeTruthy();
      $tminus.tminusExpire();
      expect($tminus.tminusTimeRemaining()).toEqual(0);
    });

    it("sets status to expired", function() {
      expect($tminus.tminusIsRunning()).toBeTruthy();
      $tminus.tminusExpire();
      expect($tminus.tminusIsExpired()).toBeTruthy();
    });
  });

  describe("tminusTerminate", function() {
    beforeEach(function() {
      $tminus.tminusInit().tminusStart();
    });

    it("sets time remaining to duration", function() {
      expect($tminus.tminusIsRunning()).toBeTruthy();
      $tminus.tminusTerminate();
      expect($tminus.tminusTimeRemaining()).toEqual($tminus.tminusDuration());
    });

    it("sets status to not_running", function() {
      expect($tminus.tminusIsRunning()).toBeTruthy();
      $tminus.tminusTerminate();
      expect($tminus.tminusIsRunning()).toBeFalsy();
    });
  });

  describe("tminusPause", function() {
    beforeEach(function() {
      $tminus.tminusInit().tminusStart();
    });

    it("sets status to paused", function() {
      expect($tminus.tminusIsRunning()).toBeTruthy();
      $tminus.tminusPause();
      expect($tminus.tminusIsRunning()).toBeFalsy();
      expect($tminus.tminusIsPaused()).toBeTruthy();
    });
  });

  describe("tminusReset", function() {
    beforeEach(function() {
      $tminus.tminusInit();
      $tminus.tminusStart();
    });

    it("sets time remaining to duration", function() {
      expect($tminus.tminusIsRunning()).toBeTruthy();
      $tminus.tminusReset();
      expect($tminus.tminusTimeRemaining()).toEqual($tminus.tminusDuration());
    });

    it("sets status to not_running", function() {
      expect($tminus.tminusIsRunning()).toBeTruthy();
      $tminus.tminusReset();
      expect($tminus.tminusIsRunning()).toBeFalsy();
    });
  });

  describe("tminusDuration", function() {
    it("returns tminus.duration value", function() {
      $tminus.tminusInit();
      expect($tminus.tminusDuration()).toEqual($tminus.data("tminus.duration"));
    });
  });

  describe("tminusTimeRemaining", function() {
    it("returns tminus.time_remaining value", function() {
      $tminus.tminusInit();
      expect($tminus.tminusTimeRemaining()).toEqual($tminus.data("tminus.duration"));
    });
  });

  describe("tminusDecrementCounter", function() {
    it("subtracts 1 from tminus.time_remaining", function() {
      $tminus.tminusInit();
      timeleft = $tminus.tminusTimeRemaining() - 1;
      expect($tminus.tminusDecrementCounter()).toEqual(timeleft);
    });
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

  describe("tminusIsExpired", function() {
    it("returns true if timer is expired", function() {
      $tminus.data("tminus.state", "expired");
      expect($tminus.tminusIsExpired()).toBeTruthy();
    })

    it("returns false if timer is not expired", function() {
      expect($tminus.tminusIsExpired()).toBeFalsy();
    })
  });

  describe("tminusTimeFormat", function() {
    it("returns the define time format", function() {
      $tminus.tminusInit();
      expect($tminus.tminusTimeFormat()).toEqual("%M:%S");
    });
  });

  describe("tminusFormattedTimeRemaining", function() {
    it("returns time string formatted to 'mm:ss' by default", function() {
      $tminus.tminusInit({duration: 1234});
      expect($tminus.tminusFormattedTimeRemaining()).toEqual("20:34");
    });

    it("returns time string according to supplied format", function() {
      $tminus.tminusInit({duration: 95696, time_format: "%D:%H:%M:%S"});

      expect($tminus.tminusFormattedTimeRemaining()).toEqual("01:02:34:56");

      $tminus.data("tminus.time_format", "%d day(s), %h hour(s), %m minute(s), %s second(s)");
      expect($tminus.tminusFormattedTimeRemaining()).toEqual("1 day(s), 2 hour(s), 34 minute(s), 56 second(s)");
    });
  });
});
