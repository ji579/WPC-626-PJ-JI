
// 페이지 이동하며 글씨색변경
document.addEventListener('DOMContentLoaded', function() {
        // 1. 현재 페이지의 URL 경로를 가져옵니다.
        // 예: http://127.0.0.1:5500/sub2.html 에서 'sub2.html'만 추출
        const currentPath = window.location.pathname.split('/').pop();

        // 2. <section class="line1"> 내의 모든 <a> 태그를 찾습니다.
        const navLinks = document.querySelectorAll('.line1 a');

        navLinks.forEach(link => {
            // 3. 각 <a> 태그의 href 속성에서 파일명만 추출합니다.
            const linkPath = link.getAttribute('href').split('/').pop();

            // 4. 현재 URL 경로와 링크의 경로가 일치하는지 확인합니다.
            // 대소문자 구분 없이 비교하거나, 필요에 따라 엄격하게 비교할 수 있습니다.
            if (linkPath === currentPath) {
                // 5. 일치하면 해당 <a> 태그에 'active' 클래스를 추가합니다.
                link.classList.add('active');
            } else {
                // (선택 사항) 혹시 모를 경우를 대비하여 active 클래스를 제거합니다.
                link.classList.remove('active');
            }
        });
    });

























// // 도깨비 PJ 공통 JS - common.js /////////

// // 배너 슬라이드 함수 불러오기
// // default로 내보냈으므로 아무이름으로 받아도됨!

// // 같은 이름의 변수의 충돌을 막기위해 지역변수화를 해준다!
// // 방법은 (()=>{나의코드})() 익명함수를 바로 실행하는 지역코드로 감싸준다!
// // 나의코드는 지역화가 되고 익명함수는 바로 실행된다!
// // -> (익명함수)() 이렇게 쓰면 익명함수가 바로 실행됨!

// /// 지역화 코드 시작 //////////////
// (() => {
//   // 1. 상단, 하단 공통 모듈 html넣기


//   // 하단영역 #bottom-area
//   const $bottomArea = $("#bottom-area");

//   // 드라마 파트메뉴 #spart-menu
//   const $spartMenu = $("#spart-menu");

//   // (2) 대상에 load() 메서드로 html넣기
//   // load(파일경로, 로딩후실행함수)
//   // (2-1) 상단부 html넣기


//   // (2-2) 하단부 html넣기
//   $bottomArea.load("./inc/footer.html");



//   // (2-4) 드라마 파트메뉴 html넣기
//   $spartMenu.load("./inc/spartmenu.html");
// })();
// /// 지역화 코드 종료 //////////////

// /// 2. 상단파트에서 실행할 함수 /////////////

