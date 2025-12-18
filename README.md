# 강지희 포트폴리오

HTML, CSS, JavaScript 기반 반응형 웹 퍼블리싱

[Portfolio](https://ji579.github.io/) | [jiheene00@naver.com](mailto:jiheene00@naver.com) | [GitHub](https://github.com/ji579)

---

## 소개

웹 퍼블리셔 강지희입니다.  
반응형 웹과 웹 접근성을 고려한 페이지 제작에 관심이 많습니다.

- 반응형 디자인 (PC/Tablet/Mobile)
- 웹 접근성 표준 준수
- 인터랙티브 UI/UX 구현

---

## 기술 스택

**언어 & 라이브러리**  
HTML5, CSS3, JavaScript(ES6+), jQuery

**도구**  
Git, GitHub, Figma, Photoshop, Illustrator, VS Code

---

## 교육

**그린컴퓨터아카데미**  
- 반응형 UI/UX 웹디자인 & 웹퍼블리셔 과정 (2025.06 ~ 2025.11)
- 실무 피그마(Figma) 과정 (2025.02 ~ 2025.03)

---

## 프로젝트

### 01. Kusama Yayoi Website
> 작가 페이지와 미술관 페이지 통합 리뉴얼

**기간:** 2025.08 ~ 10  
**기여도:** 100%

**구현 내용**
- 분리되어 있던 두 페이지를 하나의 플랫폼으로 통합
- 브랜드 컬러와 패턴을 활용한 시각적 일관성 구현
- 정보 구조 재설계로 사용자 동선 개선
- PC/Tablet/Mobile 완전 반응형 제작

**사용 기술:** HTML5, CSS3, JavaScript, jQuery

**링크**  
[Website](https://ji579.github.io/KusamaYayoi/) | [Figma](https://bit.ly/YayoiKusamaWebsiteFigma) | [GitHub](https://github.com/ji579/KusamaYayoi.git) | [프로젝트 문서](./Kusama-Yayoi.pdf)

---

### 02. Saytouche Website
> 브랜드 아이덴티티 중심의 웹사이트

**기간:** 2025.11  
**기여도:** 100%

**구현 내용**
- 스크롤 기반 페이드인 인터랙션 적용
- 브랜드 무드에 맞는 비주얼 스타일 구현
- 이미지 및 디자인 소스 최적화

**사용 기술:** HTML5, CSS3, JavaScript

**링크**  
[Website](https://ji579.github.io/saytouche/index.html) | [GitHub](https://github.com/ji579/saytouche.git)

---

### 03. Vogue Website
> 이커머스 기능이 포함된 반응형 사이트

**기간:** 2025.11  
**기여도:** 100%

**구현 내용**
- 장바구니 기능 (상품 담기, 수량 변경, 금액 계산)
- 로그인 및 회원가입 플로우
- 실제 쇼핑몰과 유사한 UX 구현

**사용 기술:** HTML5, CSS3, JavaScript

**링크**  
[Website](https://ji579.github.io/vogue/) | [Figma](https://bit.ly/3MzpaXf) | [GitHub](https://github.com/ji579/vogue.git)

---

### 04. Sanrio Website
> 기존 사이트 레이아웃 재구성

**기간:** 2025.11  
**기여도:** 100%

**구현 내용**
- 기존 사이트 구조 분석 및 재현
- 프로젝트 목적에 맞게 일부 UI 수정
- 반응형 레이아웃 적용

**사용 기술:** HTML5, CSS3, JavaScript

**링크**  
[Website](https://ji579.github.io/Sanrio/) | [GitHub](https://github.com/ji579/Sanrio.git)

---

## 주요 구현 코드

### 1. 반응형 네비게이션
```css
nav {
  position: fixed;
  top: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 1.8rem 6%;
  z-index: 99;
}
```
스크롤해도 상단에 고정되는 네비게이션. `backdrop-filter`로 배경 흐림 효과를 줘서 콘텐츠 위에서도 가독성을 유지했습니다.

---

### 2. 텍스트 자동 변경 애니메이션
```css
.changing-text::after {
  content: "성장하는";
  animation: textChange 8s ease-in-out infinite;
}

@keyframes textChange {
  0%, 45% { content: "성장하는"; }
  50%, 95% { content: "노력하는"; }
}
```
CSS만으로 "성장하는"과 "노력하는" 텍스트가 8초 주기로 바뀝니다. 자바스크립트 없이 구현했습니다.

---

### 3. 스프라이트 애니메이션
```css
.spani4 {
  background: url(./images/girl_frames3.jpeg) no-repeat;
  animation: spani4X 1.2s steps(3) infinite,
             spani4Y 3.6s steps(2) infinite;
}

@keyframes spani4X {
  to { background-position-x: -978px; }
}
```
하나의 이미지에 여러 프레임을 담아서 `steps()` 함수로 컷 단위로 재생합니다. GIF보다 용량이 적고 제어가 쉽습니다.

---

### 4. 3D 카드 효과
```javascript
el.addEventListener("mousemove", (e) => {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = (y - rect.height / 2) / 10;
  const rotateY = (rect.width / 2 - x) / 10;

  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
```
마우스 위치에 따라 카드가 3D로 기울어집니다. 마우스 좌표와 요소 중심의 거리를 계산해서 회전 각도를 결정합니다.

---

### 5. 가로 스크롤
```javascript
function updateHorizontalScroll() {
  const rect = portplioSpacer.getBoundingClientRect();
  const progress = Math.abs(rect.top) / (portplioSpacer.offsetHeight - window.innerHeight);
  const maxScroll = portplioTrack.scrollWidth - window.innerWidth;

  portplioTrack.style.transform = `translateX(${-progress * maxScroll}px)`;
}

window.addEventListener("scroll", updateHorizontalScroll);
```
세로 스크롤 값을 받아서 가로로 콘텐츠를 움직입니다. 스크롤 진행도를 계산해서 자연스럽게 이동하도록 했습니다.

---

### 6. 모달 시스템
```javascript
document.querySelectorAll(".portplio-card").forEach((card) => {
  card.addEventListener("click", function () {
    const projectId = this.closest(".portplio-item").getAttribute("data-project");
    const project = projects[projectId];

    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("projectModal").classList.add("active");
    document.body.style.overflow = "hidden";
  });
});
```
각 프로젝트 카드를 클릭하면 해당하는 프로젝트 정보를 모달에 표시합니다. `data-project` 속성으로 데이터를 연결했습니다.

---

### 7. 이메일 복사 기능
```javascript
function copyEmail() {
  const email = "jiheene00@naver.com";
  
  navigator.clipboard.writeText(email)
    .then(() => showCopyNotification())
    .catch(() => fallbackCopyEmail(email));
}

function showCopyNotification() {
  const notification = document.createElement("div");
  notification.textContent = "이메일이 복사되었습니다!";
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 2000);
}
```
클립보드 API를 사용해서 이메일을 복사하고, 복사 완료 메시지를 2초간 표시합니다. 구형 브라우저를 위한 대체 방법도 포함했습니다.

---

### 8. 호버 오버레이
```css
.portplio-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.95), rgba(196, 181, 160, 0.95));
  opacity: 0;
  transition: opacity 0.5s ease;
}

.portplio-item:hover .portplio-overlay {
  opacity: 1;
}
```
카드에 마우스를 올리면 그라디언트 오버레이가 나타나면서 프로젝트 정보를 보여줍니다.

---

### 9. 반응형 레이아웃
```css
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .spani4 {
    animation: none;
  }
}
```
1024px, 768px, 480px 세 단계로 레이아웃을 조정합니다. 모바일에서는 성능을 위해 일부 애니메이션을 끕니다.

---

## 연락처

**이메일:** jiheene00@naver.com  
**전화:** 010-3193-3530  
**GitHub:** [github.com/ji579](https://github.com/ji579)  
**포트폴리오:** [ji579.github.io](https://ji579.github.io/)