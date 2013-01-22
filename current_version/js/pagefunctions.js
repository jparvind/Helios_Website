//Navigation
var navBarHeight = 60;
var pageHeight = 610;
//Vimeo Froogaloop Globals
var currentVideo = "video1";
var froogaloop = 'undefined';

//General Functions
var divIsVisible = false;
var pageScrolling = false;
var  sectionArray =[];
var currentSection= 'home';


function generalInit(){
  // Reset page position for Refresh
  
  $('.section').each(function(){
     sectionArray.push(($(this).attr('id')));
   });

      fade_pages('home');
     
      eventListener();
      
      //pagespace is the ammount of extra padding needed at the bottom of the site to allow contact to line up at the top.
      getPageSpace();


}
function current_nav_slide(selectedItem) {
    //Animated Div Highlighter
   // $('#mainNavigation').append('<div id="current"></div>');
    $.currentNavItem = ('.selectedNav');
    //$(divHighlight) = $('#current');
    $('#current').hide();

    

    //Color of Selected and UnSelected Navigation
    $('#mainNavigation a').click(function() {
       var tempSection =  $(this).attr('href');
         currentSection = tempSection.replace('#','');
        makeCurrentSection(currentSection);

    
    });
}

function makeCurrentSection(targetId){
  resetLanding();
  pageScrolling = true;
  currentSection =targetId;
       var targetpos = $('#' + targetId).position().top -navBarHeight;
      $('html,body').animate({scrollTop: targetpos}, 500,function(){ 
        pageScrolling =false;
      });     
      // pageScrolling = false; 
     
      fade_pages(targetId);
     // $('#'+targetId).addClass('selectedNav');
     //  $('#'+targetId).removeClass('selectedNav');
      
     $('#mainNavigation a').removeClass('selectedNav');
        $('#'+targetId+'_nav').children('a').addClass('selectedNav');
        if('#'+targetId+'_nav' =='#home_nav'){
          setCurrentNavItem($('#'+targetId+'_nav'));
        }else{
        setCurrentNavItem($('#'+targetId+'_nav').children('a'));
      };
        //$('#current').fadeIn();});
       
        //Pause videos
        stopVideo();

   
}

