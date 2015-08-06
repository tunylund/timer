import Ember from 'ember';

export default Ember.Route.extend({

  projects: [],

  model: function(params) {
    return Ember.RSVP.all([
      this.store.find('project'),
      this.store.find('project', params.slug)
    ]);
  },

  setupController: function(controller, models) {
    controller.set('projects', models[0])
    this._super(controller, models[1]);
    controller.initDays()
    this.controllerFor('application').set('title', models[1].get('name'))
  },

  activate: function() {
    this._super.apply(this, arguments);
    Ember.run.scheduleOnce('afterRender', this, function(){
      var $today = Ember.$('.today')
      Ember.$(window).scrollTop($today.offset().top - $today.height())
    });
  },

  actions: {

    error: function(error) {
      if (error && error.message.indexOf('not found') > -1) {
        // error substate and parent routes do not handle this error
        return this.transitionTo('projects');
      }

      // Return true to bubble this event to any parent route.
      return true;
    }

  }

});
