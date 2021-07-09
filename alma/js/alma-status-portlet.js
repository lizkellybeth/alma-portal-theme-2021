var mytabs;
var myspans;
var almabaseurl = "https://asa.alma.cl/sprs";

$(document).ready(function(){
  console.log("alma-status-portlet.js ready!");
  console.log("alma-publications-count: document.ready");
  mytabs = $("li[id^='portaltab-']");
  //myspans = $("li[id^='portaltab-'] a:nth-child(1) > span:nth-child(1)").css('white-space', 'pre');
  if ( $( "#alma-observations-latest" ).length){
    console.log("alma-observations-latest exists!");
    myurl = almabaseurl + "/observations/1/foo?callback=displayMostRecentAlmaObservation";
    loadJsonp(myurl, displayMostRecentAlmaObservation);
  }
  if ( $( "#alma-publications-count" ).length){
    console.log("alma-publications-count exists!");
    myurl = almabaseurl + "/biblioct?callback=displayAlmaPublicationsCount";
    loadJsonp(myurl, displayAlmaPublicationsCount);
  }
});

function loadJsonp(jurl, fctnName){
                $.ajax({
                  type: 'GET',
                  url: jurl
  }).then(function(data, status, jqxhr) {
       fctnName(data);
       console.log(jqxhr);
  });
}

function displayAlmaPublicationsCount(jsonp){
  console.log("displayAlmaPublicationsCount: " + jsonp.toString());
  var pubCount = jsonp.toString();
  $("#alma-publications-count").html(pubCount);
}

function displayMostRecentAlmaObservation(jsonp){
  console.log("displayMostRecentAlmaObservation: " + jsonp.toString());
  var sourceName = jsonp[0].sourceName;
  console.log("displayMostRecentAlmaObservation Name: " + sourceName);
  $("#alma-observations-latest").html(sourceName);

}