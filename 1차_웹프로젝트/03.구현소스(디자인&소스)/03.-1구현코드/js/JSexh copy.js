import exhibInfo from "../data/exb_data.js";

console.log("전시 데이터 가져옴:", exhibInfo);

function loadExhibitionData(exhibitIndex = 0) {
  if (!exhibInfo || exhibInfo.length === 0 || !exhibInfo[exhibitIndex]) {
    console.error(
      `Exhibition data for index ${exhibitIndex} is missing or empty.`
    );
    return;
  }

  const data = exhibInfo[exhibitIndex];
  const exhibitNum = data.index;

  // --- 1. 텍스트 및 정보 삽입 로직 ---

  // 전시 제목
  const titleEl = document.querySelector(".sa1 .title strong");
  if (titleEl) {
    const formattedTitle = data.title.replace(/\n/g, "<br/>");
    titleEl.innerHTML = formattedTitle;
  }

  // 이미지 캡션 (imgtxt1 ~ imgtxt3)
  const imgtxt1El = document.querySelector(".sa1 .imgtxt1");
  if (imgtxt1El)
    imgtxt1El.innerHTML = data.imgtxt1.replace(/\n/g, "<br>").trim();

  const imgtxt2El = document.querySelector(".sa3 .imgtxt2");
  if (imgtxt2El) {
    const cleanedImgtxt2 = data.imgtxt2
      .replace(" L:", "<br>L:")
      .replace(" R:", "<br>R:")
      .replace(/\s+/g, " ");
    imgtxt2El.innerHTML = cleanedImgtxt2.replace(/\n/g, "<br>").trim();
  }

  const imgtxt3El = document.querySelector(".sa4 .imgtxt3");
  if (imgtxt3El)
    imgtxt3El.innerHTML = data.imgtxt3.replace(/\n/g, "<br>").trim();

  // imgtxt4 데이터 누락 예외 처리 및 삽입
  const imgtxt4Element = document.querySelector(".sa4 .imgtxt4");
  const imgbx3Element = document.querySelector(".sa4 .imgbx3");

  if (!imgtxt4Element || !imgbx3Element) {
    console.warn(".sa4 .imgtxt4 또는 .sa4 .imgbx3 요소가 HTML에 없습니다.");
  }

  if (!data.imgtxt4 || data.imgtxt4.trim() === "") {
    if (imgtxt4Element) imgtxt4Element.style.display = "none";
    if (imgbx3Element) imgbx3Element.style.display = "none";
  } else {
    if (imgtxt4Element) {
      imgtxt4Element.innerHTML = data.imgtxt4;
      imgtxt4Element.style.display = "";
    }
    if (imgbx3Element) {
      imgbx3Element.style.display = "";
    }
  }

  // 전시 설명 텍스트 (exbtxt)
  const exbtxtElement = document.querySelector(".sa2 .exbtxt");
  if (exbtxtElement) {
    const formattedExbtxt = data.exbtxt.replace(/\n/g, "<br/>");
    exbtxtElement.innerHTML = formattedExbtxt;
  }

  // 전시 날짜
  const dateEl = document.querySelector(".sa5 .dates_box .date");
  if (dateEl) dateEl.textContent = data.date;

  // --- 2. 이미지 로드 및 예외 처리 로직 ---
  const imgElements = [
    document.querySelector(".sa1 .modal-img img"), // i=0 (exbX.jpg)
    document.querySelector(".sa3 .imgbx1 img:nth-child(1)"), // i=1 (exbX-1.jpg)
    document.querySelector(".sa3 .imgbx1 img:nth-child(2)"), // i=2 (exbX-2.jpg)
    document.querySelector(".sa4 .imgbx2 img:nth-child(1)"), // i=3 (exbX-3.jpg)
    document.querySelector(".sa4 .imgbx2 img:nth-child(2)"), // i=4 (exbX-4.jpg)
    document.querySelector(".sa4 .imgbx3 img"), // i=5 (exbX-5.jpg)
  ];

  // .imgbx2 컨테이너를 미리 찾습니다.
  const imgbx2Container = document.querySelector(".sa4 .imgbx2");
  if (imgbx2Container) {
    imgbx2Container.style.display = "";
  }

  imgElements.forEach((img, i) => {
    if (!img) return;

    const suffix = i === 0 ? "" : `-${i}`;
    const imgSrc = `./images/exb${exhibitNum}${suffix}.jpg`;

    // 이미지 로드 실패 시 실행될 핸들러
    const handleError = function () {
      const parentDiv = img.closest("div.imgbx");
      img.style.display = "none";

      if (parentDiv) {
        if (i === 1 || i === 2 || i === 5) {
          parentDiv.style.display = "none";
          if (parentDiv.classList.contains("imgbx3") && imgtxt4Element) {
            imgtxt4Element.style.display = "none";
          }
        }

        if ((i === 3 || i === 4) && imgbx2Container) {
          imgbx2Container.style.display = "none";
        }
      }

      if (i === 0) {
        const modalImgSection = img.closest("section.modal-img");
        if (modalImgSection) modalImgSection.style.display = "none";
      }

      console.warn(`이미지를 찾을 수 없어 요소를 숨겼습니다: ${imgSrc}`);
    };

    // 이미지가 이전에 display: none 상태였을 경우를 대비해 다시 보이게 설정
    const parentDiv = img.closest("div.imgbx");
    if (parentDiv && parentDiv !== imgbx2Container) {
      img.style.display = "";
      parentDiv.style.display = "";
    } else if (i === 0) {
      img.style.display = "";
      const modalImgSection = img.closest("section.modal-img");
      if (modalImgSection) modalImgSection.style.display = "";
    } else if ((i === 3 || i === 4) && imgbx2Container) {
      img.style.display = "";
    }

    // 이미지 경로 설정 및 예외 처리 추가
    img.src = imgSrc;
    img.onerror = handleError;
  });
}

