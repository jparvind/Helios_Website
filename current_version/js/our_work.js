function our_work_init(){
	  our_work_vimeo();//Play pause controls
      our_work_hide();
      our_work_slider(); 
      current_nav_slide();//current page indicator slide bar.
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