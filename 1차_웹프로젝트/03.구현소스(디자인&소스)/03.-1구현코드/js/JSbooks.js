// JS3-4.for문연습2 //////

// 로딩구역 //////////
// DOMContentLoaded 이벤트는 html태그만 모두 로딩되면
// 발생하는 이벤트다! load 이벤트보다 속도가 빠르다!
// 외부 JS호출시 defer를 사용하지 않으면 아래와 같이
// 이벤트 셋팅해야한다!
//  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

window.addEventListener("DOMContentLoaded", () => {
  // console.log("로딩완료!");

  // 0. 요구사항분석 ////
  // 이미지개수만큼 for문을 돌려서 html태그를
  // 반복적으로 생성하여 대상요소에 삽입해준다!


  // 1. 대상선정 : .wrap
  const wrap = document.querySelector(".wrap"
    
  //   // 문제시 삭제
  //   ,{
 
  //      // 블릿 셋팅
  //     pagination: {
  //       el: ".pagingList",
  //       /* 블릿클릭 작동여부 */
  //       clickable: true,
  //     },
  //     // 양쪽이동버튼 셋팅
  //     navigation: {
  //       nextEl: ".abtn ab2",
  //       prevEl: ".abtn ab1",
  //     },
  // } // 삭제하는 구간
);
    const pagingList = document.querySelectorAll(".dot");



  
   
 

  




  const UNIT_NUM = 8;
  console.log("대상:", wrap);

  const workTitle = [
    "『 Infinity Net: The Autobiography of Yayoi Kusama 』",
    "『 Yayoi Kusama: Festival of Life 』",
    "『 Yayoi Kusama: Revised & expanded edition 』",
    "『 Yayoi Kusama: The Journal 』",
    "『 Yayoi Kusama: Cosmic Nature 』",
    "『 Yayoi Kusama: 1945 to Now 』",
    "『 Yayoi Kusama: Infinity Mirrors 』",
    "『 Yayoi Kusama: Every Day I Pray for Love 』",
    "『 草間彌生全版画集 All prints of KUSAMA YAYOI 1979-2004  』",
    "『 Louis Vuitton Yayoi Kusama 』",
    "『 Yayoi Kusama: All About My Love 』",
    "『 Kusama 』",
    "『 Kusama 』",
    "『  Yayoi Kusama 』",
    "『 Yayoi Kusama Midori Yamamura 』",
    "『 Love Forever: Yayoi Kusama, 1958-1968 』",
    "『 草間彌生全版画: 1979-2011 JP Oversized 』",
    "『 Yayoi Kusama: Give Me Love 』",
    "『 Yayoi Kusama: A Retrospective  』",
    "『 別冊Discover Japan 草間彌生を知りたい JP Oversized 』",
    "『 家庭画報 2025年3月号 Print Magazine  』",
    "『 YAYOI KUSAMA: IN INFINITY 』",
    "『 Yayoi Kusama  』",
    "『 Yayoi Kusama : Present Infinite 』",
  ];

 MakeWorkList(1);

pagingList.forEach((el) => {
    el.addEventListener("click", (e) => {
      // e.preventDefault();
      const page = parseInt(el.dataset.val, 10);
      if (Number.isNaN(page)) return;
      MakeWorkList(page);
    });
  });



 function MakeWorkList(pgNum) {
    const total = workTitle.length;
    const firstNum = (pgNum - 1) * UNIT_NUM + 1;
    const lastNum  = Math.min(pgNum * UNIT_NUM, total);


  // 2. html코드 생성하기 ////
  let hCode = "<section class='booksbox'>";

  // for문으로 반복코드 생성하기
  // for(시;한;증){코드}
  // 이미지가 1~50번까지 이므로 i는 1부터 50까지 반복
  // for (let i = 1; i <= 24; i++) {
   for (let i = firstNum; i <= lastNum; i++) {
    hCode += `
        <ul class="list" data-num="${i}">
          <div class="section">
      <button class="modal-btn" onclick="openModal()"></button>
   
            <li class="book">
                <img src="./images/book${i}.jpg" alt="book${i}" class="img-box">
            </li>
            <li class="booktxt">
             <h3>${workTitle[i - 1]}</h3>
            </li> 
            </div>
    </ul>

        `;
  } /// for /////

  hCode += "</section>";

  // 3. html코드 삽입하기
  wrap.innerHTML = hCode;}
}); ///////// 로드함수 ///////////////////

  

      var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });

      // 4. 모달 기능
      function openModal() {
        document.getElementById("modal").style.display = "block";
      }

      function closeModal() {
        document.getElementById("modal").style.display = "none";
      }

      // 모달 배경 클릭시 닫기
      window.addEventListener("click", (event) => {
        const modal = document.getElementById("modal");
        if (event.target === modal) {
          closeModal();
        }
      });
 
      // <![CDATA[  <-- For SVG support
      if ("WebSocket" in window) {
        (function () {
          function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
              var elem = sheets[i];
              var parent = elem.parentElement || head;
              parent.removeChild(elem);
              var rel = elem.rel;
              if (
                (elem.href && typeof rel != "string") ||
                rel.length == 0 ||
                rel.toLowerCase() == "stylesheet"
              ) {
                var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, "");
                elem.href =
                  url +
                  (url.indexOf("?") >= 0 ? "&" : "?") +
                  "_cacheOverride=" +
                  new Date().valueOf();
              }
              parent.appendChild(elem);
            }
          }
          var protocol =
            window.location.protocol === "http:" ? "ws://" : "wss://";
          var address =
            protocol + window.location.host + window.location.pathname + "/ws";
          var socket = new WebSocket(address);
          socket.onmessage = function (msg) {
            if (msg.data == "reload") window.location.reload();
            else if (msg.data == "refreshcss") refreshCSS();
          };
          if (
            sessionStorage &&
            !sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")
          ) {
            console.log("Live reload enabled.");
            sessionStorage.setItem("IsThisFirstTime_Log_From_LiveServer", true);
          }
        })();
      } else {
        console.error(
          "Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading."
        );
      }

      // document.querySelector(".ab2").onclike = () => {
      //    console.log('오른쪽이야~!!!');
        
      // }; 
        
       
   


      // document.querySelector(".ab1").addEventListener("click", () => {
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
    
