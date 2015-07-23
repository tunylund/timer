import Ember from 'ember';

export default Ember.Route.extend({
  
  model: function(params) {
    return Ember.RSVP.all([
      this.store.find('project'),
      this.store.find('project', params.slug)
    ])
  },

  setupController: function(controller, model) {
    console.log(model)
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    controller.initDays()
  },

  actions: {

    error: function(error, transition) {

      if (error) {
        // error substate and parent routes do not handle this error
        return this.transitionTo('projects');
      }

      // Return true to bubble this event to any parent route.
      return true;
    }

  }

});
