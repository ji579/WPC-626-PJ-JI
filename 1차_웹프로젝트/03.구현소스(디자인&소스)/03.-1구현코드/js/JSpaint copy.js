// JS3-4.for문연습2 //////

// 로딩구역 //////////
// DOMContentLoaded 이벤트는 html태그만 모두 로딩되면
// 발생하는 이벤트다! load 이벤트보다 속도가 빠르다!
// 외부 JS호출시 defer를 사용하지 않으면 아래와 같이
// 이벤트 셋팅해야한다!

window.addEventListener("DOMContentLoaded", () => {
  console.log("로딩완료!");

  // 0. 요구사항분석 ////
  // 이미지개수만큼 for문을 돌려서 html태그를
  // 반복적으로 생성하여 대상요소에 삽입해준다!

  // 1. 대상선정 : .wrap
  const wrap = document.querySelector(".wrap");
  console.log("대상:", wrap);

  // 페이징 대상 : .paging-list
  const pagingList = document.querySelectorAll(".paging-list a");
  console.log("페이징대상:", pagingList);

  // 작품명(workTitle) 배열 18개
  const workTitle = [
    "work1",
    "work2",
    "work3",
    "work4",
    "work5",
    "work6",
    "work7",
    "work8",
    "work9",
    "work10",
    "work11",
    "work12",
    "work13",
    "work14",
    "work15",
    "work16",
    "work17",
    "work18",
  ];

  // 첫 페이지 호출!
  MakeWorkList(1);

  // 페이징 이벤트 설정
  pagingList.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(this.innerText);
      MakeWorkList(this.innerText);
    });
  });

  function MakeWorkList(pgNum) {
    // pgNum - 페이지번호 전달변수

    // 2. html코드 생성하기 ////
    let hCode = "<ul>";

    // 단위개수
    const UNIT_NUM = 6;

    // 페이지번호
    let pageNum = pgNum;

    // 첫번호 계산변수
    let firstNum = (pageNum - 1) * UNIT_NUM + 1;
    // 한계 번호 계산변수
    let lastNum = pageNum * UNIT_NUM;

    console.log("첫번호:", firstNum);
    console.log("한계번호:", lastNum);

    
  
   
   
        // for문으로 반복코드 생성하기
    // for(시;한;증){코드}
    // 이미지가 1~50번까지 이므로 i는 1부터 50까지 반복
    for (let i = firstNum; i <= lastNum; i++) {
      hCode += `
                <li>
                    <img src="./images/paint${i}.jpg" alt="paint">
                    <h3>${workTitle[i - 1]}</h3>
                </li>
            `;
    } /// for /////

    hCode += "</ul>";

    // 3. html코드 삽입하기
    wrap.innerHTML = hCode;
  } // MakeWorkList /////
}); ///////// 로드함수 ///////////////////
