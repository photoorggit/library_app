/**
 * Created with JetBrains RubyMine.
 * User: sandeep
 * Date: 12/9/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 *
 */
var plInstance;// photolib instance
var PhotoLibrary = function () {
    if (plInstance instanceof PhotoLibrary)
        return plInstance;
    else
        return this;
};
PhotoLibrary.prototype.Util = {};
PhotoLibrary.prototype.Util.Dom = {};
PhotoLibrary.prototype.Util.Dom =
   {
        /**
         * @return It returns the x/y offset between the element el and the browser's viewport left/top.
         *         The returned object has { offsetTop, offsetLeft }
         * - remove this function once old sofi files are cleaned
         */
        getBrowserViewportOffsetToElement: function (el) {
            var upstream = { offsetTop: 0, offsetLeft: 0 };
            var thisNode = el;
            while (thisNode) {
                upstream.offsetTop += thisNode.offsetTop + thisNode.clientTop -
                    (thisNode.offsetParent ? thisNode.offsetParent.scrollTop : 0);
                upstream.offsetLeft += thisNode.offsetLeft + thisNode.clientLeft -
                    (thisNode.offsetParent ? thisNode.offsetParent.scrollLeft : 0);
                thisNode = thisNode.offsetParent;
            }
            return upstream;
        },

        /**
         * @return It returns the x/y offset between the descendant element and the ancestor element.
         *         The returned offset object has { offsetTop, offsetLeft }
         *         - remove this function once old sofi files are cleaned
         */
        getDescendantOffsetToAncestor: function (ancestor, descendant) {
            var offset = { offsetTop: 0, offsetLeft: 0 };
            var thisNode = descendant;
            while (thisNode && ancestor != thisNode) {
                offset.offsetTop += thisNode.clientTop + thisNode.offsetTop -
                    (thisNode.offsetParent ? thisNode.offsetParent.scrollTop : 0);
                offset.offsetLeft += thisNode.clientLeft + thisNode.offsetLeft -
                    (thisNode.offsetParent ? thisNode.offsetParent.scrollLeft : 0);
                thisNode = thisNode.offsetParent;
            }
            return offset;
        },

        /**
         * @return It returns the x/y offset between the descendant element and the ancestor element
         *         based on their structure without considering the runtime scrolling offsets.
         *         The returned offset object has { offsetTop, offsetLeft }
         *         - remove this function once old sofi files are cleaned
         */
        getDescendantStructuralOffsetToAncestor: function (ancestor, descendant) {
            var offset = { offsetTop: 0, offsetLeft: 0 };
            var thisNode = descendant;
            while (thisNode && ancestor != thisNode) {
                offset.offsetTop += thisNode.clientTop + thisNode.offsetTop;
                offset.offsetLeft += thisNode.clientLeft + thisNode.offsetLeft;
                thisNode = thisNode.offsetParent;
            }
            return offset;
        },

        /**
         * @param id is a string of an ID to search for.
         * @param rootEl is optional, if omitted, then the search begins at the document root.  If
         *               specified, then the search begins from that supplied rootEl.
         * @return It returns an array of matched DOM elements found, or null if not found
         * - remove this function once old sofi files are cleaned
         */
        getDescendantById: function (id, rootEl) {
            if (!id || typeof id != "string") {
                return null;
            }
            if (rootEl) {
                if (1 != rootEl.nodeType) {
                    return null;
                }
            } else {
                rootEl = document;
            }
            if (rootEl.id && rootEl.id == id) {
                return rootEl;
            }
            var i = 0, nodeFound = null;
            if (rootEl.childNodes && rootEl.childNodes.length > 0) {
                for (i = 0; i < rootEl.childNodes.length; i++) {
                    if (1 != rootEl.childNodes[i].nodeType) {
                        continue;
                    }
                    nodeFound = arguments.callee(id, rootEl.childNodes[i]);
                    if (nodeFound) {
                        return nodeFound;
                    }
                }
            } else {
                return null;
            }
        },

        /**
         * @param oneClassname is a string with one style classname to search for.
         * @param rootEl is optional, if omitted, then the search begins at the document root.  If
         *               specified, then the search begins from that supplied rootEl.
         * @return It returns an array of all matched DOM elements found, or null if not found
         * - remove this function once old sofi files are cleaned
         */
        getDescendantsByStyleClass: function (oneClassname, rootEl) {
            if (!oneClassname || typeof oneClassname != "string") {
                return null;
            }
            if (rootEl) {
                if (1 != rootEl.nodeType) {
                    return null;
                }
            } else {
                rootEl = document;
            }
            var i = 0, nodes = null, nodesFound = null, t = null;
            if (rootEl.childNodes && rootEl.childNodes.length > 0) {
                for (i = 0; i < rootEl.childNodes.length; i++) {
                    if (1 != rootEl.childNodes[i].nodeType) {
                        continue;
                    }
                    nodesFound = arguments.callee(oneClassname, rootEl.childNodes[i]);
                    if (nodesFound) {
                        if (nodes) {
                            nodes = nodes.concat(nodesFound);
                            delete nodesFound;
                        } else {
                            nodes = nodesFound;
                        }
                        nodesFound = null;
                    }
                }
            }

            var attr = SFDam.util.UA.isIE && SFDam.util.UA.version < 8 ? "className" : "class";
            var existingClasses = rootEl.getAttribute(attr);
            if (!existingClasses) {
                return nodes;
            }
            var classArr = existingClasses.split(/\s+/);
            for (i = 0; i < classArr.length; i++) {
                if (oneClassname == classArr[i]) {
                    break;
                }
            }
            if (i < classArr.length) {
                return nodes ? nodes.push(rootEl) : [rootEl];
            } else {
                return nodes;
            }
        },

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
        }
    }


var photoLib = new PhotoLibrary();
