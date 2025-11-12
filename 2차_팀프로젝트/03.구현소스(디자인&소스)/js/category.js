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
$('#main-area').load('./inc/'+pm + '.html');

document.addEventListener('DOMContentLoaded', function() {
    // 배너 스와이퍼 초기화
    const bannerSwiper = new Swiper('.bannerSwiper', {
        // 자동 슬라이드 설정
        autoplay: {
            delay: 4000, // 4초마다 자동 전환
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
            pauseOnMouseEnter: true, // 마우스 올리면 일시정지
        },
        
        // 슬라이드 전환 속도
        speed: 800,
        
        // 무한 루프
        loop: true,
        
        // 전환 효과
        effect: 'fade', // 'slide', 'fade', 'cube', 'coverflow', 'flip' 중 선택
        fadeEffect: {
            crossFade: true
        },
        
        // 페이지네이션 설정
        pagination: {
            el: '.banner-pagination',
            clickable: true, // 클릭 가능
            dynamicBullets: false, // 동적 불릿 비활성화
        },
        
        // 이전/다음 버튼 설정
        navigation: {
            nextEl: '.banner-next',
            prevEl: '.banner-prev',
        },
        
        // 키보드 제어
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        // 접근성 설정
        a11y: {
            prevSlideMessage: '이전 배너',
            nextSlideMessage: '다음 배너',
            paginationBulletMessage: '{{index}}번 배너로 이동',
        },
        
        // 슬라이드 변경 이벤트
        on: {
            slideChange: function () {
                console.log('현재 슬라이드:', this.realIndex + 1);
            },
            
            // 자동재생 시작
            autoplayStart: function() {
                console.log('배너 자동재생 시작');
            },
            
            // 자동재생 중지
            autoplayStop: function() {
                console.log('배너 자동재생 중지');
            }
        }
    });
    
    // ========== 메뉴 카테고리 클릭 이벤트 ========== 
    // shop.html의 메뉴를 클릭하면 products.html로 이동
    $('.submenu li').click(function() {
        const category = $(this).data('category');
        if (category) {
            // products.html 페이지로 이동하면서 카테고리 정보 전달
            window.location.href = `products.html?category=${category}`;
        }
    });
    
    // ========== 제품 페이지 관련 코드 (products.html에서만 실행) ========== 
    // products.html 페이지인지 확인
    if (window.location.pathname.includes('products.html')) {
        
        // URL에서 카테고리 파라미터 읽기
        const urlParams = new URLSearchParams(window.location.search);
        const urlCategory = urlParams.get('category') || 'all';
        
        // 카테고리 필터 버튼 이벤트
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // 활성 버튼 변경
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 카테고리 변경 및 렌더링
                const category = this.dataset.category;
                
                // URL 업데이트 (페이지 새로고침 없이)
                const newUrl = `${window.location.pathname}?category=${category}`;
                window.history.pushState({category: category}, '', newUrl);
                
                // 페이지 상단으로 부드럽게 스크롤
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
        
        // URL 파라미터에 따라 초기 활성 버튼 설정
        const targetButton = document.querySelector(`[data-category="${urlCategory}"]`);
        if (targetButton) {
            filterButtons.forEach(b => b.classList.remove('active'));
            targetButton.classList.add('active');
        }
        
        console.log('현재 카테고리:', urlCategory);
    }
    
    // 선택사항: 자동재생 컨트롤 버튼 추가 (필요시 사용)
    /*
    const playPauseBtn = document.createElement('button');
    playPauseBtn.className = 'banner-play-pause';
    playPauseBtn.innerHTML = '<i class="pause-icon">❚❚</i>';
    document.querySelector('.banner-swiper-container').appendChild(playPauseBtn);
    
    let isPlaying = true;
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            bannerSwiper.autoplay.stop();
            playPauseBtn.innerHTML = '<i class="play-icon">▶</i>';
        } else {
            bannerSwiper.autoplay.start();
            playPauseBtn.innerHTML = '<i class="pause-icon">❚❚</i>';
        }
        isPlaying = !isPlaying;
    });
    */
});