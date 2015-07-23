import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {path: '/'})
  this.route('login', {path: '/login'})
  this.route('projects', {path: '/projects'})
  this.route('project', {path: '/projects/:slug'})
});

export default Router;
