// 보그 JS 매거진 장바구니 JS - magazine_cart.js

/**
 * 숫자를 세자리마다 콤마로 구분해주는 함수
 * @param {number|string} num
 * @returns {string}
 */
function addComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
 * 장바구니 아이템을 렌더링하는 함수
 * @param {Array} cartItems 장바구니 아이템 배열
 */
function renderCartItems(cartItems) {
  const cartItemsContainer = document.querySelector('.cart-items');
  
  if (!cartItems || cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>장바구니가 비어있습니다.</p>
      </div>
    `;
    updateOrderSummary([]);
    return;
  }

  let cartHTML = '';
  cartItems.forEach((item, index) => {
    cartHTML += `
      <div class="cart-item" data-index="${index}" data-pcode="${item.pcode}">
        <input type="checkbox" class="checkbox item-checkbox" checked />
        <div class="item-image-wrapper">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="item-image"
          />
        </div>
        <div class="item-info">
          <div class="item-top">
            <div class="order-type">일반주문</div>
            <a href="#" class="item-name">${item.name}</a>
            <div class="item-options">
              <span>수량: ${item.quantity}개</span>
              ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
            </div>
            <div class="item-price">${addComma(item.totalPrice)}원</div>
          </div>
          <div class="item-actions">
            <button class="action-btn" onclick="changeQuantity('${item.pcode}', ${index})">수량 변경</button>
            <button class="action-btn" onclick="removeItem('${item.pcode}', ${index})">삭제</button>
          </div>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;
  updateOrderSummary(cartItems);
  updateTabCount();
}

/**
 * 주문 요약 정보를 업데이트하는 함수
 * @param {Array} cartItems 장바구니 아이템 배열
 */
function updateOrderSummary(cartItems) {
  const checkedItems = cartItems.filter((item, index) => {
    const checkbox = document.querySelector(`[data-index="${index}"] .item-checkbox`);
    return checkbox && checkbox.checked;
  });

  const totalAmount = checkedItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = 0; // 무료배송
  const discount = 0; // 할인 없음
  const finalAmount = totalAmount - discount;

  // 결제 정보 업데이트
  document.querySelector('.summary-row .amount').textContent = addComma(totalAmount) + '원';
  document.querySelector('.summary-row.total .amount').textContent = addComma(finalAmount) + '원';
}

/**
 * 탭 메뉴의 개수를 업데이트하는 함수
 */
function updateTabCount() {
  const currentUser = getCurrentUser();
  const cartInfo = localStorage.getItem("cart-info");
  
  let userCartItems = [];
  if (cartInfo) {
    const allCartItems = JSON.parse(cartInfo);
    userCartItems = allCartItems.filter(item => item.userId === currentUser);
  }

  const tabItem = document.querySelector('.tab-item.active');
  if (tabItem) {
    tabItem.textContent = `일반주문(${userCartItems.length})`;
  }
}

/**
 * 장바구니 아이템을 삭제하는 함수
 * @param {string} pcode 상품 코드
 * @param {number} index 아이템 인덱스
 */
function removeItem(pcode, index) {
  if (confirm('이 상품을 장바구니에서 삭제하시겠습니까?')) {
    const currentUser = getCurrentUser();
    const cartInfo = localStorage.getItem("cart-info");
    
    if (cartInfo) {
      let allCartItems = JSON.parse(cartInfo);
      
      // 해당 상품을 배열에서 제거
      allCartItems = allCartItems.filter(item => 
        !(item.pcode === pcode && item.userId === currentUser)
      );
      
      localStorage.setItem("cart-info", JSON.stringify(allCartItems));
      loadCartItems(); // 다시 로드
      
      // 장바구니 개수 업데이트
      if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
      }
    }
  }
}

/**
 * 수량 변경 함수
 * @param {string} pcode 상품 코드
 * @param {number} index 아이템 인덱스
 */
function changeQuantity(pcode, index) {
  const newQuantity = prompt('변경할 수량을 입력하세요:', '1');
  
  if (newQuantity && parseInt(newQuantity) > 0) {
    const currentUser = getCurrentUser();
    const cartInfo = localStorage.getItem("cart-info");
    
    if (cartInfo) {
      let allCartItems = JSON.parse(cartInfo);
      
      // 해당 상품 찾아서 수량 업데이트
      const itemIndex = allCartItems.findIndex(item => 
        item.pcode === pcode && item.userId === currentUser
      );
      
      if (itemIndex !== -1) {
        allCartItems[itemIndex].quantity = parseInt(newQuantity);
        allCartItems[itemIndex].totalPrice = allCartItems[itemIndex].salePrice * parseInt(newQuantity);
        
        localStorage.setItem("cart-info", JSON.stringify(allCartItems));
        loadCartItems(); // 다시 로드
        
        // 장바구니 개수 업데이트
        if (typeof window.updateCartCount === 'function') {
          window.updateCartCount();
        }
      }
    }
  }
}

