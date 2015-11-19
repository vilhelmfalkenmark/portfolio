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


    /*=================================================
     SMOOTH-SCROLLING
     =================================================*/

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 55
        }, 700, 'swing', function () {
            window.location.hash = target;
        });
    });

    /*=================================================
     KOLLA SKÄRMBREDD OCH AVGÖR VILKEN DEVICE SOM KÖRS!
     =================================================*/
    var deviceInfo = $(".device-info");
    $(window).resize(function () {

        var screenWidth = $(window).width();
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
     NY FUNKTION HÄR!!!!
     =================================================*/
    $('.gtr').each(function () {
        //  $(this).find(".flex-center").html($(this).attr('class'));
    });

    /*=================================================
     SKROLL-BASERADE EFFEKTER!
     =================================================*/
    $(window).on('scroll', function () {

        var windowHeight = $(window).height();
        var screenWidth = $(window).width();
        var scrollTop = $(window).scrollTop();

        if (screenWidth >= mobileLargeBreak) {
            timeLine(screenWidth, windowHeight, scrollTop);
        }
        if (screenWidth > desktopBreak) {
            flip(scrollTop);
            navBarFocus(windowHeight, scrollTop);
        }
        skillBars(windowHeight, scrollTop);
        navBar(screenWidth, scrollTop);

    });
    /*=================================================
     JUSTERING AV FÖNSTERSTORLEK
     =================================================*/
    $(window).on('resize', function () {
        timeLine($(window).width(), $(window).height());
        fullscreenFix();
        backgroundResize();
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
     /*   $(this).find(".counter").html("Elementet är "+elementHeight+ "Pixlar högt." +
            "<br> Avståndet upp är "+offsetTop+"" +
            "<br> ScrollTop är "+scrollTop+"" +
            "<br> och fönstret är "+windowHeight+" pixlar högt"+
            "<br> VP är "+distanceTopVP+
            "<br> bottomVP är"+distanceBottomVP
        );*/
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
     ROTERA BAKGRUND PÅ X-AXELN
     =================================================*/
    function flip(scrollTop) {
        $('.flip').each(function () {
            var parentElementOffsetTop = $(this).parent().offset().top,
                parentDistanceTop = (parentElementOffsetTop - scrollTop);
            var elementHeight = $(this).height();
            var distanceBottom = (parentDistanceTop + elementHeight);
            var opacity = (distanceBottom / elementHeight) - 0.2;
            var rotateSpeed = ((parentDistanceTop / 8).toFixed(2) * -1);

            if (rotateSpeed <= 0) {
                rotateSpeed = 0;
            }
            else if (rotateSpeed >= 115) {
                rotateSpeed = 115;
            }
            //    $(this).find(".pixel-counter").html(distanceBottom);
            $(this).css({
                "transform": " translateY(0px) rotateX(" + rotateSpeed + "deg)",
                "opacity": opacity
            });
        });
    }

    /*=================================================
     PARALLAX
     =================================================*/
    var screenWidth = $(document).width();
    if (screenWidth > desktopBreak) {
        if ("ontouchstart" in window) {
            document.documentElement.className = document.documentElement.className + " touch";
        }
        if (!$("html").hasClass("touch")) {
            $(".parallax").css("background-attachment", "fixed");
        }
        function fullscreenFix() {
            var h = $('body').height();
            // set .fullscreen height
            $(".content-b").each(function (i) {
                if ($(this).innerHeight() <= h) {
                    $(this).closest(".fullscreen").addClass("not-overflow");
                }
            });
        }

        $(window).resize(fullscreenFix);
        $(window).resize(backgroundResize);

        fullscreenFix();

        function backgroundResize() {
            var windowH = $(window).height();
            $(".background").each(function (i) {
                var path = $(this);
                var contW = path.width();
                var contH = path.height();
                var imgW = path.attr("data-img-width");
                var imgH = path.attr("data-img-height");
                var ratio = imgW / imgH;
                var diff = parseFloat(path.attr("data-diff"));
                diff = diff ? diff : 0;
                var remainingH = 0;
                if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
                    remainingH = windowH - contH;
                }
                imgH = contH + remainingH + diff;
                imgW = imgH * ratio;
                // fix when too large
                if (contW > imgW) {
                    imgW = contW;
                    imgH = imgW / ratio;
                }
                //
                path.data("resized-imgW", imgW);
                path.data("resized-imgH", imgH);
                path.css("background-size", imgW + "px " + imgH + "px");
            });
        }

        $(window).focus(backgroundResize);
        backgroundResize();

        function parallaxPosition(e) {
            var heightWindow = $(window).height();
            var topWindow = $(window).scrollTop();
            var bottomWindow = topWindow + heightWindow;
            var currentWindow = (topWindow + bottomWindow) / 2;
            $(".parallax").each(function (i) {
                var path = $(this);
                var height = path.height();
                var top = path.offset().top;
                var bottom = top + height;
                if (bottomWindow > top && topWindow < bottom) {
                    var imgW = path.data("resized-imgW");
                    var imgH = path.data("resized-imgH");
                    var min = 0;
                    var max = -imgH + heightWindow;
                    var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
                    top = top - overflowH;
                    bottom = bottom + overflowH;
                    var value = (min + (max - min) * (currentWindow - top) / (bottom - top));


                    /*  var scrollTop = $(window).scrollTop(),
                     parentElementOffsetTop = $(this).parent().offset().top,
                     parentDistanceTop = (parentElementOffsetTop - scrollTop);
                     var elementHeight = $(this).height();
                     var distanceBottom = (parentDistanceTop + elementHeight);
                     var opacity = (distanceBottom / elementHeight);
                     var rotateSpeed = ((parentDistanceTop / 8).toFixed(2) * -1);*/

                    var horizontalPosition = path.attr("data-oriz-pos");
                    horizontalPosition = horizontalPosition ? horizontalPosition : "50%";
                    $(this).css("background-position", horizontalPosition + " " + value + "px");
                }
            });
        }

        if (!$("html").hasClass("touch")) {
            $(window).resize(parallaxPosition);
            //$(window).focus(parallaxPosition);
            $(window).scroll(parallaxPosition);
            parallaxPosition();
        }
    }

    /*=================================================
     OM-MIG SEKTIONEN
     =================================================*/

    $(".hide").hide();

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
    });
    $('.hire-me-btn').click(function () {
        $(".to-about-me").show();
    });


    /*=================================================
     KUGGHJULS SEKTIONEN
     =================================================*/
    $('.venn-circle').each(function () {
        $(this).mouseover(function () {
            //     $(".venn-circle").addClass("rotating");
        });
        $(this).mouseout(function () {
            //   $(".venn-circle").removeClass("rotating");

        });
    });

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

    $(".close-pop-up").on("click", function () {
        $(".pop-up").fadeOut("fast");
    });

    /*===========  VALIDERING OCH POP-UP ========== */
    $('.form-btn').each(function () {
        $(this).on("click", function () {
            if ($(this).siblings("input").val().length > 0 && $(this).siblings("textarea").val().length) {
                $(".fail-container").hide();
                $(".pop-up").fadeIn("fast");
                $(".success-container").fadeIn("fast");
            }
            else {
                $(".success-container").hide();
                $(".pop-up").fadeIn("fast");
                $(".fail-container").fadeIn("fast");
            }
        });
    });


}); // End jQuery

