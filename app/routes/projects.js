import Ember from 'ember';

export default Ember.Route.extend({
  
  model: function(params) {
    return this.store.find('project')
  },

  actions: {

    error: function(error, transition) {
      // Return true to bubble this event to any parent route.
      return true;
    }

  }

});
