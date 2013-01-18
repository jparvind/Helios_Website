 ////Solutions////
 var soultionImgToggle = true;


 function solutions_init(){
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
              $('#soultionBg1').hide();
              //Swap background Image
              //alert($(this).attr("bgImage")); 
               var prevSolutionImg = $('#soultionBg1').attr("src");
               $('#solutions').css('background-image', 'url(' + prevSolutionImg + ')');

              var solutionImg = $(this).attr("bgImage");
             // background-image:url('../images/solutions/solutions_image.png');

              // $('#solutions').css("background-image","url('../images/solutions/solutions_image.png')");
                  $('#soultionBg1').attr('src', solutionImg );
                  $('#soultionBg1').fadeIn('slow');
          
    		
    		// var solutionImg = $('#solutionTitle').attr("bgImage");
            
   

            });
 }
