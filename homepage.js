$(document).ready(function(){
	
var $helpBanner = $('.banner-content');
var $tripFare = $('.banner-tripFare-content');
$('.errorToolTip').css('display','none');
$('.banner-help-arrow').css('display','none');
$('.banner-tripFare-arrow').css('display','none');

$('.banner-content-close').click(function(){
$('.banner-help-arrow').css('display','none');
$helpBanner.animate({left:'-368px'},500);
});

$('.help').click(function(){
$('.banner-help-arrow').css('display','block');
$helpBanner.animate({left:'0px'},500);
return false;
});



$('.banner-tripFare-close').click(function(){
$('.banner-tripFare-arrow').css('display','none');
$tripFare.animate({top:'-146px'},500);
});

$('#tripFare').click(function(){
$('.banner-tripFare-arrow').css('display','block');
$tripFare.animate({top:'-2px'},500);
return false;
});


//Check Error Message
$('#findFlights').click(function(){
$('.errorToolTip').css('display','none');
$('input.textField').removeClass('errorField');
if($('.from input.textField').val() == ""){
	$('.from input').addClass('errorField');
	$('.from .errorToolTip').css('display','block');
}else if($('.To input.textField').val() == ""){
	$('.To input').addClass('errorField');
	$('.To .errorToolTip').css('display','block');
}
return false;

});

$('.from input.textField').blur(function() {
if($('.from input.textField').val() == ""){
	$('.from input').addClass('errorField');
	$('.from .errorToolTip').css('display','block');
}
});

//SCROLL BAR
 $(window).load(function(){
            $(".banner-help-content").mCustomScrollbar();
            $(".messageContainer ul").mCustomScrollbar();
            
            $('.carousel-scrollbar').mCustomScrollbar();
            	$('ul.leftPromo').Emiratesbanner({
						speed: 1000,
						timeout: 5000,
						type: 'sequence',
						containerheight: '187px'
					});
        });





	
})