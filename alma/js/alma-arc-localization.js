$( document ).ready(function() {
    doLocalization();
    resizeAlmaPortlets();
    $("h1:contains(Front Page)").hide();
});
    
$( window ).resize(function() {
        console.log("window resize !!!!!! ###");
        resizeAlmaPortlets();
});

function doLocalization(){
    var url = window.location.href; 
    console.log("doLocalization for: " + url);
    
    var naojPortlet = $("a:contains('NAOJ News')").parent().parent().parent();  
    var naojPortletContent = $("a:contains('NAOJ News')").parent().next();  
    naojPortletContent.css('background-image','url(++theme++alma-theme-2021/alma/images/morita-aca.jpg)');

    var nraoPortlet = $("a:contains('NRAO Events')").parent().parent().parent(); 
    var nraoPortletContent = $("a:contains('NRAO Events')").parent().next();  
    nraoPortletContent.css('background-image','url(++theme++alma-theme-2021/alma/images/alma-tracks.jpg)');
    
    var esoPortlet = $("a:contains('EU ARC News')").parent().parent().parent();  
    var esoPortletContent = $("a:contains('EU ARC News')").parent().next();  
    esoPortletContent.css('background-image','url(++theme++alma-theme-2021/alma/images/eu-arc-nodes.jpg)');

    var almaPortlet = $("a:contains('Observatory News')").parent().parent().parent();  
    var almaPortletContent = $("a:contains('Observatory News')").parent().next();  
    almaPortletContent.css('background-image','url(++theme++alma-theme-2021/alma/images/alma-obs-night.jpg)');

    //var statusPortlet = $("a:contains('Status')").parent().parent().parent();  
    var statusPortletContent = $("a:contains('Status')").parent().next("section.portletContent");  
    statusPortletContent.css('background-image','url(++theme++alma-theme-2021/alma/images/alma-correlator.jpg)');

    renameNewsPortlet();


    var testing = false;
    if (!testing) {
        if (url.indexOf("eso.org") >= 0){
            console.log("LOCALIZING TO ESO!");
            naojPortlet.remove();
            nraoPortlet.remove();
            $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-eu.png');
            $('#almalogo-anchor').attr('href','/');
            return;
        }
        if (url.indexOf("nrao.edu") >= 0){
            console.log("LOCALIZING TO NRAO!");
            naojPortlet.remove();
            esoPortlet.remove();
            //nraoPortlet.remove();
            $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-na.png');
            $('#almalogo-anchor').attr('href','/');
            return;
        }
        if (url.indexOf("nao.ac.jp") >= 0){
            console.log("LOCALIZING TO NAOJ!");
            esoPortlet.remove();
            nraoPortlet.remove();
            $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/NAOJ_logo.png');
            $('#almalogo-anchor').attr('href','/');
            return;
        }
        console.log("DEFAULT - LOCALIZING TO JAO...");
        $(document).prop('title', 'ALMA DEV Portal');
        //$('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-jao.png');
        //$('#almalogo-anchor').attr('href','/portal');
        //naojPortlet.remove();
        //esoPortlet.remove();
        return;    
    
    } else {
        console.log("LOCALIZING TO TEST ####!");
        $(document).prop('title', 'ALMA DEV Portal');
    }
}

function renameNewsPortlet(){
    console.log("rename news portlet...");
    $('.portletNews > dt:nth-child(1) > a:nth-child(2)').text("Observatory News") ;   
}

function resizeAlmaPortlets(){
    console.log("resizeAlmaPortlets()");

    var widthOfDiv = $("#alma-news-div").width();
    console.log("widthOfDiv: " + widthOfDiv);
    
    var mgmtPortletsLinkWidth = $("div.managePortletsLink:nth-child(4) > a:nth-child(1)").width();
    console.log("mgmtPortletsLinkWidth: " + mgmtPortletsLinkWidth);
    
    var availableWidth = widthOfDiv;
    if (mgmtPortletsLinkWidth == null){  
        console.log("mgmtPortletsLink IS null!");
    } else {
        console.log("mgmtPortletsLink not null!");
        availableWidth = availableWidth - mgmtPortletsLinkWidth;
    }
    console.log("availableWidth minus space used by the mgmtPortletsLinkWidth: " + availableWidth);
    
    var numPortlets = $("#alma-news-div .portlet").length;
    console.log("numPortlets in alma-news div: " + numPortlets);
    
    var portletWidth = 30;//estimated
    console.log("portletWidth: " + portletWidth);
    
    availableWidth = availableWidth - (portletWidth * numPortlets);
    console.log("availableWidth minus space used by the portlets: " + availableWidth);
    
    var adjustedPortletWidth = availableWidth / numPortlets;
    console.log("adjustedPortletWidth: " + adjustedPortletWidth);
        
    $("#alma-news-div .portletWrapper.home").width(adjustedPortletWidth);
  
}