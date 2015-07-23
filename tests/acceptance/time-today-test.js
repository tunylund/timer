import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'timer/tests/helpers/start-app';

var application;

module('Acceptance | time today', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /time-today', function(assert) {
  var today = moment().format("YYYY-MM-DD")
  visit('/projects');

  fillIn('[name="hours[' + today +']"]', 7.5)

  andThen(function() {
    assert.equal(7.5, Ember.$('[name="hours[' + today +']"]').val());
  });
});
