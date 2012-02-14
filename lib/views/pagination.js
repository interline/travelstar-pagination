require('travelstar-pagination/core');

var get = Em.get, getPath = Em.getPath;

TS.PaginationView = Em.View.extend({

  templateName: 'travelstar-customer/~templates/pagination',

  delegate: null,

  pages: function() {
    var delegate = get(this, 'delegate');
    var totalPages = get(delegate, 'totalPages');
    var page = get(delegate, 'page');
    var pages = [];
    for (var idx = 1; idx <= totalPages; idx++) {
      pages.push({
        idx: idx,
        isCurrent: idx === page
      });
    }
    return pages;
  }.property('delegate.page', 'delegate.totalPages').cacheable(),

  disablePrev: function() {
    return !getPath(this, 'delegate.hasPrevious');
  }.property('delegate.hasPrevious').cacheable(),

  disableNext: function() {
    return !getPath(this, 'delegate.hasNext');
  }.property('delegate.hasNext').cacheable(),

  previousPage: function() {
    var delegate = get(this, 'delegate');
    if (delegate) delegate.previousPage();
  },

  nextPage: function() {
    var delegate = get(this, 'delegate');
    if (delegate) delegate.nextPage();
  },

  pageTo: function(view, event, context) {
    var delegate = get(this, 'delegate');
    if (delegate) {
      var idx = get(context, 'idx');
      delegate.pageTo(idx);
    }
  }

});
