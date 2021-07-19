$( document ).ready(function() {
    console.log("alma-menus.js #######");
    
    var itemCount = $("#mainnavigation-wrapper > * ul.plone-nav.plone-navbar-nav > li").length;
    console.log("ITEM COUNT: " +    itemCount);

    $('#mainnavigation-wrapper > * ul.plone-nav.plone-navbar-nav > li').hide();
    $('#alma-menus > * ul.plone-nav.plone-navbar-nav > li').hide();
    
    /* first 4 go on bottom bar */
    for (var x=1; x<5; x++ ) {
        var selector1 = "#mainnavigation-wrapper > * ul.plone-nav.plone-navbar-nav > li:nth-child(" + x + ")";
        console.log(x);
        $(selector1).show();
    }
    
    for (var y=5; y< itemCount; y++) {
        var selector2 = "#alma-menus > * ul.plone-nav.plone-navbar-nav > li:nth-child(" + y + ")";
        $(selector2).show();
    }

    $("#mainnavigation-wrapper > * ul.plone-nav.plone-navbar-nav > li:contains('Home')").hide();
  
});