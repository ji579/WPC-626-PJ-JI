// 메인 페이지 JS

// 위치값 체크함수 ///
const getPosition = (target) => {
    return target.getBoundingClientRect().top;
}

// 변경 대상 : #spart-menu
const spartMenu = document.querySelector('#spart-menu');
// 스크롤 체크 대상: #main-area
const mainArea = document.querySelector('#main-area');

// 메인영역 위치값
let mainTop = 0;


window.addEventListener('scroll',()=>{
    mainTop = getPosition(mainArea);
    console.log("스크롤중~~!",mainTop);

    // 위치값이 0보다 작아지면 상단메뉴 나옴
    // 그밖에는 숨겨짐...
    if(mainTop <= 0){
        spartMenu.classList.add('on');
    }else{
        spartMenu.classList.remove('on');
    }

}); /////// scroll ////////////