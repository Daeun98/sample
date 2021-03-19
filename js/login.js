$('.loginbox form').on('submit', function(){
    // 아이디유효성체크 : 3-5글자 범위, 특수문자 제외
    var idbox = $('#idbox').val()
    if (idbox.length>=3 && idbox.length<6) {
        for (var i=0; i<idbox.length; i++) {
            // p.128
            var ch = idbox.charAt(i)
            if (!(ch>='0' && ch<='9') && !(ch>='A' && ch<='Z') && !(ch>='a' && ch<='z')) {
                alert('특수문자는 포함하지 않음')
                $('#idbox').css({
                    border:'1px solid #f00'
                }).focus().select()
                return false
            } 
        }
    } else {
        alert('아이디는 3-5글자 범위입니다.')
        $('#idbox').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    }

    // 비밀번호 유효성체크 : 첫글자는 영문자만 허용하며, 숫자와 특수문자는 각각1개 이상 포함
    // ^ : 첫문자일치, $ : 끝문자일치
    // ?= : 조건확인후 처음으로 돌아감
    // . : 임의의 모든문자(숫자, 문자, 특수문자 포함한 모든 문자)
    // * : 앞의 글자가 0번 이상 나올 수 있음
    var check = /^(?=[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).*$/
    var pwbox = $('#pwbox').val()
    if (!check.test(pwbox)) {
        alert('비밀번호 조건에 맞지 않습니다.')
        $('#pwbox').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    }



    return false // 테스트완료후에는 삭제할것
})

$('#pwbox').on('focus', function(){
    $(this).after('<span>첫글자는 영문자만 허용하며, 숫자와 특수문자는 각각1개 이상 포함</span>')
    $(this).next().css({
        color:'#f00', fontSize:'12px'
    })
})
$('#pwbox').on('blur', function(){
    $(this).next().remove()
})


var articlelastNear = $('article:last-child').offset().top - wh / 4

$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    
    // footer
    if ( sct >= Math.round($('body').innerHeight()-$(window).height()) ){
        
        $('#footer').addClass('on')
        var fh = $('#footer').innerHeight()
        $('#section').css({marginBottom:fh+'px', background:'transparent !important'})
    } else{
        $('#footer').removeClass('on')
        $('article:last-child').css({marginBottom:0+'px'})
    }
    console.log(sct,articlelastNear)
    
})