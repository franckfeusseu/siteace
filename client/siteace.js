	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort: {voteUp:-1}} );
		}
	});
       // list comments
         Template.comments_list.helpers({
        	comments: function() {
		return Comments.find({website: Router.current().params._id}, {sort: {createdOn: 1}});
	}
     });

        //format Date
	Template.registerHelper('formattedDate',function(){
		return moment(this.createdOn).format("MM/DD/YYYY");
	       });

        
	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
                        Websites.update({_id: website_id},{$set: {voteUp: this.voteUp + 1}});
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!
                         
                        Websites.update({_id: website_id},{$set: {voteDown: this.voteDown + 1}});
			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

		if (Meteor.user()){
			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			var title = event.target.title.value;
			var description= event.target.description.value;
			console.log("The url they entered is: "+url);
			
			//  put your website saving code in here!	
                        Websites.insert({
				title: title,
				url: url,
				description: description,
				createdOn: new Date(),
				voteUp: 0
			})
			
		}
		else {
			alert('you need to be logged in to submit')
		     }		
			
			return false;// stop the form submit from reloading the page

            }
          });
         // Site details events
      Template.website_detail.events({
       "click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
                        Websites.update({_id: website_id},{$set: {voteUp: this.voteUp + 1}});
			return false;// prevent the button from reloading the page
		},
       "submit .js-add-comment-form": function(event) {
         var comment = event.target.comment.value;
         console.log("comment submit: "+comment);
	
           Comments.insert({
            website: Router.current().params._id, 
            comments: comment,
            createdOn: new Date()
          });

        return false;
   }
});


    

