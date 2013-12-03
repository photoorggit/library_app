var InputListView = Backbone.View
    .extend({
        events : {
            "click input" : "render"
        },
        render : function(event) {
            event.preventDefault();

            var availableTags = [ "ActionScript",
                "AppleScript", "Asp", "BASIC",
                "C", "C++", "Clojure", "COBOL",
                "ColdFusion", "Erlang",
                "Fortran", "Groovy", "Haskell",
                "Java", "JavaScript", "Lisp",
                "Perl", "PHP", "Python",
                "Ruby", "Scala", "Scheme" ];


            $(".input-search").autocomplete({
                source : availableTags
            });


            return false;
        }
    });