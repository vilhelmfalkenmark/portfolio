/**
 * Created by Vilhelm on 15-10-21.
 */
$( document ).ready(function() {

    parallax();

    var menuButton = $(".menu-button");
    var overLay = $(".overlay");

    menuButton.click(function() {

        $(this).toggleClass("open");
        $(".nav-container").toggleClass("nav-slide-in");
        overLay.toggleClass("dark-overlay");
        });

    overLay.click(function() {
         menuButton.toggleClass("open");
         $(".nav-container").toggleClass("nav-slide-in");
         $(this).toggleClass("dark-overlay");
        });



    /*=================================================
     KOLLA SKÄRMBREDD OCH AVGÖR VILKEN DEVICE SOM KÖRS!
     =================================================*/
    var deviceInfo = $(".device-info");
    $( window ).resize(function() {
      var screenWidth =  $(window).width();
        if(screenWidth<=480) {
            deviceInfo.html(screenWidth+" px = mobile-small");
        }
        else if(screenWidth>480 && screenWidth<768) {
            deviceInfo.html(screenWidth+" px =mobile-large");
        }
        else if(screenWidth>=768 && screenWidth<1024) {
            deviceInfo.html(screenWidth+" px =Tablet");
        }
        else {
            deviceInfo.html(screenWidth+" px =Desktop");
        }
    });
    /*=================================================
                    NY FUNKTION HÄR!!!!
     =================================================*/
    $('.gtr').each(function(){
      //  $(this).find(".flex-center").html($(this).attr('class'));
    });

    /*=================================================
                       SKROLL-BASERADE EFFEKTER!
     =================================================*/


    $(window).on('scroll', function () {

        parallax();
        focus();
        flip();
        navBar();

    });
    $(window).on('resize', function () {
        parallax();
        console.log("HEJ!")
    });


    function navBar()
    {
        var scrollTop = $(window).scrollTop();
        console.log(scrollTop);

        if(scrollTop>100)
        {
            $('.nav-container').addClass("nav-background")
        }
        else
        {
            $('.nav-container').removeClass("nav-background")

        }



    }



    function focus()
    {

    $('.in-focus').each(function() {
        var windowHeight = $(window).height(); // Höjd på viewport
        var windowWidth = $( window).width();  // Bredd på viewport

        var scrollTop = $(window).scrollTop();
        var elementOffsetTop = $(this).offset().top;
        var distanceTop = ((elementOffsetTop - scrollTop)); // DET HÄR ELEMENTS ÖVRE AVSTÅND TILL TOPPEN AV VIEWPORT

        if(distanceTop<windowHeight)
        {
            $(this).addClass("parallax");
        }
        else
        {
            $(this).removeClass("parallax");
        }
    });
    }

        function parallax()
        {
        $('.parallax').each(function() {
            var windowHeight = $(window).height(); // Höjd på viewport

            var scrollTop = $(window).scrollTop();
            var elementOffsetTop = $(this).offset().top;
            var imgWidth = $(this).attr("data-img-width");
            var imgHeight = $(this).attr("data-img-height");
            var imageRatio = imgWidth/imgHeight;
            var scrollSpeed = 2.5; // Ju lägre siffra i desto snabbare scrollar den. Obs! Är siffran under 1 scrollar den åt motsats håll.
            var elementWidth = $(this).width(); // ELEMENTES BREDD
            var distanceTop = ((elementOffsetTop - scrollTop)); // DET HÄR ELEMENTS ÖVRE AVSTÅND TILL TOPPEN AV VIEWPORT


            var scroll = (distanceTop * (-1))/scrollSpeed;
            $(this).find(".x-counter").html(scrollSpeed+ " är scrollSpeed "+ distanceTop + " är distanceTop " + windowHeight+ " är windowHeight");


                $(this).css({
                    "background-position": "50%" + ((scroll) + "px"),
                    "background-size": (elementWidth +"px "+elementWidth/imageRatio+"px"),
                    "height": elementWidth/imageRatio
                });
        });
    } // Slut på parallax funktionen

    function flip()
    {
        $('.flip').each(function() {

            var scrollTop = $(window).scrollTop(),
                parentElementOffsetTop = $(this).parent().offset().top,
                parentDistanceTop = (parentElementOffsetTop - scrollTop);
            var elementHeight = $(this).height();
            var distanceBottom = (parentDistanceTop + elementHeight);
            var opacity = (distanceBottom / elementHeight);
            var rotateSpeed = ((parentDistanceTop / 8).toFixed(2) * -1);

            if (rotateSpeed <= 0) {
                rotateSpeed = 0;
            }
            else if (rotateSpeed >= 90)
            {
                rotateSpeed = 90;
            }
        //    $(this).find(".pixel-counter").html(distanceBottom);
            $(this).css({
                "transform": " translateY(0px) rotateX("+rotateSpeed+"deg)",
                "opacity": opacity
            });
        });


    }




}); // End jQuery





/*=================================================
 ROTERA X!
 =================================================*/


//$('.rotate-x').each(function(){
//    var rotateStartX = 2;
//    var elementOffsetTop = $(this).parent().offset().top;
//    var elementHeight = $(this).height(); // ELEMENTETS HÖJD
//    var distanceTop   = (elementOffsetTop - scrollTop); // DET HÄR ELEMENTS ÖVRE AVSTÅND TILL TOPPEN AV VIEWPORT
//    var middleDistanceTop = (distanceTop+(elementHeight/rotateStartX)); // DET HÄR ELEMENTS ÖVRE AVSTÅND TILL TOPPEN AV VIEWPORT
//
//    var bottomDistanceTop = distanceTop+elementHeight; // DET HÄR ELEMENTS NEDRE AVSTÅND TILL TOPPEN AV VIEWPORT
//    // var elementHeight = $(this).height();
//    // / var distanceBottom = (windowHeight - (distanceTop+elementHeight));
//
//    var rotateSpeed = middleDistanceTop*(1);
//    $(this).find(".x-counter").html(rotateSpeed);
//
//    console.log(rotateSpeed);
//
//    if(bottomDistanceTop < elementHeight/rotateStartX)
//    {
//        if(rotateSpeed<-180)
//        {
//            rotateSpeed = -180;
//        }
//        $(this).css("transform", "rotateX("+rotateSpeed+"deg)");
//        // console.log("NU HAR HALVA PASSERAT!")
//    }
//});
