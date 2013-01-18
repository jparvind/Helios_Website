  //////////About us///////////
function about_init(){
	about_thumbs();
}
 function about_image_switch(){
 	$(".image").click(function() {
	    var about_image = $(this).attr("rel");
	    //$('#about_image').hide();
	    $('#about_image').fadeIn(500 +'ms');    // Fade Bug if you double click too fast the page scrolls up a bit.
	    $('#about_image').html('<img src="' + about_image + '"/>');





	    return false;
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
            //  var solutionImg = $(thisSelected).attr("bgImage");
            // $('#about').css('background-image', 'url(' + solutionImg + ')');




              $('#aboutBg1').hide();
              //Swap background Image
              //alert($(this).attr("bgImage")); 
               var prevAboutImg = $('#aboutBg1').attr("src");
               $('#about').css('background-image', 'url(' + prevAboutImg + ')');

              var aboutImg = $(thisSelected).attr("bgImage");

             // background-image:url('../images/solutions/solutions_image.png');

              // $('#solutions').css("background-image","url('../images/solutions/solutions_image.png')");
                  $('#aboutBg1').attr('src', aboutImg );
                  $('#aboutBg1').fadeIn(200);
          
                
}

