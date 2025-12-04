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

  // [2] GNB 메뉴 링크셋팅 하기 (헤더의 ARCHIVE, SHOP, STORE)
  document.querySelectorAll(".gnb-menu a").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const pm = this.getAttribute("href").substr(1);
      location.href = "category.html?pm=" + pm;
    });
  });

  // [3] 메인 페이지 - .bgmenu 전체 영역 클릭
  document.querySelectorAll(".menu-part .bgmenu").forEach((menu, index) => {
    // 각 메뉴에 클릭 이벤트 추가
    menu.addEventListener("click", function (e) {
      // a 태그 기본 동작 방지
      e.preventDefault();
      
      let targetPage = "";
      
      // 메뉴 순서에 따라 페이지 결정
      switch(index) {
        case 0: targetPage = "archive"; break;
        case 1: targetPage = "shop"; break;
        case 2: targetPage = "store"; break;
      }
      
      console.log(`메뉴 ${index + 1} 클릭됨, 이동: category.html?pm=${targetPage}`);
      
      if (targetPage) {
        location.href = "category.html?pm=" + targetPage;
      }
    });
    
    // 클릭 가능하도록 커서 변경
    menu.style.cursor = "pointer";
  });

  // [4] 헤더 액션스 버튼 링크셋팅 하기
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