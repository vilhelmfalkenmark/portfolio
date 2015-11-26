/**
 * Created by Vilhelm on 15-10-21.
 */
$(document).ready(function () {

    var mobileLargeBreak = 400;
    var tabletBreak = 768;
    var desktopBreak = 1025;

    /*=================================================
     MENY-KNAPPEN I MOBILLÄGE
     =================================================*/
    var menuButton = $(".menu-button");
    var overLay = $(".overlay");
    menuButton.click(function () {

        $(this).toggleClass("open");
        $(".nav-container").toggleClass("nav-slide-in");
        overLay.toggleClass("dark-overlay");
    });

    overLay.click(function () {
        menuButton.toggleClass("open");
        $(".nav-container").toggleClass("nav-slide-in");
        $(this).toggleClass("dark-overlay");
    });

    $(".nav-link").click(function(){

            if( $(window).width() < desktopBreak)
            {
                menuButton.toggleClass("open");
                $(".nav-container").toggleClass("nav-slide-in");
                overLay.toggleClass("dark-overlay");
            }
    });



    /*=================================================
     SMOOTH-SCROLLING
     =================================================*/
    var scrollStop;
    if($(window).width()<desktopBreak)
    {
        scrollStop = 0;
    }
    else
    {
        scrollStop = 55;
    }

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({

        'scrollTop': $target.offset().top - scrollStop

        }, 400, 'swing', function () {
            window.location.hash = target;
        });
    });

    /*=================================================
     KOLLA SKÄRMBREDD OCH AVGÖR VILKEN DEVICE SOM KÖRS!
     =================================================*/
    var deviceInfo = $(".device-info");
    $(window).resize(function () {

        var screenWidth = $(window).width();
        if(screenWidth<desktopBreak)
        {
            scrollStop = 0;
        }
        else
        {
            scrollStop = 55;
        }
        if (screenWidth <= mobileLargeBreak) {
            deviceInfo.html(screenWidth + " px = mobile-small");
        }
        else if (screenWidth > mobileLargeBreak && screenWidth < tabletBreak) {
            deviceInfo.html(screenWidth + " px =mobile-large");
        }
        else if (screenWidth >= tabletBreak && screenWidth < desktopBreak) {
            deviceInfo.html(screenWidth + " px =Tablet");
        }
        else {
            deviceInfo.html(screenWidth + " px =Desktop");
        }
    });
    /*=================================================
     SKROLL-BASERADE EFFEKTER!
     =================================================*/
    $(window).on('scroll', function () {

        var windowHeight = $(window).height();
        var screenWidth = $(window).width();
        var scrollTop = $(window).scrollTop();

        if (screenWidth >= tabletBreak) {
            timeLine(screenWidth, windowHeight, scrollTop);
        }
        if (screenWidth > desktopBreak) {
            flip(scrollTop);
            navBarFocus(windowHeight, scrollTop);
        }
        skillBars(windowHeight, scrollTop);
        navBar(screenWidth, scrollTop);

        if(screenWidth>tabletBreak)
        {
            fadeInScroll(windowHeight, scrollTop)
        }

    });
    /*=================================================
     JUSTERING AV FÖNSTERSTORLEK
     =================================================*/
    $(window).on('resize', function () {
        timeLine($(window).width(), $(window).height());
    });

    var sectionFocusArray = $(".section-focus");
    var navLinks = $(".nav-link");
    function navBarFocus(windowHeight, scrollTop)
    {
        $('.section-focus').each(function () {

        var elementHeight = $(this).height();
        var offsetTop = $(this).offset().top;
        var distanceTopVP = offsetTop-scrollTop ;
        var distanceBottomVP = (offsetTop-scrollTop)+elementHeight ;
            var sectionFocusIndex = sectionFocusArray.index(this);
            if((distanceTopVP<=windowHeight/2) && (distanceBottomVP>=0))
            {
                navLinks[sectionFocusIndex].className = "nav-links chosen";
            }
            else
            {
                navLinks[sectionFocusIndex].className = "nav-links";
            }
            if(scrollTop>(windowHeight-30))
            {
                navLinks[0].className = "nav-links";
            }
        });
      }
    function navBar(screenWidth, scrollTop) {
        if (scrollTop > 100 && screenWidth > 1024) {
            $('.desktop-menu-background').fadeIn(300);
            $(".name-container").fadeIn("slow");
        }
        else {
            $('.desktop-menu-background').fadeOut(300);
            $(".name-container").fadeOut("slow");
        }
    }

    /*=================================================
     FADEIN på Scroll
     =================================================*/

    function fadeInScroll(windowHeight,scrollTop)
    {
        $('.fade-in').each( function(i){

            var bottom_of_object = $(this).offset().top + ($(this).outerHeight()/1.5);
            var bottom_of_window = scrollTop + windowHeight;
            if( bottom_of_window > bottom_of_object)
            {
               // $(this).addClass({'opacity':'1'},800);
                $(this).addClass("fade-in-now");
            }
        });

        $('.fade-in-blog').each( function(i){

            var bottom_of_object = $(this).offset().top + ($(this).outerHeight()/3);
            var bottom_of_window = scrollTop + windowHeight;
            if( bottom_of_window > bottom_of_object)
            {
                // $(this).addClass({'opacity':'1'},800);
                $(this).addClass("fade-in-now");
            }
        });




    }




    /*=================================================
     ROTERA BAKGRUND PÅ X-AXELN
     =================================================*/
    function flip(scrollTop) {
        $('.flip').each(function () {
            var parentElementOffsetTop = $(this).parent().offset().top,
                parentDistanceTop = (parentElementOffsetTop - scrollTop);
            var elementHeight = $(this).height();
            var distanceBottom = (parentDistanceTop + elementHeight);
            var opacity = (distanceBottom / (elementHeight)) - 0.2;

            if(opacity<0)
            {
                opacity = 0;
            }
            var rotateSpeed = ((parentDistanceTop / 8).toFixed(2) * -1);

            if (rotateSpeed <= 0) {
                rotateSpeed = 0;
            }
            else if (rotateSpeed >= 115) {
                rotateSpeed = 115;
            }
            $(this).css({
                "transform": " translateY(0px) rotateX(" + rotateSpeed + "deg)",
                "opacity": opacity
            });
           // console.log(parentDistanceTop)

            if(parentDistanceTop>= -19)
            {
                $(this).css({
                   // "transform": " translateY(0px) rotateX(" + 0 + "deg)",

                  "opacity": 1
                });
            }
        });
    }
    /*=================================================
     OM-MIG SEKTIONEN
     =================================================*/

    $(".hide").hide();

    $(".close-about-container").click(function()
    {
        $(".hide").hide();
        $(".to-about-me").hide();
    });

    $('#aboutButton').click(function () {
        $('#aboutMeContent').show("slow");
        $('#servicesContent').hide("slow");
        $("#interestContent").hide("slow");
    });
    $('.hire-me-btn').click(function () {
        $('#servicesContent').show("slow");
        $('#interestContent').hide("slow");
        $("#aboutMeContent").hide("slow");
    });
    $('#interestButton').click(function () {
        $('#interestContent').show("slow");
        $('#servicesContent').hide("slow");
        $("#aboutMeContent").hide("slow");
    });

    $('.hexagon-outer').click(function () {
        $(".to-about-me").show();
        $(".close-about-container").show();

    });
    $('.hire-me-btn').click(function () {
        $(".to-about-me").show();
    });


    ///*=================================================
    // KUGGHJULS SEKTIONEN
    // =================================================*/
    //$('.venn-circle').each(function () {
    //    $(this).mouseover(function () {
    //        //     $(".venn-circle").addClass("rotating");
    //    });
    //    $(this).mouseout(function () {
    //
    //    });
    //});

    /*=================================================
     SKILLBARS SEKTIONEN
     =================================================*/

    function skillBars(windowHeight, scrollTop) {
        $('.skill-percentage').each(function () {
            var elementOffsetTop = $(this).offset().top,
                distanceTop = (elementOffsetTop - scrollTop);
            var elementHeight = $(this).innerHeight();
            var distanceBottom = (windowHeight - (distanceTop + elementHeight));

            $("#distanceBottom").html(distanceBottom);

            if (distanceBottom > 100) // Hur långt från botten ska animationen börja?!
            {
                $(this).find('.skill-meter-container').css({
                    "width": jQuery(this).attr('data-percent'),
                    "transition": "width 2s ease-in-out;"
                });
            }
            else if (distanceBottom < -100) {
                $(this).find('.skill-meter-container').css({"width": 0});
            }
        });
    }

    /*=================================================
     FLYGA-IN-DIVAR SEKTIONEN
     =================================================*/

    function timeLine(windowWidth, windowHeight, scrollTop) {
        if (windowWidth > mobileLargeBreak) // Animationen såg för taskig ut på smartphones.
        {
            // Scrolla in Diven från Vänster
            $('.slide-left').each(function () {
                var elementOffsetTop = $(this).offset().top,
                    distanceTop = (elementOffsetTop - scrollTop);
                var elementHeight = $(this).innerHeight(); // Höjden på elementet. I det här fallet Den vita diven som ska flyga in
                var distanceBottom = (windowHeight - (distanceTop + elementHeight));
                var $opacity = (distanceBottom + 100) / 200; // Täljaren bestämmer när på inscrollet som diven ska visas och nämnaren hur snabbt animationen ska gå.

                if ($opacity >= 0.999) {
                    $opacity = 0.999; // Flaggan försvinner av jätteoklar anledning när opacity sätts till 1. Kan bero på position absolute?
                }
                else if ($opacity < 0) {
                    $opacity = 0;
                }

                var $scrollInFromLeft = (distanceBottom - 200) * 1.5; // Öka till cirka (distanceBottom-200)*4;

                /* Så att den inte fortsätter räkna och laggar */
                if ($scrollInFromLeft < -1000) {
                    $scrollInFromLeft = -1000;
                }

                if ($scrollInFromLeft >= -45 && windowWidth > desktopBreak) {
                    $scrollInFromLeft = -45;
                }
                $(this).css({"opacity": $opacity, "margin-left": $scrollInFromLeft});
                if (windowWidth < desktopBreak && windowWidth > mobileLargeBreak) {

                    if (windowWidth > tabletBreak) {
                        if ($scrollInFromLeft > -145) {
                            $scrollInFromLeft = -145;
                        }
                    }
                    else {
                        if ($scrollInFromLeft > -10) {
                            $scrollInFromLeft = -10;
                        }
                    }
                    $(this).css({
                        "opacity": $opacity,
                        "margin-left": $scrollInFromLeft * (-1)
                    });
                }
            });
            // Scrolla in Diven från Höger
            $('.slide-right').each(function () {
                var elementOffsetTop = $(this).offset().top,
                    distanceTop = (elementOffsetTop - scrollTop);
                var elementHeight = $(this).innerHeight(); // Höjden på elementet. I det här fallet Den vita diven som ska flyga in
                var distanceBottom = (windowHeight - (distanceTop + elementHeight));
                var $opacity = (distanceBottom + 100) / 200; // Täljaren bestämmer när på inscrollet som diven ska visas och nämnaren hur snabbt animationen ska gå.
                if ($opacity >= 0.999) {
                    $opacity = 0.999; // Flaggan försvinner av jätteoklar anledning när opacity sätts till 1.
                }
                else if ($opacity <= 0) {
                    $opacity = 0;
                }

                var $scrollInFromRight = ((distanceBottom - 200) * 1.5) * -1;


                if ($scrollInFromRight > 1000) {
                    $scrollInFromRight = 1000;
                }

                if ($scrollInFromRight <= 45 && windowWidth >= desktopBreak) {
                    $scrollInFromRight = 45;
                }

                if (windowWidth >= desktopBreak) {
                    $(this).css({"opacity": $opacity, "margin-right": -$scrollInFromRight});
                }

                /*  TABLET AND LARGE-PHONE  */
                if (windowWidth < desktopBreak && windowWidth > mobileLargeBreak) {

                    if (windowWidth > tabletBreak) {
                        if ($scrollInFromRight <= 145) {
                            $scrollInFromRight = 145;
                        }
                    }
                    else if (windowWidth <= tabletBreak) {
                        if ($scrollInFromRight <= 10) {
                            $scrollInFromRight = 10;
                        }

                    }

                    $(this).css({"opacity": $opacity, "margin-left": $scrollInFromRight});

                }

            });
            // Animera ikonens opacity
            $('.timeline-icon-circle').each(function () {
                var elementOffsetTop = $(this).offset().top,
                    distanceTop = (elementOffsetTop - scrollTop);
                var elementHeight = $(this).innerHeight();
                var distanceBottom = (windowHeight - (distanceTop + elementHeight));
                var $opacity = (distanceBottom) / 280;
                if($opacity>=1)
                {
                    $opacity = 1;
                }
                else if($opacity<=0)
                {
                    $opacity = 0;
                }
                $(this).css({"opacity": $opacity});



            });

        }
    }
    /*=================================================
     BLOG-SEKTIONEN
     =================================================*/
    $('.comment-toggle').each(function () {
        $(this).on("click", function () {
            $(this).next().slideToggle();
        });
    });

    $(".close-cross").on("click", function () {
        $(".pop-up").fadeOut("fast");
    });

    /*===========  VALIDERING OCH POP-UP ========== */
    //$('.form-btn').each(function () {
    //    $(this).on("click", function () {
    //        if ($(this).siblings("input").val().length > 0 && $(this).siblings("textarea").val().length) {
    //            $(".fail-container").hide();
    //            $(".pop-up").fadeIn("fast");
    //            $(".success-container").fadeIn("fast");
    //        }
    //        else {
    //            $(".success-container").hide();
    //            $(".pop-up").fadeIn("fast");
    //            $(".fail-container").fadeIn("fast");
    //        }
    //    });
    //});


}); // End jQuery

