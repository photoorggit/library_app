var TabEventsView = Backbone.View.extend({
    events : {
        "click ul li" : "render"
    },
    render : function(event) {
        event.preventDefault();
        var li=$(event.currentTarget).parent().children('li');
        li.find( "span").removeClass('active');
        $(event.currentTarget).find( "span").addClass('active');
        //libContainer
      var clickedSpan = $(event.currentTarget).find("span").text().trim();
             if(!clickedSpan.indexOf("Stories")){
                $(".libContainer").hide();
             }else{
                 $(".libContainer").show();
             }
        return false;
    }
});