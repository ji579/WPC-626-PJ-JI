// 전역 변수
let swiperInstances = [];
let currentCategory = 'all';
let allProducts = [];

// 카테고리 이름 매핑
const categoryNames = {
  'all': '전체상품',
  'edition': '커스텀제품',
  'textiles': '텍스타일',
  'home': '홈데코',
  'mirror': '거울',
  'lighting': '조명',
  'lifestyle': '라이프스타일',
  'goods': '굿즈',
  'sale': '세일'
};

// ⭐ 카테고리별 배너 이미지 매핑 (새로 추가!)
const categoryBanners = {
  'all': './images/rug1.jpg',
  'edition': './images/edition_banner.jpg',
  'textiles': './images/textiles_banner.jpg',
  'home': './images/home_banner.jpg',
  'mirror': './images/mirror_banner.jpg',
  'lighting': './images/lighting_banner.jpg',
  'lifestyle': './images/lifestyle_banner.jpg',
  'goods': './images/goods_banner.jpg',
  'sale': './images/sale_banner.jpg'
};

// DOM 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
  initProducts();
  initSortButtons();
});

// 상품 초기화
async function initProducts() {
  // URL 파라미터에서 카테고리 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  currentCategory = urlParams.get('category') || 'all';
  
  // ⭐ 배너 이미지 변경 (새로 추가!)
  updateBannerImage(currentCategory);
  
  // 카테고리 제목 업데이트
  updateCategoryTitle(currentCategory);
  
  // 상품 데이터 로드
  await loadProducts(currentCategory);
}

// ⭐ 배너 이미지 업데이트 함수 (새로 추가!)
function updateBannerImage(category) {
  // 배너 이미지 요소 찾기
  const bannerImg = document.querySelector('.banner-box img.bg');
  
  if (bannerImg && categoryBanners[category]) {
    // 배너 이미지 변경
    bannerImg.src = categoryBanners[category];
    
    // alt 텍스트도 변경
    bannerImg.alt = `${categoryNames[category]} 배너`;
    
    console.log(`배너 이미지 변경: ${categoryBanners[category]}`);
  } else {
    console.warn('배너 이미지를 찾을 수 없거나 카테고리가 유효하지 않습니다.');
  }
}

// 상품 데이터 로드
async function loadProducts(category) {
  try {
    if (category === 'all') {
      // 전체 상품 로드
      allProducts = await loadAllProducts();
    } else {
      // 특정 카테고리 로드 - data 폴더에서 읽기
      const response = await fetch(`./data/${category}.json`);
      const data = await response.json();
      allProducts = data.products;
    }
    
    // 상품 렌더링
    renderProducts(allProducts);
    updateProductCount(allProducts.length);
    
  } catch (error) {
    console.error('상품 로드 실패:', error);
    document.getElementById('productsGrid').innerHTML = 
      '<div class="loading">상품을 불러올 수 없습니다.</div>';
  }
}

// 전체 카테고리 상품 로드
async function loadAllProducts() {
  const categories = ['edition', 'textiles', 'home', 'mirror', 'lighting', 'lifestyle', 'goods'];
  
  try {
    // 모든 파일을 동시에 불러오기 - data 폴더에서
    const promises = categories.map(cat => 
      fetch(`./data/${cat}.json`)
        .then(res => res.json())
        .catch(err => {
          console.warn(`${cat}.json 로드 실패:`, err);
          return { products: [] };
        })
    );
    
    const results = await Promise.all(promises);
    
    // 모든 products 배열 합치기
    const allProducts = results.flatMap(data => data.products || []);
    
    return allProducts;
  } catch (error) {
    console.error('전체 상품 로드 실패:', error);
    return [];
  }
}

// 상품 렌더링
function renderProducts(products) {
  const productsGrid = document.getElementById('productsGrid');
  
  if (!productsGrid) {
    console.error('productsGrid not found');
    return;
  }
  
  // 기존 Swiper 인스턴스 제거
  destroySwipers();
  
  // 그리드 초기화
  productsGrid.innerHTML = '';
  
  if (!products || products.length === 0) {
    productsGrid.innerHTML = '<div class="loading">해당 카테고리에 상품이 없습니다.</div>';
    return;
  }
  
  // 상품 카드 생성
  products.forEach((product, index) => {
    const card = createProductCard(product, index);
    productsGrid.appendChild(card);
  });
  
  // Swiper 초기화
  setTimeout(() => {
    initSwipers();
  }, 100);
}

