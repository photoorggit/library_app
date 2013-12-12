/**
 * Created with JetBrains RubyMine.
 * User: sandeep
 * Date: 12/9/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 *
 */
var PhotoLibrary = function () {
    this.Util = {};
    this.Util.Dom = {};
    this.Util.Dom =
    {
        /**
         * This method gives the the scrollBar position(left and top)
         *
         * @return It returns a object having scrollTop and scrollLeft position
         */
        getPageScrollPosition: function () {
            var pos = {};
            if (undefined !== document.documentElement &&
                undefined !== document.documentElement.scrollTop &&
                0 !== document.documentElement.scrollTop) {     // IE6 strict.Chrome is giving document.documentElement.scrollTop as 0 even when scrolled
                pos.scrollLeft = document.documentElement.scrollLeft;
                pos.scrollTop = document.documentElement.scrollTop;
            } else if (undefined !== document.body && undefined !== document.body.scrollTop) { // IE
                pos.scrollLeft = document.body.scrollLeft;
                pos.scrollTop = document.body.scrollTop;
            } else if (undefined !== window.pageYOffset) {  // all other browser types
                pos.scrollLeft = window.pageXOffset;
                pos.scrollTop = window.pageYOffset;
            }
            return pos;
        },

        /**
         *
         * @returns {___anonymous21675_21676}
         */
        getBrowserViewportDimension: function () {
            var dim = {};
            if (undefined !== document.documentElement &&
                undefined !== document.documentElement.clientHeight &&
                0 !== document.documentElement.clientHeight) {  // IE6+ strict
                dim.width = document.documentElement.clientWidth;
                dim.height = document.documentElement.clientHeight;
            } else if (undefined !== document.body && undefined !== document.body.clientHeight) { //IE6 quirks
                dim.width = document.body.clientWidth;
                dim.height = document.body.clientHeight;
            } else if (undefined !== window.innerHeight) {  // all other browser types
                dim.width = window.innerWidth;
                dim.height = window.innerHeight;
            }
            return dim;
        },
        /**
         * findYPos finds the top(Y) Value of the Object
         *
         * @param obj: the HTML element
         *
         * @return It returns Y Value of the HTML element
         */
        findYPos: function (obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                do {
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            return curtop;
        },
        /**
         * getURl state hash value
         */
        getURLHash:function(){
          return this.state;
        },//TODO:Need to add code to handle hash
        updateUrlHash:function(){
            //current state value
            var currentState = this.state;

        }
    };
    this.Util.state={};
    this.Filter = {};
    this.Filter.Library = {};
    this.Filter.Library = {
        /*
         It returns search filter array
         */
        getSearchFilters: function () {
            return this.searchFilter;
        },
        /**
         * Using below method we can set/add filter
         */
        setSearchFilter: function (filter) {
            this.searchFilter.push(filter);
        },
        /**
         * To remove filter from searchfilter
         * @param filter
         */
        removeSearchFilter: function (filter) {
            this.searchFilter.pop(filter)
        },
        /**
         * Resting search filter with empty
         */
        resetSearchFilter: function () {
            this.searchFilter.length = 0;
        },
        /**
         *
         * @returns {*}
         */
        getDateFilter: function () {
            return this.dateFilter;
        },
        /**
         * it will set start time
         * @param start
         */
        setStartDate: function (start) {
            this.dateFilter.dateStart = start;
        },
        /**
         * It will End time
         * @param end
         */
        setEndDate: function (end) {
            this.dateFilter.dateEnd = end;
        }
    }
    /**
     * Libray filter global varialbs
     */
    this.Filter.Library.searchFilter = [],
    this.Filter.Library.dateFilter = {'dateStart': '', 'dateEnd': ''},
    //TODO:Need to add filter specific to stories if any
    this.Filter.Stories = {};
}

var photoLib = new PhotoLibrary();
