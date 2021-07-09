var jsonObj;
var almapath = window.location.pathname;
var c2Called = false;
var c2ddtCalled = false;
var c2carryoverCalled = false;
var c3ddtCalled = false;
var c3Called = false;
var c4Called = false;
var c4ddtCalled = false;
var c5ddtCalled = false;
var c6ddtCalled = false;
var c5Called = false;
var c6Called = false;
var c7ddtCalled = false;
var almabaseurl = 'https://asa.alma.cl/sprs';

//alert(almapath);
$(document).ready(function(){
  //alert("ready!");
  console.log("document.ready");

  if (almapath.toLowerCase().indexOf("highest-priority-projects") >= 0){
     console.log("hpp!"); 
     $("#alma-tabs a").each(function () {
             if (this.href.indexOf("#") >= 0)
             {
              this.href = this.href.substr(this.href.indexOf("#"));
             }
       });

     var jurl = almabaseurl + '/proposals/2019.1?abstracts=true&callback=c7'; 
     loadJsonp(jurl,c7);

     $( "#fieldsetlegend-alma-c6" ).click(function() {
         if (! c6Called){
            var jurl = almabaseurl + '/proposals/2018.1?abstracts=true&callback=c6'; 
            loadJsonp(jurl,c6);
            c6Called = true;
         }
     });

     $( "#fieldsetlegend-alma-c5" ).click(function() {
         if (! c5Called){
            //alert( "Handler for c4 called." );
            var jurl = almabaseurl + '/proposals/2017.1?abstracts=true&callback=c5'; 
            loadJsonp(jurl,c5);
            c5Called = true;
         }
     });

     $( "#fieldsetlegend-alma-c4" ).click(function() {
         if (! c4Called){
            //alert( "Handler for c4 called." );
            var jurl = almabaseurl + '/proposals/2016.1?abstracts=true&callback=c4'; 
            loadJsonp(jurl,c4);
            c4Called = true;
         }

     });

     $( "#fieldsetlegend-alma-c3" ).click(function() {
         if (! c3Called){
            //alert( "Handler for c3 called." );
            var jurl = almabaseurl + '/proposals/2015.1?abstracts=true&callback=c3'; 
            loadJsonp(jurl,c3);
            c3Called = true;
         }

     });
     $( "#fieldsetlegend-alma-c2" ).click(function() {
         if (! c2Called){
            //alert( "Handler for c2ddt called." );
            var jurl = almabaseurl + '/proposals/2013.1?abstracts=true&callback=c2'; 
            loadJsonp(jurl,c2);
            c2Called = true;
         }

     });
     $( "#fieldsetlegend-alma-c2ddt" ).click(function() {
         if (! c2ddtCalled){
            //alert( "Handler for c2ddt called." );
            var jurl = almabaseurl + '/proposals/2013.A?abstracts=true&callback=c2ddt'; 
            loadJsonp(jurl,c2ddt);
            c2ddtCalled = true;
         }

     });
     $( "#fieldsetlegend-alma-c3ddt" ).click(function() {
         if (! c3ddtCalled){
            //alert( "Handler for c3ddt called." );
            var jurl = almabaseurl + '/proposals/2015.A?abstracts=true&callback=c3ddt'; 
            loadJsonp(jurl,c3ddt);
            c3ddtCalled = true;
         }

     });
     $( "#fieldsetlegend-alma-c4ddt" ).click(function() {
         if (! c4ddtCalled){
            //alert( "Handler for c3ddt called." );
            var jurl = almabaseurl + '/proposals/2016.A?abstracts=true&callback=c4ddt'; 
            loadJsonp(jurl,c4ddt);
            c4ddtCalled = true;
         }

     });
     $( "#fieldsetlegend-alma-c5ddt" ).click(function() {
         if (! c5ddtCalled){
            //alert( "Handler for c3ddt called." );
            var jurl = almabaseurl + '/proposals/2017.A?abstracts=true&callback=c5ddt'; 
            loadJsonp(jurl,c5ddt);
            c5ddtCalled = true;
         }

     });
     $( "#fieldsetlegend-alma-c6ddt" ).click(function() {
         if (! c6ddtCalled){
            //alert( "Handler for c3ddt called." );
            var jurl = almabaseurl + '/proposals/2018.A?abstracts=true&callback=c6ddt'; 
            loadJsonp(jurl,c6ddt);
            c6ddtCalled = true;
         }

     });
     $( "#fieldsetlegend-alma-c7ddt" ).click(function() {
         if (! c7ddtCalled){
            //alert( "Handler for c3ddt called." );
            var jurl = almabaseurl + '/proposals/2019.A?abstracts=true&callback=c7ddt'; 
            loadJsonp(jurl,c7ddt);
            c7ddtCalled = true;
         }

     });
     $( "#fieldsetlegend-alma-c1carryover" ).click(function() {
         if (! c2carryoverCalled){
            //alert( "Handler for c1carryover called." );
            var jurl = almabaseurl + '/proposals/2012.1?carryover=true&abstracts=true&callback=c1carryover'; 
            loadJsonp(jurl,c1carryover);
            c2carryoverCalled = true;
         }
     });

  } else {
    console.log("NOT hpp.");
  }
});

