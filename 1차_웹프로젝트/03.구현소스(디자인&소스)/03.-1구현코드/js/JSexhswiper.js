// JS3-4.for문연습2 //////

// 모달 Swiper 인스턴스를 저장할 전역 변수 (DOMContentLoaded 내부에서 접근 가능하도록 let으로 선언)
let modalSwiperInstance; 
let mainSwiperInstance; // 기존 swiperInstance를 여기에 저장

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

    // 1. 대상선정 : .swiper-wrapper
    const mySwiper = document.querySelector(".swiper-wrapper");
    // let swiperInstance; // 주석 처리: 전역 변수 mainSwiperInstance 사용

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
          <div class="section">
      <button class="modal-btn" onclick="openModal()"></button>
    </div>
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
    } else {
        console.error("Error: .swiper-wrapper 요소를 찾을 수 없습니다.");
        return;
    }

    // 4. 기존 Swiper 초기화 및 Custom Pagination 설정 (외부 Swiper)
    mainSwiperInstance = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        initialSlide: 0, 
        
        pagination: {
            el: ".swiper-pagination",
            type: 'custom', 
            
            renderCustom: function (swiper, current, total) {
                let paginationHTML = '';
                // 주의: swiper.activeIndex는 현재 활성 슬라이드를 가리킵니다.
                const activeIndex = swiper.realIndex; 
                
                for (let i = 0; i < totalSlides; i++) {
                    const isActive = (activeIndex === i) ? 
                        'swiper-pagination-bullet swiper-pagination-bullet-active' : 
                        'swiper-pagination-bullet';
                        
                    paginationHTML += `<span class="${isActive}" data-index-target="${i}">
                                        <span class="line">
                                        <i></i>
                                        </span>
                                        </span>`;
                }
                return paginationHTML;
            },
        },
        
        on: {
            slideChange: function () {
                this.pagination.render(); 
                this.pagination.update(); 
            },
        }
    });

    // 5. Pagination 컨테이너에 이벤트 위임 (클릭 문제 최종 해결)
    const paginationContainer = document.querySelector(".swiper-pagination");

    if (paginationContainer) {
        paginationContainer.addEventListener('click', function(e) {
            
            const clickedBullet = e.target.closest('.swiper-pagination-bullet');
            
            if (clickedBullet) {
                e.preventDefault();
                e.stopPropagation(); 

                const targetIndex = parseInt(clickedBullet.getAttribute('data-index-target'), 10);
                
                // mainSwiperInstance를 사용하여 슬라이드 이동
                if (!isNaN(targetIndex) && mainSwiperInstance) { 
                    mainSwiperInstance.slideTo(targetIndex, 500); 
                }
            }
        });
    }

}); ///////// 로드함수 ///////////////////

// HTML 구조 변경을 반영하여 모달 내부 Swiper 클래스명을 '.modalSwiper'로 변경해야 함!

/******************************************************************
 * 모달 스크립트 (type="module" 영역)
 * 주의: 이 영역은 DOMContentLoaded 밖에서 실행되며,
 * DOMContentLoaded에서 선언된 mainSwiperInstance와 modalSwiperInstance 변수를
 * 직접 공유하지 못합니다. 단, 전역 변수로 선언하여 공유합니다.
 ******************************************************************/

// ---------------------- 요소 및 상태 변수 ----------------------
const modal = document.getElementById("modal");
// modal-content의 mySwiper 클래스를 modalSwiper로 HTML에서 변경하는 것을 전제로 함
const modalContent = document.querySelector(".modal-content.modalSwiper"); 
const modalBox = document.querySelector(".modal-box");
const modalBoxDiv = document.querySelectorAll(".modal-box > .swiper-slide"); // .swiper-slide로 변경
const boxes = document.querySelectorAll(".modal-box .scroll-act");
const upButton = document.getElementById("upBtn"); // ⭐️ upBtn으로 변경

let currentBoxIndex = 0;
const scrollDelay = 800;
////////////////////////////////////////////////////////

