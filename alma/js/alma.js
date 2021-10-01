var ALMA_BASE_URL = "/";
$( document ).ready(function() {
    if ((window.location.pathname == "/portal") || (window.location.pathname == "/portal/"))   {
        ALMA_BASE_URL = "/portal/";
        displayHomePage();
        
    } else if (window.location.pathname === "/"){
        displayHomePage();
        
    } else {
        displayDefault();
    }
    console.log("ALMA_BASE_URL: " + ALMA_BASE_URL);
    
    $( ".loupe" ).hover(
        function() {
        $( '#searchGadget_form' ).show();
        console.log("loupe handler IN");
    }, function() {
        console.log("loupe handler OUT");
    });
    
    $( '#searchGadget_form' ).hover(
        function() {
        //$( '#searchGadget_form' ).show();
        console.log("searchGadget_form handler IN");
    }, function() {
        $( '#searchGadget_form' ).hide();
        console.log("searchGadget_form handler OUT");
    });
});

function displayHomePage(){
    console.log("displayHomePage()");
    getScienceHighlightURL();
    $("#main-container").addClass("home");
    $("#alma-news-div").addClass("home");
    $("#alma-sci-hi").addClass("home");
    $("#alma-col1").addClass("home");
    $("#alma-central").addClass("home");
    $(".portletWrapper").addClass("home");
}

function displayDefault(){
    console.log("displayDefault()");
    $("#main-container").removeClass("home");
    $("#alma-news-div").removeClass("home");
    $("#alma-sci-hi").removeClass("home");
    $("alma-col1").removeClass("home");
    $("#alma-central").removeClass("home");
    $(".portletWrapper").removeClass("home");
}

function getScienceHighlightURL(){
    console.log( "getScienceHighlightURL()");
    var newsurl = 'science-highlights/highlights'
    $.ajax({
        url: 'science-highlights/highlights',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'text/html');
        },
        success: function(data) {
            //console.log("RAW HTML: " + data);
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/html");
            var itemlink = xmlDoc.querySelector("#content-core > div > article:nth-child(1) > header > span > a.contenttype-news-item.state-published.url").href;
            console.log("##### NEWSLINK: " + itemlink);
            getScienceHighlight(itemlink, 'science-highlights');
        }
    });
}

function getScienceHighlight(shURL, newsURL){
    console.log( "getScienceHighlight()");
    console.log( "shURL: " + shURL);
    console.log( "newsURL: " + newsURL);
    $.ajax({
        url: shURL,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'text/html');
        },
        success: function(data) {
           // console.log("####### RAW HTML: " + data);
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/html");
            var name = xmlDoc.querySelector("#content > header > h1").innerText;//#parent-fieldname-description
            var desc = xmlDoc.querySelector("#content > header > div.documentDescription.description").innerText;
            image = xmlDoc.querySelector("#viewlet-above-content-title > div > figure > a > img").src;
            //image = image.replace("/image_view_fullscreen", "");
            console.log("####### IMAGE: " + image);
            //var caption = xmlDoc.querySelector("[id^=parent-fieldname-imageCaption]").innerText;
            //var date = xmlDoc.querySelector("#content-core > h5").innerText;
            var text = xmlDoc.querySelector("#parent-fieldname-text").innerText;

            $("#sci-hi-name").text(name);
            $("#sci-hi-desc").text(desc);
            $("#sci-hi-img").attr("src",image);
            $("#sci-hi-anchor").attr("href",image);
            //$("#sci-hi-caption").text(caption);
            $("#sci-hi-contents").text(text );
            //$("#sci-hi-date").text("Effective: " + date);
            $("#sci-hi-link").attr("href", newsURL);
        }
    });
}

function getScienceHighlightREST(shURL){
    console.log( "getScienceHighlight()");
    console.log( "shURL: " + shURL);
    $.ajax({
        url: shURL,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        success: function(data) {
            shout = data;
            console.log(data["text"]["data"]);
            link = data["@id"]
            content = data["text"]["data"];
            image = data["image"]["download"];
            image_caption = "";
            if (data["image_caption"] != null) {
                image_caption = data["image_caption"];
            }
            description = data["description"];
            name = data["id"];
            date = data["effective"];
            $("#sci-hi-name").text(name);
            $("#sci-hi-desc").text(description);
            $("#sci-hi-img").attr("src",image);
            $("#sci-hi-anchor").attr("href",image);
            $("#sci-hi-caption").text(image_caption);
            $("#sci-hi-contents").text(content );
            $("#sci-hi-date").text("Effective: " + date);
            $("#sci-hi-link").attr("href", ALMA_BASE_URL + 'science-highlights/highlights');
        }
    });
}
    
    
function getScienceHighlightURLREST(){
    console.log( "getScienceHighlightURL()");
    var scihiURL = ALMA_BASE_URL + 'science-highlights/highlights';
    $.ajax({
        url: scihiURL,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        success: function(data) {
            console.log("DATA: " + data);
            var shURL = data["items"][0]["@id"];
            getScienceHighlight(shURL);
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg);
        },
    });
}