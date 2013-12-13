/**
 * Created with JetBrains RubyMine.
 * User: sandeep
 * Date: 12/13/13
 * Time: 12:00 PM
 * To change this template use File | Settings | File Templates.
 */
function AssetFetcher(restEndpoint) {
    this.restEndpoint = restEndpoint;
    var that = this;

    this.doAjax = function(type, url, params, callback, errorCallback) {

        var defaultParams = {
            url: url,
            type: type,
            dataType: 'json',
            async:true,
            crossDomain: true,
            cache:false

/*
            headers: {
                'Authorization': 'OAuth ' + accessToken,
                'X-Requested-With': 'XMLHttpRequest'

            }*/
        }
        //Extend the defaultParams with anything passed in by the user
        //Parameters set by user will overwrite defaults on collisions
        $.extend(defaultParams, params);
        $.ajax(
                defaultParams
            ).done(function(data){
                callback(data);
            }).fail(function(jqXHR, textStatus, errorThrown )
            {

                //console.log(jqXHR.responseText);
                try
                {
              /*      if ( JSON.parse(jqXHR.responseText)['errorCode'] == 'token_expired' ||JSON.parse(jqXHR.responseText)['errorCode'] == 'invalid_token') {
                        oauthFetcher.fetchToken(function(){
                            that.doAjax(type, url, params, callback)
                        });

                    } else {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    }*/
                }
                catch(err)
                {
                    console.log("unspecified error")
                    //alert("unspecified error");
                }
            });

    }

    this.fetchAssets = function(userId, callback){
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true';//Here we have to this
        this.doAjax('GET', url, {}, callback, function(jqXHR, textStatus, errorThrown) {
            alert("invalid album_id");
        });
    }
}


