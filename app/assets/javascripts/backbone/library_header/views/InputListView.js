var InputListView = Backbone.View.extend({
        initialize : function() {
            this.render();
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