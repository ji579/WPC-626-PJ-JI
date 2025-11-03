// 2차 공통 JS - common.js /////////


// default로 내보냈으므로 아무이름으로 받아도됨!

// 같은 이름의 변수의 충돌을 막기위해 지역변수화를 해준다!
// 방법은 (()=>{나의코드})() 익명함수를 바로 실행하는 지역코드로 감싸준다!
// 나의코드는 지역화가 되고 익명함수는 바로 실행된다!
// -> (익명함수)() 이렇게 쓰면 익명함수가 바로 실행됨!

/// 지역화 코드 시작 //////////////
(() => {
  // 1. 상단, 하단 공통 모듈 html넣기
  // (1) 대상 : 상단영역 #top-area
  const $topArea = $("#top-area");
  // 하단영역 #bottom-area
  const $bottomArea = $("#bottom-area");
  // 배너영역 .banner-part

  // (2) 대상에 load() 메서드로 html넣기
  // load(파일경로, 로딩후실행함수)
  // (2-1) 상단부 html넣기
  $topArea.load("./inc/header.html");
  // -> 상단부 html파일이 모두 로딩된후 headerFn함수가 실행됨!

  // (2-2) 하단부 html넣기
  $bottomArea.load("./inc/footer.html");

})();
/// 지역화 코드 종료 //////////////
