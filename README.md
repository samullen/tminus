# tminus

jquery plugin for counting down from a given number of seconds

## Installation

Just copy the tminus.js file out of the src directory in to your javascripts directory or whereever else you may want it.

## Usage

### General

For now, you're going to have to look at the one example file and read the code. I'm too tired to write more.

### Available Options

* duration: the is the number of seconds until the tminus reaches zero. The default is 1 hour (3,600 seconds).
* time_format: The format used to display the time remaining
  * %s: seconds with no padding
  * %S: seconds padded with zeroes if necessary (e.g. 5 => "05")
  * %m: minutes with no padding
  * %M: minutes padded with zeroes if necessary (e.g. 5 => "05")
  * %h: hours with no padding
  * %H: hours padded with zeroes if necessary (e.g. 5 => "05")
  * %d: days with no padding
  * %D: days padded with zeroes if necessary (e.g. 5 => "05")

* tick_event: a function to be called with each tick (1 second) of the clock
* termination_event: the function to call upon termination. Termination really does nothing other than stop the clock and call an event.
* expire_event: the event to call when the timer reaches zero. 

### Examples

Examples can be seen under the "examples" directory.

## Testing

I'm using [Jasmine](https://github.com/pivotal/jasmine) as the testing framework. To see the tests run, open the SpecRunner.html in a browser. New tests need to be added to the TMinusSpec.js file.

You can ignore the PlayerSpec.js file. I had it there for reference.

## Roadmap

* Pause should be able to call an event

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a
  future version unintentionally.
* Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2011 Samuel Mullen. See LICENSE for details.
