// 보그 JS 매거진 리스트 JS - magazine_list.js

// 매거진 데이터 불러오기
import productsData from '../data/magazine_data.json' with { type: 'json' };

// 숫자를 원화 형식으로 변환
function formatPrice(price) {
  return price.toLocaleString("ko-KR") + "원";
}

// 상품 카드 HTML 생성 함수
function createProductCard(product) {
  const badgeHTML = product.badge
    ? `<span class="badge">${product.badge}</span>`
    : "";

  const priceHTML = product.memberOnly
    ? `<p class="member-only">이 제품은 회원가입후 구매가 가능합니다.</p>`
    : `<span class="sale-price">${formatPrice(product.salePrice)}</span>`;

  return `
                <div class="product-card">
                    <div class="product-image">
                        <span class="discount-badge">${product.discount}</span>
                        ${badgeHTML}
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        <div class="price-box">
                            <span class="original-price">${formatPrice(
                              product.originalPrice
                            )}</span>
                            ${priceHTML}
                        </div>
                    </div>
                </div>
            `;
}

// 상품 렌더링 함수
function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  const productsHTML = productsData.products
    .map((product) => createProductCard(product))
    .join("");
  productGrid.innerHTML = productsHTML;
}

// 페이지 로드 시 상품 렌더링
document.addEventListener("DOMContentLoaded", renderProducts);
