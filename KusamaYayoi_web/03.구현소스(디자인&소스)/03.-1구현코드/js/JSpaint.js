window.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector(".wrap");
  const pagingList = document.querySelectorAll(".dot");

  const UNIT_NUM = 6;
  const workTitle = [
    "『 Dress 』","『 Mushrooms 』","『 Papillon(Ⅰ) 』","『 Butterfly 』","『 Shoes 』","『 Pumpkin 』",
    "『 Fruit Basket(2) 』","『 Fruit Basket(4) 』","『 Dandelions 』","『 Pumpkin 』","『 Yellow Pumpkin 』","『 Shanghai Pumpkin 』",
    "『 The Place For Life 』","『 All The Eternal Love 』"," 『 EVERY DAY I PRAY FOR LOVE 』","『 The Endless Life of a Man 』",
    "『 Pound of Repose 』","『 I pray for love every day  』"
  ];

  // 페이지 초기값
let currentPage = 1;

// DOM 요소 캐시
const leftBtn = document.querySelector('.abtn.ab1');
const rightBtn = document.querySelector('.abtn.ab2');
const dotsContainer = document.querySelector('.paging-list .dots');

// totalPages 계산
const totalPages = Math.max(1, Math.ceil(workTitle.length / UNIT_NUM));

// 동적으로 dot이 필요하면 렌더링 (선택; 이미 HTML에 dot이 있으면 이 블록은 건너뛰어도 됩니다)
function renderDotsIfNeeded() {
  const existingDots = dotsContainer.querySelectorAll('.dot');
  if (existingDots.length === totalPages) return; // 이미 맞음

  dotsContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const span = document.createElement('span');
    span.className = 'dot';
    span.dataset.val = String(i);
    dotsContainer.appendChild(span);
  }
}

// dot 스타일 업데이트 (활성화 표시)
function updateDots(page) {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach(dot => {
    const val = Number(dot.dataset.val);
    if (val === page) {
      dot.style.backgroundColor = '#666666';
      dot.classList.add('active');
    } else {
      dot.style.backgroundColor = '';
      dot.classList.remove('active');
    }
  });

  // 좌/우 버튼 활성/비활성(선택) 처리: 끝이면 비활성화 시키기
  if (leftBtn) leftBtn.classList.toggle('disabled', page <= 1, );
  if (rightBtn) rightBtn.classList.toggle('disabled', page >= totalPages);
}

// 페이지 이동 함수 (MakeWorkList 호출 + 상태 업데이트)
function goToPage(page) {
  // 범위 검사
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  currentPage = page;
  // 실제 리스트 렌더링
  MakeWorkList(currentPage);

  // dot 상태 업데이트
  updateDots(currentPage);
}

// 왼쪽/오른쪽 버튼 이벤트 바인딩
if (leftBtn) {
  leftBtn.addEventListener('click', (e) => {
   e.preventDefault();
    if (currentPage > 1) goToPage(currentPage - 1);
  });
}
if (rightBtn) {
  rightBtn.addEventListener('click', (e) => {
   e.preventDefault();
    if (currentPage < totalPages) goToPage(currentPage + 1);
  });  
  
}
// dots 클릭 바인딩 (delegation 또는 개별 바인딩)
function bindDotClicks() {
  // 이벤트 위임: dotsContainer에 클릭달기
  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (!dot) return;
    const page = parseInt(dot.dataset.val, 10);
    if (Number.isNaN(page)) return;
    goToPage(page);
  });
}

// 초기화 (페이지 수에 따라 dot 렌더링/바인딩 후 첫 렌더 호출)
renderDotsIfNeeded();
bindDotClicks();
goToPage(1); // 초기 페이지 렌더링


  function MakeWorkList(pgNum) {
    const total = workTitle.length;
    const firstNum = (pgNum - 1) * UNIT_NUM + 1;
    const lastNum  = Math.min(pgNum * UNIT_NUM, total);

    let hCode = "<ul>";
    for (let i = firstNum; i <= lastNum; i++) {
      hCode += `

        

        <li data-num="${i}">  
         <button class="modal-btn" onclick="openModal(event)"> </button>
          <img src="./images/paint${i}.jpg" alt="paint${i}">
          <h3>${workTitle[i - 1]}</h3>
         
        </li>

      
       
      
      `;
    }
    hCode += "</ul>";
    wrap.innerHTML = hCode;
  }
});


// 작품정보객체

