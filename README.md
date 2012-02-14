# Travelstar Pagination

## Building

    $ bundle install
    $ bundle exec rakep build

## Using

### results.js

```javascript
App.resultsController = Em.ArrayProxy.create(TS.PaginationSupport, {
    fullContent: [],
    totalBinding: 'fullContent.length',
    didRequestRange: function(rangeStart, rangeStop) {
      var content = this.get('fullContent').slice(rangeStart, rangeStop);
      this.set('content', content);
    }
});
```

### main_page.handlebars

{{view TS.PaginationView delegateBinding="TS.resultsController"}}
