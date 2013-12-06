var pictView = Backbone.View.extend({
    tagName: 'div', // name of (orphan) root tag in this.el
    initialize: function(){
        _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
    },
    render: function(){
        $(this.el).html('<img src='+this.model.get('url')+' width='+this.model.get('width')+'px height='+this.model.get('height')+'px />');
        return this; // for chainable calls, like .render().el
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
        $(ygv.el).append('<div id='+photosYear+'><p class="monthbar">'+photosYear+'</p><div id=pg'+photosYear+' class=collage></div></div>');
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