// 모달 스와이퍼 초기화 함수 - 모달이 열릴 때 호출
function initializeModalSwiper() {
    if (modalSwiperInstance) return; // 이미 초기화되어 있으면 실행하지 않음

    // .modal-content 내부에 있는 .modalSwiper 클래스를 사용하도록 가정
    modalSwiperInstance = new Swiper(".modal-content.modalSwiper", { 
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".modal-pagination", // 모달 전용 페이지네이션 클래스 사용 권장
            clickable: true,
        },
        on: {
            slideChange: function () {
                console.log("Modal slide changed", modalSwiperInstance.realIndex);

                // 2. 모든 박스에서 'on' 클래스 제거 후, 현재 박스에만 'on' 클래스 추가
                boxes.forEach((box) => {
                    box.classList.remove("on");
                });
                // swiper.realIndex 대신 modalSwiperInstance.realIndex 사용
                if (boxes[modalSwiperInstance.realIndex]) {
                    boxes[modalSwiperInstance.realIndex].classList.add("on");
                }

                // ⭐️ 2. .ubtn 표시/숨김 로직 추가
                const lastIndex = modalSwiperInstance.slides.length - 1;
                if (modalSwiperInstance.realIndex === lastIndex) {
                    upButton.style.display = "block"; // 마지막 슬라이드면 보이게
                } else {
                    upButton.style.display = "none"; // 아니면 숨기게
                }
            },
        }
    });

    // ---------------------- 핵심 스크롤 로직 ----------------------
    // Swiper를 사용하므로 휠 이벤트를 Swiper 슬라이드에 직접 걸어주는 것은 충돌을 유발할 수 있습니다.
    // 기존 wheel 로직을 유지하면서 Swiper와 연동하려면, modalBoxDiv에 걸린 wheel 이벤트는
    // '스크롤 끝 감지' 로직이 정확해야 합니다.
    
    modalBoxDiv.forEach((el) => {
        el.addEventListener(
            "wheel",
            function (e) {
                // 광휠막기 //////
                if (blockWheel()) return;
                const d = e.deltaY;
                if (d > 0) {
                    // 아래로 스크롤 중
                    // 스크롤이 끝에 도달했는지 확인
                    if (isAtBottom(el) && modalSwiperInstance.realIndex < modalSwiperInstance.slides.length - 1) { 
                        e.preventDefault(); // 내부 기본 스크롤 멈춤
                        // 이동시간후 개별스크롤위치 맨위로 이동 (애니메이션이 끝난 후)
                        setTimeout(() => {
                            el.scrollTop = 0;
                        }, 300);
                        modalSwiperInstance.slideNext(300); // 모달 스와이퍼 이동
                    } // else: 내부가 스크롤을 소비함
                } else if (d < 0) {
                    // 위로 스크롤 중
                    // 스크롤이 맨 위에 도달했는지 확인
                    if (isAtTop(el) && modalSwiperInstance.realIndex > 0) {
                        e.preventDefault();
                        // 이동시간후 개별스크롤위치 맨위로 이동
                        setTimeout(() => {
                            el.scrollTop = 0;
                        }, 300);
                        modalSwiperInstance.slidePrev(300); // 모달 스와이퍼 이동
                    }
                }
            },
            { passive: false }
        );
    });
} // initializeModalSwiper() 끝

// ---------------------- 헬퍼 함수 ----------------------

function isAtBottom(el) {
    // 1px 오차 허용
    return Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1; 
}
function isAtTop(el) {
    return el.scrollTop <= 0;
}

/******************************** ////////// 광휠금지함수 //////////
********************************/
// [1] 광휠금지상태변수 ///////////
let stopWheel = false;
// 값이 true일때 휠릭허용/ false면 불허용

// [2] 광휠금지해제시간 상수셋팅 //////
const TIME_GAP = 600;

// [3] 광휠금지함수 //////////////////
function blockWheel() {
    // 1. 광휠이면 true 를 리턴함!
    if (stopWheel) return true;

    // 2. 휠가능상태이면 전역변수 셋팅
    stopWheel = true;
    setTimeout(() => {
        stopWheel = false;
    }, TIME_GAP);

    // 3. 상태값 리턴 (휠가능상태 false)
    return false;
} ////// blockWheel 함수 ///////


// ---------------------- 모달 제어 함수 ----------------------

function openModal() {
    // 모달 Swiper가 초기화되어 있지 않으면 초기화
    initializeModalSwiper(); 

    document.getElementById("modal").style.display = "block";

    // 2. <body> 스크롤 막기
    document.body.classList.add("modal-open");

    upButton.style.display = "none";

    // 스와이퍼 방식으로 첫 번째 슬라이드로 이동
    if (modalSwiperInstance) {
        modalSwiperInstance.slideTo(0);
        // 첫 번째 슬라이드에 'on' 클래스 수동 적용 (slideChange 이벤트에서 처리될 수도 있으나 명시적으로)
        boxes.forEach((box) => box.classList.remove("on"));
        if (boxes.length > 0) {
            boxes[0].classList.add("on");
        }
    }
}

function closeModal() {
    document.getElementById("modal").style.display = "none";

    // 2. <body> 스크롤 복원
    document.body.classList.remove("modal-open");

    // 3. 휠 이벤트 리스너 제거 (필요없음: 이벤트 위임 방식)

    // 4. 상태 초기화
    currentBoxIndex = 0;
    upButton.style.display = "none";

    // 5. 모든 박스의 'on' 클래스 제거 
    boxes.forEach((box) => box.classList.remove("on"));
    if (boxes.length > 0) {
        // 첫 번째 박스에만 적용 (모달이 닫힌 후 상태)
        boxes[0].classList.add("on"); 
    }
}

// 모달 배경 클릭시 닫기
window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
});

// ---------------------- scrollToTop 함수 (요청 사항) ----------------------
function scrollToTop() {
    // 모달 Swiper 인스턴스를 사용하여 첫 번째 슬라이드로 이동합니다.
    if (modalSwiperInstance) {
        modalSwiperInstance.slideTo(0, 500); // 500ms 애니메이션 속도를 추가하여 부드럽게 이동
    }
}
// --------------------------------------------------------------------------

// HTML의 onclick 속성 사용을 위해 전역으로 노출합니다.
window.openModal = openModal;
window.closeModal = closeModal;
window.scrollToTop = scrollToTop; // ⭐️ 요청하신 전역 노출