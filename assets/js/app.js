$(document).ready(function() {

    // Variables
    //––––––––––––––––––
    var outerWidth = window.outerWidth;
    var children;
    var actualPosition = 0;
    var slider = $('#main-slider');
    var children = slider.children();

    slider.children().remove();
    slider.html('<div class="slider-wrapper-outer"></div><div class="slider-controls"></div>');

    var sliderOuterWrapper = slider.find('.slider-wrapper-outer');
    sliderOuterWrapper.html('<div class="slider-wrapper"></div>');

    var sliderWrapper = sliderOuterWrapper.find('.slider-wrapper');
    sliderWrapper.html(children);

    var sliderControls = slider.find('.slider-controls');
    var arrowLeft = '<div class="arrow arrow-left disabled"></div>';
    var arrowRight = '<div class="arrow arrow-right"></div>';
    sliderControls.html(arrowLeft + arrowRight);

    var sliderArrow = {
        right : slider.find('.arrow.arrow-right'),
        left : slider.find('.arrow.arrow-left')
    }

    // Basic Functions
    //––––––––––––––––––
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
    function changeSlide(elem) {
        this.nextSlide = elem.next();
        this.prevSlide = elem.prev();
    }
    function setActiveSlide(direction) {
        activeSlide = sliderWrapper.find('.active').removeClass('active');
        if (direction == 'next')
            activeSlide = new changeSlide(activeSlide).nextSlide;
        else if (direction == 'prev')
            activeSlide = new changeSlide(activeSlide).prevSlide;
        activeSlide.addClass('active');
    }
    function goToNextSlide() {
        // Set actual childrens
        children = sliderWrapper.children();

        // Core Function
        actualPosition = actualPosition - outerWidth;
        sliderWrapper.css({
            'transition': 'all 400ms',
            'transform': "translate3d(" + parseInt(actualPosition) + "px, 0px, 0px)",
        });

        // Change active slide
        setActiveSlide('next');

        sliderArrow.left.removeClass('disabled');
        if ( activeSlide.index() == children.length-1 ) {
            sliderArrow.right.addClass('disabled');
        } else {
            sliderArrow.right.removeClass('disabled');
        }
    }
    function goToPrevSlide() {
        // Set actual childrens
        children = sliderWrapper.children();

        actualPosition = actualPosition + outerWidth;
        sliderWrapper.css({
            'transition': 'all 400ms',
            'transform': "translate3d(" + parseInt(actualPosition) + "px, 0px, 0px)",
        })

        // Change active slide
        setActiveSlide('prev');

        sliderArrow.right.removeClass('disabled');
        if ( activeSlide.index() == 0 ) {
            sliderArrow.left.addClass('disabled');
        } else {
            sliderArrow.left.removeClass('disabled');
        }
    }

    // Slider Init
    //––––––––––––––––––––
    $('body').css('height', windowHeight());

    var slideNumber = children.length;
    var activeSlide = children.first().addClass('active');
    
    children.addClass('slider-item').css('width', outerWidth);
    children = sliderWrapper.children();

    sliderWrapper.css({
        'width': children.length * outerWidth,
        'transform': "translate3d(0px, 0px, 0px)",
    })

    // Events
    //––––––––––––––––––

    // Slider Right
    sliderArrow.right.click(function() {
        goToNextSlide();
    });
    // Slider Left
    sliderArrow.left.click(function() {
        goToPrevSlide();
    })

    // Functions onResize
    //––––––––––––––––––––
    $(window).resize(function() {

        outerWidth = window.outerWidth;
        actualPosition = ((-activeSlide.index()) * outerWidth);
        sliderWrapper.css({
            'width': children.length * outerWidth,
            'transform': "translate3d(" + actualPosition + "px, 0px, 0px)",
            'transition': 'all 0ms'
        });
        children.css({
            'width': outerWidth,
            'transition': 'all 0ms'
        });

        $('body').css('height', windowHeight());
    });
})
