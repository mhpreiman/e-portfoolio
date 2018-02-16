$(function(){
// ========== HEADER STYLE SWITCHER ON PAGE CHANGE ========== 
    
//Create object for pageIDs (#home) and corresponding headers (header-blue)
pagesAndHeaders = {};
    
$('body .page').each(function(index,mypage) {

    var pageID  = $(mypage).attr('id') ;
    var className = '';
    
    if (index == 0) 
        className = "";
    else if (index % 2 != 0) 
        className = "header-blue";
    else 
        className= "header-white";
    
    pagesAndHeaders[pageID] = className;    //save as object's property

});

//Check-set classes    
function scrollClass() {
    var scrollPosition = $(this).scrollTop(); 
    var header = $('#main-header');
    var headerHeight = header.height();   
    var pagesAndHeadersObject = Object.keys(pagesAndHeaders);
//    console.log( pagesAndHeadersObject);
    var headerClassRegex = /(^|\s)header-\S+/g;          //header-   eg header-blue

    $('body .page').each(function(pageIndex,mypage) {
        var pageID = pagesAndHeadersObject[pageIndex];          //eg home
        var headerClass = pagesAndHeaders[pageID]; 
        var pageTopPosition = $('#'+pageID).position().top;
        var next = 1;
        if (pagesAndHeadersObject.length-1 <= pageIndex) 
            next = 0;
        console.log( pageTopPosition);
        var nextPagePosition = $('#'+pagesAndHeadersObject[pageIndex+next]).position().top + pageTopPosition;
        
        //If top of scroll (+navigation) is lower than page (eg #home) AND
        //if scroll is located higher than the next page element
        if (scrollPosition + headerHeight >= pageTopPosition && 
           scrollPosition + headerHeight < nextPagePosition) {

            //Remove all "header-" classes
            header.removeClass(function(index,css) {
                return (css.match(headerClassRegex) || []).join(' ');
            });
            
            header.addClass(headerClass);
            
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