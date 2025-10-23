// 상단 페이지 이동하며 글씨색변경
document.addEventListener('DOMContentLoaded', function() {

  /************************************************ 
    2. 햄버거 버튼 클릭시 상단영역에 클래스넣기
************************************************/
  // (1) 이벤트 대상 : .btn-ham
//   const $btnHam = $(".menubtn-ham");
//   // (2) 변경 대상 : #top-area
//   const $topArea = $("#spart-menu2");

//   // (3) 이벤트 대상 클릭시
//   // 변경대상에 클래스 토글로 on넣기
//   $btnHam.on("click", () => {
//     $topArea.toggleClass("on");
//   }); /// click ///




    const EXCLUDE_TEXT = "草間彌生"; 

    // 1. 현재 페이지의 URL 정보 가져오기
    let currentPath = window.location.pathname.split('/').pop();
    const currentHash = window.location.hash;

    // 루트 경로 (파일명이 없는 경우) 처리: 'index.html'로 통일
    // if (currentPath === '' || currentPath === 'index.html') {
    //     currentPath = 'index.html';
    // }

    // 2. 모든 활성화 대상 요소를 찾습니다.
    const navLinks = document.querySelectorAll('.line1 a, .spart-menu a, .line2 label, .change a'); 

    // **********************************************
    // ⭐️ 메뉴 그룹 경로 정의 ⭐️
    const WORKS_PAGES = ['sub2.html', 'sub2-1.html'];
    const MUSEUM_PAGES = [
        'sub3-1-1visitinfo.html', 'sub3-1-2Facilities.html', 'sub3-1-3about.html',
        'sub3-2-1exh.html', 'sub3-2-2-1exh.html', 'sub3-2-2-2exh.html',
    ];
    // Exhibition (line1) 활성화 페이지
    const EXHIBITION_PAGES = [
        'sub3-2-1exh.html', 'sub3-2-2-1exh.html', 'sub3-2-2-2exh.html'
    ];
    // Past Exhibition (line2) 라벨 활성화 페이지
    const PAST_EXHIBITION_PAGES = [
        'sub3-2-2-1exh.html', 
        'sub3-2-2-2exh.html'
    ];
    // **********************************************

    navLinks.forEach(item => {
        let linkHref = null;
        let linkPath = null;
        let linkText = item.textContent.trim();
        let targetElement = item; // active 클래스를 추가할 최종 요소

        // 1. 요소 타입에 따른 href/data-url 및 대상 설정
        if (item.tagName === 'A') {
            linkHref = item.getAttribute('href');
            linkPath = linkHref ? linkHref.split('/').pop().split('#')[0] : null;

            // 🚨 제외 대상 링크 처리
            if (linkText === EXCLUDE_TEXT) {
                item.closest('li')?.classList.remove('on'); 
                item.classList.remove('active');
                return; 
            }
        } else if (item.tagName === 'LABEL') {
            // LABEL 태그는 data-url 속성을 사용
            linkHref = item.getAttribute('data-url');
            linkPath = linkHref ? linkHref.split('/').pop().split('#')[0] : null;
            // LABEL의 경우, targetElement에 active 클래스를 부여합니다.
        } else {
            return; // 그 외의 태그는 무시
        }

        // 2. 초기화 (혹시 모를 경우를 대비)
        targetElement.classList.remove('active');
        if (item.closest('li')) {
            item.closest('li').classList.remove('on');
        }
        
        if (!linkHref) return;
        
        // ----------------------------------------------------
        // ⭐️ 그룹 메뉴 활성화 로직 ⭐️
        // ----------------------------------------------------

        // A. Works 그룹 처리 (변경 없음)
        const isWorksMenuLink = (linkPath === 'sub2.html' && linkText.toLowerCase() === 'works');
        const isCurrentPageInWorksGroup = WORKS_PAGES.includes(currentPath);

        if (isWorksMenuLink && isCurrentPageInWorksGroup) {
            if (item.tagName === 'A' && item.closest('.spart-menu')) {
                item.classList.add('active');
                item.closest('li')?.classList.add('on');
            }
        } 
        
        // B. Museum 그룹 처리 (변경 없음)
        const isMuseumMenuLink = (linkPath === 'sub3-1-1visitinfo.html' && linkText.toLowerCase() === 'museum');
        const isCurrentPageInMuseumGroup = MUSEUM_PAGES.includes(currentPath);

        if (isMuseumMenuLink && isCurrentPageInMuseumGroup) {
            item.classList.add('active');
            item.closest('li')?.classList.add('on');
        }
        
        // C. Visit 그룹 처리 (중위 line1) (변경 없음)
        const isVisitMenuLink = (linkPath === 'sub3-1-1visitinfo.html' && linkText.toLowerCase() === 'visit');

        if (isVisitMenuLink && (currentPath.startsWith('sub3-1-') && !currentPath.includes('exh'))) { 
            item.classList.add('active');
        }
        
        // D. Exhibition 그룹 처리 (line1 - Exhibition) 
        // sub3-2-x 페이지 전체에서 line1 Exhibition 활성화
        const isExhibitionMenuLink = (linkPath === 'sub3-2-1exh.html' && linkText.toLowerCase() === 'exhibition');
        const isCurrentPageInExhibitionGroup = EXHIBITION_PAGES.includes(currentPath);

        if (isExhibitionMenuLink && isCurrentPageInExhibitionGroup) {
            item.classList.add('active');
        }
        
        // ----------------------------------------------------
         // ⭐️ E. Past Exhibition 그룹 처리 (line2 - Past Exhibition 라벨) ⭐️
        // sub3-2-2-1exh.html, sub3-2-2-2exh.html 페이지에서 라벨 활성화
        // ----------------------------------------------------
        const isPastExhLabel = (item.tagName === 'LABEL');
        const isCurrentPageInPastExhGroup = PAST_EXHIBITION_PAGES.includes(currentPath);

        if (isPastExhLabel && isCurrentPageInPastExhGroup) {
            item.classList.add('active');
        }

        // ----------------------------------------------------
        // ⭐️ 개별 메뉴 및 뷰 모드 활성화 로직 (파일명 일치) ⭐️
        // ----------------------------------------------------
        
        // F. 현재 페이지 파일명과 링크/데이터 URL 파일명이 정확히 일치하는 경우 활성화
        // (Current Exhibition 라벨이나 일반 Works 메뉴 등이 여기서 처리됩니다)
        if (linkPath === currentPath) {
            targetElement.classList.add('active');
            
            // ⭐️ .change 뷰 모드 버튼 처리 ⭐️
            if (item.closest('.change')) {
                item.closest('li')?.classList.add('active');
            }
            
            // 상위 메뉴라면 <li>에도 'on' 클래스 추가
            else if (item.closest('.spart-menu') && item.tagName === 'A') {
                 item.closest('li')?.classList.add('on');
            }
        }
        
        // G. 해시(#) 링크 처리 (Contact)
        else if (linkPath === currentPath && linkHref.endsWith(currentHash) && currentHash !== '') {
            targetElement.classList.add('active');
            item.closest('li')?.classList.add('on');
        }

        // H. 해시만 있는 링크 처리
        else if (linkHref.startsWith('#') && linkHref === currentHash) {
            targetElement.classList.add('active');
            item.closest('li')?.classList.add('on');
        }
    });
});
        // Contact 등 해시(#) 링크 클릭 시 글씨 변경되도록 처리
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function() {
            // 모든 a에서 active 제거
            document.querySelectorAll('.line1 a, .spart-menu a').forEach(a => a.classList.remove('active'));

            // 클릭한 a에 active 부여
            this.classList.add('active');
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