function setCurrentNavItem(selectedNavItem){
    var divOffSet =$('#mainNavigation').offset();
    var offset = $(selectedNavItem).offset() ;
    var width = $(selectedNavItem).width();
    var right = offset.left -divOffSet.left -5;
  

      $('#mainNavigation a').removeClass('selectedNav');
      $(selectedNavItem).toggleClass('selectedNav');

      //Div Highlight Function
      if($(selectedNavItem).hasClass('logo')){
        //do nothing with the logo
        $('#current').fadeOut();

      }
      else{
        //if the link does not have the .logo class
        if($('selectedNav').is(":visible")){
          //do nothing
          //alert('DIV IS VISIBLE');
        }
          else{
            //alert('I CAN SEE THE DIV NOW!');
            
            
            if(divIsVisible === false){
             // alert('Fade In & Position');

              
              $('#current').css({
                "margin-left": right
              });
              $('#current').fadeIn();
            }
            else{
              //alert('Position Only')
              
              $("#current").animate({"margin-left": right}, "fast");
              $('#current').fadeIn();

            }
            divIsVisible = true;
          }

      }
}
/*
//Smooth Scroll To Links On Page
	function smooth_scroll(){
		//Top  minus nav bar height
        $('#mainNavigation a').click(function(){
          tempSection =  $(this).attr('href');
         currentSection = tempSection.replace('#','');
          $('html, body').animate({
              scrollTop: $( $(this).attr('href') ).offset().top -navBarHeight
           
          }, 500);
          return false;
        });
     }*/

 //Fades the pages
 function fade_pages(currentPageID){
    
      $('#pageContent').children().not('#'+currentPageID).fadeTo('fast', 0.2);
      $('#'+currentPageID).fadeTo(200,1);
     
      

     // $('#'+targetId+'_nav').attr('id', 'selectedNav');

 }

 function eventListener(){
 /* $(window).scroll(function () {

       // $('html,body').stop();
       if(!pageScrolling){
        pageScrolling =true;
          scrollDelay();
     
        }
        });*/
   
      $('body').mousewheel(function(event,delta){
       if(!pageScrolling){
          if(delta >0){
           // Mouse Scroll Up
             prevPage();
          }else{
           //Mouse Scroll Down
             nextPage();
          }
        }
      });

      // Key Event
      $('html').bind('keyup', function(e) {
        
       if(!pageScrolling){ 
           if(e.keyCode == 33 || e.keyCode == 38) { //Page Down keycode or DOwn Arrow
           
             prevPage();
           }
           if(e.keyCode == 34 || e.keyCode == 40) { //page UP keycode or Up Arrow
              
             nextPage();
           }


        }
      });

    
 }

 function prevPage(){
    var newSection;
    var currentSectionIndex = sectionArray.indexOf(currentSection);
    //Get the next section 
    if(currentSectionIndex >0){
       newSection = currentSection = sectionArray[currentSectionIndex -1];
     }else{
        newSection = currentSection = sectionArray[0];
     }
   //Go to next section
    makeCurrentSection(newSection);
 }

 function nextPage(){
    var newSection;
    var currentSectionIndex = sectionArray.indexOf(currentSection);
    //Get the next section 
    if(currentSectionIndex <sectionArray.length -1){

       newSection = currentSection = sectionArray[currentSectionIndex +1];
     }else{
        newSection = currentSection = sectionArray[sectionArray.length -1];
     }
   //Go to next section
    makeCurrentSection(newSection);


 }

 function scrollDelay(){
   clearTimeout($.data(this, 'timer'));

             $.data(this, 'timer', setTimeout(function() {
           
             //do something 
           //  scrollToDiv('.section');

            resetLanding();


          }, 200));
 }

 function resetLanding(){
   //Reset pages back to landing pages.

              /////////Our Work//////////
             $('#our_work_landing').fadeTo('fast', 1);
             $('.thumbDim').fadeTo('fast', 0.75);
              //Solutions////////
              $('#solutionDescContain').hide();
              $('#solutionTitle').fadeTo('fast', 1);

              //Swap BG Image 
              var solutionImg = $('#solutionTitle').attr("bgImage");
              // Go back to landing image
              $('#soultionBg1').fadeOut('slow',function(){ $('#soultionBg1').attr('src', solutionImg);});
             
            
              $('#solutions').css('background-image', 'url(' + solutionImg + ')');

              //Remove thumb glow
              $('#solutionButtonsContain').children().children().removeClass("solutionsButtonSelected");
              /////////// About //////////////
              $('#aboutDescContain').hide();
              $('#aboutTitle').fadeTo('fast', 1);
              //Swap BG Image
                //Swap BG Image 
              var aboutImg = $('#aboutTitle').attr("bgImage");
              // Go back to landing image
              $('#aboutBg1').fadeOut('slow',function(){ $('#aboutBg1').attr('src', aboutImg);});
             
            
              $('#about').css('background-image', 'url(' + aboutImg + ')');
              $('div.aboutThumbs').children().children().children("img").fadeTo('fast', 1);
 }


 function scrollToDiv(a){
    
    //Get current scroll position
    var current = (document.all ? document.scrollTop : window.pageYOffset);
    //Define variables for data collection
    var target = undefined;
    var targetpos = undefined;
    var dif = 0;
    //check each selected element to see witch is closest
    $(a).each(function(){
        //Save the position of the element to avoid repeated property lookup
        var t = $(this).position().top;
        //check if there is an element to check against
        if (target != undefined){
            //save the difference between the current element's position and the current scroll position to avoid repeated calculations
            var tdif = Math.abs(current - t);
            //check if its closer than the selected element
            if(tdif < dif){
                //set the current element to be selected
                target = this;
                targetpos = t -navBarHeight;
                dif = tdif;
            }
        } else {
            //set the current element to be selected
            target = this;
            targetpos = t -navBarHeight;
            dif = Math.abs(current - t);
        }
    });
    //check if an element has been selected
    if (target != undefined){
      //Fade in Current page. Fade out others
     
        //animate scroll to the elements position      

      $('html,body').animate({scrollTop: targetpos}, 500,function(){ 
        pageScrolling = false; 
      var targetId = target.id;
      //fade_pages(targetId);

     // $('#'+targetId).addClass('selectedNav');
     //  $('#'+targetId).removeClass('selectedNav');
      makeCurrentSection(targetId);
  
        //$('#current').fadeIn();});
       
        //Pause videos
        stopVideo();
      });
    
    }else{
       pageScrolling = false;
    }
  
}



//pagespace is the ammount of extra padding needed at the bottom of the site to allow contact to line up at the top.
    function getPageSpace(){
      var pageSpace = Math.abs(pageHeight - $(window).height());
      
      $('#pageSpace').css("height",pageSpace +"px");
    }
      


///////Our Work/////////

