import Ember from 'ember';

export default Ember.Component.extend({

  id: function() {
    return "hours-" + this.get('label')
  }.property('label'),

  className: function() {
    return "range-" + this.get('value') 
  }.property('value'),

  name: function() {
    return "hours[" + this.get('label') + "]"
  }.property('label'),

  actions: {

    setHours: function() {
      var label = this.get('label'),
          value = this.get('value')
      this.sendAction('change', label, value)
    }

  }

});
