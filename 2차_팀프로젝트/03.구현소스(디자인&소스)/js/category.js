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