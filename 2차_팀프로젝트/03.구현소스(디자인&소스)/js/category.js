// ========== 배너 Swiper 초기화 ========== 
// Swiper CDN을 먼저 HTML head에 추가해야 합니다
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
// <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

// [2] 파라미터 키값 읽기 /////////
let pm = location.search.split("=")[1];
console.log('파라미터:', pm);

// [3] 메인 영역에 해당 파라미터의 이름으로 된 인클루드 페이지를
// 제이쿼리 load() 메서드로 넣어준다.
// 대상: #main-area
$('#main-area').load('./inc/'+pm + '.html', function(response, status, xhr) {
    console.log('Load 상태:', status);
    
    if (status === "success") {
        console.log('shop.html 로드 성공!');
        
        // shop.html이 로드된 후 실행
        if (pm === 'shop') {
            console.log('=== shop 페이지 감지 ===');
            
            // 약간의 지연을 주고 이벤트 초기화
            setTimeout(function() {
                initShopMenuEvents();
            }, 300);
        }
    } else if (status === "error") {
        console.error('Load 실패:', xhr.status, xhr.statusText);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 배너 스와이퍼 초기화
    const bannerSwiper = new Swiper('.bannerSwiper', {
        // 자동 슬라이드 설정
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
        speed: 800,
        loop: true,
        
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        pagination: {
            el: '.banner-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        
        navigation: {
            nextEl: '.banner-next',
            prevEl: '.banner-prev',
        },
        
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        a11y: {
            prevSlideMessage: '이전 배너',
            nextSlideMessage: '다음 배너',
            paginationBulletMessage: '{{index}}번 배너로 이동',
        },
        
        on: {
            slideChange: function () {
                console.log('현재 슬라이드:', this.realIndex + 1);
            },
            autoplayStart: function() {
                console.log('배너 자동재생 시작');
            },
            autoplayStop: function() {
                console.log('배너 자동재생 중지');
            }
        }
    });
});

// ========== shop.html 메뉴 이벤트 초기화 함수 ========== 
function initShopMenuEvents() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔧 shop 메뉴 이벤트 초기화 시작');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // 1. submenu 요소 확인
    const submenu = document.querySelector('.submenu');
    console.log('1️⃣ .submenu 요소 찾기:', submenu ? '✅ 찾음' : '❌ 없음');
    
    if (!submenu) {
        console.error('❌ .submenu 요소를 찾을 수 없습니다!');
        console.log('💡 shop.html의 HTML 구조를 확인하세요.');
        return;
    }
    
    // 2. li[data-category] 요소들 찾기
    const menuItems = document.querySelectorAll('.submenu li[data-category]');
    console.log('2️⃣ 메뉴 아이템 개수:', menuItems.length);
    
    if (menuItems.length === 0) {
        console.error('❌ data-category 속성을 가진 li 요소를 찾을 수 없습니다!');
        console.log('💡 shop.html의 li 태그에 data-category 속성이 있는지 확인하세요.');
        
        // 모든 li 요소 출력 (디버깅용)
        const allLi = document.querySelectorAll('.submenu li');
        console.log('📋 전체 li 개수:', allLi.length);
        allLi.forEach((li, idx) => {
            console.log(`   Li ${idx}:`, li.outerHTML.substring(0, 100) + '...');
        });
        return;
    }
    
    // 3. 각 메뉴 아이템에 이벤트 연결
    console.log('3️⃣ 이벤트 리스너 연결 중...');
    
    menuItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        console.log(`   ✓ 메뉴 ${index + 1}: category="${category}"`);
        
        // 클릭 이벤트 추가
        item.addEventListener('click', function(e) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🖱️ 메뉴 클릭 감지!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            e.preventDefault();
            e.stopPropagation();
            
            const clickedCategory = this.getAttribute('data-category');
            console.log('클릭된 카테고리:', clickedCategory);
            
            // products.html로 이동
            let targetUrl = '';
            if (clickedCategory === 'all') {
                targetUrl = 'products.html';
            } else {
                targetUrl = `products.html?category=${clickedCategory}`;
            }
            
            console.log('🚀 이동할 URL:', targetUrl);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            window.location.href = targetUrl;
        });
        
        // 마우스오버 이벤트 추가 (테스트용)
        item.addEventListener('mouseenter', function() {
            console.log('👆 마우스 오버:', this.getAttribute('data-category'));
        });
        
        // 호버 효과를 위해 커서 스타일 추가
        item.style.cursor = 'pointer';
    });
    
    console.log('✅ 이벤트 연결 완료!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // 4. MD 키워드 메뉴 (선택사항)
    const mdItems = document.querySelectorAll('.md li');
    
    if (mdItems.length > 0) {
        console.log('4️⃣ MD 메뉴 아이템 개수:', mdItems.length);
        
        mdItems.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                let keyword = '';
                
                switch(index) {
                    case 0: keyword = 'mdpick'; break;
                    case 1: keyword = 'gift'; break;
                    case 2: keyword = 'black'; break;
                    case 3: keyword = 'deskterior'; break;
                }
                
                if (keyword) {
                    console.log('MD 키워드 클릭:', keyword);
                    window.location.href = `products.html?keyword=${keyword}`;
                }
            });
            
            item.style.cursor = 'pointer';
        });
    }
}

// ========== 제품 페이지 관련 코드 (products.html에서만 실행) ========== 
if (window.location.pathname.includes('products.html')) {
    
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCategory = urlParams.get('category') || 'all';
        
        console.log('현재 카테고리:', urlCategory);
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const category = this.dataset.category;
                    const newUrl = `${window.location.pathname}?category=${category}`;
                    window.history.pushState({category: category}, '', newUrl);
                    
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            });
            
            const targetButton = document.querySelector(`[data-category="${urlCategory}"]`);
            if (targetButton) {
                filterButtons.forEach(b => b.classList.remove('active'));
                targetButton.classList.add('active');
            }
        }
    });
}