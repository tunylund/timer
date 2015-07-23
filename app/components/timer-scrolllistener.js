import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement: function() {
    this.bindScrolling();
  },

  willDestroyElement: function() {
    this.unbindScrolling();
  },

  detectTopOrBottom: function () {
    var y = window.scrollY,
        wh = window.innerHeight,
        h = document.body.scrollHeight,
        $topMostLi = Ember.$('li').first(),
        offset = $topMostLi.offset().top - y
    
    function maintainScrollPos() {
      var liy = $topMostLi.offset().top
      if(window.scrollY + wh < liy) {
        Ember.$(window).scrollTop(liy - offset)
      }
    }
    
    if(y < 50) {
      this.sendAction('atTop')
      Ember.run.scheduleOnce('afterRender', this, maintainScrollPos)
    }
    
    if(y + wh > h - 50) {
      this.sendAction('atBottom')
      Ember.run.scheduleOnce('afterRender', this, maintainScrollPos)
    }

  },

  maintainMonthPos: function() {
    var y = window.scrollY,
        $months = Ember.$(".month"),
        $m, $nm,
        t, nt;
    $months.removeClass('fixed')
    for(var i=0; i<$months.length; i++) {
      $m = $months.eq(i)
      $nm = $months.eq(i+1)
      t = $m.parent().offset()
      nt = $nm.parent().offset()
      if(t.top < y) {
        $m.removeClass('fixed')
      }
      if(t.top + $m.height() < y + $m.height() + 45 && (!nt || nt.top > y)) {
        $m.addClass('fixed')
      }
    }
  },

  scrolled: function(e) {
    Ember.run.debounce(this, this.detectTopOrBottom, e, 150)
    this.maintainMonthPos()
  },

  bindScrolling: function() {
    this._scrolled = this._scrolled || this.scrolled.bind(this)
    Ember.$(document).on('touchmove', this._scrolled);
    Ember.$(window).on('scroll', this._scrolled);
  },

  unbindScrolling: function(){
    Ember.$(window).on('scroll', this._scrolled);
    Ember.$(document).on('touchmove', this._scrolled);
  }


});
