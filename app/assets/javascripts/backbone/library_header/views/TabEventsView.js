var TabEventsView = Backbone.View.extend({
    events : {
        "click ul li" : "render"
    },
    render : function(event) {
        event.preventDefault();
        var li=$(event.currentTarget).parent().children('li');
        li.css('font-weight', 'lighter');
        $(event.currentTarget).css('font-weight','900');
        //libContainer
      var clickedLi = $(event.currentTarget).children().text().trim();
             if(!clickedLi.indexOf("Stories")){
                $(".fluidGridContainer").hide();
                $(".libContainer").hide();
             }else{
                 $(".fluidGridContainer").show();
                 $(".libContainer").show();
             }
        return false;
    }
});