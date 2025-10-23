import exhibInfo from "../data/exb_data.js";

console.log("전시 데이터 가져옴:", exhibInfo);

// =======================================================

// 📌 2. 데이터 로딩 및 이미지 처리 함수

// =======================================================

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

  if(titleEl) {
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
        // 1. replace()를 사용하여 줄바꿈 문자를 <br/>로 변경
        // 주의: 이 방식은 단일 줄바꿈(`\n`)만 <br/>로 바꾸므로, 
        // 문단 구분이 아닌 줄바꿈 처리용으로 적합합니다. 
        const formattedExbtxt = data.exbtxt.replace(/\n/g, "<br/>");

        // 2. innerHTML에 할당하여 <br/>이 HTML 태그로 인식되도록 합니다.
        exbtxtElement.innerHTML = formattedExbtxt;
    }

  // 전시 날짜

  const dateEl = document.querySelector(".sa5 .dates_box .date");

  if (dateEl) dateEl.textContent = data.date;

  // --- 2. 이미지 로드 및 예외 처리 로직 (⭐️ 핵심 수정 부분) ---

  const imgElements = [
    document.querySelector(".sa1 .modal-img img"), // i=0 (exbX.jpg)

    document.querySelector(".sa3 .imgbx1 img:nth-child(1)"), // i=1 (exbX-1.jpg)

    document.querySelector(".sa3 .imgbx1 img:nth-child(2)"), // i=2 (exbX-2.jpg)

    document.querySelector(".sa4 .imgbx2 img:nth-child(1)"), // i=3 (exbX-3.jpg)

    document.querySelector(".sa4 .imgbx2 img:nth-child(2)"), // i=4 (exbX-4.jpg)

    document.querySelector(".sa4 .imgbx3 img"), // i=5 (exbX-5.jpg)
  ];

  // .imgbx2 컨테이너를 미리 찾습니다. (i=3, i=4의 부모 컨테이너)

  const imgbx2Container = document.querySelector(".sa4 .imgbx2");

  if (imgbx2Container) {
    // 이미지가 로드되기 전에 일단 보이게 설정합니다 (이전 실패 이력을 초기화).

    imgbx2Container.style.display = "";
  }

  imgElements.forEach((img, i) => {
    if (!img) return;

    const suffix = i === 0 ? "" : `-${i}`;

    const imgSrc = `./images/exb${exhibitNum}${suffix}.jpg`;

    // 이미지 로드 실패 시 실행될 핸들러

    const handleError = function () {
      const parentDiv = img.closest("div.imgbx");

      img.style.display = "none"; // 개별 이미지를 숨김

      if (parentDiv) {
        // i=1, 2, 5 (imgbx1, imgbx3)의 경우

        if (i === 1 || i === 2 || i === 5) {
          parentDiv.style.display = "none";

          if (parentDiv.classList.contains("imgbx3") && imgtxt4Element) {
            imgtxt4Element.style.display = "none";
          }
        }

        // ⭐️ i=3 또는 i=4 (imgbx2 내부)의 경우:

        // 어느 하나라도 실패하면 부모인 imgbx2 전체를 숨깁니다.

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
      // imgbx2는 위에서 처리했으므로 제외

      img.style.display = "";

      parentDiv.style.display = "";
    } else if (i === 0) {
      img.style.display = "";

      const modalImgSection = img.closest("section.modal-img");

      if (modalImgSection) modalImgSection.style.display = "";
    } else if ((i === 3 || i === 4) && imgbx2Container) {
      // imgbx2 안의 개별 이미지는 일단 보이게 설정합니다.

      img.style.display = "";
    }

    // 이미지 경로 설정 및 예외 처리 추가

    img.src = imgSrc;

    img.onerror = handleError;
  });
}

// =======================================================

// 📌 3. DOMContentLoaded 리스너

