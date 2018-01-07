$(document).ready(function () {
    $(document).on('click', '.video img', function (event) {
        $(event.target).closest('p').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/jlDDxg7gxLU?autoplay=1" frameborder="0" allowfullscreen></iframe>');
        $(event.target).remove();
    });
    //page top
    $('.page-top').click(function() {
        $('html, body').animate({scrollTop:0}, 1000);
    });
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
    /*
    Scroll product page
     */
    function scrollTo(el) {
        var element = $(el);
        $('html,body').animate({scrollTop: element.offset().top},'slow');
    }
    $('.menu-product-js li a').on('click',function () {
        var ele = $(this).attr('href');
        scrollTo(ele);
    })
    $(document).scroll(function(e) {
        var headerHeight = $('.header-language').height();
        if($(window).scrollTop() > headerHeight) {
            $('.header-language').hide();
            $('.header ').addClass('header-fix')
        } else {
            $('.header-language').show();
            $('.header ').removeClass('header-fix')
        }
        var top = $('.banner').height();
        if($(window).width() >= 1170) {
            if($(window).scrollTop() > top) {
                $('.menu-product-js').addClass('menu-product-scroll');
            } else {
                $('.menu-product-js').removeClass('menu-product-scroll');
            }
        }

        if($(window).scrollTop() > 400 ) {
            $('.page-top').fadeIn();
        } else {
            $('.page-top').fadeOut();
        }
    });

})
