// 상단 페이지 이동하며 글씨색변경
document.addEventListener('DOMContentLoaded', function() {

  /************************************************ 
    2. 햄버거 버튼 클릭시 상단영역에 클래스넣기
************************************************/
  // (1) 이벤트 대상 : .menubtn-ham
  const btnHam = document.querySelector('.menubtn-ham');
  // (2) 변경 대상 : #spart-menu2 (메뉴박스의 부모)
  const spartMenu2 = document.getElementById('spart-menu2');

  // (3) 이벤트 대상 클릭시 변경대상에 클래스 토글로 menu-open 넣기
  if (btnHam && spartMenu2) {
    btnHam.addEventListener('click', function() {
      spartMenu2.classList.toggle('menu-open'); // 'on' 대신 'menu-open' 사용
      
    // // 메뉴가 열릴 때 body 스크롤 막기
      if (spartMenu2.classList.contains('menu-open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      // 햄버거 아이콘 토글 (CSS가 작동 안할 경우 대비)
      const hamburgerIcon = this.querySelector('i:nth-child(1)');
      const closeIcon = this.querySelector('i:nth-child(2)');
      
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.style.display = spartMenu2.classList.contains('menu-open') ? 'none' : 'block';
        closeIcon.style.display = spartMenu2.classList.contains('menu-open') ? 'block' : 'none';
      }
      
      console.log('🍔 햄버거 메뉴 토글! menu-open 상태:', spartMenu2.classList.contains('menu-open'));
      console.log('📍 spartMenu2 클래스:', spartMenu2.className);
    });
  } else {
    console.warn('⚠️ 햄버거 버튼 또는 메뉴를 찾을 수 없습니다!');
    console.log('btnHam:', btnHam);
    console.log('spartMenu2:', spartMenu2);
  }




    const EXCLUDE_TEXT = "草間彌生"; 
    // 1. 현재 페이지의 URL 정보 가져오기
    let currentPath = window.location.pathname.split('/').pop();
    const currentHash = window.location.hash;
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
            item.closest('li').classList.remove('on'); }
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
        const isPastExhLabel = (item.tagName === 'LABEL'  );
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

    // Contact 등 해시(#) 링크 클릭 시 글씨 변경되도록 처리
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function() {
            // 모든 a에서 active 제거
            document.querySelectorAll('.line1 a, .spart-menu a').forEach(a => a.classList.remove('active'));

            // 클릭한 a에 active 부여
            this.classList.add('active');
        });
    });
    // ************************************************************
    // ⭐️⭐️ [추가된 로직 시작] Contact 영역을 벗어나면 active 제거 ⭐️⭐️
    // ************************************************************
    const contactLink = document.querySelector('a[href="#contact-area"]');
    // Contact 영역의 ID가 'contact-area'라고 가정합니다.
    const contactSection = document.getElementById('contact-area'); 

    if (contactLink && contactSection) {
        // 1. Intersection Observer 설정
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // entry.isIntersecting: 타겟 요소가 뷰포트 내에 보이는지 여부
                
                if (entry.isIntersecting) {
                    // Contact 영역이 뷰포트에 진입 (활성화 로직 - 페이지 로드 시 해시가 있는 경우)
                    // 현재 해시가 Contact이고, active가 없다면 추가
                    if (window.location.hash === '#contact-area' && !contactLink.classList.contains('active')) {
                        contactLink.classList.add('active');
                        contactLink.closest('li')?.classList.add('on');
                    }
                } else {
                    // Contact 영역이 뷰포트 밖으로 나갔을 때
                    
                    // 현재 해시가 #contact-area가 아닌 경우 (다른 곳 클릭)
                    // 또는 스크롤을 Contact 영역 위로 올렸을 경우 (entry.boundingClientRect.top > 0)
                    if (window.location.hash !== '#contact-area' || entry.boundingClientRect.top > 0) {
                        if (contactLink.classList.contains('active')) {
                            contactLink.classList.remove('active');
                            contactLink.closest('li')?.classList.remove('on');
                        }
                    }
                }
            });
        }, {
            // threshold: 0을 사용하여 요소가 뷰포트에서 완전히 사라지거나 나타날 때를 감지
            threshold: 0
        });

        // 2. Observer 시작
        observer.observe(contactSection);
    }
    // ************************************************************
    

    // ////////////////////////////////////////////////
    // ⭐️ 모바일용 메뉴 열기/닫기 (디버깅 버전) ⭐️
    // ////////////////////////////////////////////////

    console.log('🔍 모바일 메뉴 스크립트 시작');

    // 모든 chevron 아이콘 선택
    const chevronIcons = document.querySelectorAll('.fa-chevron-down');
    console.log('📍 찾은 chevron 아이콘 개수:', chevronIcons.length);

    if (chevronIcons.length === 0) {
        console.warn('⚠️ chevron 아이콘을 찾을 수 없습니다! HTML 구조를 확인하세요.');
    }

    // ////////////////////////////////////////////////
    // 4번째 li 높이 자동 조정 함수
    // ////////////////////////////////////////////////
    function adjustFourthLiHeight() {
        const fourthLi = document.querySelector('.gnb-list > li:nth-child(4)');
        
        if (!fourthLi) return;
        
        // 모든 active 상태인 sub-list의 높이 계산
        const activeSubLists = fourthLi.querySelectorAll('.sub-list.active');
        let totalSubListHeight = 0;
        
        activeSubLists.forEach(subList => {
            totalSubListHeight += subList.scrollHeight;
        });
        
        // 기본 패딩 값 (CSS의 padding 값과 동일하게)
        const basePadding = 'calc(2.5vh * 2 + 3.2rem)';
        
        if (totalSubListHeight > 0) {
            // sub-list가 열려있으면 높이를 추가
            fourthLi.style.paddingBottom = `calc(${basePadding} + ${totalSubListHeight}px)`;
        } else {
            // 모든 sub-list가 닫혀있으면 기본 패딩으로
            fourthLi.style.paddingBottom = basePadding;
        }
        
        console.log('📏 4번째 li 높이 조정됨:', fourthLi.style.paddingBottom);
    }

    // ////////////////////////////////////////////////
    // ⭐️ 모바일 메뉴를 배타적으로 토글하는 함수 ⭐️
    // ////////////////////////////////////////////////
    function toggleMobileMenu(targetDiv) {
        const allDivs = document.querySelectorAll('.gnb-list > li > div');
        const targetSubList = targetDiv.querySelector('.sub-list');
        const targetIcon = targetDiv.querySelector('.fa-chevron-down');
        
        // 모든 메뉴를 순회하면서
        allDivs.forEach(div => {
            const subList = div.querySelector('.sub-list');
            const icon = div.querySelector('.fa-chevron-down');
            
            // 현재 클릭한 메뉴가 아닌 다른 메뉴들은 모두 닫기
            if (div !== targetDiv && subList) {
                subList.classList.remove('active');
                if (icon) icon.classList.remove('active');
            }
        });
        
        // 클릭한 메뉴는 토글
        if (targetSubList) {
            targetSubList.classList.toggle('active');
            if (targetIcon) targetIcon.classList.toggle('active');
            
            // 4번째 li 높이 조정
            adjustFourthLiHeight();
            
            console.log('✅ 메뉴 토글 완료! active 상태:', targetSubList.classList.contains('active'));
        }
    }

    // chevron 아이콘 클릭 이벤트
    chevronIcons.forEach((icon, index) => {
        console.log(`📌 아이콘 ${index + 1} 이벤트 리스너 등록 중...`);
        
        icon.addEventListener('click', function(e) {
            console.log('🖱️ 아이콘 클릭됨!', index + 1);
            e.preventDefault();
            e.stopPropagation();
            
            const parentDiv = this.parentElement;
            toggleMobileMenu(parentDiv);
        });
    });

    // 메뉴 텍스트 클릭 시에도 토글되도록
    const visitMenu = document.querySelector('.visitmenu');
    const exhibitionMenu = document.querySelector('.exhibitionmenu');

    console.log('📍 visitMenu:', visitMenu);
    console.log('📍 exhibitionMenu:', exhibitionMenu);

    // Visit 메뉴 클릭 이벤트
    if (visitMenu) {
        visitMenu.addEventListener('click', function(e) {
            console.log('🖱️ Visit 메뉴 클릭됨!');
            e.preventDefault();
              e.stopPropagation(); 
            const parentDiv = this.parentElement;
            toggleMobileMenu(parentDiv);
        });
    }

    // Exhibition 메뉴 클릭 이벤트
    if (exhibitionMenu) {
        exhibitionMenu.addEventListener('click', function(e) {
            console.log('🖱️ Exhibition 메뉴 클릭됨!');
            e.preventDefault();
              e.stopPropagation(); 
            const parentDiv = this.parentElement;
            toggleMobileMenu(parentDiv);
        });
    }

    console.log('✅ 모바일 메뉴 스크립트 초기화 완료');

    // ////////////////////////////////////////////////
    // 모바일 메뉴 코드 끝
    // ////////////////////////////////////////////////

}); // DOMContentLoaded 종료