const workInfo = [
   {
      idx:1,
      title:'『 Dress 』',
      date:'1982',
      technique:'Screen print',
      dimensions:'53 x 45. 6 cm',
   },
   {
      idx:2,
      title:'『 Mushrooms 』',
      date:'1995',
      technique:'Screen print',
      dimensions:'15. 8 x 22. 7 cm',
   },
   {
      idx:3,
      title:'『 Papillon(Ⅰ) 』',
      date:'2000',
      technique:'Screen print',
      dimensions:'38 × 45. 5cm',
   },
   {
      idx:4,
      title:'『 Butterfly 』',
      date:'1988',
      technique:'Screen print',
      dimensions:'47. 8 x 59. 9 cm',
   },
   {
      idx:5,
      title:'『 Shoes 』',
      date:'1985',
      technique:'Screen print',
      dimensions:'45. 5 x 53 cm',
   },
   {
      idx:6,
      title:'『 Pumpkin 』',
      date:'1990',
      technique:'Screen print',
      dimensions:'62. 7 x 54 cm',
   },
   {
      idx:7,
      title:'『 Fruit Basket(2) 』',
      date:'1999',
      technique:'Screen print',
      dimensions:'60 × 68 cm',
   },
   {
      idx:8,
      title:'『 Fruit Basket(4) 』',
      date:'1999',
      technique:'Screen print',
      dimensions:'60 × 68 cm',
   },
   {
      idx:9,
      title:'『 Dandelions 』',
      date:'1985',
      technique:'Screen print',
      dimensions:'45. 2 x 52. 6 cm',
   },
   {
      idx:10,
      title:'『 Pumpkin 』',
      date:'1982',
      technique:'Screen print',
      dimensions:'65. 5 x 51 cm',
   },
   {
      idx:11,
      title:'『 Yellow Pumpkin 』',
      date:'1992',
      technique:'Screen print',
      dimensions:'71 x 84 cm',
   },
   {
      idx:12,
      title:'『 Shanghai Pumpkin 』',
      date:'2010',
      technique:'Screen print',
      dimensions:'76 x 56 cm',
   },
   {
      idx:13,
      title:'『 The Place For Life 』',
      date:'2013',
      technique:'Acrylic on canvas',
      dimensions:'194 x 194 cm',
   },
   {
      idx:14,
      title:'『 All The Eternal Love 』',
      date:'2014',
      technique:'Acrylic on canvas',
      dimensions:'194 x 194 cm',
   },
   {
      idx:15,
      title:'『 EVERY DAY I PRAY FOR LOVE 』',
      date:'2019',
      technique:'Acrylic on canvas',
      dimensions:'100 x 100 cm',
   },
   {
      idx:16,
      title:'『 The Endless Life of a Man 』',
      date:'2010',
      technique:'Acrylic on canvas',
      dimensions:'40. 3 x 40. 1 cm',
   },
   {
      idx:17,
      title:'『 Pound of Repose 』',
      date:'2014',
      technique:'Acrylic on canvas',
      dimensions:'194 × 194 cm',
   },
   {
      idx:18,
      title:'『 I pray for love every day 』',
      date:'2023',
      technique:'Acrylic on canvas',
      dimensions:'53 × 65. 2 cm',
   },
]

// 객체구조
// 1. idx: 고유번호
// 2. title: 작품명
// 3. date: 제작년도
// 4. technique: 표현기법
// 5. dimensions: 작품크기



  // 4. 모달 기능
  const mWindow = document.getElementById("modal");
      function openModal(e) {
         let idx = e.currentTarget.parentElement.getAttribute('data-num');
         console.log(idx);
         // 배열.some((v)=>{if(조건){실행}})
         // some은 배열을 순회하면서 조건에 맞으면 
         // 실행문을 실행하고 return true를 쓰면 끝마친다!
         workInfo.some(v=>{
            if(v.idx == idx){
               console.log(v.title);
               mWindow.querySelector('h3').textContent = v.title;
               mWindow.querySelector('.date').textContent = v.date;
               mWindow.querySelector('.technique').textContent = v.technique;
               mWindow.querySelector('.dimensions').textContent = v.dimensions;
               return true;
            }

            console.log(v.title);


         })
        mWindow.style.display = "block";
        mWindow.querySelector('.modal-img img').src = `./images/paint${idx}.jpg`;
             document.body.style.overflow = "hidden"; // 바디스크롤막기효과
      }

      function closeModal() {
        document.getElementById("modal").style.display = "none";
          document.body.style.overflow = "auto"; // 바디스크롤막기해제
      }

      // // 모달 배경 클릭시 닫기
      // window.addEventListener("click", (event) => {
      //   const modal = document.getElementById("modal");
      //   if (event.target === modal) {
      //     closeModal();
      //   }
      // });




//       // 연습
//       const flex = myFn.qs('flex');
//    console.log('대상', flex);
//    myFn.addEvt(window,'load',makeList)
//    // 4. 함수만들기 ////////////
// function makeList(){
//     // (1) 함수호출 확인
//     console.log('나야나!!!');

//     // (2) 코드만들기
//     let hCode = ''; // 변수 선언 및 초기화!

//     // 제이슨 객체 데이터 만큼 반복하여 코드 생성하기
//     // for(key in Object){코드}
//     for(let x in movieInfo){
//         // console.log('x는 무엇?',x);
//         // x변수에 담긴값은 객체의 속성(key)이다!

//         // 반복할 코드 대입연산자(+=)로 계속저장함!
//         hCode += `
//          <section class="modal-img">
//                <img src="./images/paint${i}.jpg" alt="paint${i}">
//           </section>

     
       
//           <section class="modal-tit">
//             <h3>${workTitle[i - 1]}</h3>
         
//             <div class="txtbox">
//               <div class="box box1">
//                 <strong> Date. </strong>
//                 <p class="date">1990</p>
//               </div>
//               <div class="box box2">
//                 <strong>Technique. </strong>
//                 <p class="technique">Screen print</p>
//               </div>
//               <div class="box box3">
//                 <strong>Dimensions. </strong>
//                 <p class="dimensions">15. 8 x 22. 7 cm</p>
//               </div>
//             </div>
          
//              <div class="copyright">
//               ⓒ YAYOI KUSAMA ALL RIGHTS RESERVED 
//              </div>
//           </section>

//              `;
//     } //////// for in문 ///////////////
    

//     // (3) 변경대상에 코드넣기
//     wrap.innerHTML = hCode;
// } /////// makeList 함수 ////////////////
