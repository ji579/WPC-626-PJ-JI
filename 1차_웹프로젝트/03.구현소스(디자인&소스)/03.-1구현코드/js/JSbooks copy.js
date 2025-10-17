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
  const wrap = document.querySelector(
    ".wrap"

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
      el.style.backgroundColor = "#666666";
      // 선택을 제외한 el은 style제거하기
      for (let i = 0; i < pagingList.length; i++) {
        if (pagingList[i] !== el) {
          pagingList[i].style.backgroundColor = "";
        }
      }
    });
  });

  function MakeWorkList(pgNum) {
    const total = workTitle.length;
    const firstNum = (pgNum - 1) * UNIT_NUM + 1;
    const lastNum = Math.min(pgNum * UNIT_NUM, total);

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
      <button class="modal-btn" onclick="openModal(event)"></button>
   
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
    wrap.innerHTML = hCode;
  }
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







const bookInfo = [
   {
    index:1,
       title:
       '『 Infinity Net: The Autobiography of Yayoi Kusama 』',
      author:
      'Yayoi Kusama',
     publisher:
     'Tate Publishing',
      detail:
     "“Infinity Net” is a memoir by Yayoi Kusama, one of the most important figures in the contemporary art world, exploring her unique and fascinating life and art.\n"
    + "This autobiography details Kusama's journey from overcoming obsessive-compulsive disorder to breaking down cultural barriers through art and creating her own unique artistic world.\n"
    + "The 2021 revised edition includes a new foreword by Francis Morris and a poem by Yayoi Kusama, allowing a deeper understanding of her work and thoughts.\n\n"
    + "During her ten years in New York, Kusama transformed from a poor artist to a mainstay of the counterculture art scene.\n"
    + "She solidified her position through her association with art world giants such as Georgia O'Keeffe, Donald Judd, and Andy Warhol.\n"
    + "She speaks candidly about the obsessions that plagued her childhood and her entire life, and discusses her journey to explore her inner world through art.\n\n"
    + "After returning to Japan, Kusama was admitted to a mental hospital and found artistic inspiration there.\n"
    + "Over the past decade, he has established himself as an internationally recognized artist, having been featured in several major exhibitions.\n"
    + "Translated into English by Ralph McCarthy, this autobiography explores Kusama’s ongoing artistic exploration and\n"
    + "It powerfully tells the story of how, despite the hardships she endured, she forged her own path through art.\n\n"
    + "\"Infinity Net\" explores the life and art of Yayoi Kusama, the challenges she faced and her achievements, in a profound and dreamlike way.\n"
    + "It shows how her art shaped her.\n\n"
    + "This autobiography leaves a powerful impression on readers through Kusama's boundless creativity and dreamlike intensity." },
    {
      index:2,
       title:
       '『 Yayoi Kusama: Festival of Life 』',
      author:
      'Yayoi Kusama, Jenni Sorkin',
     publisher:
     'David Zwirner Books',
      detail:
      "Yayoi Kusama's art is sensual, utopian, and original, and despite its highly personal nature, is loved by diverse audiences around the world.\n"
    + "Throughout her career, Kusama has broken down the traditional boundaries between work, artist, and viewer.\n\n"
    + "From paintings to performances, room-sized installations, sculptural installations, literature, film, fashion, design, and interventions within existing architectural structures.\n"
    + "Kusama's work ranges beyond major art movements of the late 20th century, including Pop Art and Minimalism.\n"
    + "Her work radiates vitality and passion, and is autobiographical and at times confessional.\n"
    + "Kusama's work conveys the vitality of a living artist through her work.\n\n"
    + "\"Yayoi Kusama: Festival of Life\" is an exhibition catalogue covering Kusama's exhibition held at the Chelsea branch of David Zwirner Gallery in New York in late 2017.\n"
    + "Includes her iconic “My Eternal Soul” series, new large-scale floral sculptures, polka-dotted environments, and two infinity mirrored rooms.\n"
    + "The book offers fresh perspectives on Kusama's work, including new scholarly research and posters by Jenni Sorkin."},
    {
    index:3,
       title:
       '『 Yayoi Kusama: Revised & expanded edition 』',
      author:
      'Yayoi Kusama, Tatehata, Hoptman, Kultermann, Taft',
     publisher:
     'Phaidon Press',
      detail:
      "Kusama has gained international acclaim for her groundbreaking work that explores themes such as infinity, self-image, sexuality, and compulsive repetition.\n"
    + "Her work, which first gained attention in Manhattan's psychedelic and pop culture scenes in the 1960s, combined patterning to create often participatory installations and series of paintings.\n"
    + "This book is an updated version of a monograph published in 2000 and explores Kusama's work in great detail.\n"
    + "Enriched with in-depth essays by Catherine Taft and a new collection of the author's poetry, it delves deeper into her artistic world."},
    {
    index:4,
       title:
       '『 Yayoi Kusama: The Journal 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Yayoi ar',
   },
    {
      index:5,
       title:
       '『Yayoi Kusama: Cosmic Nature 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Yayo',
   },
    {
      index:6,
       title:
       '『 Yayoi Kusama: 1945 to Now 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Yay',
   },
    {
      index:7,
       title:
       '『 Yayoi Kusama: Infinity Mirrors 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Y',
   },
    {
      index:8,
       title:
       '『 Yayoi Kusama: Every Day I Pray for Love 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Yayoi Kusa',
   },
    {
      index:19,
       title:
       '『 草間彌生全版画集 All prints of KUSAMA YAYOI 1979-2004 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Y',
   },
    {
      index:10,
       title:
       '『 Louis Vuitton Yayoi Kusama 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Yayoi ',
   },
    {
      index:11,
       title:
       '『 Yayoi Kusama: All About My Love 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Yayoi',
   },
    {
      index:12,
       title:
       '『 Kusama 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'Yayoi',
   },
    {
      index:13,
       title:
       '『 Kusama 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'e',
   },
    {
      index:14,
       title:
       '『 Yayoi Kusama 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'e.',
   },
    {
      index:15,
       title:
       '『 Yayoi Kusama Midori Yamamura 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'e.',
   },
    {
      index:16,
       title:
       '『 Love Forever: Yayoi Kusama, 1958-1968 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'e',
   },
    {
      index:17,
       title:
       '『 草間彌生全版画: 1979-2011 JP Oversized 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'e.',
   },
    {
      index:18,
       title:
       '『 Yayoi Kusama: Give Me Love 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'e',
   },
    {
      index:19,
       title:
       '『 Yayoi Kusama: A Retrospective 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
     'e',
   },
    {
      index:20,
       title:
       '『 別冊Discover Japan 草間彌生を知りたい JP Oversized 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'zz',
   },
    {
      index:21,
       title:
       '『 家庭画報 2025年3月号 Print Magazine 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
      'dd',
   },
    {
      index:22,
       title:
       '『 YAYOI KUSAMA: IN INFINITY 』',
      author:
      '1990',
     publisher:
     'Art Brut, Pop Art',
      detail:
     "This book is a compilation of Yayoi Kusama's best-known and best-selling series, Infinity Mirror Rooms.\n"
    + "We explore her influence on modern art history over the past 50 years.\n"
    + "World-renowned Japanese artist Yayoi Kusama has worked in a variety of media, including painting, sculpture, and performance/installation art.\n"
    + "Kusama's Infinity Mirror Room, which started in Phalli's Field! It is a landscape filled with multicolored lights and whimsical shapes.\n"
    + "It keeps the audience in a space filled with mirrors.\n"
    + "These mirrored spaces distort the room to project the illusion of the place, constantly reflecting it.\n"
  },
    {
      index:23,
       title:
       '『 Yayoi Kusama 』',
      author:
      'Yayoi Kusama',
     publisher:
     'D.A.P./Tate',
      detail:
     "Like many another artist émigré, Kusama had a plan, and it began, as such schemes often do, with what she was able to carry on her back, and sell: a cache of small works on paper, luminous drawings in gouache, ink and pastel. A film of Kusama's New York years might find her peeling the sheets leaf by leaf from the luggage that accompanied her from Tokyo to Seattle to New York, offering them as calling cards and as barter. Early scenes might feature marathon sessions of solitary work as she painted her vast Infinity Nets, and nocturnal raids when she liberated discarded items from the street, and sat for hours with her neighbor Donald Judd stitching and stuffing cotton sacks to fashion the stiff phallic protuberances she would use to cover her Accumulation sculptures. Her prodigious energies would soon migrate to installations, happenings, body painting, film, fashion and 'sexual revolution'. She would protest the war in Vietnam with an 'Anatomic Explosion' on Wall Street. She would become a tabloid sensation.\n"
    + "By the time she left New York and returned to Japan for good in 1973, Kusama was, by popular account, 'as famous as Andy Warhol'. But her appeal for the avant-garde had been exhausted, unlike his, by the machinery of self-promotion. Or so they say. Chroniclers of the scene deemed her return a retreat, whether under the banner of emotional breakdown or career meltdown. 'She wore herself out.' 'She overplayed her hand.' 'She sold out.' 'She lost her mind.' The explanations tend to arrive in the form of epithets. And then there is another theory. She was sick and tired of war, burnt out on Vietnam, disillusioned by the failure of the era's utopian project of pacifism and liberation. Her departure was an act of political protest as much as of emotional surrender."
  },
    {
      index:24,
       title:'『 Yayoi Kusama : Present Infinite 』',
      author:'Yayoi Kusama',
     publisher:'Skira',
      detail: "Kusama Yayoi is a Japanese contemporary artist known for her repetitive dot patterns and hallucinatory imagery. She works across a variety of media, including painting, sculpture, installation, and performance, exploring themes of self-effacement and obsessive repetition. These themes are intertwined with her long-standing psychological struggles, which she reflects in her work.\n"
    + "After moving to New York in the late 1950s and establishing her career, she established a distinctive style that garnered international recognition. Kusama continues to work prolifically today, creating powerful visual experiences through iconic works like polka dots and infinity mirrored rooms.",
   },

]



