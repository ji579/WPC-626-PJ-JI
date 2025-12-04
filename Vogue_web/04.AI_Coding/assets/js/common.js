// 보그 코리아 공통 JS - common.js
// Header와 Footer를 jQuery load() 메서드로 불러오기

// html요소 로드후 실행할 JS 불러오기
import goToPage from "./func/linksys.js";

// 헤더 전체메뉴 기능 JS 불러오기
import initTotalMenu from "./func/total_menu.js";

// 스크롤 헤더 토글 JS 불러오기
import scrollHeaderToggle from "./func/scroll_header_toggle.js";

// 로그인 세션 체크 JS 불러오기
import loginSession from "./func/login_session.js";

$(document).ready(function() {
  // 헤더 로드
  $("#header-area").load("./inc/header.html", function(response, status, xhr) {
    if (status == "error") {
      console.log("Header 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else { // 성공시 실행구역
      console.log("Header 로드 성공");
      // 헤더로드 후 실행하는 JS 코드
      goToPage();
      
      // 스크롤 헤더 토글 기능 실행 추가
      scrollHeaderToggle();

      // 로그인 세션 체크 함수 실행 추가
      loginSession();

      // 장바구니 기능 초기화
      initCartFunctions();

        // 전체 메뉴 기능 초기화
      initTotalMenu();

    }
  });

  // 푸터 로드
  $("#footer-area").load("./inc/footer.html", function(response, status, xhr) {
    if (status == "error") {
      console.log("Footer 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else {
      console.log("Footer 로드 성공");
    }
  });
});

/**
 * 현재 로그인된 사용자 정보를 가져오는 함수
 * @returns {string} 사용자 ID 또는 'guest'
 */
function getCurrentUser() {
  const logInfo = sessionStorage.getItem("loginfo");
  
  if (logInfo) {
    try {
      const loginData = JSON.parse(logInfo);
      return loginData.userid || "guest";
    } catch (error) {
      console.error("로그인 정보 파싱 오류:", error);
      return "guest";
    }
  }
  
  return "guest";
}

/**
 * 현재 사용자의 장바구니 개수를 가져오는 함수
 * @returns {number} 장바구니 아이템 개수
 */
function getCartCount() {
  const currentUser = getCurrentUser();
  const cartInfo = localStorage.getItem("cart-info");
  
  if (cartInfo) {
    try {
      const allCartItems = JSON.parse(cartInfo);
      const userCartItems = allCartItems.filter(item => item.userId === currentUser);
      return userCartItems.length;
    } catch (error) {
      console.error("장바구니 정보 파싱 오류:", error);
    }
  }
  
  return 0;
}

/**
 * 장바구니 개수 표시를 업데이트하는 함수
 */
function updateCartCount() {
  const count = getCartCount();
  const cartCountElement = document.querySelector('.cart-count');
  
  if (cartCountElement) {
    cartCountElement.textContent = count;
    
    // 비어있으면 회색, 있으면 빨간색
    if (count === 0) {
      cartCountElement.classList.add('empty');
    } else {
      cartCountElement.classList.remove('empty');
    }
  }
}

/**
 * 장바구니 기능 초기화
 */
function initCartFunctions() {
  // 장바구니 개수 업데이트
  updateCartCount();
  
  // 장바구니 버튼 클릭 이벤트
  $(document).on('click', '.cart-btn', function() {
    window.location.href = './magazine_cart.html';
  });
  
  // 로컬스토리지 변경 감지 (다른 탭에서 장바구니 변경시)
  window.addEventListener('storage', function(e) {
    if (e.key === 'cart-info') {
      updateCartCount();
    }
  });
}

/**
 * 장바구니 추가 후 사용자에게 선택지 제공하는 함수
 * @param {string} productName 상품명
 */
function showCartChoiceModal(productName) {
  const choice = confirm(
    `${productName}이(가) 장바구니에 추가되었습니다.\n\n` +
    '장바구니로 이동하시겠습니까?\n\n' +
    '확인: 장바구니로 이동\n' +
    '취소: 계속 쇼핑하기'
  );
  
  if (choice) {
    // 장바구니로 이동
    window.location.href = './magazine_cart.html';
  } else {
    // 매거진 리스트로 이동
    window.location.href = './magazine_list.html';
  }
}

// 전역 함수로 노출 (다른 파일에서 사용할 수 있도록)
window.updateCartCount = updateCartCount;
window.showCartChoiceModal = showCartChoiceModal;