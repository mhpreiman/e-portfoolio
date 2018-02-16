$(function(){
// ========== HEADER STYLE SWITCHER ON PAGE CHANGE ========== 

//Create + fill arrays for pages and corresponding headers
var mypages = [];               //page ID:      $(mypages[1][0]).attr('id')     #home
var headerNames = [];           //header:       headerNames[3][3]               header-blue
    
$('body .page').each(function(pageIndex,mypage) {
    //Create pages list
    mypages.push($(mypage));

    //Create headerNames list
    obj = {};
    if (pageIndex == 0) {
        obj[pageIndex] = "";
    } else if (pageIndex % 2 != 0) {
        obj[pageIndex] = "header-blue";
    } else {
        obj[pageIndex] = "header-white";
    }
    headerNames.push(obj);
});
    
function scrollClass() {
    var scrollPosition = $(this).scrollTop(); 
    var header = $('#main-header');
    var headerHeight = header.height();   
    
    var headerClassRegex = /(^|\s)header-\S+/g;          //header-   eg header-blue

    $('body .page').each(function(pageIndex,mypage) {
        var pageID = $(mypages[pageIndex][0]).attr('id');       // html id
        var pageTopPosition = $('#'+pageID).position().top;
        var i = 1;
        var lastPage = 0;
        if (mypages.length-1 <= pageIndex) {
            i = 0;
            lastPage = 100;
        } 
        var nextPagePosition = $(mypages[pageIndex+i][0]).position().top+lastPage;
        var arrayHeader = headerNames[pageIndex][pageIndex]; 
        
        //actual (realtime) header class
        // var headerClassObj = header.attr("class").match(headerClassRegex);
        // var headerToString = JSON.stringify(headerClassObj);
        // var headerClass = headerToString.replace(/^\["\s((header-)[\w\d]+)\"\]$/,'$1');
        
        //If top of scroll (+navigation) is lower than page (eg #home) AND
        //if scroll is located higher than the next page element
        if (scrollPosition + headerHeight >= pageTopPosition && 
           scrollPosition + headerHeight < nextPagePosition) {
            
            //remove all "header-" classes
            header.removeClass(function(index,css) {
                return (css.match(headerClassRegex) || []).join(' ');
            });
            header.addClass(arrayHeader);
            
            // Also change active page on righthand menu
            $('a').removeClass('active');
            $('#nav-page a[href="#'+pageID+'"]').addClass('active');
         }
    });
}
// END   ========== HEADER STYLE SWITCHER ON PAGE CHANGE ========== 
    
$(document).ready(scrollClass);         //Set header class on pageready
$(document).on('scroll', scrollClass);  //Set header class on scroll

})