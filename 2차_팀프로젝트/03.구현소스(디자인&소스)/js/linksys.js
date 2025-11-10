// 보그 JS 링크 시스템 JS - linksys.js

export default function () {
  // [1] 로고 클릭시 홈으로 가기
  document.querySelector(".logo img").onclick = () => {
    location.href = "index.html";
  }; ////////////// click //////////////

  // [2] GNB 메뉴 링크셋팅 하기
  document.querySelectorAll(".gnb-menu a").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      // 카테고리 페이지에 보낼값
      const pm = this.getAttribute("href").substr(1);
      // substr(시작순번, 개수) -> 개수를 안쓰면 시작순번부터 끝까지임
      location.href = "category.html?pm=" + pm;
    }); ///////////// click //////////////
  }); ///////////// forEach //////////////

  // [3] 헤더 액션스 버튼 링크셋팅 하기
  document.querySelectorAll(".header-actions button").forEach((el) => {
    el.addEventListener("click", function () {
      const cls = this.getAttribute("class");
      console.log("버튼클릭:", cls);
      // switch 문으로 분기하기
      switch (cls) {
        case "login-btn": // 로그인/로그아웃
          console.log("로그인 페이지로 이동합니다.");
          location.href = "login.html";
          break;
        case "mem-btn": // 회원가입
          console.log("회원가입 페이지로 이동합니다.");
          location.href = "member.html";
          break;
      }
    }); ///////////// click //////////////
  }); ///////////// forEach //////////////
} //////////////// export default //////////////
