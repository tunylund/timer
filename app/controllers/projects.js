import Ember from 'ember';

export default Ember.Controller.extend({

  newProjectFormIsVisible: false,

  actions: {

    newProjectClick: function() {
      if(this.get('newProjectFormIsVisible')) {
        this.send('createNewProject')
      } else {
        this.set('newProjectFormIsVisible', true)
      }
    },

    createNewProject: function() {
      var name = this.get('newProjectName'),
          slug = encodeURIComponent(this.get('newProjectName'));
      if(name && name.replace(/\s/g, '').length > 0 && !this.store.hasRecordForId('project', slug)) {
        this.store.createRecord('project', {
          name: name,
          slug: slug
        }).save()
        this.set('newProjectName', '')
        this.set('newProjectFormIsVisible', false)
      }
    }
  }

});