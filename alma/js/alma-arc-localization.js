$( document ).ready(function() {
    doLocalization();
    resizeAlmaPortlets();
});
    
$( window ).resize(function() {
        console.log("window resize !!!!!! ###");
        resizeAlmaPortlets();
});

function doLocalization(){
    var url = window.location.href; 
    console.log("doLocalization for: " + url);
    var esoPortlet = $("a:contains('EU ARC News')").parent().parent().parent();  
    var naojPortlet = $("a:contains('NAOJ News')").parent().parent().parent();  
    var nraoPortlet = $("a:contains('NRAO News')").parent().parent().parent(); 
    renameNewsPortlet();

    esoPortlet.attr('background-image','++theme++alma-prototype-theme/images/eu-arc-nodes.jpg');
    nraoPortlet.attr('background-image','++theme++alma-prototype-theme/images/eu-arc-nodes.jpg');
        
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
        //esoPortlet.remove();
        nraoPortlet.remove();
        $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-na-pride.png');
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
    //$('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-jao.png');
    //$('#almalogo-anchor').attr('href','/portal');
    $(document).prop('title', 'ALMA DEV Portal');
    naojPortlet.remove();
    esoPortlet.remove();
    return;    
}

function renameNewsPortlet(){
    console.log("rename news portlet...");
    $('.portletNews > dt:nth-child(1) > a:nth-child(2)').text("Observatory News") ;   
}

// deprecated
function setArcLogo(){
    var url = window.location.href;
    if (url.indexOf("almascience.eso.org") > -1){
        $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-eu.png');
    } else if (url.indexOf("almascience.nrao.edu") > -1) {
        $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-na.png');
    } else if (url.indexOf("almascience.nao.ac.jp") > -1) {
        $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-ea.png');
    } else {
        $('#arclogo-img').attr('src','++theme++alma-prototype-theme/images/logo-jao.png');
    }
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