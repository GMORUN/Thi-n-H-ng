$(document).ready(function () {
    // $(window).scroll( function(){
    //     /* Check the location of each desired element */
    //     // $('.fade-js').each( function(i){
    //     //
    //     //     var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
    //     //     var bottom_of_window = $(window).scrollTop() + $(window).height();
    //     //     /* If the object is completely visible in the window, fade it it */
    //     //     if( bottom_of_window >= bottom_of_object ){
    //     //
    //     //         $(this).animate({'opacity':'1'},1000);
    //     //
    //     //     }
    //     //
    //     // });
    //     var menu_top = $('.header-top-color').height();
    //     var bottom_of_window =  ($(window).scrollTop() || $("body").scrollTop());
    //     console.log('menu: ' + menu_top + ', scroll: ' + bottom_of_window)
    //     if (bottom_of_window >= menu_top) {
    //         $('.header').slideDown();
    //     } else {
    //         $('.header').slideUp();
    //     }
    // });
    // scroll bg
    // $(window).scroll( function(){
    //     var menu_top = $('.header-top-color').height();
    //     var bottom_of_window =  ($(window).scrollTop() || $("body").scrollTop());
    //     if (bottom_of_window >= menu_top) {
    //         $('.header').slideDown();
    //     } else {
    //         $('.header').slideUp();
    //     }
    //     if (bottom_of_window > 0) {
    //         $('.menu-item').fadeOut()
    //     } else {
    //         $('.menu-item').fadeIn()
    //     }
    // });
    // video
    $(document).on('click', '.video img', function (event) {
        $(event.target).closest('p').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/jlDDxg7gxLU?autoplay=1" frameborder="0" allowfullscreen></iframe>');
        $(event.target).remove();
    });
    //page top
    $('.page-top').click(function() {
        $('html, body').animate({scrollTop:0}, 1000);
    });

    $(document).scroll(function(e) {
        // var winHeight = $(window).height();
        // if($(window).scrollTop() <= winHeight) {
        //     $('.page-top').hide();
        // } else {
        //     $('.page-top').fadeIn();
        // }
      var headerHeight = $('.header-language').height();
      if($(window).scrollTop() > headerHeight) {
            $('.header-language').hide();
            $('.header ').addClass('header-fix')
        } else {
            $('.header-language').show();
            $('.header ').removeClass('header-fix')
        }
    });
    //slider
    // $('.slider-js').bxSlider({
    //     auto: true,
    //     controls: true,
    //     nextSelector: '#slider-next',
    //     prevSelector: '#slider-prev',
    //     controls: true,
    //     nextText: '<img src="assets/images/icn_next.png"/>',
    //     prevText: '<img src="assets/images/icn_prev.png"/>'
    // })
    // $('.product-line-js').bxSlider({
    //     auto: true,
    //     controls: true,
    //     nextSelector: '#arr-next',
    //     prevSelector: '#arr-prev',
    //     controls: true,
    //     nextText: '',
    //     prevText: ''
    // })
    var mySlider = $('.pogoSlider').pogoSlider({
        pauseOnHover: false
    }).data('plugin_pogoSlider');
    $('.search-js').on('click', function () {
        if($(this).hasClass('search-active')) {
            $(this).removeClass('search-active')
            $('.search-form-js').slideUp()
        } else {
            $(this).addClass('search-active')
            $('.search-form-js').slideDown()
        }
    })
    //meanmenu
    $('.header-menu-content-js').meanmenu( {
        meanScreenWidth: "768"
    });
    // slider product list sp
    // $('.bxslider').bxSlider({
    //   minSlides: 2,
    //   maxSlides: 2,
    //   slideWidth: 360,
    //   slideMargin: 10
    // });

  // function makeSlider () {
  //   var slider = null;
  //   var option = {
  //     minSlides: 2,
  //     maxSlides: 2,
  //     moveSlides: 2,
  //     slideMargin: 10,
  //     slideWidth: 360,
  //     pager: false
  //     // pager: false
  //   }
  //   if($(window).width() <= 768) {
  //     if(slider=== null) {
  //       slider = $('.product-list-js').bxSlider(option);
  //     } else {
  //       slider.reloadSlider();
  //     }
  //   } else {
  //     slider.destroySlider();
  //     slider = null;
  //   }
  // }
  // makeSlider();
  // $(window).on("orientationchange load resize", function () {
  //   makeSlider();
  // });

    //product line js
    $('.product-line-js').slick({
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
      dots: true,
        arrows: true,
      fade: true,
      cssEase: 'linear',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: false,
                }
            }
        ]
    });
    //product-list-js
    $('.product-list-js').slick({
      responsive: [{
        breakpoint: 99999,
        settings: "unslick"
      },{
        breakpoint: 768,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          focusOnSelect: true,
        }
      }]
    });
    // certification-list-js
    $('.certification-list-js').slick({
      responsive: [{
        breakpoint: 99999,
        settings: "unslick"
      },{
        breakpoint: 768,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          focusOnSelect: true,
        }
      }]
    });
    $(window).on('resize orientationchange', function() {
      $('.product-list-js,.certification-list-js').slick('resize');
    });

})
