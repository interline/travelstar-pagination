require('travelstar-pagination/core');

var get = Em.get, ceil = Math.ceil;

TS.PaginationView = Em.View.extend({

  templateName: 'travelstar-pagination/~templates/pagination',

  maxPages: 10,

  pages: function() {
    var pages = [];
    var controller = get(this, 'controller');

    if (controller) {
      var totalPages = get(controller, 'totalPages'),
          currentPage = get(controller, 'page'),
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
  }.property('controller.page', 'controller.totalPages').cacheable(),

  disablePrev: Em.computed(function() {
    return !get(this, 'controller.canPageBackwards');
  }).property('controller.canPageBackwards').cacheable(),

  disableNext: Em.computed(function() {
    return !get(this, 'controller.canPageForwards');
  }).property('controller.canPageForwards').cacheable(),

  previousPage: function() {
    Em.tryInvoke(get(this, 'controller'), 'previousPage');
  },

  nextPage: function() {
    Em.tryInvoke(get(this, 'controller'), 'nextPage');
  },

  pageTo: function(event) {
    var idx = get(event.context, 'idx');
  	Em.tryInvoke(get(this, 'controller'), 'pageTo', [idx]);
  }

});
