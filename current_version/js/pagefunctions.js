//Navigation
var navBarHeight = 60;
var pageHeight = 610;
//Vimeo Froogaloop Globals
var currentVideo = "video1";
var froogaloop = 'undefined';


function current_nav_slide() {
    //Animated Div Highlighter
    $('#mainNavigation').append('<div id="current"></div>');
    $.currentNavItem = ('.selected');
    //$(divHighlight) = $('#current');
    $('#current').hide();

    var divIsVisible = false;

    //Color of Selected and UnSelected Navigation
    $('#mainNavigation a').click(function() {
    var offset = $(this).offset();
    var width = $(this).width();
    var right = offset.left - width/9;
    //alert(right);

      $('#mainNavigation a').removeClass('selected');
      $(this).toggleClass('selected');

      //Div Highlight Function
      if($(this).hasClass('logo')){
        //do nothing with the logo
        $('#current').fadeOut();

      }
      else{
        //if the link does not have the .logo class
        if($('selected').is(":visible")){
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

    });
}
//Smooth Scroll To Links On Page
	function smooth_scroll(){
		//Top  minus nav bar height
        $('#mainNavigation a').click(function(){
          $('html, body').animate({
              scrollTop: $( $(this).attr('href') ).offset().top -navBarHeight
          }, 300);
          return false;
        });
     }

 
 //////////About us///////////

 function about_image_switch(){
 	$(".image").click(function() {
	    var about_image = $(this).attr("rel");
	    //$('#about_image').hide();
	    $('#about_image').fadeIn(500 +'ms');    // Fade Bug if you double click too fast the page scrolls up a bit.
	    $('#about_image').html('<img src="' + about_image + '"/>');
	    return false;
 	});
 }


///////Our Work/////////

function our_work_slider(){
  
    $(".touchslider-demo").touchSlider({
      duration: 1000, // the speed of the sliding animation in milliseconds
      delay: 5000, // initial auto-scrolling delay for each loop
      margin: 5, // borders size. The margin is set in pixels.
      mouseTouch: false,
      namespace: "touchslider",
      next: ".touchslider-next", // jQuery object for the elements to which a "scroll forwards" action should be bound.
      pagination: ".touchslider-nav-item",
      currentClass: "touchslider-nav-item-current", // class name for current pagination item.
      prev: ".touchslider-prev", // jQuery object for the elements to which a "scroll backwards" action should be bound.

      autoplay: true, // whether to move from image to image automatically
      });
      /*
      $(function() {
            $('#our_workThuwmbs').fadeTo('slow', 0.5, function() {
       });
      */

}

 function our_work_hide(){
     //TODO crossfade
        //Hide all our_work_projects exect first one
        $("#our_workTop").children().not(".our_work_project:nth-Child(1)").hide();
          //$("#our_workTop").children().not('#our_work_project02').hide();
        

        /*
          $('#our_workTop').children().fadeOut("slow", function(){
              $("#our_workTop").children().not('#our_work_project01').hide();
              //$(this).replaceWith(div);
              $('#our_work_project02').fadeIn("slow");
          });
          // $('#our_work').replaceWith('<h2>New heading</h2>');
            */  
            //Dim out all but first Thumb
            $('.thumbDim:first').css({ opacity: 0.3 });
            $('.our_workThumb:first').addClass('ourWorkSelected');
           $('.thumbDim').not(':first').css({ opacity: 0.75 });
           
        $(".our_work_thumbs > a ").click(function() {
          our_work_project_swap(this);
        });
        //Landing page click
         $("#ourWorkTitle").click(function() {
             
                our_work_project_swap( $('.thumbDim:first').parent().parent());

         });
 }

 function our_work_project_swap(thisSelected){
  
               /////////// Title -landing //////////////
             
               $('#our_work_landing').fadeTo('fast', 0,function(){ $('#our_work_landing').hide()});
            //Fade All but selected Thumb Out
               $('.thumbDim').not($(this)).fadeTo('fast', 0.75);
                $('.our_workThumb').removeClass('ourWorkSelected');
               //Fade Selected Thumb in
              $(thisSelected).children().children(':first').fadeTo('fast', 0.3);
             $(thisSelected).children('.our_workThumb').addClass('ourWorkSelected');
              //Change Project 
              //Hide all but selected
              var selectedIndex = $(thisSelected).index()+1;

              //alert(selectedIndex);
              //$("#our_workTop").children().not(1).hide();
              //Swap Gallery Page
              $("#our_workTop").children().not(".our_work_project:nth-Child("+selectedIndex+")").hide();
              $(".our_work_project:nth-Child("+selectedIndex+")").show();
              //Pause videos
             //Set current Video Id  
             stopVideo(); 
              //player = $('#video'+selectedIndex)[0];
              currentVideo = 'video'+selectedIndex;
            
           // alert(currentVideo);
             
             
            
 }

 function our_work_vimeo(){
       //  player = $('#video1,#video2,#video3')[0];
           // $f(player).addEvent('ready', ready);
           //froogaloop = $f(playerID);
            $('iframe.vimeo').each(function(){
                Froogaloop(this).addEvent('ready', ready);
            });
 }
  function  ready(playerID) {
               // froogaloop = $f(playerID);
                 Froogaloop(playerID).addEvent('play', play(playerID));
                Froogaloop(playerID).addEvent('seek', seek);
              // froogaloop.api('play');
             // Froogaloop(playerID).api('play');
            }

            function play(playerID){
                alert(playerID + " is playing!!!");
            }
            function seek() {
                alert('Seeking');
            }


  function stopVideo(){
   //   alert("pause Video");
   
        
      Froogaloop(currentVideo).api('pause');
    
  }
 ////Solutions////

 function solutions_hide(){
          //Hide not selected
         $("#solutionDescContain").children().not(".solutionDesc:nth-Child(1)").hide();
          //Thumbs 
          $("#solutionButtonsContain > a ").click(function() {
              /////////// Title //////////////
              $('#solutionDescContain').show();
               $('#solutionTitle').hide();
            //Fade All but selected Thumb Out
               $('#solutionButtonsContain').children().not($(this)).children().removeClass("solutionsButtonSelected");
               //Fad Selected Thumb in
              $(this).children(":first").addClass("solutionsButtonSelected");

              //Change Project 
              //Hide all but selected
              var selectedIndex = $(this).index()+1;
   
              //Swap Content
              $("#solutionDescContain").children().not(".solutionDesc:nth-Child("+selectedIndex+")").hide();
              $(".solutionDesc:nth-Child("+selectedIndex+")").show();

              //Swap background Image
              //alert($(this).attr("bgImage"));
              var solutionImg = $(this).attr("bgImage");
             // background-image:url('../images/solutions/solutions_image.png');

              // $('#solutions').css("background-image","url('../images/solutions/solutions_image.png')");
              $('#solutions').css('background-image', 'url(' + solutionImg + ')');
            });
 }

  function about_thumbs(){
   //Landing page click
         $("#aboutTitle").click(function() {
             
               about_person_swap( $('.aboutThumb:first').parent());

         });

          $(".aboutThumbs > a ").click(function() {
              about_person_swap(this);
            });
 }

function about_person_swap(thisSelected){
               /////////// Title -landing //////////////
              $('#aboutDescContain').fadeTo(200, 1);
               $('#aboutTitle').fadeTo('fast', 0);


            //Fade All but selected Thumb Out
              $('div.aboutThumbs').children().not($(thisSelected)).children().children("img").fadeTo('fast', 1);
               //Fad Selected Thumb in
              $("img:first",thisSelected).fadeTo(300, 0);
        
               var selectedIndex = $(thisSelected).index()+1;
         
           //Swap Content
              $("#aboutDescContain").children().not(".aboutDesc:nth-Child("+selectedIndex+")").hide();
              $(".aboutDesc:nth-Child("+selectedIndex+")").show();

              //Swap BG Image
               var solutionImg = $(thisSelected).attr("bgImage");
              $('#about').css('background-image', 'url(' + solutionImg + ')');
}

 //General
 //Fades the pages
 function fade_pages(currentPageID){
    
      $('#pageContent').children().not('#'+currentPageID).fadeTo('fast', 0.2);
      $('#'+currentPageID).fadeTo(200,1);


 }

 function eventListener(){
  $(window).scroll(function () {

       // $('html,body').stop();
          scrollDelay();
        });
 }

 function scrollDelay(){
   clearTimeout($.data(this, 'timer'));

             $.data(this, 'timer', setTimeout(function() {
            
             //do something 
             scrollToDiv('.section');

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
              $('#solutions').css('background-image', 'url(' + solutionImg + ')');

              //Remove thumb glow
              $('#solutionButtonsContain').children().children().removeClass("solutionsButtonSelected");
              /////////// About //////////////
              $('#aboutDescContain').hide();
              $('#aboutTitle').fadeTo('fast', 1);
              //Swap BG Image
              var aboutImg = $('#aboutTitle').attr("bgImage");
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
      var targetId = target.id;
      fade_pages(targetId);
      $('#'+targetId).toggleClass('selected');
        //animate scroll to the elements position      

      $('html,body').animate({scrollTop: targetpos}, 300);
       
        //Pause videos
        stopVideo();

    
    }
}

//pagespace is the ammount of extra padding needed at the bottom of the site to allow contact to line up at the top.
    function getPageSpace(){
      var pageSpace = Math.abs(pageHeight - $(window).height());
      
      $('#pageSpace').css("height",pageSpace +"px");
    }
      
