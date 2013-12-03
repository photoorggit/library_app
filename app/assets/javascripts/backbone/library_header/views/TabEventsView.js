var TabEventsView = Backbone.View.extend({
    el : '.tabs',
    events : {
        "click .tabs ul li" : "render"
    },
    render : function(event) {
        event.preventDefault();
        $(event.currentTarget).parent().children('li')
            .css('font-weight', 'lighter');
        $(event.currentTarget).css('font-weight','900');
        //libContainer
        return false;
    }
});