// 객체구조
// 1. idx: 고유번호
// 2. title: 작품명
// 3. author: 저자
// 4. publisher: 출판사
// 5. detail: 책내용















const modalContent = document.querySelector(".modal-content"); 
const mWindow = document.getElementById("modal");
const smallImg = modalContent.querySelectorAll(".small > img");
const bigImg = modalContent.querySelectorAll(".big > img");

// 4. 모달 기능
function openModal(e) {
  let idx = e.currentTarget.parentElement.parentElement.getAttribute("data-num");
  swiper2.update();         // 크기/DOM 변경 반영
  swiper2.slideTo(0, 0);    // 즉시 첫 슬라이드로 이동 (index, speed)
  smallImg[0].src = `./images/book${idx}.jpg`;
  smallImg[1].src = `./images/book${idx}-1.jpg`;
  smallImg[2].src = `./images/book${idx}-2.jpg`;
  smallImg[3].src = `./images/book${idx}-3.jpg`;
  bigImg[0].src = `./images/book${idx}.jpg`;
  bigImg[1].src = `./images/book${idx}-1.jpg`;
  bigImg[2].src = `./images/book${idx}-2.jpg`;
  bigImg[3].src = `./images/book${idx}-3.jpg`;


let index= e.currentTarget.parentElement.getAttribute('data-num');
   console.log(index);
         // 배열.some((v)=>{if(조건){실행}})
         // some은 배열을 순회하면서 조건에 맞으면 
         // 실행문을 실행하고 return true를 쓰면 끝마친다!
         bookInfo.some(v=>{
            if(v.index == index){
               console.log(v.title);
               mWindow.querySelector('h3').textContent = v.title;
               mWindow.querySelector('.author').textContent = v.author;
               mWindow.querySelector('.publisher').textContent = v.publisher;
               mWindow.querySelector('.detail').textContent = v.detail;
               return true;
            }
  document.getElementById("modal").style.display = "block"; 
 
      

            console.log(v.title);


         })
          mWindow.style.display = "block";
          document.body.style.overflow = "hidden"; // 바디스크롤막기효과
      
          return false;
        }


function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = "auto"; // 바디스크롤막기해제
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
    var protocol = window.location.protocol === "http:" ? "ws://" : "wss://";
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
