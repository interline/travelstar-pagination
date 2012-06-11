require('travelstar-pagination/core');

var get = Em.get, getPath = Em.getPath, ceil = Math.ceil;

TS.PaginationView = Em.View.extend({

  templateName: 'travelstar-pagination/~templates/pagination',

  delegate: null,

  maxPages: 10,

  pages: function() {
    var pages = [];
    var delegate = get(this, 'delegate');

    if (delegate) {
      var totalPages = get(delegate, 'totalPages'),
          currentPage = get(delegate, 'page'),
          maxPages = get(this, 'maxPages') || totalPages,
          start = currentPage - ceil(maxPages / 2),
          stop;

      if (start < 1) start = 1;

      stop = start + maxPages - 1;
      if (stop > totalPages) stop = totalPages;

      for (var idx = start; idx <= stop; idx++) {
        pages.push({ idx: idx, isCurrent: idx === currentPage });
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
    if (delegate && typeof delegate.previousPage === 'function') {
      delegate.previousPage();
    }
  },

  nextPage: function() {
    var delegate = get(this, 'delegate');
    if (delegate && typeof delegate.nextPage === 'function') {
      delegate.nextPage();
    }
  },

  pageTo: function(event) {
    var delegate = get(this, 'delegate');
    if (delegate && typeof delegate.pageTo === 'function') {
      var idx = get(event.context, 'idx');
      delegate.pageTo(idx);
    }
  }

});
