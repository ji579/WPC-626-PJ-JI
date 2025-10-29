// JS3-4.for문연습2 //////

// 로딩구역 //////////
// DOMContentLoaded 이벤트는 html태그만 모두 로딩되면
// 발생하는 이벤트다! load 이벤트보다 속도가 빠르다!
// 외부 JS호출시 defer를 사용하지 않으면 아래와 같이
// 이벤트 셋팅해야한다!
//  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

window.addEventListener("DOMContentLoaded", () => {
  console.log("로딩완료!");

  // 0. 요구사항분석 ////
  // 이미지개수만큼 for문을 돌려서 html태그를
  // 반복적으로 생성하여 대상요소에 삽입해준다!

  // 1. 대상선정 : .wrap
  const wrap = document.querySelector(".wrap");
  console.log("대상:", wrap);

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
  let hCode = "<section class='exbsbox'>";

  // for문으로 반복코드 생성하기
  // for(시;한;증){코드}
  // 이미지가 1~50번까지 이므로 i는 1부터 50까지 반복
  for (let i = 1; i <= 14; i++) {
    hCode += `
        <ul class= list>
            <li class="exb">
                <img src="./images/exb${i+1}.jpg" alt="paint" class="img-box">
            </li>
            <li class="exbtxt">
             <h3>${workTitle[i - 1]}</h3>
             <h4>${workDate[i - 1]}</h4>
            </li>
    </ul>
        `;
  } /// for /////

  hCode += "</section>";

  // 3. html코드 삽입하기
  wrap.innerHTML = hCode;
}); ///////// 로드함수 ///////////////////

// const $menuBox = $(".menu-box");

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




// 
// 스크롤 하단 감지



function detectBottom(el=window) {
    $('main').addClass('scrEnd');

    $(el).scroll(function(){
        const scrollTop = $(el).scrollTop();
        const innerHeight = $(el).innerHeight();
        const scrHeight = (el == window) ? $('main') : $(el);
        const scrollHeight = scrHeight.prop('scrollHeight');
        console.log(scrollTop, innerHeight, scrollHeight);

        if (scrollTop + innerHeight >= scrollHeight) {
            $('main.scrEnd').addClass('end');
            return true;
        } else {
            $('main.scrEnd').removeClass('end');
            return false;
        }
    });
}



/*########## table scroll ##########*/
// $(function() {
//     $('.table-scroll table').wrap('<div class="scroll-container"></div>');

//     if ($('.scroll-container').length > 0) {
// 		tableScroll();
// 	}
// });

// function tableScroll() {
// 	let table = $('.scroll-container');

// 	table.each(function () {
// 		let $this = $(this),
// 			ingClass = 'scroll-ing',
// 			endClass = 'scroll-end';
// 		$this.on('scroll', function (e) {
// 			let wrap = $(this).closest('.table-scroll'),
// 				currLeft = this.scrollLeft,
// 				scrWidth = this.scrollWidth,
// 				cliWidth = this.clientWidth;

// 			if (currLeft === 0) {
// 				wrap.removeClass(ingClass).removeClass(endClass);
// 			} else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
// 				wrap.addClass(ingClass).removeClass(endClass);
// 			} else {
// 				wrap.addClass(endClass);
// 			}
// 		});
// 	});
// }

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
  

      const getBCR = (el) => el.getBoundingClientRect().top;

      // 타겟박스
      const target = document.querySelector('.bottom-area');
      // 변경박스
      const chgBox = document.querySelector('main');
      // 윈도우 높이값 (기준값)
      let winH = window.innerHeight;
      
      window.addEventListener('scroll', () => {
        let scTop = window.scrollY;
        let tgPos = getBCR(target);
        console.log('스크롤이동중', scTop, tgPos);
        if(tgPos < winH) {
          chgBox.classList.add('end');
        }
        else {
          chgBox.classList.remove('end');
        }
      });
document.addEventListener('click', (e) => {
  const label = e.target.closest('label[data-url]');
  if (label) {
    const url = label.getAttribute('data-url');
    if (url) {
      window.location.href = url;
    }
  }
});