/**
 * 장바구니 데이터를 로드하고 렌더링하는 함수
 */
function loadCartItems() {
  const currentUser = getCurrentUser();
  console.log("현재 사용자:", currentUser);
  
  const cartInfo = localStorage.getItem("cart-info");
  let userCartItems = [];
  
  if (cartInfo) {
    try {
      const allCartItems = JSON.parse(cartInfo);
      console.log("전체 장바구니 아이템:", allCartItems);
      
      // 현재 사용자의 아이템만 필터링
      userCartItems = allCartItems.filter(item => item.userId === currentUser);
      console.log("사용자별 장바구니 아이템:", userCartItems);
      
    } catch (error) {
      console.error("장바구니 정보 파싱 오류:", error);
    }
  }
  
  renderCartItems(userCartItems);
}

/**
 * 전체 선택/해제 기능
 */
function setupSelectAllCheckbox() {
  const selectAllCheckbox = document.querySelector('.select-controls .checkbox');
  
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const itemCheckboxes = document.querySelectorAll('.item-checkbox');
      itemCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
      updateOrderSummary(getCurrentUserCartItems());
    });
  }
}

/**
 * 개별 체크박스 변경 이벤트 설정
 */
function setupItemCheckboxes() {
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('item-checkbox')) {
      updateOrderSummary(getCurrentUserCartItems());
      
      // 전체 선택 체크박스 상태 업데이트
      const allCheckboxes = document.querySelectorAll('.item-checkbox');
      const checkedCheckboxes = document.querySelectorAll('.item-checkbox:checked');
      const selectAllCheckbox = document.querySelector('.select-controls .checkbox');
      
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allCheckboxes.length === checkedCheckboxes.length;
      }
    }
  });
}

/**
 * 현재 사용자의 장바구니 아이템을 가져오는 함수
 * @returns {Array} 현재 사용자의 장바구니 아이템 배열
 */
function getCurrentUserCartItems() {
  const currentUser = getCurrentUser();
  const cartInfo = localStorage.getItem("cart-info");
  
  if (cartInfo) {
    try {
      const allCartItems = JSON.parse(cartInfo);
      return allCartItems.filter(item => item.userId === currentUser);
    } catch (error) {
      console.error("장바구니 정보 파싱 오류:", error);
    }
  }
  
  return [];
}

/**
 * 선택 삭제 기능
 */
function setupDeleteButton() {
  const deleteButton = document.querySelector('.delete-btn');
  
  if (deleteButton) {
    deleteButton.addEventListener('click', function() {
      const checkedItems = document.querySelectorAll('.item-checkbox:checked');
      
      if (checkedItems.length === 0) {
        alert('삭제할 상품을 선택해주세요.');
        return;
      }
      
      if (confirm(`선택한 ${checkedItems.length}개 상품을 삭제하시겠습니까?`)) {
        const currentUser = getCurrentUser();
        const cartInfo = localStorage.getItem("cart-info");
        
        if (cartInfo) {
          let allCartItems = JSON.parse(cartInfo);
          
          // 체크된 아이템들의 상품코드 수집
          const pcodesToDelete = [];
          checkedItems.forEach(checkbox => {
            const cartItem = checkbox.closest('.cart-item');
            const pcode = cartItem.dataset.pcode;
            pcodesToDelete.push(pcode);
          });
          
          // 해당 상품들을 배열에서 제거
          allCartItems = allCartItems.filter(item => 
            !(pcodesToDelete.includes(item.pcode) && item.userId === currentUser)
          );
          
          localStorage.setItem("cart-info", JSON.stringify(allCartItems));
          loadCartItems(); // 다시 로드
          
          // 장바구니 개수 업데이트
          if (typeof window.updateCartCount === 'function') {
            window.updateCartCount();
          }
        }
      }
    });
  }
}

// 전역 함수로 등록 (HTML에서 호출할 수 있도록)
window.removeItem = removeItem;
window.changeQuantity = changeQuantity;

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
  loadCartItems();
  setupSelectAllCheckbox();
  setupItemCheckboxes();
  setupDeleteButton();
});
