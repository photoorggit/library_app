var TabEventsView = Backbone.View.extend({
    initialize:function(options){
        //on page load clicking on Library Tab
        this.setElement(options.el);
        var liElement = $("."+this.el.className+" li").first();
        $(liElement).trigger('click');
    },
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
        var element=$(".libContainer");
             if(!clickedSpan.indexOf("Stories")){
                //$(".libContainer").hide();
                 element.removeClass('visibleElement');
                 element.addClass('hideElement');
             }else{
                 //$(".libContainer").show();
                 element.removeClass('hideElement');
                 element.addClass('visibleElement');
             }
        return false;
    }
});