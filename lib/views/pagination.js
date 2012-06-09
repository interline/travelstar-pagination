require('travelstar-pagination/core');

var get = Em.get, getPath = Em.getPath;

TS.PaginationView = Em.View.extend({

  templateName: 'travelstar-pagination/~templates/pagination',

  delegate: null,
  
  summaryOnTop: true,

  pages: function() {
    var pages = [];
    var delegate = get(this, 'delegate');

    if (delegate) {
      var totalPages = get(delegate, 'totalPages'),
          currentPage = get(delegate, 'page'),
          start = currentPage - 5,
          stop;

      start = (start < 1 ? 1 : start);
      stop = start + 9;
      stop = (stop > totalPages ? totalPages : stop);
      for(var a=start;a<=stop;a++) {
        pages.push({ idx: a, isCurrent: a === currentPage });
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
