/* =========================================================

// jquery.Emiratesbanner.js
// Forked from jQuery Innerfade!
// Datum: 2013-05-27
// Author: Frederick Rosales
// Mail: frederick.rosales@emirates.com


 **********************HTML STRUCTURE**************************************
 *  <ul id="news"> 
 *      <li>content 1</li>
 *      <li>content 2</li>
 *      <li>content 3</li>
 *  </ul>
 **********************JQUERY STRUCTURE************************************** 
 *  $('#news').Emiratesbanner({ 
 *	  animationtype: Type of animation 'fade' or 'slide' (Default: 'fade'), 
 *	  speed: Fading-/Sliding-Speed in milliseconds or keywords (slow, normal or fast) (Default: 'normal'), 
 *	  timeout: Time between the fades in milliseconds (Default: '2000'), 
 *	  type: Type of slideshow: 'sequence', 'random' or 'random_start' (Default: 'sequence'), 
 * 		containerheight: Height of the containing element in any css-height-value (Default: 'auto'),
 *	  runningclass: CSS-Class which the container get’s applied (Default: 'Emiratesbanner'),
 *	  children: optional children selector (Default: null)
 *  }); 
 *

// ========================================================= */


(function($) {

    var tImer;
    var globalCurrent =1;


    var globalLast;
    $.fn.Emiratesbanner = function(options) {
        return this.each(function() {   
            $.Emiratesbanner(this, options);
        });
    };

    $.Emiratesbanner = function(container, options) {
        var settings = {
        		'animationtype':    'fade',
            'speed':            'normal',
            'type':             'sequence',
            'timeout':          2000,
            'containerheight':  'auto',
            'runningclass':     'innerfade',
            'children':         true
        };
        if (options)
            $.extend(settings, options);
            var elements = $(container).children(settings.children);
          
            var paginationHTML = "<ul id='carousel-pagination'>";


            for(var i=0;i<elements.length;i++){
                if(i==0){
                    paginationHTML +="<li><a href='"+(i +1)+"'  class='active'>"+ i+"</a></li>";
                }else{
                    paginationHTML +="<li><a href='"+(i +1)+"'>"+ i+"</a></li>";
                }
                
            }
            paginationHTML += '</ul>';            
               $('.carouselWrapper').append(paginationHTML);

            $('#carousel-pagination li a').click(function(){
               var showItem = $(this).attr('href') -1;
               globalCurrent = globalCurrent -1 ;
               if(globalCurrent == -1){globalCurrent =elements.length -1;}
               $('#carousel-pagination li a').removeClass("active");
               $(this).addClass('active')
               clearTimeout(tImer);
               $.Emiratesbanner.next(elements, settings,showItem , globalCurrent);
               return false;

            })

        if (elements.length > 1) {
            
            $(container).css('position', 'relative').css('height', settings.containerheight).addClass(settings.runningclass);
            for (var i = 0; i < elements.length; i++) {
                $(elements[i]).css('z-index', String(elements.length-i)).css('position', 'absolute').hide();
            };
            if (settings.type == "sequence") {
             tImer= setTimeout(function() {
                  
                    $.Emiratesbanner.next(elements, settings, 1, 0);
                    globalCurrent = 0;
                }, settings.timeout);
                $(elements[0]).show();




            } else if (settings.type == "random") {
            		var last = Math.floor ( Math.random () * ( elements.length ) );
                setTimeout(function() {
                    do { 
												current = Math.floor ( Math.random ( ) * ( elements.length ) );
										} while (last == current );             
										$.Emiratesbanner.next(elements, settings, current, last);
                }, settings.timeout);
                $(elements[last]).show();
						} else if ( settings.type == 'random_start' ) {
								settings.type = 'sequence';
								var current = Math.floor ( Math.random () * ( elements.length ) );
								setTimeout(function(){
									$.Emiratesbanner.next(elements, settings, (current + 1) %  elements.length, current);
								}, settings.timeout);
								$(elements[current]).show();
						}	else {
							alert('Emirates banner-Type must either be \'sequence\', \'random\' or \'random_start\'');
						}
				}
    };

    $.Emiratesbanner.next = function(elements, settings, current, last) {
        if (settings.animationtype == 'slide') {
            $(elements[last]).slideUp(settings.speed);
            $(elements[current]).slideDown(settings.speed);
        } else if (settings.animationtype == 'fade') {
            $(elements[last]).fadeOut(settings.speed);
            $(elements[current]).fadeIn(settings.speed, function() {
							removeFilter($(this)[0]);
						});
        } else
            alert('Emirates banner-animationtype must either be \'slide\' or \'fade\'');
        if (settings.type == "sequence") {
            if ((current + 1) < elements.length) {
                current = current + 1;
                last = current - 1;
                globalCurrent= current ;
                globalLast= last ;
            } else {
                current = 0;
                last = elements.length - 1;
                globalCurrent = 0;
                globalLast = last;
            }
        } else if (settings.type == "random") {
            last = current;
            while (current == last)
                current = Math.floor(Math.random() * elements.length);
        } else
            alert('Emirates banner-Type must either be \'sequence\', \'random\' or \'random_start\'');
               
       tImer= setTimeout((function() {
            $.Emiratesbanner.next(elements, settings, current, last);
        }), settings.timeout);
    };

})(jQuery);

// **** remove Opacity-Filter in ie ****
function removeFilter(element) {
	if(element.style.removeAttribute){
		element.style.removeAttribute('filter');
	}
}
