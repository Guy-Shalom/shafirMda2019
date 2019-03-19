var homePageJson = new Array();
var ProtocolsJson = new Array();
var ProtocolPageJson = new Array();
var MedicinesJson = new Array();
var MedicinesPageJson = new Array();
var updatesPageJson = new Array();
loadContent();
//פונקציה לפריקת קובץ הגייסון בקוד//
function loadContent() {

    $.getJSON('jsonInfo.json', function (data) {

        homePageJson = data.homePageInfo;
        ProtocolsJson = data.ProtocolsInfo;
        ProtocolPageJson = data.ProtocolsPageInfo;
        MedicinesJson = data.medicinesInfo;
        MedicinesPageJson = data.medicinesPageInfo;
        updatesPageJson = data.updatesInfo;
    }).error(function () {
        console.log('error: json not loaded');
    })
        .done(function () {
            console.log("JSON loaded!", homePageJson);
            printHomePage();
        });
};
//תפריט ניווט אחד לכלל העמודים//
var panel = '<div data-role="panel" data-position="right" id="mypanel"><nav><ul data-role="listview" data-theme="b" class="hebrewWriteImportant listViewDesign"><li data-icon="false"><a href="#indexId">דף הבית</a></li><li data-icon="false"><a href="#updatesId">עדכונים</a></li><li data-icon="false"><a href="#">הנחיות כלליות</a></li><li data-icon="false"><a href="#protocolsId">פרוטוקולי טיפול</a></li><li data-icon="false"><a href="#medicinesId">מודולות תרופות</a></li><li data-icon="false"><a href="#">הנחיות ונהלים</a></li><li data-icon="false"><a href="#">טיפול במצבי חירום</a></li><li data-icon="false"><a href="#">מודולות ציוד רפואי</a></li></ul></nav></div>';
//העלאה של הפאנל עליו מתבסס הקוד//
$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.prepend(panel);
    $("#mypanel").panel().enhanceWithin();
});
//פונקציה אשר מפעילה את הפאנל//
$(document).one("pagecreate", function () {
    $(function () {
        $("#mypanel").panel();
    });
    $("#mypanel").panel("open");
    $("#mypanel").panel("close");
});

//קריאהה לפונקציה אשר מעלה את התכנים של עמוד הפרוטוקולים//
$(document).on('pagebeforeshow', '#protocolsId', function () {
    printProtocols();
});
//קריאה לפונקציה אשר מפעילה את עמוד הפרוטוקול הנבחר - לאחר בחירה מתוך עמוד הפרוטוקולים//
$(document).on('pagebeforeshow', '#protocolsPageId', function () {
    printProtocolPage();
});

//קריאה לפונקציה אשר מפעילה את עמוד הבית//
$(document).on('pagebeforeshow', '#indexId', function () {

});

//קריאה לפונקציה אשר מפעילה את עמוד התרופות//
$(document).on('pagebeforeshow', '#medicinesId', function () {
    printMedicines();
});

//קריאה לפונקציה אשר מפעילה את עמוד התרופה הנבחרת- לאחר בחירה מתוך עמוד התרופות//
$(document).on('pagebeforeshow', '#medicinePageId', function () {
    printMedicinesPage();
});

//קריאה לפונקציה אשר מפעילה את עמוד העדכונים//
$(document).on('pagebeforeshow', '#updatesId', function () {
    printUpdatesPage();
});

//פונקציה להעלאה והדפסת עמוד הפרוטוקולים//
function printProtocols() {
    var x = ProtocolsJson;

    for (y = 0; y < x.length; y++) {
        for (i = 0; i < x[y].length; i++) {
            var liProtocolePage = '<li class="iconLeft" data-icon="carat-l"><a href="' + x[y][i].href + '">' + x[y][i].a + '</a></li>';//העלאת שמות הפרוטוקלים לעמוד הפרוטוקלים//
            $("#protocolsId #protocolUl" + y + "").append(liProtocolePage);
        }
        $("#protocolUl" + y + "").listview('refresh');
    }
    $(document).off('pagebeforeshow', '#protocolsId');
};

//פונקציה להעלאת ולהדפסת עמוד פרוטוקול//
function printProtocolPage() {
    var x = ProtocolPageJson;
    $("#flowChartDiv h3 a").append(x[0].header);//העלאת הכותרות לעמוד הפרוטוקול//
    $("#flowChartDiv").append("<script type='text/javascript' src=" + x[0].flowchart + "></script>");//העלאת תרשים הזרימה//

    $("#h3ProtocolPageHeader h3 a").append(x[1].header);
    for (i = 0; i < x[1].li.length; i++) {
        var ProtocoleLiPage = '<li>' + x[1].li[i] + '</li>';//העלאת תכנים  
        $("#protolpageLi0").append(ProtocoleLiPage);
    }
    $("#protolpageLi0").listview('refresh');
    $("#h3ProtocolPageHeader2 h3 a").append(x[2].header);
    for (i = 0; i < x[2].contentheaders.length; i++) {
        var myContent = "";
        if (x[2].contentheaders[i].type == 'p') {// בדיקה האם סוג התוכן הוא P//
            myContent = '<p>' + x[2].contentheaders[i].p + ' </p>';//במידה וכן, העלאת התכנים//
        }
        else {
            var myOlContent = "";
            for (y = 0; y < x[2].contentheaders[i].ol.length; y++) {
                myOlContent += '<li>' + x[2].contentheaders[i].ol[y] + '</li>';// במידה ולא, העלאת התכנים בתצורה שונה//
            };
            myContent = '<ol data-role="listview">' + myOlContent + '</ol>';//במידה ולא, התוכן יכנס תחת ol//
        };
        //השמת התוכן בדף
        var ProtocolH4Page = ' <div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-inset="false"><h4>' + x[2].contentheaders[i].header + '</h4>' + myContent + '</div>';
        $("#h3ProtocolPageHeader2 .ui-collapsible-content").append(ProtocolH4Page);
    }
    $("#h3ProtocolPageHeader2").collapsible("refresh");
    $("#protocolsPageId").trigger("create");
    $(document).off('pagebeforeshow', '#protocolsPageId');
};

//הדפסת עמוד התרופות
function printMedicines() {
    var x = MedicinesJson;
    for (i = 0; i < x.length; i++) {
        //לולאה להדפסת התרופות בתוך הרשימה
        var liMedicinesPage = '<li class="iconLeft" data-icon="carat-l" data-theme="c"><a href="' + x[i].href + '">' + x[i].a + '</a></li>';
        $("#medicinesUl").append(liMedicinesPage);
    }
    $("#medicinesUl").listview('refresh');
    $(document).off('pagebeforeshow', '#medicinesId');
};

//הדפסת עמוד תרופה
function printMedicinesPage() {
    var x = MedicinesPageJson;
    //הדפסה של התוכן, בדיקת סוג התוכן והתאמתו בהתאם
    for (i = 0; i < x.length; i++) {
        var myContent = "";
        if (x[i].type == 'p') {
            for (y = 0; y < x[i].p.length; y++) {
                myContent += '<p>' + x[i].p[y] + ' </p>';
            }
        }
        else {
            var myUlContent = "";
            for (y = 0; y < x[i].ul.length; y++) {
                myUlContent += '<li>' + x[i].ul[y] + '</li>';
            };
            myContent = '<ul data-role="listview">' + myUlContent + '</ul>';
        };
        var ProtocolH3Page = ' <div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-theme="c"><h3>' + x[i].header + '</h3>' + myContent + '</div>';
        $("#medicinePageList").append(ProtocolH3Page);
    }
    $("#medicinePageId").trigger("create");
    $(document).off('pagebeforeshow', '#medicinePageId');
};

//הדפסת עמוד הבית
function printHomePage() {
    var x = homePageJson;
    //לולאה שמדפיסה את הכותרות בדף הבית, לכל כותרת יש תמונה וטקסט
    for (i = 0; i < x.length; i++) {
        var imgHomePage = '<img src=" ' + x[i].img + ' "/>';
        var pHomePage = '<p> ' + x[i].p + '</p>';
        var h2HomePage = '<h2>' + x[i].h2 + '</h2>';
        var linksHomePage = '<p class="linkHomePageLeft linkText"><a href=' + x[i].href + '>' + x[i].a + '</a></p>';
        var liSectionHomePage = '<li>' + imgHomePage + '<section class="sectionDesign">' + h2HomePage + pHomePage + linksHomePage + '</section></li>';
        $("#indexId #listviewHomePage").append(liSectionHomePage);
    }
    $("#listviewHomePage").listview().listview('refresh');
    $(document).off('pagebeforeshow', '#indexId');

};

//הדפסת עמוד העדכונים
function printUpdatesPage() {
    var x = updatesPageJson;
    //הדפסה של התוכן, בדיקת סוג התוכן והתאמתו בהתאם
    for (i = 0; i < x.length; i++) {
        var myContent = "";
        if (x[i].type == 'p') {
            for (y = 0; y < x[i].p.length; y++) {
                myContent += '<p>' + x[i].p[y] + ' </p>';
            }
        }
        else {
            var myUlContent = "";
            for (y = 0; y < x[i].ul.length; y++) {
                myUlContent += '<li>' + x[i].ul[y] + '</li>';
            };
            myContent = '<ul data-role="listview">' + myUlContent + '</ul>';
        };
        var updatesH3Page = ' <div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h3>' + x[i].header + '</h3>' + myContent + '</div>';
        $("#updatesPageList").append(updatesH3Page);

    }
    $("#updatesId").trigger("create");
    $(document).off('pagebeforeshow', '#updatesId');
};

//פונקצייה ליצירה והצגה של המפה
var myLocation = new google.maps.LatLng(32.062079, 34.792465);
//כאן יהיו ההגדרות לאתחול המפה  
$(document).on("pageshow", "#myMap", function () {
    var mapOptions = {
        center: new google.maps.LatLng(32.062079, 34.792465), zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("myGoogleMap"), mapOptions);
    center: myLocation;
    var marker = new google.maps.Marker({
        position: myLocation,
        animation: google.maps.Animation.DROP,
    });
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', function () {
        infowindowHome.open(map, marker);
    });
    var infowindowHome = new google.maps.InfoWindow({
        content: "משרדי בית הספר לפראמידיקים"
    });
});