// =======================================================

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

  window.addEventListener("load", () => {
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
  });

  // ---------------------- 2. Past Exhibition (가로 Swiper) 로직 ----------------------

  let mainSwiperInstance;

  // '전시.js'에서 가져온 exhibInfo를 기반으로 제목과 날짜를 추출하거나,

  // 기존에 하드코딩된 배열을 사용합니다. (현재 코드는 하드코딩된 workTitle/workDate를 사용)

  const workTitle = [
    "I WOULD OVERCOME DEATH AND GO ON LIVING",
    "Yayoi Kusama: Portraying the Figurative",

    "Visionary Colors",
    "Yayoi Kusama’s Self-Obliteration/Psychedelic World",

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
    " Apr 27, 2024 – Sep 1, 2024",

    "Nov 9, 2023 - Mar 24, 2024",
    " Apr 29, 2023 - Sep 18, 2023",

    "Oct7, 2022 - Feb 26, 2023",
    "Mar 3, 2022 - Aug 28, 2022",

    "Apr 29, 2021 - Dec 26, 2021",
    "Jul 30, 2020 - Mar 29, 2021",

    "Mar 5 - May 31, 2020",
    "Oct 10, 2019 - Jan 31, 2020",

    "Apr 4 - Aug 31, 2019",
    "Oct 4, 2018 - Feb 28, 2019",

    "Apr 1 -Aug 31, 2018",
    "Oct 1, 2017 - Feb 25, 2018",
  ];

  let hCode = "";

  const totalSlides = workTitle.length;

  for (let i = 1; i <= totalSlides; i++) {
    // openModalWithIndex(i - 1)는 exhibInfo의 인덱스입니다.

    //

    hCode += `

            <div class="exb-box swiper-slide" onclick="openModalWithIndex(${i})">

                <div class="exbtxt">

                    <h3>${workTitle[i - 1]}</h3>

                    <h4>${workDate[i - 1]}</h4>

                    <img src="./images/exb${i + 1}.jpg" alt="paint">

                </div>

            </div>

            `;
  }

  const mainSwiperWrapper = document.querySelector(
    ".wrap .swiper .swiper-wrapper"
  );

  if (mainSwiperWrapper) {
    mainSwiperWrapper.innerHTML = hCode;
  } else {
    console.error(
      "Error: Past Exhibition 목록의 .swiper-wrapper 요소를 찾을 수 없습니다."
    );

    return;
  }

  mainSwiperInstance = new Swiper(".mySwiper", {
    slidesPerView: 4,

    spaceBetween: 30,

    centeredSlides: true,

    initialSlide: 0,

    pagination: {
      el: ".swiper-pagination",

      type: "custom",

      renderCustom: function (swiper, current, total) {
        let paginationHTML = "";

        for (let i = 0; i < workTitle.length; i++) {
          const isActive =
            swiper.activeIndex === i
              ? "swiper-pagination-bullet swiper-pagination-bullet-active"
              : "swiper-pagination-bullet";

          paginationHTML += `<span class="${isActive}" data-index-target="${i}">

                                                <span class="line">

                                                <i></i>

                                                </span>

                                            </span>`;
        }

        return paginationHTML;
      },
    },

    on: {
      slideChange: function () {
        this.pagination.render();

        this.pagination.update();
      },
    },
  });

  const paginationContainer = document.querySelector(".swiper-pagination");

  if (paginationContainer) {
    paginationContainer.addEventListener("click", function (e) {
      const clickedBullet = e.target.closest(".swiper-pagination-bullet");

      if (clickedBullet) {
        e.preventDefault();

        e.stopPropagation();

        const targetIndex = parseInt(
          clickedBullet.getAttribute("data-index-target"),
          10
        );

        if (!isNaN(targetIndex) && mainSwiperInstance) {
          mainSwiperInstance.slideTo(targetIndex, 500);
        }
      }
    });
  }

  // ---------------------- 3. Modal (수직 Swiper) 및 스크롤 로직 ----------------------

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

  // ---------------------- 모달 제어 함수 (전역 노출) ----------------------

  window.openModalWithIndex = function (exhibitDataIndex) {
    modal.style.display = "block";

    document.body.classList.add("modal-open");

    // ⭐️ 새로운 전시 데이터 및 이미지 로드

    loadExhibitionData(exhibitDataIndex);

    modalSwiper.slideTo(0, 0);

    boxes.forEach((box) => box.classList.remove("on"));

    if (boxes.length > 0) {
      boxes[0].classList.add("on");
    }

    upButton.style.display = "none";
  };

  window.closeModal = function () {
    modal.style.display = "none";

    document.body.classList.remove("modal-open");

    currentBoxIndex = 0;

    upButton.style.display = "none";

    boxes.forEach((box) => box.classList.remove("on"));
  };

  window.scrollToTop = function () {
    modalSwiper.slideTo(0, 500);
  };

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      window.closeModal();
    }
  });
});
