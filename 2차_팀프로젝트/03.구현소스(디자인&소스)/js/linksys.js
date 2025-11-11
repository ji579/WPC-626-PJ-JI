// 보그 JS 링크 시스템 JS - linksys.js

export default function () {
  // [1] 로고 클릭시 홈으로 가기
  const logoLink = document.querySelector(".site-header-logo");
  if (logoLink) {
    logoLink.onclick = (e) => {
      e.preventDefault();
      location.href = "index.html";
    };
  }

  // [2] GNB 메뉴 링크셋팅 하기
  document.querySelectorAll(".gnb-menu a").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const pm = this.getAttribute("href").substr(1);
      location.href = "category.html?pm=" + pm;
    });
  });

  // [3] 헤더 액션스 버튼 링크셋팅 하기
  document.querySelectorAll(".header-actions button").forEach((el) => {
    el.addEventListener("click", function () {
      const cls = this.getAttribute("class");
      console.log("버튼클릭:", cls);
      switch (cls) {
        case "login-btn":
          console.log("로그인 페이지로 이동합니다.");
          location.href = "login.html";
          break;
        case "mem-btn":
          console.log("회원가입 페이지로 이동합니다.");
          location.href = "member.html";
          break;
      }
    });
  });
}