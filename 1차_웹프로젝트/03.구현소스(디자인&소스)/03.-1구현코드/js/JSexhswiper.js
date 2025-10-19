// JS3-4.for문연습2 //////

// 로딩구역 //////////
// DOMContentLoaded 이벤트는 html태그만 모두 로딩되면
// 발생하는 이벤트다! load 이벤트보다 속도가 빠르다!
// 외부 JS호출시 defer를 사용하지 않으면 아래와 같이
// 이벤트 셋팅해야한다!
//  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

window.addEventListener("DOMContentLoaded", () => {
  console.log("로딩완료!");



  // 모든 라벨 요소를 가져옵니다.
    const linkLabels = document.querySelectorAll('.check label');
    
    /**
     * 라벨 클릭 이벤트 핸들러: 페이지 이동을 처리합니다.
     */
    function handleLabelClick() {
        // 라벨의 data-url 속성에서 이동할 URL을 가져옵니다.
        const targetUrl = this.getAttribute('data-url');
        
        // 라벨을 클릭하면, 'for' 속성 덕분에 연결된 input이 자동으로 체크됩니다.
        // 체크 상태가 변경되면 CSS 'input:checked + label'이 작동하여 색상이 변합니다.
        
        if (targetUrl) {
            // 페이지 이동을 실행합니다.
            window.location.href = targetUrl;
        }
    }

    /**
     * 페이지 로드 시 현재 URL에 맞는 라디오 버튼을 선택 상태로 만듭니다.
     */
    window.addEventListener('load', () => {
        const currentPath = window.location.pathname.split('/').pop();
        
        linkLabels.forEach(label => {
            // 1. 클릭 이벤트 리스너를 등록합니다.
            label.addEventListener('click', handleLabelClick);
            
            // 2. 현재 페이지에 맞는 라디오 버튼을 'checked' 상태로 설정합니다.
            const labelUrl = label.getAttribute('data-url');
            
            // URL 비교를 더 정확하게 하기 위해 includes 대신 strict comparison을 사용합니다.
            // (예: "sub3-1-1visitinfo.html")
            if (labelUrl && labelUrl === currentPath) {
                const inputId = label.getAttribute('for');
                const input = document.getElementById(inputId);
                
                if (input) {
                    input.checked = true;
                }
            }
        });
    });
  // 0. 요구사항분석 ////
  // 이미지개수만큼 for문을 돌려서 html태그를
  // 반복적으로 생성하여 대상요소에 삽입해준다!

  // 1. 대상선정 : .wrap
  const mySwiper = document.querySelector(".swiper-wrapper");
  console.log("대상:", mySwiper);

  const workTitle = [
    "I WOULD OVERCOME DEATH AND GO ON LIVING",
    "Yayoi Kusama: Portraying the Figurative",
    "Visionary Colors",
    "Yayoi Kusama’s Self-Obliteration/Psychedelic World",
    "EVERY DAY I PRAY FOR LOVE",
    "A POEM IN MY HEART",
    "Midway Between Mystery and Symbol: Yayoi Kusama's Monochrome",
    "THE VISION OF FANTASY THAT WE HAVE NEVER SEEN IS THIS SPLENDOR",
    "ZERO IS INFINITY　ZERO and Yayoi Kusama",
    "SPIRITS OF AGGREGATION",
    "HERE, ANOTHER NIGHT COMES FROM TRILLIONS OF LIGHT YEARS AWAY: Eternal Infinity",
    "I Want You to Look at My Prospects for the Future: Plants and I",
    "Here, Now, I have Reached the Grandest Start of My Life",
    "Creation is a Solitary Pursuit, Love is What Brings You Closer to Art",
  ];

  const workDate = [
    "Oct 17, 2024 - Mar 9, 2025",
    " Apr 27, 2024 – Sep 1, 2024",
    "Nov 9, 2023 - Mar 24, 2024",
    " Apr 29, 2023 - Sep 18, 2023",
    "Oct7, 2022 - Feb 26, 2023",
    "Mar 3, 2022 - Aug 28, 2022",
    "Apr 29, 2021 - Dec 26, 2021",
    "Jul 30, 2020 - Mar 29, 2021",
    "Mar 5 - May 31, 2020",
    "Oct 10, 2019 - Jan 31, 2020",
    "Apr 4 - Aug 31, 2019",
    "Oct 4, 2018 - Feb 28, 2019",
    "Apr 1 -Aug 31, 2018",
    "Oct 1, 2017 - Feb 25, 2018",
  ];

  // 2. html코드 생성하기 ////
  let hCode = "";

  // for문으로 반복코드 생성하기
  // for(시;한;증){코드}
  // 이미지가 1~50번까지 이므로 i는 1부터 50까지 반복
  for (let i = 1; i <= 14; i++) {
    hCode += `
        <div class="exb-box swiper-slide">
         <div class="exbtxt">
             <h3>${workTitle[i - 1]}</h3>
             <h2>${workDate[i - 1]}</h2>
                <img src="./images/exb${i + 1}.jpg" alt="paint">
            </div>
        </div>
        `;
  } /// for /////

  hCode += "";

  // 3. html코드 삽입하기
  mySwiper.innerHTML = hCode;



   var swiper = new Swiper(".mySwiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });


}); ///////// 로드함수 ///////////////////


// const btnPrev = document.querySelector(".btn-prev");
// const btnNext = document.querySelector(".btn-next");

// document.querySelector(".btn-next").addEventListener("click", () => {
//   swiper.slideNext();
// });

// document.querySelector(".btn-prev").addEventListener("click", () => {
//   swiper.slidePrev();
// });

// swiper.on("slideChange", () => {
//   console.log("맨처음인가?", swiper.isBeginning);
//   console.log("맨끝인가?", swiper.isEnd);

//   if(swiper.isBeginning) {
//       btnPrev.style.opacity = "50%";
//   }

//   else if(swiper.isEnd) {
//       btnNext.style.opacity = "50%";
//   }

//   else {
//      btnNext.style.display = "inline-block";
//      btnNext.style.opacity = "1";
//       btnPrev.style.display = "inline-block";
//       btnPrev.style.opacity = "1";
//   }
// });
