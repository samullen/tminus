# tminus

jquery plugin for counting down from a given number of seconds

## Installation

Just copy the tminus.js file out of the src directory in to your javascripts directory or whereever else you may want it.

## Usage

### General

### Available Options

* duration: the is the number of seconds until the tminus reaches zero. The default is 1 hour (3,600 seconds).
* time_format
* tick_event:
* termination_event
* expire_event

### Examples

Examples can be seen under the "examples" directory.

## Testing

I'm using [Jasmine](https://github.com/pivotal/jasmine) as the testing framework. To see the tests run, open the SpecRunner.html in a browser. New tests need to be added to the TMinusSpec.js file.

You can ignore the PlayerSpec.js file. I had it there for reference.

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a
  future version unintentionally.
* Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2011 Samuel Mullen. See LICENSE for details.
