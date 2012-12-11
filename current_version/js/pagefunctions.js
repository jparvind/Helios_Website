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
