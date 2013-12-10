var InputListView = Backbone.View.extend({
    defaults: {
          isRotated : false
        },
        initialize : function() {
            this.render();
        },
        events :{
            "click .customfilter img" : "showDatePeopleFilter"
        },
        showDatePeopleFilter : function(event){

        var element=$(event.currentTarget);
            element.css("width","29");
            if(!this.isRotated){
                this.isRotated=true;                
                element.addClass('rotate-90-deg');
                element.removeClass('reset-rotate');
            }else{
                this.isRotated=false;                
                element.addClass('reset-rotate');
                element.removeClass('rotate-90-deg');
            }
        
        },
        render : function(event) {
            if(event)
                event.preventDefault();

            var availableTags = [ "ActionScript",
                "AppleScript", "Asp", "BASIC",
                "C", "C++", "Clojure", "COBOL",
                "ColdFusion", "Erlang",
                "Fortran", "Groovy", "Haskell",
                "Java", "JavaScript", "Lisp",
                "Perl", "PHP", "Python",
                "Ruby", "Scala", "Scheme" ];
            $(".selector").autocomplete("enable");

            $(".searchbar").autocomplete({
                source : availableTags
            });

            $(".selector").autocomplete("disable");
            return false;
        }
    });