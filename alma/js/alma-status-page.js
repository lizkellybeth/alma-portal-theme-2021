//var publicObsList;
var telbiblioUrl = 'http://telbib.eso.org/';
var foojson;
//var almabaseurl = "https://almascience-dev.nrao.edu/sprs";
var almabaseurl = "https://asa.alma.cl/sprs";

$(document).ready(function(){
  if ( $( "#alma-status-page-marker" ).length){
    console.log("alma-status-page.js --> document.ready");
    loadAlmaObservationsPublic(3, displayAlmaObservationsPublicWidget);
    loadAlmaObservationsRecent(3,displayAlmaObservationsRecentWidget);
    loadAlmaPublications(3, displayAlmaPublicationsWidget);
    var weatherurl = almabaseurl + '/weather' ;
    loadJsonp(weatherurl, displayAlmaWeather);

  }
});

function loadAlmaObservationsPublic(limit, callback){
  var myurl = almabaseurl + '/observations/3/public';
  console.log("loadAlmaObservationsPublic: " + myurl);
  console.log(myurl);
  loadJsonp(myurl,callback);
}

function loadAlmaObservationsRecent(limit, callback){
  console.log("loadAlmaObservationsRecent...");
  var myurl = almabaseurl + '/observations/' + limit + '/recent';
  console.log(myurl);
  loadJsonp(myurl,callback);
}

function loadAlmaPublications(limit, callback){
  console.log("loadAlmaPublications...");
  var myurl = almabaseurl + '/bibliography/' + limit ;
  console.log(myurl);
  loadJsonp(myurl,callback);
}

function loadJsonp(jurl, fctnName){
                $.ajax({
                  type: 'GET',
                  url: jurl
  }).then(function(data, status, jqxhr) {
       fctnName(data);
       console.log(jqxhr);
  });
}

function displayAlmaObservationsPublicWidget(jsonp){
  var alma_observations_tbl ="alma-public-observations-tbl";
  displayAlmaObservationsPublic(jsonp, alma_observations_tbl);
}

function displayAlmaObservationsPublic(jsonp, alma_observations_tbl){
  console.log("displayAlmaObservationsPublic: " + jsonp);
  //var even = true;
  var selector = '#' + alma_observations_tbl + ' tr:last';
  var selector = '#' + alma_observations_tbl + ' tbody';
  //var dl = alma_observations_tbl;
  //$(".portlet-static-recent-observations > dd:nth-child(2)").remove();//this depends on the given name of the portlet!
  var odd = false;
  var publicObsList = jsonp;//[0].list[0].src;
  console.log("publicObsList length: " + publicObsList.length);
  for (x=0; x<publicObsList.length; x++){
    //console.log(publicObsList[x].sourceName);
    //console.log(sourcesList[x].sourceName);
    var source = publicObsList[x].sourceName;
    var code = publicObsList[x].projectCode;
    var pi = publicObsList[x].piName;
    var title = publicObsList[x].title;

    if (odd){
      $(selector).append('<tr class="odd"><td colspan=3 class="alma-observations-title">' + title + '</td></tr>');
      $(selector).append('<tr class="odd"><td class="alma-observations-details">' + code + '</td><td class="alma-observations-details">' + source + '</td><td class="alma-observations-details">' + pi + '</td></tr>');
    } else {
      $(selector).append('<tr class="even"><td colspan=3 class="alma-observations-title">' + title + '</td></tr>');
      $(selector).append('<tr class="even"><td class="alma-observations-details">' + code + '</td><td class="alma-observations-details">' + source + '</td><td class="alma-observations-details">' + pi + '</td></tr>');
    }
    odd = !odd;
  }
} 

function displayAlmaObservationsRecentWidget(jsonp){
  var alma_observations_tbl = "alma-recent-observations-tbl";
  displayAlmaObservationsRecent(jsonp, alma_observations_tbl);
}

