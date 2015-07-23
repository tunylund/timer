import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'timer/tests/helpers/start-app';

var application;

module('Acceptance | login', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /login', function(assert) {
  visit('/login');

  click('button.login')

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});
