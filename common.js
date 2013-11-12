//comment added again
var loaded = -486;
 function animateBar(){
     setTimeout(function() { 
        $('span.loadingBar').css('background-position',loaded+'px 0px');
        if(loaded<=0){
            loaded = loaded + 40;
            animateBar();
        }else{
        console.log('finished!')
        $('span.loadingBar').css('background-position','-80px 0px');
        }
     },200);
 }

 animateBar();