function displayAlmaObservationsRecent(jsonp, alma_observations_tbl){
  console.log("displayAlmaObservationsRecent: " + jsonp);

  //var even = true;
 // var selector = '#' + alma_observations_tbl + ' tr:last';
  var selector = '#' + alma_observations_tbl + ' tbody';
  //var dl = alma_observations_tbl;
  //$(".portlet-static-recent-observations > dd:nth-child(2)").remove();//this depends on the given name of the portlet!
  var odd = false;
  var recentObsList = jsonp;//[0].list[0].src;
  console.log("recentObsList length: " + recentObsList.length);
  for (x=0; x<recentObsList.length; x++){
    //console.log(recentObsList[x].sourceName);
    //console.log(recentObsList[x].sourceName);
    var source = recentObsList[x].sourceName;
    var code = recentObsList[x].projectCode;
    var pi = recentObsList[x].piName;
    var title = recentObsList[x].title;

    if (odd){
      $(selector).append('<tr class="odd"><td colspan=3 class="alma-observations-title">' + title + '</td></tr>');
      $(selector).append('<tr class="odd"><td class="alma-observations-details">' + code + '</td><td class="alma-observations-details">' + source + '</td><td class="alma-observations-details">' + pi + '</td></tr>');
    } else {
      $(selector).append('<tr class="even"><td colspan=3 class="alma-observations-title">' + title + '</td></tr>');
      $(selector).append('<tr class="even"><td class="alma-observations-details">' + code + '</td><td class="alma-observations-details">' + source + '</td><td class="alma-observations-details">' + pi + '</td></tr>');
    }
    odd = !odd;
  }
}



function displayAlmaPublicationsWidget(jsonp){
  var alma_publications_div = $("#alma-publications-div");
  displayAlmaPublications(jsonp, alma_publications_div);
}

function displayAlmaPublications(jsonp, alma_publications_div){
  console.log("displayAlmaPublications...");
  foojson = jsonp;
  var pubCount = jsonp.length;
  console.log("pubCount: " + pubCount);

  //var alma_publications_div = $("#alma-publications-div");
  var even = true;
  var dl = alma_publications_div;
  $(".portlet-static-publications > dd:nth-child(2)").remove();//this depends on the given name of the portlet!
  //dl.append("<dt class='portletItem odd'>Current Total: " + pubCount + "</dt>");

  var odd = true;
  var articleList = jsonp;
  for (x=0; x<articleList.length; x++){
    //console.log(articleList[x].title);
    var dd;
    if (odd){
      dd = $("<dd></dd>").addClass('even');
    } else {
      dd = $("<dd></dd>").addClass('odd');
    }

    var anchor = $("<a></a>").addClass('alma-publications-title ').attr('href', telbiblioUrl + "?bibcode=" + encodeURI(articleList[x].bibcode)); 
    anchor.text(articleList[x].title);
    var detailsText = articleList[x].firstAuthor + "; " + articleList[x].journal + ", volume " + articleList[x].volume + ", " + articleList[x].publicationYear;
    var detailsSpan = $("<span></span>").addClass('alma-publications-details');
    detailsSpan.text(detailsText);
    //anchor.append(detailsSpan);
    dd.append(anchor);
    dd.append(detailsSpan);
    dl.append(dd);
    odd = !odd;
  }
}

function displayAlmaWeather(jsonp){
  console.log("displayAlmaWeather: " + jsonp.toString());
  var w = jsonp;
  $("#alma-weather-date").html(w.cdate);
  $("#alma-weather-time").html(w.ctime + " UTC");
  $("#alma-weather-location").html(w.location);
  $("#alma-weather-humidity").html(w.humidity + " &#37;");
  $("#alma-weather-temp").html(w.temp + " &#176; C");
  $("#alma-weather-dewpoint").html(w.dewpoint + " &#176; C");
   $("#alma-weather-winddir").html(w.winddir + " &#176;");
  $("#alma-weather-windspd").html(w.windspd + " m&#47;s");
  $("#alma-weather-pressure").html(w.pressure + " hPA");



}