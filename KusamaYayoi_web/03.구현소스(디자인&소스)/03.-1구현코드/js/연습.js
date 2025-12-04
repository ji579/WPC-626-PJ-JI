function headerFn() {
 /*********************************** 
    JS 로 링크 시스템 만들기
 ***********************************/
// (1) 대상 : 상단영역 a 요소
const $topLink = $("spart-menu a");
$topLink.click(function(e){// e - 이벤트 객체
  // 기본이동 막기
  e.preventDefault();
  // 클릭된 글자 a 요소의 글자 읽기
  let aTxt = $(this).text();
  console.log(aTxt);
  // 분기하여 이동
  switch(aTxt){
    case "Profile" : location.href="./sub1.html"; break;
    case "Works" : location.href="./sub2.html"; break;
    case "草間彌生" : location.href="./index.html"; break;
    case "Museum" : location.href="./sub3-1-1visitinfo.html"; break;
    case "Contact" : location.href="./index.html#contact-area.html"; break;
    // case "Paintings" : location.href="./login.html"; break;
    // case "Books" : location.href="./member.html"; break;
  }

});
}// headerFn 함수 끝