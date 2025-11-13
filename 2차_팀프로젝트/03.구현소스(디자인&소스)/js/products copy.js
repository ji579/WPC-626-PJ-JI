// products.js - 완전한 제품 페이지 시스템
console.log('🚀 products.js 파일 로드 시작');

// 제품 데이터 저장 객체
let productsData = {
  edition: [],
  textiles: [],
  home: [],
  mirror: [],
  lighting: [],
  lifestyle: [],
  goods: []
};

let currentCategory = 'all';
let swiperInstances = [];

// 카테고리 이름
const categoryNames = {
  all: '전체 상품',
  edition: '커스텀제품',
  textiles: '텍스타일',
  home: '홈데코',
  mirror: '거울',
  lighting: '조명',
  lifestyle: '라이프스타일',
  goods: '굿즈'
};

// ========== 1. JSON 파일에서 데이터 로드 ==========
async function loadProductsFromJSON() {
  const categories = ['edition', 'textiles', 'home', 'mirror', 'lighting', 'lifestyle', 'goods'];
  
  console.log('📦 JSON 파일 로딩 시작...');
  console.log('현재 경로:', window.location.href);
  
  try {
    const promises = categories.map(async (cat) => {
      try {
        const url = `./data/${cat}.json`;
        console.log(`🔍 로드 시도: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`❌ ${cat}.json 파일을 찾을 수 없습니다. (${response.status})`);
          return { category: cat, products: [] };
        }
        const data = await response.json();
        console.log(`✅ ${cat} 데이터 로드 완료:`, data.products.length, '개');
        return { category: cat, products: data.products || [] };
      } catch (error) {
        console.error(`❌ ${cat}.json 로드 실패:`, error);
        return { category: cat, products: [] };
      }
    });
    
    const results = await Promise.all(promises);
    
    results.forEach(result => {
      productsData[result.category] = result.products;
    });
    
    console.log('✅ 전체 데이터 로드 완료!');
    console.log('📊 로드된 데이터:', productsData);
    
    // 상품 개수 표시
    const totalCount = Object.values(productsData).reduce((sum, products) => sum + products.length, 0);
    console.log(`📦 총 ${totalCount}개 제품 로드됨`);
    
    // 데이터 로드 후 제품 렌더링
    renderProducts(currentCategory);
    
  } catch (error) {
    console.error('데이터 로드 중 오류:', error);
    const grid = document.getElementById('productsGrid');
    if (grid) {
      grid.innerHTML = '<div class="loading">제품 데이터를 불러올 수 없습니다.</div>';
    }
  }
}

// ========== 2. 전체 제품 가져오기 (랜덤 섞기) ==========
function getAllProducts() {
  const allProducts = [];
  Object.keys(productsData).forEach(category => {
    if (productsData[category] && productsData[category].length > 0) {
      allProducts.push(...productsData[category]);
    }
  });
  return allProducts.sort(() => Math.random() - 0.5);
}

// ========== 3. 제품 카드 HTML 생성 ==========
function createProductCard(product, index) {
  const uniqueId = `prod_${product.category}_${product.id}_${index}`;
  
  return `
    <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
      <div class="product-image-wrapper">
        <div class="swiper product-swiper swiper-${uniqueId}">
          <div class="swiper-wrapper">
            ${product.images.map(img => `
              <div class="swiper-slide">
                <img src="./images/products/${img}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/500x500/f5f5f5/999?text=No+Image'">
              </div>
            `).join('')}
          </div>
          <!-- 좌우 화살표 버튼 -->
          <div class="swiper-button-prev swiper-btn-prev-${uniqueId}"></div>
          <div class="swiper-button-next swiper-btn-next-${uniqueId}"></div>
          <!-- 페이지네이션 (점 표시) -->
          <div class="swiper-pagination swiper-pagi-${uniqueId}"></div>
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <span class="product-status">${product.status}</span>
      </div>
    </div>
  `;
}

// ========== 4. 제품 렌더링 ==========
function renderProducts(category) {
  const grid = document.getElementById('productsGrid');
  const categoryTitle = document.getElementById('category-title-nav');
  const productCount = document.getElementById('product-count');
  
  if (!grid) {
    console.error('productsGrid 요소를 찾을 수 없습니다!');
    return;
  }
  
  console.log(`${category} 카테고리 렌더링 시작...`);
  
  // 기존 Swiper 인스턴스 모두 제거
  swiperInstances.forEach(swiper => {
    if (swiper && swiper.destroy) {
      swiper.destroy(true, true);
    }
  });
  swiperInstances = [];

  // 제품 데이터 가져오기
  let products = category === 'all' ? getAllProducts() : productsData[category] || [];
  
  console.log(`표시할 제품 수: ${products.length}개`);
  
  // 카테고리 타이틀 업데이트
  if (categoryTitle) {
    categoryTitle.textContent = categoryNames[category] || '전체상품';
  }
  
  // 제품 개수 업데이트
  if (productCount) {
    productCount.textContent = `${products.length} items`;
  }
  
  if (products.length === 0) {
    grid.innerHTML = '<div class="loading">상품이 없습니다</div>';
    if (productCount) {
      productCount.textContent = '0 item';
    }
    return;
  }

  // 제품 카드 생성
  grid.innerHTML = products.map((product, index) => createProductCard(product, index)).join('');

  // Swiper 초기화
  initSwiper(products);
}

// ========== 5. Swiper 초기화 (중요!) ==========
function initSwiper(products) {
  setTimeout(() => {
    products.forEach((product, index) => {
      const uniqueId = `prod_${product.category}_${product.id}_${index}`;
      const swiperElement = document.querySelector(`.swiper-${uniqueId}`);
      
      if (swiperElement) {
        try {
          const swiper = new Swiper(`.swiper-${uniqueId}`, {
            // 좌우 화살표 버튼
            navigation: {
              nextEl: `.swiper-btn-next-${uniqueId}`,
              prevEl: `.swiper-btn-prev-${uniqueId}`,
            },
            // 페이지네이션 (점)
            pagination: {
              el: `.swiper-pagi-${uniqueId}`,
              clickable: true,
              type: 'bullets',
            },
            loop: false, // 무한 반복 끄기
            speed: 400, // 전환 속도
            effect: 'slide', // 슬라이드 효과
            grabCursor: true, // 마우스 커서 변경
            slidesPerView: 1, // 한 번에 1개씩
            spaceBetween: 0, // 슬라이드 간격
            
            // 키보드로도 조작 가능
            keyboard: {
              enabled: true,
            },
            
            // 마우스 휠 비활성화
            mousewheel: false,
          });
          
          swiperInstances.push(swiper);
          console.log(`Swiper 초기화 완료: ${uniqueId}`);
        } catch (error) {
          console.error(`Swiper 초기화 실패 (${uniqueId}):`, error);
        }
      } else {
        console.warn(`Swiper 요소를 찾을 수 없음: ${uniqueId}`);
      }
    });
    
    console.log(`총 ${swiperInstances.length}개의 Swiper 초기화 완료`);
  }, 200);
}

// ========== 6. 페이지 초기화 ==========
function initProductsPage() {
  console.log('===== 제품 페이지 초기화 시작 =====');
  
  // URL에서 카테고리 파라미터 읽기
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get('category') || 'all';
  
  console.log('URL 파라미터 카테고리:', urlCategory);
  currentCategory = urlCategory;
  
  // 카테고리 필터 버튼 이벤트 (있는 경우에만)
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (filterButtons.length > 0) {
    console.log('필터 버튼 발견:', filterButtons.length, '개');
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.dataset.category;
        console.log('필터 버튼 클릭:', category);
        
        // 활성 버튼 변경
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // 카테고리 변경
        currentCategory = category;
        renderProducts(category);
        
        // URL 업데이트
        const newUrl = `${window.location.pathname}?category=${category}`;
        window.history.pushState({category: category}, '', newUrl);
        
        // 상단으로 스크롤
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
    
    // 초기 활성 버튼 설정
    const targetButton = document.querySelector(`[data-category="${urlCategory}"]`);
    if (targetButton) {
      filterButtons.forEach(b => b.classList.remove('active'));
      targetButton.classList.add('active');
    }
  }
  
  // JSON 데이터 로드 및 렌더링
  loadProductsFromJSON();
}

// ========== 7. 페이지 로드 시 자동 실행 ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductsPage);
} else {
  setTimeout(initProductsPage, 100);
}

console.log('products.js 로드 완료');