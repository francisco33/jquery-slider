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


    var slider = $('#main-slider'),
        children = slider.children();

    slider.children().remove();
    slider.html('<div class="slider-wrapper"></div><div class="slider-controls"></div>');

    var sliderWrapper = slider.find('.slider-wrapper'),
        arrowLeft = '<div class="arrow arrow-left"></div>',
        arrowRight = '<div class="arrow arrow-right"></div>',
        sliderControls = slider.find('.slider-controls'),
        slideActiveIndex = 0;

    sliderControls.html(arrowLeft + arrowRight);
    sliderWrapper.html(children);
    children.css({
        'top': 0,
        'width': '100%',
        'position': 'absolute'
    });
    sliderArrow = {
        right : slider.find('.arrow.arrow-right'),
        left : slider.find('.arrow.arrow-left')
    }
    var firstSlideCopy = children.first(),
        lastSlideCopy = children.last();

    // console.log(slideBeforeCopy);
    firstSlideCopy.clone().appendTo(children.parent());
    lastSlideCopy.clone().prependTo(children.parent());
    children.first().addClass('active');
    children = sliderWrapper.children();

    for ( var i = 0; i < children.length; i++ ) {
        children[i].style.top = (i - 1) * windowHeight() + 'px';
    }

    // console.log(children);

    // Functions onInit
    //––––––––––––––––––––
    $('body').css('height', windowHeight());


    // Events
    //––––––––––––––––––

    var slideNumber = children.length;

    // Slider Right
    sliderArrow.right.click(function() {

        // Set actual childrens
        children = sliderWrapper.children();

        // Queue
        var afterActiveSlide = sliderWrapper.find('.active').next();
        children.first().remove();
        afterActiveSlide.clone().appendTo(children.parent());

        // Core Function
        for ( var i = 1; i < slideNumber; i++ ) {
            children[i].style.top = (i - 2) * windowHeight() + 'px';
            // console.log(i);
            // console.log(slideNumber);
        }

        // Change active slide
        activeSlide = sliderWrapper.find('.active').next();
        sliderWrapper.find('.active').removeClass('active');
        activeSlide.addClass('active');
    });
    // Slider Left
    sliderArrow.left.click(function() {

        children = sliderWrapper.children();

        // Queue
        var beforeActiveSlide = children.last().prev().prev();
        children.last().remove();
        beforeActiveSlide.clone().prependTo(children.parent());

        // Set actual childrens
        children = sliderWrapper.children();

        // Core Function
        for ( var i = 0; i < slideNumber - 1; i++ ) {
            children[i].style.top = (i-1) * windowHeight() + 'px';
            // console.log(i);
            console.log(slideNumber);
        }

        // Change active slide
        activeSlide = sliderWrapper.find('.active').prev();
        sliderWrapper.find('.active').removeClass('active');
        activeSlide.addClass('active');
    })

    // Functions onResize
    //––––––––––––––––––––
    $(window).resize(function() {

        $('body').css('height', windowHeight());
    });
})