// 상품 카드 생성
function createProductCard(product, index) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-product-id', product.id);
  
  // 이미지 슬라이드 생성
  const imageSlides = product.images.map(imgFileName => {
    const imgPath = `./images/products/${imgFileName}`;
    return `
      <div class="swiper-slide">
        <img src="${imgPath}" alt="${product.name}" loading="lazy" />
      </div>
    `;
  }).join('');
  
  card.innerHTML = `
    <!-- 이미지 슬라이더 -->
    <div class="product-image-wrapper">
      <div class="swiper product-swiper" data-index="${index}">
        <div class="swiper-wrapper">
          ${imageSlides}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    
    <!-- 상품 정보 -->
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-price">${product.price}</div>
    </div>
  `;
  
  // 카드 클릭 이벤트
  card.addEventListener('click', function(e) {
    // 버튼/슬라이더 클릭 시 제외
    if (
      e.target.closest('.swiper-button-prev') || 
      e.target.closest('.swiper-button-next') ||
      e.target.closest('.swiper-pagination')
    ) {
      return;
    }
    goToProductDetail(product.id);
  });
  
  return card;
}

// Swiper 초기화
function initSwipers() {
  const swiperElements = document.querySelectorAll('.product-swiper');
  
  swiperElements.forEach((swiperEl) => {
    const swiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true, // 무한 루프 활성화
      loopAdditionalSlides: 1, // 무한 루프를 부드럽게
      autoplay: false,
      speed: 300,
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-button-next'),
        prevEl: swiperEl.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: swiperEl.querySelector('.swiper-pagination'),
        clickable: true,
      },
      allowTouchMove: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      centeredSlides: true, // 슬라이드 중앙 정렬
      loopPreventsSliding: false, // 루프 전환 중에도 슬라이딩 허용
    });
    
    swiperInstances.push(swiper);
  });
}

// Swiper 인스턴스 제거
function destroySwipers() {
  swiperInstances.forEach(swiper => {
    if (swiper && swiper.destroy) {
      swiper.destroy(true, true);
    }
  });
  swiperInstances = [];
}

// 카테고리 제목 업데이트
function updateCategoryTitle(category) {
  const titleElement = document.getElementById('category-title-nav');
  if (titleElement && categoryNames[category]) {
    titleElement.textContent = categoryNames[category];
  }
}

// 상품 개수 업데이트
function updateProductCount(count) {
  const countElement = document.getElementById('product-count');
  if (countElement) {
    countElement.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  }
}

// 정렬 버튼 초기화
function initSortButtons() {
  const sortLinks = document.querySelectorAll('.sort_link');
  
  sortLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 활성화 클래스 토글
      sortLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      const sortType = this.getAttribute('data-sort');
      sortProducts(sortType);
    });
  });
}

// 상품 정렬
function sortProducts(sortType) {
  let sortedProducts = [...allProducts];
  
  switch(sortType) {
    case 'new':
      sortedProducts.sort((a, b) => b.id - a.id);
      break;
    case 'low':
      sortedProducts.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceA - priceB;
      });
      break;
    case 'high':
      sortedProducts.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceB - priceA;
      });
      break;
    case 'popular':
      sortedProducts.sort((a, b) => a.id - b.id);
      break;
    default:
      break;
  }
  
  // 모든 정렬 링크의 active 클래스 제거
  document.querySelectorAll('.sort_link').forEach(link => {
    link.style.borderBottom = 'none';
    link.style.fontWeight = 'normal';
  });
  
  // 선택된 링크에 스타일 적용
  const activeLink = document.querySelector(`[data-sort="${sortType}"]`);
  if (activeLink) {
    activeLink.style.borderBottom = '2px solid #000';
    activeLink.style.fontWeight = 'bold';
  }
  
  renderProducts(sortedProducts);
}

// 상품 상세 페이지로 이동
function goToProductDetail(productId) {
  console.log(`상품 ${productId} 상세 페이지로 이동`);
  // 실제 구현 시 상세 페이지 URL로 이동
  // window.location.href = `product-detail.html?id=${productId}`;
}