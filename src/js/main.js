$(window).scroll(function() {

    var $menus = $('.miniseccion.menu');
    $menus.each(function() {
        if ($(this).isInViewport()) {
            var parentSection = $(this).parent();
            var parentTop = parentSection.offset().top;
            var menuHeight = $(this).outerHeight();
            var parentHeight = parentSection.outerHeight();
            var parentBottom = parentTop + parentHeight;
            var scrollTop = $(window).scrollTop();
            var scrollBottom = scrollTop + parentHeight - menuHeight;

            if((parentTop <= scrollTop)) {

                if (!$(this).parent().hasClass('menu-fixed')) {
                    $(this).parent().addClass('menu-fixed');
                }
                else if (scrollBottom > parentBottom) {
                    $(this).parent().addClass('menu-ended');
                }
                else {
                    $(this).parent().removeClass('menu-ended');
                }
                
            }
            else if (scrollTop < parentTop) {
                $(this).parent().removeClass('menu-fixed');
                $(this).parent().removeClass('menu-ended');
            } 
            
        }
    });

  });


  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
  
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
  
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };