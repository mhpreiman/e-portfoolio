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
    var pagesAndHeadersObject = Object.keys(pagesAndHeaders);
    var scrollPosition = $(this).scrollTop(); 
    var header = $('#main-header');
    var headerClassRegex = /(^|\s)header-\S+/g;             //header-   eg header-blue
    
    var headerHeight = header.height();   
    var currentPosition = scrollPosition + headerHeight;

    //Check every page
    $('body .page').each(function(index,mypage) {
        var pageID = pagesAndHeadersObject[index];          //eg home
        var headerClass = pagesAndHeaders[pageID]; 
        var getPagePosition = function(isNext = 0) {
            //if last page in list
            if (pagesAndHeadersObject.length-1 <= index) 
                isNext = 0;
            return $('#'+pagesAndHeadersObject[index+isNext]).position().top;
        };
        var pageTopPosition = getPagePosition();
        var nextPagePosition = getPagePosition(1) + pageTopPosition;
        
        //Switch header class           (if viewport top and header sum smaller than page (#home) AND scroll located higher than the page  (eg #home and #skills)
        if (currentPosition >= pageTopPosition && currentPosition < nextPagePosition) {
            
            /*
            //Remove all "header-" classes
            header.removeClass(function(index,css) {
                return (css.match(headerClassRegex) || []).join(' ');
            });      
            //alternative:
            */
            
            //Get current header classes
            var headerClassesArray = header.attr("class").match(headerClassRegex) || [];       //get array of matched classes (or create an empty one)
            var headerClasses = headerClassesArray.join(' ');
            
            //Replace header class
            header.removeClass(headerClasses).addClass(headerClass).fadeIn('slow');
            
            //Also change active page on righthand menu
            $('a').removeClass('active');
            $('#page-navigation a[href="#'+pageID+'"]').addClass('active');
         }
    });
}
$(document).ready(scrollClass);         //Set header class on pageready
$(document).on('scroll', scrollClass);  //Set header class on scroll
    
// END   ========== HEADER STYLE SWITCHER ON PAGE CHANGE ========== 
    


})