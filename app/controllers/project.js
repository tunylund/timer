import Ember from 'ember';

export default Ember.Controller.extend({

  createDays: function (s, e) {
    var i = s,
        today = moment().startOf('day'),
        result = [],
        hours = this.get('hours')
    while(i < e) {
      var label = i.format('YYYY-MM-DD'),
          hour = hours[label] || {}
      result.push({
        isFirstOfMonth: i.get('date') === 1,
        isToday: i.isSame(today),
        monthLabel: i.format('MMMM YYYY'),
        dayName: i.format('dddd'),
        label: i.format('YYYY-MM-DD'),
        dayOfWeek: i.format('dd'),
        value: hour.value || 0,
        description: hour.description || ""
      })
      i.add(1, 'day')
    }
    return result
  },

  initDays: function() {
    var range = this.get('visibleRange');
    var days = this.createDays(range.s.clone(), range.e.clone())
    this.set('days', days)
  },

  addDays: function(s, e) {
    var days = this.createDays(s, e),
        visibleRange = this.get('visibleRange');
    if(e.isBefore(visibleRange.s)) {
      this.set('days', days.concat(this.get('days')))
    } else {
      this.set('days', this.get('days').concat(days))
    }
  },

  visibleRange: function() {
    var days = this.get('days')
    if(!days || days.length === 0) {
      return {
        s: moment().add(-1, 'month').startOf('month'),
        e: moment().endOf('month')
      }
    } else {
      return {
        s: moment(days[0].label),
        e: moment(days[days.length-1].label)
      }
    }
  }.property('days'),

  hours: Ember.computed.alias('model.hours'),

  days: Ember.A([]),

  actions: {

    setHours: function(label, value, description) {
      var days = this.get('days'),
          ix = -1,
          day;
      day = days.find(function(d, i) {
        if (d.label === label) {
          ix = i;
          return true;
        }
      })
      Ember.set(day, 'value', value)
      Ember.set(day, 'description', description)
      days.replace(ix, 1, day)

      Ember.set(day, 'value', value)
      Ember.set(day, 'description', description)
      var hours = this.model.get('hours')
      hours[label] = {
        value: value,
        description: description
      }
      Ember.set(this.model, 'hours', hours)
      this.model.save()
    },

    loadEarlier: function() {
      var range = this.get('visibleRange'),
          s = range.s.clone().add(-1, 'month')
      this.addDays(s, s.clone().endOf('month'))
    },

    loadMore: function() {
      var range = this.get('visibleRange'),
          e = range.e.clone().add(1, 'month')
      this.addDays(e.clone().startOf('month'), e)
    }

  }

});
