//As per my opinion is Router concept is use full to handle Hash in url i.e bookmarking the url
var assetGridRouter = Backbone.Router.extend({
    restfulUrl:"http://us2.sfmir1.qa.snapfish.com/snapfish/fe/resources/beapi/website/snapfish_us/acct/10235879008/videoAssets",
    yg:null,
    //Routes tell the app what to do
    routes:{
        "state/:state":"stateFuncton", //This matches app/animals/* and assigns * to a variable called "state"
        "*page":"defaultAction" //This simply matches any urls that weren't caught above and assigns it to "page"
    },
    stateFuncton:function(state){

    },
    defaultAction:function (page) {
        //Once the default action is called we want to construct a link to our restful service
        var restfulPageUrl = this.restfulUrl;
        //Now we have a url lets get the data
        this.loadRestfulData(restfulPageUrl);
    },
    loadRestfulData:function (pageUrl) {
        //I took it for example response
        var pictByYear = {"response":{"Pictures":{"Years":[{"year":2006,"pics":[{"url":"assets/flowers/123.jpg","height":"3008","width":"2000"},{"url":"assets/ed-lea-dribbble-2.png","height":"600","width":"800"},{"url":"assets/ed-lea-dribbble-3.png","height":"300","width":"800"},{"url":"assets/ed-lea-dribbble-4.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"600","width":"800"},{"url":"assets/ed-lea-dribbble-7.png","height":"300","width":"400"},{"url":"http://placehold.it/350x150/69D2E7/ffffff","height":"150","width":"300"},{"url":"http://placehold.it/320x300/E0E4CC/ffffff","height":"300","width":"320"},{"url":"http://placehold.it/320x180/A7DBD8/ffffff","height":"320","width":"180"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/300x300/C02942/ffffff","height":"300","width":"300"}]},{"year":2007,"pics":[{"url":"assets/flowers/123.jpg","height":"3008","width":"2000"},{"url":"assets/flowers/124.jpg","height":"3008","width":"2000"},{"url":"assets/flowers/125.jpg","height":"3008","width":"2000"},{"url":"assets/flowers/126.jpg","height":"2000","width":"3008"},{"url":"assets/flowers/127.jpg","height":"1200","width":"1920"},{"url":"assets/flowers/128.jpg","height":"2004","width":"1692"},{"url":"assets/flowers/129.jpg","height":"1844","width":"2928"},{"url":"http://placehold.it/350x150/69D2E7/ffffff","height":"150","width":"300"},{"url":"http://placehold.it/320x300/E0E4CC/ffffff","height":"300","width":"320"},{"url":"http://placehold.it/320x180/A7DBD8/ffffff","height":"320","width":"180"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/300x300/C02942/ffffff","height":"300","width":"300"}]},{"year":2008,"pics":[{"url":"assets/flowers/130.jpg","height":"1944","width":"2592"},{"url":"assets/flowers/131.jpg","height":"2000","width":"3008"},{"url":"assets/flowers/132.jpg","height":"2000","width":"3008"},{"url":"assets/ed-lea-dribbble-4.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"600","width":"800"},{"url":"assets/ed-lea-dribbble-7.png","height":"300","width":"400"},{"url":"http://placehold.it/350x150/69D2E7/ffffff","height":"150","width":"300"},{"url":"http://placehold.it/320x300/E0E4CC/ffffff","height":"300","width":"320"},{"url":"http://placehold.it/320x180/A7DBD8/ffffff","height":"320","width":"180"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/300x300/C02942/ffffff","height":"300","width":"300"}]},{"year":2011,"pics":[{"url":"assets/flowers/140.jpg","height":"3744","width":"5616"},{"url":"assets/flowers/142.jpg","height":"4472","width":"3286"},{"url":"assets/flowers/143.jpg","height":"1728","width":"2400"},{"url":"assets/flowers/145.jpg","height":"4000","width":"6000"},{"url":"assets/ed-lea-dribbble-5.png","height":"300","width":"400"},{"url":"assets/flowers/139.jpg","height":"2000","width":"3008"},{"url":"assets/flowers/138.jpeg","height":"146","width":"176"},{"url":"assets/flowers/137.jpeg","height":"246","width":"205"},{"url":"assets/flowers/136.jpeg","height":"184","width":"274"},{"url":"assets/flowers/135.jpg","height":"768","width":"1024"},{"url":"assets/flowers/134.jpeg","height":"259","width":"194"},{"url":"assets/flowers/133.jpg","height":"2000","width":"3008"},{"url":"assets/ed-lea-dribbble-5.png","height":"600","width":"800"}]}]}}};
        //Once ajax call success fully done with out crossxhr we have delete below line comment and remove the comment to xhr.send();
        this.processResponse(pictByYear);
        //Load the data in using crossXHR ajax call
        var xhr = new CrossXHR();
        var _this = this;
        xhr.open("GET",pageUrl,true);
        xhr.onreadystatechange = function(){
            try{
                if(xhr.readyState == 4 && xhr.status==200){
                    var responseCode = xhr.status;
                    var myresponse=eval('('+xhr.responseText+')');
                   //TODO here we need to handle it
                    _this.processResponse(pictByYear);
                }
            }catch(e){alert("error"+e)}
        };
        //xhr.send();
        /*var geocodingAPI = "http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true";

        $.getJSON(pageUrl, function (json) {
            console.log(json);
            var address = json.results[0].formatted_address;
            console.log('Address : ', address);

            var latitude = json.results[0].geometry.location.lat;
            console.log('Latitude : ', latitude);

            var longitude = json.results[0].geometry.location.lng;
            console.log('Longitude : ', longitude);
        });*/
    },
    processResponse : function(pByyear){
        //Creating yearGrid and using it.
        this.yg = new yearGridView({el: '#assetGrid'});
        _this = this;
        try{
            _.each(pByyear.response.Pictures.Years,function(yearPics){
                var year = yearPics;
                _this.yg.createYearGrid(year, _this.yg);
            });
        }catch(e){alert(e)}
    },
    loadRemainingAssets : function(){
        var pictByYear = {"response":{"Pictures":{"Years":[{"year":2012,"pics":[{"url":"assets/flowers/123.jpg","height":"3008","width":"2000"},{"url":"assets/ed-lea-dribbble-2.png","height":"600","width":"800"},{"url":"assets/ed-lea-dribbble-3.png","height":"300","width":"800"},{"url":"assets/ed-lea-dribbble-4.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"600","width":"800"},{"url":"assets/ed-lea-dribbble-7.png","height":"300","width":"400"},{"url":"http://placehold.it/350x150/69D2E7/ffffff","height":"150","width":"300"},{"url":"http://placehold.it/320x300/E0E4CC/ffffff","height":"300","width":"320"},{"url":"http://placehold.it/320x180/A7DBD8/ffffff","height":"320","width":"180"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/300x300/C02942/ffffff","height":"300","width":"300"}]},{"year":2013,"pics":[{"url":"assets/flowers/123.jpg","height":"3008","width":"2000"},{"url":"assets/flowers/124.jpg","height":"3008","width":"2000"},{"url":"assets/flowers/125.jpg","height":"3008","width":"2000"},{"url":"assets/flowers/126.jpg","height":"2000","width":"3008"},{"url":"assets/flowers/127.jpg","height":"1200","width":"1920"},{"url":"assets/flowers/128.jpg","height":"2004","width":"1692"},{"url":"assets/flowers/129.jpg","height":"1844","width":"2928"},{"url":"http://placehold.it/350x150/69D2E7/ffffff","height":"150","width":"300"},{"url":"http://placehold.it/320x300/E0E4CC/ffffff","height":"300","width":"320"},{"url":"http://placehold.it/320x180/A7DBD8/ffffff","height":"320","width":"180"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/300x300/C02942/ffffff","height":"300","width":"300"}]},{"year":2014,"pics":[{"url":"assets/flowers/130.jpg","height":"1944","width":"2592"},{"url":"assets/flowers/131.jpg","height":"2000","width":"3008"},{"url":"assets/flowers/132.jpg","height":"2000","width":"3008"},{"url":"assets/ed-lea-dribbble-4.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"300","width":"400"},{"url":"assets/ed-lea-dribbble-5.png","height":"600","width":"800"},{"url":"assets/ed-lea-dribbble-7.png","height":"300","width":"400"},{"url":"http://placehold.it/350x150/69D2E7/ffffff","height":"150","width":"300"},{"url":"http://placehold.it/320x300/E0E4CC/ffffff","height":"300","width":"320"},{"url":"http://placehold.it/320x180/A7DBD8/ffffff","height":"320","width":"180"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/472x500/F38630/ffffff","height":"500","width":"472"},{"url":"http://placehold.it/300x300/C02942/ffffff","height":"300","width":"300"}]}]}}};
        this.processResponse(pictByYear);
    }
});
