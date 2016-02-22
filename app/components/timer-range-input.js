import Ember from 'ember';

export default Ember.Component.extend({

  className: function() {
    return "range-" + this.get('value') 
  }.property('value'),

  input: function() {
    var value = this.$('input[type=range]').val(),
        description = this.$('input[type=text]').val()
    this.set('value', value)
    this.set('description', description)
  },

  canNotFocus: function () {
    return this.get('value') === 0
  }.property('value'),

  change: function() {
    var label = this.get('label'),
        value = this.$('input[type=range]').val(),
        description = this.$('input[type=text]').val()
    this.sendAction('onChange', label, value, description)
  }

});
