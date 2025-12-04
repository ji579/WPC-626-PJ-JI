// 헤더 전체 메뉴 기능 JS - total_menu.js

/**
 * 전체 메뉴 및 검색 기능을 관리하는 모듈
 * - 전체 메뉴 열기/닫기 기능
 * - 검색 입력 및 초기화 기능
 * - ESC 키를 통한 메뉴 닫기 기능
 */

// 함수로 만들어서 원하는 시점에 실행할 함수 내보내기 /////////
export default () => {
  // DOM 요소들 선택
const menuBtn = document.querySelector(".menu-btn");     // 메뉴 버튼
  const gnb = document.getElementById("gnb");            // 전체 메뉴 영역
  const closeBtn = document.getElementById("closeBtn");   // 메뉴 닫기 버튼
  const searchInput = document.getElementById("keyword_header");  // 검색 입력창
  const searchX = document.getElementById("btn_search_x_header"); // 검색 초기화 버튼

  /**
   * 전체 메뉴를 여는 함수
   * - 메뉴에 active 클래스 추가로 표시
   * - 배경 스크롤 방지를 위해 body의 overflow를 hidden으로 설정
   */
  function openMenu() {
    gnb.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /**
   * 전체 메뉴를 닫는 함수
   * - 메뉴에서 active 클래스 제거로 숨김
   * - body의 overflow를 원래대로 복원하여 스크롤 허용
   */
  function closeMenu() {
    gnb.classList.remove("active");
    document.body.style.overflow = "";
  }

  // === 이벤트 리스너 등록 ===
  
  // 메뉴 버튼 클릭 시 전체 메뉴 열기
  menuBtn.addEventListener("click", openMenu);
  
  // 닫기 버튼 클릭 시 전체 메뉴 닫기
  closeBtn.addEventListener("click", closeMenu);

  // 검색 입력창에 텍스트 입력 시 X 버튼 표시/숨김 처리
  searchInput.addEventListener("input", function () {
    if (this.value) {
      searchX.style.display = "block";   // 입력 값이 있으면 X 버튼 표시
    } else {
      searchX.style.display = "none";    // 입력 값이 없으면 X 버튼 숨김
    }
  });

  // 검색 초기화 버튼(X) 클릭 시 검색어 초기화
  searchX.addEventListener("click", function () {
    searchInput.value = "";              // 검색 입력창 비우기
    searchX.style.display = "none";      // X 버튼 숨기기
  });

  // ESC 키를 눌렀을 때 열린 메뉴 닫기 (사용자 편의성 향상)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && gnb.classList.contains("active")) {
      closeMenu();
    }
  });
}; // 전체 메뉴 JS기능 실행 함수 ////////////
