$(document).ready(function () {
    // video
    $(document).on('click', '.video img', function (event) {
        $(event.target).closest('p').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/jlDDxg7gxLU?autoplay=1" frameborder="0" allowfullscreen></iframe>');
        $(event.target).remove();
    });
    
    // slider main banner
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

    //slider product line js
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
    //slider product-list-js
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
    // slider certification-list-js
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
