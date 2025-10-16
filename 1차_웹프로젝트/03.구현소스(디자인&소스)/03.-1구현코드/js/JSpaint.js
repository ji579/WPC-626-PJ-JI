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

// document.querySelector('.ab2').onclick = ()=>{};

  MakeWorkList(1);

  pagingList.forEach((el) => {
    el.addEventListener("click", (e) => {
      // e.preventDefault();

      const page = parseInt(el.dataset.val, 10);
      if (Number.isNaN(page)) return;
      MakeWorkList(page);



      for (let i = 0; i < pagingList.length; i++) {
        if (pagingList[i] === el) {
          pagingList[i].style.backgroundColor = "#666666";
          break;
        }
      }
     
      for (let i = 0; i < pagingList.length; i++) {
        if (pagingList[i] !== el) {
          pagingList[i].style.backgroundColor = "";
        } // 선택을 제외한 el은 style제거하기
      }
    
    });
  });

  function MakeWorkList(pgNum) {
    const total = workTitle.length;
    const firstNum = (pgNum - 1) * UNIT_NUM + 1;
    const lastNum  = Math.min(pgNum * UNIT_NUM, total);

    let hCode = "<ul>";
    for (let i = firstNum; i <= lastNum; i++) {
      hCode += `

        

        <li data-num="${i}">  
         <button class="modal-btn" onclick="openModal()"> </button>
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

[
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
