//Navigation
function current_nav_slide(){
	    //Animated Div Highlighter
    $('#mainNavigation').append('<div id="current"></div>');
    $.currentNavItem = ('.selected');
    //$(divHighlight) = $('#current');
    $('#current').hide();
    
    var divIsVisible = false;

    //Color of Selected and UnSelected Navigation
    $('#mainNavigation a').click(function(){
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
              scrollTop: $( $(this).attr('href') ).offset().top -60
          }, 500);
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
           $('div.our_work_thumbs').children().not(':first-Child').css({ opacity: 0.5 });
          $(".our_work_thumbs > a ").click(function() {
            
            //Fade All but selected Thumb Out
               $('div.our_work_thumbs').children().not($(this)).fadeTo('fast', 0.4);
               //Fad Selected Thumb in
              $(this).fadeTo('fast', 1);

              //Change Project 
              //Hide all but selected
              var selectedIndex = $(this).index()+1;
              //alert(selectedIndex);
              //$("#our_workTop").children().not(1).hide();
              //Swap Gallery Page
              $("#our_workTop").children().not(".our_work_project:nth-Child("+selectedIndex+")").hide();
              $(".our_work_project:nth-Child("+selectedIndex+")").show();
            });
 }
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

 function solutions_hide(){
          //Hide not selected
         $("#solutionDescContain").children().not(".solutionDesc:nth-Child(1)").hide();
          //Thumbs 
          $("#solutionButtonsContain > a ").click(function() {
           
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