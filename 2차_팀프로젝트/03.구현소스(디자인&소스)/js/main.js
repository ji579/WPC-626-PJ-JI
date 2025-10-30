window.addEventListener("load", () => {
  const header = document.querySelector(".top");
  const menuPart = document.querySelector(".menu-part");

  const headerHeight = header.offsetHeight; // ✅ 헤더 높이 구하기
  const menuTop = menuPart.offsetTop - headerHeight; // ✅ 헤더 높이만큼 보정

  let prevScroll = 0;
  let locked = false;

  window.addEventListener("scroll", () => {
    let curScroll = window.scrollY;

    // ✅ menu-part “시작점”에서 잠깐 걸리게
    if (!locked && curScroll >= menuTop && curScroll <= menuTop + 10) {
      locked = true;
      // 화면을 menu-part의 시작 부분에 정확히 고정
      window.scrollTo({ top: menuTop, behavior: "smooth" });

      // 잠깐(0.8초) 뒤 스크롤 다시 허용
      setTimeout(() => {
        locked = false;
      }, 5000);
    }

    // ✅ 기존 헤더 스크롤 반응 유지
    if (prevScroll < curScroll && curScroll > 50) {
      header.classList.add("scrolled");
    } else if (prevScroll > curScroll && curScroll < 50) {
      header.classList.remove("scrolled");
    }

    prevScroll = curScroll;
  });
});