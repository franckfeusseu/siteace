
Router.route('/', function(){
   this.render('siteace');
});
Router.route('/site/:_id', function () {
    this.render('website_detail', {
        data: function() {
            return Websites.findOne({_id: this.params._id});
        }
    });
});
