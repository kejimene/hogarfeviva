let $menus = $('.miniseccion.menu');

$(document).ready(() => {
    setSectionsHeader();
    $('.donacionescarrusel').slick({
        infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
      });

        $('.obrascarrusel').slick({
            infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
          });      

      


      
});

$(window).scroll(() => {
    $menus.each(function() {
        if ($(this).isInViewport()) { $(this).handlePositioning(); }
    });
  });


$('.links a').on('click', function() {
    if (this.hash) {
        event.preventDefault();
  
        var hash = this.hash;
        
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800);
      }
    
});
  

function setSectionsHeader () {
    $menus.each(function() {
        $(this).handlePositioning();
    });
}

  $.fn.handlePositioning = function (){
    let parentSection = $(this).parent();
    let parentTop = parentSection.offset().top;
    let menuHeight = $(this).outerHeight();
    let parentHeight = parentSection.outerHeight();
    let parentBottom = parentTop + parentHeight;
    let scrollTop = $(window).scrollTop();
    let scrollBottom = scrollTop + parentHeight - menuHeight;

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


  $.fn.isInViewport = function() {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
  
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
  
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };