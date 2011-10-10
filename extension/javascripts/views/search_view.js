SearchView = Backbone.View.extend({
  className: 'search_view',

  render: function(type) {
    $(this.el).hide();
    $('#searchTemplate').tmpl(this.model.presenter()).appendTo(this.el);

    var self = this;
    $(this.el).fadeIn('fast', function() {
      $('.spinner').spin();
      PageVisit.search(self.model.options(), function(results) {
        $('.spinner').hide();
        if(results.length === 0) {
          self.renderNoResults();
        } else {
          self.renderPageVisits(results);
        }
      });
    });

    return this;
  },

  renderNoResults: function () {
    $('#noVisitsTemplate').tmpl().appendTo($('.content', this.el));
  },

  renderPageVisits: function(pageVisits) {
    var pageVisitView;
    this.collection = pageVisits;

    $.each(this.collection.models, function(i) {
      pageVisitView = new PageVisitView({model: this});
      $('.content').append(pageVisitView.render().el);
    });
  }
});
