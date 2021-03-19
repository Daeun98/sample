
// 여기서부터 resize 이벤트 발생시 스크롤바 유무에 따른 상태제어 프로그램
var deviceSize = 1200;

function scrollox(status){
    $('html').css({
        overflowY:status
    })
    // var htmlWidth = $('html').width()
    // return htmlWidth
}
var swh = scrollox('hidden')
var sws = scrollox('scroll')
var swd = swh - sws
if (swd>0) {
    deviceSize = deviceSize - swd
}
var ww;
var wh;
var fh;
var bh;
function init(){
    ww = $(window).width()  
    wh = $(window).height()
    // fh = $('#footer').innerHeight()
    // bh = $('body').innerHeight()
    $('html').scrollTop(0)
    if (ww>deviceSize && !$('html').hasClass('pc')) {// &&작은화면에서 큰화면으로 왔을때 처음 한번은 pc가 아니고 mobile이 붙어있음
        $('html').addClass('pc').removeClass('mobile')
        $('.depth1 > li').find('.depth2').css({display:'none'})
        $('.nav').css({opacity:1, right:'230px'})
    } else if (ww<=deviceSize && !$('html').hasClass('mobile')) {
        $('html').addClass('mobile').removeClass('pc')
        $('#header .close').removeClass('on')
        $('#header .nav').css({right:'-4400px', opacity:0})
        $('#header .open').addClass('on')
    }
}

init()

$(window).on('resize', function(){
    init()
})
// 여기까지resize 이벤트 발생시 스크롤바 유무에 따른 상태제어 프로그램



var articlelastNear = $('article:last-child').offset().top - wh / 4

$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    var articlelastNear = $('article:last-child').offset().top - wh / 4
    if (sct >= 50  && !$('#header').hasClass('on')) {
        $('#header').addClass('on')
    } else if (sct<50 && $('#header').hasClass('on')) {
        $('#header').removeClass('on')
    }

    // footer
    if ( sct >= articlelastNear ){
        
        $('#footer').addClass('on')
        var fh = $('#footer').innerHeight()
        $('section').css({marginBottom:fh+'px'})
    } else{
        $('#footer').removeClass('on')
        $('article:last-child').css({marginBottom:0+'px'})
    }
    console.log(sct,articlelastNear)
    
})


$('#header .open').addClass('on')
$('#header .open').on('click', function(){
    $(this).next().css({
        opacity:1
    }).animate({right:0}, 300)
    $(this).removeClass('on')
    $(this).next().next().addClass('on')
    $('#header .nav').prepend('<div class="logo"><a href="#none"><img src="./images/logo-light.png" alt=""></a></div>')
    $('.nav .logo').css({ width:'210px' })
    $('#header .login').addClass('on')
})
$('#header .close').on('click', function(){
    $(this).prev().animate({right:'-440px'}, 300, function(){
        $(this).css({opacity:0})
    })
    $(this).removeClass('on')
    $(this).prev().prev().addClass('on')
    $('.depth1 > li').removeClass('on')
    $('.depth1 > li').find('.depth2').slideUp(100)
    $('.nav .logo').css({ display:'none' })
    $('#header .login').removeClass('on')
})

$('.depth1 > li').on('click', function(e){
    if ($('html').hasClass('mobile')) {
        e.preventDefault()
        // $(this).toggleClass('on').siblings().removeClass('on')
        $(this).find('.depth2').stop().slideToggle(300)
        $(this).siblings().find('.depth2').stop().slideUp(300)
    }
})
$('.depth2 > li').on('click', function(e){
    e.stopPropagation()
})
$('.depth1 > li').hover(
    function(){
        if($('html').hasClass('pc')){
            // $(this).addClass('on')
            $(this).find('.depth2').stop().slideDown(300)

        }
    },
    function(){
        if($('html').hasClass('pc')){
            // $(this).removeClass('on')
            $(this).find('.depth2').stop().slideUp(300)

        }
    }
)