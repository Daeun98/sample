var weblist = ''
$.ajax({
    // p.398
    type : 'GET',
    url : 'webdata.json', //js에서 이미지등 기타 파일경로를 적을때는 html 기준
    timeout:3000,
    beforeSend : function(xhr){
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType('application/json')
        }
    },
    dataType : 'json',
    success : function(data){
        weblist = data
        dataPrint()
    },
    error : function(xhr){
        alert(xhr.status + '/' + xhr.errorText)
    }
})

function dataPrint() {
    var list = '';
    for (var i in weblist) {
        var price = weblist[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') //정규표현식은 그떄마다 찾아쓰기
        list += `<li><div class="imgBox"><img src="${weblist[i].Photo}" onerror="this.src='images/noimage.gif'" alt=""></div>`
        list += `<div class="txtBox"><h3>${weblist[i].Title}</h3>`
        list += `<p>상품코드 : ${weblist[i].Code}</p>`
        list += `<p>카테고리 : ${weblist[i].Category}</p>`
        list += `<p><strong>판매가 : &#8361;${price}원</strong></p>`
        list += `<p>스타일 : ${weblist[i].Style}</p></div><button type="button">삭제</button></li>`
    }
    $('.webbox').prepend(`<ul class="list">${list}</ul>`)
}

$('.webbox').on('click', 'ul.list li button', function(e){
    e.preventDefault()
    var index = $(this).parent().index()
    weblist.splice(index, 1)
    $('ul.list').remove()
    dataPrint()
})

$('.webbox .pushBtn button').on('click', function(e){
    e.preventDefault()
    $('.formBox').css({display:'block'})
})

$('.webbox').on('click', '.formBox button[type=submit]', function(e){
    e.preventDefault()
    if ($('#title').val()==='' || $('#code').val()==='' || $('#price').val()==='') {
        alert('*은 필수사항입니다.')
        return false
        
    }
    var check = /^[0-9]$/
    var price = $('#price').val()
    if (!check.test(price)) {
        alert('판매가 조건형식에 맞지 않습니다..')
        return false
    }
    var last = {
        Title : $('#title').val(),
        Code : $('#code').val(),
        Category : $('#category').val(),
        Price : $('#price').val(),
        Style : $('#style').val(),
        Photo : $('#imgsrc').val()
    }
    weblist.push(last)
    $('#title').val('')
    $('#code').val('')
    $('#category').val('')
    $('#price').val('')
    $('#style').val('')
    $('#imgsrc').val('')
    $('ul.list').remove('')
    dataPrint()
})

$('.webbox').on('click', '.formBox button[type=reset]', function(){
    $('.formBox').css({display:'none'})
})

