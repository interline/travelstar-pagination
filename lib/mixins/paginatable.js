require('travelstar-pagination/core');

var get = Em.get, set = Em.set;

/**
  @extends Ember.Mixin

  Implements common pagination management properties for controllers.
*/
TS.Paginatable = Em.Mixin.create({

  isPaginatable: true,

  total: 0,

  rangeStart: 0,

  rangeWindowSize: 10,

  didRequestRange: Ember.K,

  rangeStop: function() {
    var total = get(this, 'total');
    var rangeStop = get(this, 'rangeStart') + get(this, 'rangeWindowSize');
    if (total > rangeStop) return rangeStop;
    return total;
  }.property('total', 'rangeStart', 'rangeWindowSize').cacheable(),

  page: function() {
    return (get(this, 'rangeStart') / get(this, 'rangeWindowSize')) + 1;
  }.property('rangeStart', 'rangeWindowSize').cacheable(),

  totalPages: function() {
    return Math.ceil(get(this, 'total') / get(this, 'rangeWindowSize'));
  }.property('total', 'rangeWindowSize').cacheable(),

  canPageBackwards: function() {
    return get(this, 'rangeStart') > 0;
  }.property('rangeStart').cacheable(),

  canPageForwards: function() {
    return get(this, 'total') > get(this, 'rangeStop');
  }.property('total', 'rangeStop').cacheable(),

  previousPage: function() {
    if (get(this, 'canPageBackwards')) {
      this.decrementProperty('rangeStart', get(this, 'rangeWindowSize'));
    }
  },

  nextPage: function() {
    if (get(this, 'canPageForwards')) {
      this.incrementProperty('rangeStart', get(this, 'rangeWindowSize'));
    }
  },

  pageTo: function(page) {
    if (page > 0 && page <= get(this, 'totalPages')) {
      set(this, 'rangeStart', (page - 1) * get(this, 'rangeWindowSize'));
    }
  },

  pageDidChange: function() {
    this.didRequestRange(get(this, 'rangeStart'), get(this, 'rangeStop'));
  }.observes('rangeStart', 'rangeStop')

});
