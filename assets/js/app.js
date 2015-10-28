$(document).ready(function() {

    var children;

    // Basic Functions
    //––––––––––––––––
    function windowWidth() {
        var winWidth = $(window).width();
        // console.log(winWidth);
        return winWidth;
    };
    function windowHeight() {
        var winHeight = $(window).height();
        // console.log(winHeight);
        return winHeight;
    };


    var slider = $('#main-slider');
    var children = slider.children();

    slider.children().remove();
    slider.html('<div class="slider-wrapper-outer"></div><div class="slider-controls"></div>');

    var sliderOuterWrapper = slider.find('.slider-wrapper-outer');
    sliderOuterWrapper.html('<div class="slider-wrapper"></div>');

    var arrowLeft = '<div class="arrow arrow-left disabled"></div>';
    var arrowRight = '<div class="arrow arrow-right"></div>';
    var sliderControls = slider.find('.slider-controls');
    var sliderWrapper = sliderOuterWrapper.find('.slider-wrapper');

    sliderControls.html(arrowLeft + arrowRight);
    sliderWrapper.html(children);
    children.addClass('slider-item').css({
        'width': window.outerWidth,
    });
    sliderArrow = {
        right : slider.find('.arrow.arrow-right'),
        left : slider.find('.arrow.arrow-left')
    }
    var firstSlideCopy = children.first(),
        lastSlideCopy = children.last();

    // console.log(slideBeforeCopy);
    // firstSlideCopy.clone().appendTo(children.parent());
    // lastSlideCopy.clone().prependTo(children.parent());
    children.first().addClass('active');
    children = sliderWrapper.children();

    sliderWrapper.css({
        'width': children.length * window.outerWidth,
        'transform': "translate3d(0px, 0px, 0px)",
        'transition-duration' : '1s',
    })
    // sliderWrapper.css('width', children.length * windowWidth());
    for ( var i = 0; i < children.length; i++ ) {
        // children[i].style.top = (i - 1) * windowHeight() + 'px';
    }

    // Functions onInit
    //––––––––––––––––––––
    $('body').css('height', windowHeight());

    // Events
    //––––––––––––––––––
    var slideNumber = children.length;
    var actualPosition = 0;
    // Slider Right
    sliderArrow.right.click(function() {

        // Set actual childrens
        children = sliderWrapper.children();

        // Queue
        // var afterActiveSlide = sliderWrapper.find('.active').next();
        // children.first().remove();
        // afterActiveSlide.clone().appendTo(children.parent());

        // Core Function
        actualPosition = actualPosition - window.outerWidth;
        sliderWrapper.css({
            'transform': "translate3d(" + parseInt(actualPosition) + "px, 0px, 0px)",
        });
        // console.log(actualPosition);

        // Change active slide
        activeSlide = sliderWrapper.find('.active').next();
        sliderWrapper.find('.active').removeClass('active');
        activeSlide.addClass('active');

        sliderArrow.left.removeClass('disabled');
        if ( activeSlide.index() == 3 ) {
            $(this).addClass('disabled');
        } else {
            $(this).removeClass('disabled');
        }
    });
    // Slider Left
    sliderArrow.left.click(function() {

        children = sliderWrapper.children();

        // Queue
        // var beforeActiveSlide = children.last().prev().prev();
        // children.last().remove();
        // beforeActiveSlide.clone().prependTo(children.parent());

        // Set actual childrens
        children = sliderWrapper.children();

        actualPosition = actualPosition + window.outerWidth;
        sliderWrapper.css({
            'transform': "translate3d(" + parseInt(actualPosition) + "px, 0px, 0px)",
        })

        // Change active slide
        activeSlide = sliderWrapper.find('.active').prev();
        sliderWrapper.find('.active').removeClass('active');
        activeSlide.addClass('active');

        sliderArrow.right.removeClass('disabled');
        if ( activeSlide.index() == 0 ) {
            $(this).addClass('disabled');
        } else {
            $(this).removeClass('disabled');
        }
    })

    // Functions onResize
    //––––––––––––––––––––
    $(window).resize(function() {

        $('body').css('height', windowHeight());
    });
})
