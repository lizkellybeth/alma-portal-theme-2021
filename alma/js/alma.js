var ALMA_BASE_URL = "/";
$( document ).ready(function() {
    if ((window.location.pathname == "/plone5") || (window.location.pathname == "/plone5/"))   {
        ALMA_BASE_URL = "/plone5/";
        displayHomePage();
        
    } else if (window.location.pathname === "/"){
        displayHomePage();
        
    } else {
        displayDefault();
    }
    console.log("ALMA_BASE_URL: " + ALMA_BASE_URL);
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

function getScienceHighlight(shURL){
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
            image_caption = data["image_caption"];
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
    
    
function getScienceHighlightURL(){
    console.log( "getScienceHighlightURL()");
    var scihiURL = ALMA_BASE_URL + 'science-highlights/highlights';
    $.ajax({
        url: scihiURL,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        success: function(data) {
            shURL = data["items"][0]["@id"];
            getScienceHighlight(shURL);
        }
    });
}