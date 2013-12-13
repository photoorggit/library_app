var pictView = Backbone.View.extend({
    tagName: 'div', // name of (orphan) root tag in this.el
    model:null,
    initialize: function(p){
        _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
        model:p;
    },
    events:{
      "click":"test"
    },
    render: function(){
        var html = _.template($('#pictView').html(), this.model.toJSON());
        $(this.el).html(html);
        //$(this.el).html('<img src='+this.model.get('url')+' width='+this.model.get('width')+'px height='+this.model.get('height')+'px />');
        return this; // for chainable calls, like .render().el
    },
    test:function(){
        var currentEL = this.$el.children()[0];
        if($(this.$el.children()[0]).hasClass('selectAsset')){
            $(this.$el.children()[0]).removeClass('selectAsset');
            $(this.$el.children()[0]).addClass('unselecteAsset');
        }else{
            $(this.$el.children()[0]).addClass('selectAsset');
            $(this.$el.children()[0]).removeClass('unselecteAsset');
        }
    }
});
var yearGridView = Backbone.View.extend({
    ygv : null,
    pgId : [],
    initialize: function(){
        _.bindAll(this,'render');
        ygv = this;

    },
    createYearGrid : function(year,yg){
        photosYear = year.year;

        var html = _.template($('#yearGrid').html(), {'photosYear':photosYear});
        $(ygv.el).append(html);
        //$(ygv.el).append('<div id='+photosYear+'><p class="monthbar">'+photosYear+'</p><div id=pg'+photosYear+' class=collage></div></div>');
        //k.addPictToPictCollection(year.pics, k, 'pg'+photosYear);
        ygv.pgId.push("pg"+photosYear);
        pgv = new PictureGridView({el: '#pg'+photosYear});
        pgv.addPictToPictCollection(year.pics, pgv);
        $('#pg'+photosYear).collagePlus({
            'allowPartialLastRow' : true
        })

    }
});
var PictureGridView = Backbone.View.extend({
    pcv :null,
    initialize : function(){
        _.bindAll(this,'addPictToPictCollection','appendItem');
        pcv= this;
        this.collection = new pictCollection();
        this.collection.bind('add', this.appendItem); // collection event binder
    },
    appendItem:function(p){
        // $('ul', this.el).append("<li>"+p.get('url')+" "+p.get('height')+"</li>")
        var pview = new pictView({
            model: p
        })
        $(this.el).append(pview.render().el);
    },
    addPictToPictCollection: function(picts, viewObject,id){
        _.each(picts, function(pic){
            var p = new pict();
            p.set({
                url:pic.url,
                height:pic.height,
                width:pic.width
            });
            pcv.collection.add(p);
        });

    }
});