// DOMContentLoaded 리스너 (통합)
window.addEventListener("DOMContentLoaded", () => {
  console.log("통합 스크립트 로딩 완료!");

  // ---------------------- 0. 전시 데이터 로드 및 초기화 ----------------------
  loadExhibitionData(0);

  // ---------------------- 1. 상단 라디오 버튼 로직 ----------------------
  const linkLabels = document.querySelectorAll(".check label");

  function handleLabelClick() {
    const targetUrl = this.getAttribute("data-url");
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  }

  const currentPath = window.location.pathname.split("/").pop();

  linkLabels.forEach((label) => {
    label.addEventListener("click", handleLabelClick);

    const labelUrl = label.getAttribute("data-url");

    if (labelUrl && labelUrl === currentPath) {
      const inputId = label.getAttribute("for");
      const input = document.getElementById(inputId);

      if (input) {
        input.checked = true;
      }
    }
  });

  // ---------------------- 2. 전시 리스트 생성 ----------------------
  const wrap = document.querySelector(".wrap");
  
  if (wrap) {
    console.log("대상:", wrap);

    const workTitle = [
      "I WOULD OVERCOME DEATH AND GO ON LIVING",
      "Yayoi Kusama: Portraying the Figurative",
      "Visionary Colors",
      "Yayoi Kusama's Self-Obliteration/Psychedelic World",
      "EVERY DAY I PRAY FOR LOVE",
      "A POEM IN MY HEART",
      "Midway Between Mystery and Symbol: Yayoi Kusama's Monochrome",
      "THE VISION OF FANTASY THAT WE HAVE NEVER SEEN IS THIS SPLENDOR",
      "ZERO IS INFINITY　ZERO and Yayoi Kusama",
      "SPIRITS OF AGGREGATION",
      "HERE, ANOTHER NIGHT COMES FROM TRILLIONS OF LIGHT YEARS AWAY: Eternal Infinity",
      "I Want You to Look at My Prospects for the Future: Plants and I",
      "Here, Now, I have Reached the Grandest Start of My Life",
      "Creation is a Solitary Pursuit, Love is What Brings You Closer to Art",
    ];

    const workDate = [
      "Oct 17, 2024 - Mar 9, 2025",
      "Apr 27, 2024 – Sep 1, 2024",
      "Nov 9, 2023 - Mar 24, 2024",
      "Apr 29, 2023 - Sep 18, 2023",
      "Oct 7, 2022 - Feb 26, 2023",
      "Mar 3, 2022 - Aug 28, 2022",
      "Apr 29, 2021 - Dec 26, 2021",
      "Jul 30, 2020 - Mar 29, 2021",
      "Mar 5 - May 31, 2020",
      "Oct 10, 2019 - Jan 31, 2020",
      "Apr 4 - Aug 31, 2019",
      "Oct 4, 2018 - Feb 28, 2019",
      "Apr 1 - Aug 31, 2018",
      "Oct 1, 2017 - Feb 25, 2018",
    ];

    let hCode = "<section class='exbsbox'>";

    // 수정: i는 0부터 시작, 이미지는 exb(i+1).jpg 사용
    for (let i = 0; i < 14; i++) {
      hCode += `
        <ul class="list" onclick="openModalWithIndex(${i + 1})">
          <li class="exb">
            <img src="./images/exb${i + 1}.jpg" alt="paint" class="img-box">
          </li>
          <li class="exbtxt">
            <h3>${workTitle[i]}</h3>
            <h4>${workDate[i]}</h4>
          </li>
        </ul>
      `;
    }

    hCode += "</section>";
    wrap.innerHTML = hCode;
  }

  // ---------------------- 3. 페이지 내비게이션 active 클래스 ----------------------
  const navLinks = document.querySelectorAll('.line1 a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---------------------- 4. Modal (수직 Swiper) 및 스크롤 로직 ----------------------
  const modal = document.getElementById("modal");
  const modalBoxDiv = document.querySelectorAll(".modal-box > .swiper-slide");
  const boxes = document.querySelectorAll(".modal-box .scroll-act");
  const upButton = document.getElementById("upBtn");

  let modalSwiper;

  modalSwiper = new Swiper(".modalSwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    initialSlide: 0,
    mousewheel: false,
    on: {
      slideChange: function () {
        boxes.forEach((box) => {
          box.classList.remove("on");
        });

        boxes[this.realIndex].classList.add("on");

        const lastIndex = this.slides.length - 1;

        if (this.realIndex === lastIndex) {
          upButton.style.display = "block";
        } else {
          upButton.style.display = "none";
        }
      },
    },
  });

  let stopWheel = false;
  const TIME_GAP = 600;

  function blockWheel() {
    if (stopWheel) return true;

    stopWheel = true;

    setTimeout(() => {
      stopWheel = false;
    }, TIME_GAP);

    return false;
  }

  modalBoxDiv.forEach((el) => {
    el.addEventListener(
      "wheel",
      function (e) {
        if (blockWheel()) {
          e.preventDefault();
          return;
        }

        const d = e.deltaY;

        if (d > 0) {
          if (
            Math.ceil(el.scrollTop + el.clientHeight) >=
            el.scrollHeight - 1
          ) {
            e.preventDefault();
            modalSwiper.slideNext(300);

            setTimeout(() => {
              el.scrollTop = 0;
            }, 300);
          }
        } else if (d < 0) {
          if (el.scrollTop <= 0) {
            e.preventDefault();
            modalSwiper.slidePrev(300);

            setTimeout(() => {
              el.scrollTop = 0;
            }, 300);
          }
        }
      },
      { passive: false }
    );
  });

  // ---------------------- 5. 모달 제어 함수 (전역 노출) ----------------------
  window.openModalWithIndex = function (exhibitDataIndex) {
    modal.style.display = "block";
    document.body.classList.add("modal-open");

    boxes.forEach((box) => {
      box.scrollTop = 0;
      box.classList.remove("on");
    });

    loadExhibitionData(exhibitDataIndex);

    if (modalSwiper) modalSwiper.slideTo(0, 0);

    if (boxes.length > 0) boxes[0].classList.add("on");

    upButton.style.display = "none";
  };

  window.closeModal = function () {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    upButton.style.display = "none";
    boxes.forEach((box) => box.classList.remove("on"));
  };

  window.scrollToTop = function () {
    modalSwiper.slideTo(0, 0);
  };

  // ---------------------- 6. 초기 모달 설정 (깜빡임 방지) ----------------------
  (() => {
    document.body.classList.add("modal-open");
    modal.style.display = "block";
    modal.style.opacity = 0;

    boxes.forEach((box) => {
      box.scrollTop = 0;
      box.classList.remove("on");
    });

    loadExhibitionData(1);

    if (modalSwiper) modalSwiper.slideTo(0, 0);
    if (boxes.length > 0) boxes[0].classList.add("on");

    upButton.style.display = "none";

    setTimeout(() => {
      modal.style.display = "none";
      modal.style.opacity = 1;
      document.body.classList.remove("modal-open");
    }, 100);
  })();

  // ---------------------- 7. 스크롤 이벤트 (하단 영역 감지) ----------------------
  const getBCR = (el) => el.getBoundingClientRect().top;
  const target = document.querySelector('.bottom-area');
  const chgBox = document.querySelector('main');
  let winH = window.innerHeight;

  if (target && chgBox) {
    window.addEventListener('scroll', () => {
      let tgPos = getBCR(target);
      if (tgPos < winH) {
        chgBox.classList.add('end');
      } else {
        chgBox.classList.remove('end');
      }
    });
  }

  // ---------------------- 8. 라벨 클릭 이벤트 (이벤트 위임) ----------------------
  document.addEventListener('click', (e) => {
    const label = e.target.closest('label[data-url]');
    if (label) {
      const url = label.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    }
  });
});