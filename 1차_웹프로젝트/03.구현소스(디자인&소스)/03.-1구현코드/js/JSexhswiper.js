// JS3-4.for문연습2 //////

// 로딩구역 //////////
window.addEventListener("DOMContentLoaded", () => {
    console.log("로딩완료!");
    
    // =======================================================
    // [기존 라벨 클릭 로직 - 유지]
    // =======================================================
    const linkLabels = document.querySelectorAll('.check label');
    
    function handleLabelClick() {
        const targetUrl = this.getAttribute('data-url');
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    }

    window.addEventListener('load', () => {
        const currentPath = window.location.pathname.split('/').pop();
        
        linkLabels.forEach(label => {
            label.addEventListener('click', handleLabelClick);
            const labelUrl = label.getAttribute('data-url');
            if (labelUrl && labelUrl === currentPath) {
                const inputId = label.getAttribute('for');
                const input = document.getElementById(inputId);
                if (input) {
                    input.checked = true;
                }
            }
        });
    });
    
    // =======================================================
    // [Swiper Pagination 로직]
    // =======================================================

    // 1. 대상선정 : .wrap
    const mySwiper = document.querySelector(".swiper-wrapper");
    let swiperInstance; // Swiper 인스턴스를 저장할 변수

    const workTitle = [
        "I WOULD OVERCOME DEATH AND GO ON LIVING", "Yayoi Kusama: Portraying the Figurative", 
        "Visionary Colors", "Yayoi Kusama’s Self-Obliteration/Psychedelic World", 
        "EVERY DAY I PRAY FOR LOVE", "A POEM IN MY HEART", 
        "Midway Between Mystery and Symbol: Yayoi Kusama's Monochrome", 
        "THE VISION OF FANTASY THAT WE HAVE NEVER SEEN IS THIS SPLENDOR", 
        "ZERO IS INFINITY　ZERO and Yayoi Kusama", "SPIRITS OF AGGREGATION", 
        "HERE, ANOTHER NIGHT COMES FROM TRILLIONS OF LIGHT YEARS AWAY: Eternal Infinity", 
        "I Want You to Look at My Prospects for the Future: Plants and I", 
        "Here, Now, I have Reached the Grandest Start of My Life", 
        "Creation is a Solitary Pursuit, Love is What Brings You Closer to Art",
    ];

    const workDate = [
        "Oct 17, 2024 - Mar 9, 2025", " Apr 27, 2024 – Sep 1, 2024", 
        "Nov 9, 2023 - Mar 24, 2024", " Apr 29, 2023 - Sep 18, 2023", 
        "Oct7, 2022 - Feb 26, 2023", "Mar 3, 2022 - Aug 28, 2022", 
        "Apr 29, 2021 - Dec 26, 2021", "Jul 30, 2020 - Mar 29, 2021", 
        "Mar 5 - May 31, 2020", "Oct 10, 2019 - Jan 31, 2020", 
        "Apr 4 - Aug 31, 2019", "Oct 4, 2018 - Feb 28, 2019", 
        "Apr 1 -Aug 31, 2018", "Oct 1, 2017 - Feb 25, 2018",
    ];
    
    // 2. html코드 생성하기
    let hCode = "";
    const totalSlides = workTitle.length; 
    
    for (let i = 1; i <= totalSlides; i++) {
        hCode += `
            <div class="exb-box swiper-slide">
                <div class="exbtxt">
                    <h3>${workTitle[i - 1]}</h3>
                    <h4>${workDate[i - 1]}</h4>
                    <img src="./images/exb${i + 1}.jpg" alt="paint">
                </div>
            </div>
            `;
    }

    // 3. html코드 삽입하기
    if (mySwiper) {
        mySwiper.innerHTML = hCode;
        // 1. swiper-wrapper 시작점을 transform: translate3d(0px, 0px, 0px);로 설정
        // Swiper가 초기화될 때 자체적으로 transform을 설정하므로, JS에서는 initialSlide를 0으로 설정합니다.
        // CSS에서 강제하는 것은 Swiper 작동에 방해가 될 수 있습니다.
        // mySwiper.style.transform = "translate3d(0px, 0px, 0px)"; // Swiper 초기화 후 덮어쓰므로 비추천
    } else {
        console.error("Error: .swiper-wrapper 요소를 찾을 수 없습니다.");
        return;
    }

    // 4. Swiper 초기화 및 Custom Pagination 설정
    swiperInstance = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        // 🌟 시작 슬라이드를 0으로 강제하여 시작 위치를 제어 (요청 1번 간접 반영)
        initialSlide: 0, 
        
        pagination: {
            el: ".swiper-pagination",
            // clickable: true를 제거하여 커스텀 클릭 이벤트를 사용할 준비
            type: 'custom', 
            
            // 🌟 요청 2번 반영: renderCustom에서 <span class="line"></span> 포함하여 14개 불렛 생성
            renderCustom: function (swiper, current, total) {
                let paginationHTML = '';
                const activeIndex = swiper.activeIndex; 
                
                for (let i = 0; i < totalSlides; i++) {
                    const isActive = (activeIndex === i) ? 
                        'swiper-pagination-bullet swiper-pagination-bullet-active' : 
                        'swiper-pagination-bullet';
                        
                    paginationHTML += `<span class="${isActive}" data-index-target="${i}">
                                        <span class="line">
                                        <i></i>
                                        </span>
                                       </span>`; // 🌟 <span class="line"></span> 추가됨
                }
                return paginationHTML;
            },
        },
        
        // on 이벤트: 슬라이드 변경 시 Pagination 업데이트만 유지
        on: {
            slideChange: function () {
                this.pagination.render(); 
                this.pagination.update(); 
            },
        }
    });

    // 5. 🌟 핵심: Pagination 컨테이너에 이벤트 위임 (클릭 문제 최종 해결)
    const paginationContainer = document.querySelector(".swiper-pagination");

    if (paginationContainer) {
        paginationContainer.addEventListener('click', function(e) {
            
            // 클릭된 요소가 불렛 또는 불렛의 자식 요소(.line)인 경우, 가장 가까운 .swiper-pagination-bullet을 찾음
            const clickedBullet = e.target.closest('.swiper-pagination-bullet');
            
            if (clickedBullet) {
                e.preventDefault();
                e.stopPropagation(); 

                const targetIndex = parseInt(clickedBullet.getAttribute('data-index-target'), 10);
                
                if (!isNaN(targetIndex) && swiperInstance) {
                    // 해당 인덱스로 슬라이드 이동
                    swiperInstance.slideTo(targetIndex, 500); 
                }
            }
        });
    }

}); ///////// 로드함수 ///////////////////
