import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({

  generateIdForRecord: function(store, type, inputProperties) {
    return inputProperties.slug;
  },

  findAll: function(store, type) {
    var url = type;
    return new Ember.RSVP.Promise(function(resolve) {
      var data = JSON.parse(localStorage.getItem('timer')) || {},
          result = []
      for(var path in data) {
        if (path.indexOf(url) > -1) {
          result.push(data[path])
        }
      }
      Ember.run(null, resolve, result);
    });
  },
  
  findRecord: function(store, type, id) {
    var url = [type, id].join('/');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data = JSON.parse(localStorage.getItem('timer')) || {},
          item = data[url]
      if (item) {
        Ember.run(null, resolve, item);
      } else {
        Ember.run(null, reject, new Error('not found'));
      }
    });
  },

  createRecord: function(store, type, snapshot) {
    var data = JSON.parse(localStorage.getItem('timer')) || {};
    var attrs = this.serialize(snapshot, { includeId: true });
    var url = [type, attrs.slug].join('/');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (data[url]) {
        Ember.run(null, reject, new Error('already exists'));
      } else {
        data[url] = attrs
        localStorage.setItem('timer', JSON.stringify(data))
        Ember.run(null, resolve);
      }
    }.bind(this));
  },

  updateRecord: function(store, type, snapshot) {
    var data = JSON.parse(localStorage.getItem('timer')) || {};
    var attrs = this.serialize(snapshot, { includeId: true });
    var url = [type, attrs.slug].join('/');

    return new Ember.RSVP.Promise(function(resolve) {
      data[url] = attrs
      localStorage.setItem('timer', JSON.stringify(data))
      Ember.run(null, resolve);
    });
  }

});