import Ember from 'ember';

export default Ember.ArrayController.extend({

  newProjectFormIsVisible: false,

  actions: {

    showNewProjectForm: function() {
      this.set('newProjectFormIsVisible', true)
    },

    createNewProject: function() {
      var name = this.get('newProjectName')
      if(name && name.replace(/\s/g, '').length > 0) {
        this.store.createRecord('project', {
          name: name,
          slug: encodeURIComponent(this.get('newProjectName'))
        }).save();
      }
    }

  }

});
