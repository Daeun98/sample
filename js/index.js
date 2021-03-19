$(".article1 .slide-group").slick({           
    autoplay: true, // 자동재생
    autoplaySpeed: 3000, // 간격시간
    dots: true, // 동그라미버튼
    pauseOnFocus: false, // 동그라미번호버튼 클릭시 자동실행 멈춤여부
    prevArrow: '<button class="prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="next"><i class="fas fa-angle-right"></i></button>',
    responsive:[{
        breakpoint:1025,
        settings:{
            arrows: false,
        }
    }]    
})




var article2Near = $('.article2').offset().top - wh / 2+100
var article3Near = $('.article3').offset().top - wh / 2+100
var article6Near = $('.article6').offset().top - wh / 2+100

function draw(jumsu, cname){
    var count=0;
    var stop = setInterval(function(){
        count++
        if(count<=jumsu) { 
            $(cname).find('.bar > p').text(count+'%')
            $(cname).find('.bar')
            .css({
                width:count+'%'
            })
        } else {
            clearInterval(stop)
            return false
        }
    },20)
}


$(window).on('scroll', function(){
    var article2Near = $('.article2').offset().top - wh / 2+100
    var article3Near = $('.article3').offset().top - wh / 2+100
    var article6Near = $('.article6').offset().top - wh / 2+100
    var sct = $(this).scrollTop()
    
    // article2
    if (sct >= article2Near) {
        $('.article2').addClass('on')
    } else {
        $('.article2').removeClass('on')
    }

    // article3
    if (sct >= article3Near) {
        $('.article3').addClass('on')
    } else {
        $('.article3').removeClass('on')
    }


    $('.article3 .contant').css({
        width:parseInt(1330+sct) +'px'
    })
    

    // article6
    if ( sct >= article6Near ){
        if (!$('.skill').hasClass('on')) {
            $('.skill').addClass('on')
            draw(85, '.design')
            draw(95, '.frontend')
            draw(90, '.backend')
        }
        // $('#footer').removeClass('on')
    }

    


})


