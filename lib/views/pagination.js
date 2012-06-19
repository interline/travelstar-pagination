require('travelstar-pagination/core');

var get = Em.get, getPath = Em.getPath, ceil = Math.ceil;

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
    return !getPath(this, 'controller.canPageBackwards');
  }).property('controller.canPageBackwards').cacheable(),

  disableNext: Em.computed(function() {
    return !getPath(this, 'controller.canPageForwards');
  }).property('controller.canPageForwards').cacheable(),

  previousPage: function() {
    var controller = get(this, 'controller');
    if (controller && typeof controller.previousPage === 'function') {
      controller.previousPage();
    }
  },

  nextPage: function() {
    var controller = get(this, 'controller');
    if (controller && typeof controller.nextPage === 'function') {
      controller.nextPage();
    }
  },

  pageTo: function(event) {
    var controller = get(this, 'controller');
    if (controller && typeof controller.pageTo === 'function') {
      var idx = get(event.context, 'idx');
      controller.pageTo(idx);
    }
  }

});