function loadJsonpxxx(jurl){
                $.ajax({
                  type: 'GET',
                  url: jurl,
                  async: false,
                  contentType: "application/json",
                  dataType: 'jsonp'
                });
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


function c7(json){
   //alert("c6_callback");
   var my_div = $("#alma-c7-div");
   populateDiv(json, my_div);
} 

function c6(json){
   //alert("c6_callback");
   var my_div = $("#alma-c6-div");
   populateDiv(json, my_div);
} 

function c5(json){
   //alert("c5_callback");
   var my_div = $("#alma-c5-div");
   populateDiv(json, my_div);
} 

function c4(json){
   //alert("c4_callback");
   var my_div = $("#alma-c4-div");
   populateDiv(json, my_div);
} 

function c3(json){
   //alert("c3_callback");
   var my_div = $("#alma-c3-div");
   populateDiv(json, my_div);
} 

function c2(json){
   //alert("c2_callback");
   var my_div = $("#alma-c2-div");
   populateDiv(json, my_div);
} 

function c2ddt(json){      
      //alert("c2ddt_callback");
      var my_div = $("#alma-c2ddt-div");
      populateDiv(json, my_div);     
} 

function c3ddt(json){      
      //alert("c3ddt_callback");
      var my_div = $("#alma-c3ddt-div");
      populateDiv(json, my_div);     
} 

function c4ddt(json){      
      //alert("c4ddt_callback");
      var my_div = $("#alma-c4ddt-div");
      populateDiv(json, my_div);     
} 

function c5ddt(json){      
      //alert("c45ddt_callback");
      var my_div = $("#alma-c5ddt-div");
      populateDiv(json, my_div);     
} 

function c6ddt(json){      
      //alert("c45ddt_callback");
      var my_div = $("#alma-c6ddt-div");
      populateDiv(json, my_div);     
} 

function c7ddt(json){      
      //alert("c7ddt_callback");
      var my_div = $("#alma-c7ddt-div");
      populateDiv(json, my_div);     
} 

function c1carryover(json){   
      //alert("c1carryover_callback");
      var my_div = $("#alma-c1carryover-div");
      populateDiv(json, my_div);      
} 



function populateDiv(json, my_div){
        var even = true;
        var table = $('<table></table>');//.attr('border','10px solid black');


        // TABLE HEAD -->
        var thead = table.append($('<thead></thead>'));

        var titleTH = $('<th></th>').attr('width', '55%');//.addClass('grid listing');
        titleTH.text("Title ");

        var abstractAnchor = $('<a></a>');
        abstractAnchor.attr('href', "#"); 
        abstractAnchor.text("(Abstracts)");
        abstractAnchor.addClass("alma_minibold");
        abstractAnchor.toggle(function() {
                $(".alma_abstract_row").show();
                $(".alma_project_row").addClass("alma_font_bold");
          }, function() {
                $(".alma_abstract_row").css("display", "none");
                $(".alma_project_row").removeClass("alma_font_bold");
         });
        titleTH.append(abstractAnchor);

        var piTH = $('<th></th>').attr('width', '15%');//;.addClass('grid listing');
        piTH.text("PI ");

        var coiAnchor = $('<a></a>');
        coiAnchor.attr('href', "#"); 
        coiAnchor.text("(COIs)");
        coiAnchor.addClass("alma_minibold");
        coiAnchor.toggle(function() {     
                $(".alma_coi_row").show();
                $(".alma_project_row").addClass("alma_font_bold");
          }, function() {
                $(".alma_coi_row").css("display", "none");
                $(".alma_project_row").removeClass("alma_font_bold");
         });
        piTH.append(coiAnchor);
        thead.append($('<tr></tr>').addClass("alma_table_header").append($('<th></th>').attr('width', '16%').text("Project Code")).append(titleTH).append(piTH).append($('<th></th>').attr('width', '8%').text("Exec")).append($('<th></th>').attr('width', '*').text("Category")));


        //TABLE BODY -->
        //var tbody = table.append($('<tbody></tbody>'));
        $.each(json, function(idx, p){

        //var tbody = table.append($('<tbody></tbody>'));
          var innerTableRow = $('<tr></tr>');
          var innerTableTD = $('<td></td>').attr("colspan", 6);
          var innerTable = $('<table></table>').attr("width", "100%").addClass('grid listing');


          innerTableRow.append(innerTableTD);
          innerTableTD.append(innerTable);

          var tbody = innerTable.append($('<tbody></tbody>'));

           var projectRow = $('<tr></tr>');
           projectRow.addClass("alma_project_row");
           var pcodeTD = $('<td></td>').attr("width", "15%");
           pcodeTD.attr('id', p.code);
           var pcodeAnchor = $('<a></a>');
       //    pcodeAnchor.attr('href', "http://almascience.org/aq/?asdm_uid=*\&project_code-asu=" + p.code );  
        //   pcodeAnchor.attr('href', "http://almascience.org/aq/?project_code-asu=2013.1.00099.S\&asdm_uid=*" );  
           pcodeAnchor.attr('href', 'http://almascience.org/aq/?project_code=' + p.code);
           pcodeAnchor.attr("target","_blank");
           pcodeAnchor.text(p.code);     
           pcodeTD.append(pcodeAnchor); 

           var titleTD = $('<td></td>').attr("width", "55%");
           var titleAnchor = $('<a></a>');
           titleAnchor.text(p.title);
           titleAnchor.attr('href', "#"); 
           titleAnchor.click(
              function(){
                $(this).parent().parent().next().toggle().next().toggle();
                $(this).parent().parent().toggleClass("alma_font_bold");
                return false;
              });
           titleTD.append(titleAnchor); 

           var abstractRow = $('<tr></tr>');
           abstractRow.addClass("alma_abstract_row");
           abstractRow.attr('id', "flyout_" + p.code);
           var abstractHeaderTD = $('<td></td>');
           abstractHeaderTD.text("Abstract");
           var abstractTD = $('<td></td>');
           abstractTD.attr('colspan', 4);
           var t = p.abstractText;
           var rt = t.replace(/\\n/g, " ");
           abstractTD.text(rt);
           abstractRow.append(abstractHeaderTD);
           abstractRow.append(abstractTD);
           abstractRow.css("display", "none");

           var coiRow = $('<tr></tr>');
           coiRow.addClass("alma_coi_row");
           var coiHeaderTD = $('<td></td>');
           coiHeaderTD.text("COIs");
           var coiTD = $('<td></td>');
           coiTD.attr('colspan', 4);
           var s = "";
           $.each(p.authors, function(idx, author){
              //alert(author.name);
              if (idx>0){
                s = s + author.name + "; ";
              }
           });
           coiTD.text(s);
           coiRow.append(coiHeaderTD);
           coiRow.append(coiTD);
           coiRow.css("display", "none");

           if (even){
              tbody.append(projectRow.append(pcodeTD).append(titleTD).append($('<td></td>').attr("width", "15%").text(p.piName)).append($('<td></td>').attr("width", "8%").text(p.executive)).append($('<td></td>').attr("width", "*").text(p.finalScientificCategory)));
              tbody.append(coiRow);
              tbody.append(abstractRow);
           } else {
              tbody.append(projectRow.append(pcodeTD).append(titleTD).append($('<td></td>').attr("width", "15%").text(p.piName)).append($('<td></td>').attr("width", "8%").text(p.executive)).append($('<td></td>').attr("width", "*").text(p.finalScientificCategory)));
              tbody.append(coiRow);
              tbody.append(abstractRow);
           }
           table.append(innerTableRow);

           even = !even;
        });
        my_div.empty();
        my_div.append(table);

}