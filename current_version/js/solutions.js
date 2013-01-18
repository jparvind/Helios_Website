 ////Solutions////

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

              //Swap background Image
              //alert($(this).attr("bgImage"));
              var solutionImg = $(this).attr("bgImage");
             // background-image:url('../images/solutions/solutions_image.png');

              // $('#solutions').css("background-image","url('../images/solutions/solutions_image.png')");
              $('#solutions').css('background-image', 'url(' + solutionImg + ')');
            });
 }
