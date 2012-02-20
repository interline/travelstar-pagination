require('travelstar-pagination/core');

var get = Em.get, getPath = Em.getPath;

TS.PaginationView = Em.View.extend({

  templateName: 'travelstar-customer/~templates/pagination',

  delegate: null,

  pages: function() {
    var pages = [];
    var delegate = get(this, 'delegate');

    if (delegate) {
      var totalPages = get(delegate, 'totalPages');
      var currentPage = get(delegate, 'page');

      for (var idx = 1; idx <= totalPages; idx++) {
        pages.push({
          idx: idx,
          isCurrent: idx === currentPage
        });
      }
    }
    return pages;
  }.property('delegate.page', 'delegate.totalPages').cacheable(),

  disablePrev: function() {
    return !getPath(this, 'delegate.canPageBackwards');
  }.property('delegate.canPageBackwards').cacheable(),

  disableNext: function() {
    return !getPath(this, 'delegate.canPageForwards');
  }.property('delegate.canPageForwards').cacheable(),

  previousPage: function() {
    var delegate = get(this, 'delegate');
    if (delegate && delegate.previousPage) {
      delegate.previousPage();
    }
  },

  nextPage: function() {
    var delegate = get(this, 'delegate');
    if (delegate && delegate.nextPage) {
      delegate.nextPage();
    }
  },

  pageTo: function(view, event, context) {
    var delegate = get(this, 'delegate');
    if (delegate && delegate.pageTo) {
      var idx = get(context, 'idx');
      delegate.pageTo(idx);
    }
  }

});
