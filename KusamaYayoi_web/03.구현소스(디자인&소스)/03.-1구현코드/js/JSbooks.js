// JS3-4.for문연습2 //////

// 로딩구역 //////////
// DOMContentLoaded 이벤트는 html태그만 모두 로딩되면
// 발생하는 이벤트다! load 이벤트보다 속도가 빠르다!
// 외부 JS호출시 defer를 사용하지 않으면 아래와 같이
// 이벤트 셋팅해야한다!
//  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

window.addEventListener("DOMContentLoaded", () => {
  // console.log("로딩완료!");

  // 0. 요구사항분석 ////
  // 이미지개수만큼 for문을 돌려서 html태그를
  // 반복적으로 생성하여 대상요소에 삽입해준다!

  // 1. 대상선정 : .wrap
  const wrap = document.querySelector(
    ".wrap"

    //   // 문제시 삭제
    //   ,{

    //      // 블릿 셋팅
    //     pagination: {
    //       el: ".pagingList",
    //       /* 블릿클릭 작동여부 */
    //       clickable: true,
    //     },
    //     // 양쪽이동버튼 셋팅
    //     navigation: {
    //       nextEl: ".abtn ab2",
    //       prevEl: ".abtn ab1",
    //     },
    // } // 삭제하는 구간
  );
  const pagingList = document.querySelectorAll(".dot");

  const UNIT_NUM = 8;
  console.log("대상:", wrap);

  const workTitle = [
    "『 Infinity Net: The Autobiography of Yayoi Kusama 』",
    "『 Yayoi Kusama: Festival of Life 』",
    "『 Yayoi Kusama: Revised & expanded edition 』",
    "『 Yayoi Kusama: The Journal 』",
    "『 Yayoi Kusama: Cosmic Nature 』",
    "『 Yayoi Kusama: 1945 to Now 』",
    "『 Yayoi Kusama: Infinity Mirrors 』",
    "『 Yayoi Kusama: Every Day I Pray for Love 』",
    "『 草間彌生全版画集 All prints of KUSAMA YAYOI 1979-2004  』",
    "『 Louis Vuitton Yayoi Kusama 』",
    "『 Yayoi Kusama: All About My Love 』",
    "『 Kusama 』",
    "『 Kusama 』",
    "『  Yayoi Kusama 』",
    "『 Yayoi Kusama Midori Yamamura 』",
    "『 Love Forever: Yayoi Kusama, 1958-1968 』",
    "『 草間彌生全版画: 1979-2011 JP Oversized 』",
    "『 Yayoi Kusama: Give Me Love 』",
    "『 Yayoi Kusama: A Retrospective  』",
    "『 別冊Discover Japan 草間彌生を知りたい JP Oversized 』",
    "『 家庭画報 2025年3月号 Print Magazine  』",
    "『 YAYOI KUSAMA: IN INFINITY 』",
    "『 Yayoi Kusama  』",
    "『 Yayoi Kusama : Present Infinite 』",
  ];

  // 페이지 초기값
  let currentPage = 1;

  // DOM 요소 캐시
  const leftBtn = document.querySelector(".abtn.ab1");
  const rightBtn = document.querySelector(".abtn.ab2");
  const dotsContainer = document.querySelector(".paging-list .dots");

  // totalPages 계산
  const totalPages = Math.max(1, Math.ceil(workTitle.length / UNIT_NUM));

  // 동적으로 dot이 필요하면 렌더링 (선택; 이미 HTML에 dot이 있으면 이 블록은 건너뛰어도 됩니다)
  function renderDotsIfNeeded() {
    const existingDots = dotsContainer.querySelectorAll(".dot");
    if (existingDots.length === totalPages) return; // 이미 맞음

    dotsContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const span = document.createElement("span");
      span.className = "dot";
      span.dataset.val = String(i);
      dotsContainer.appendChild(span);
    }
  }

  // dot 스타일 업데이트 (활성화 표시)
  function updateDots(page) {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot) => {
      const val = Number(dot.dataset.val);
      if (val === page) {
        dot.style.backgroundColor = "#666666";
        dot.classList.add("active");
      } else {
        dot.style.backgroundColor = "";
        dot.classList.remove("active");
      }
    });

    // 좌/우 버튼 활성/비활성(선택) 처리: 끝이면 비활성화 시키기
    if (leftBtn) leftBtn.classList.toggle("disabled", page <= 1);
    if (rightBtn) rightBtn.classList.toggle("disabled", page >= totalPages);
  }

  // 페이지 이동 함수 (MakeWorkList 호출 + 상태 업데이트)
  function goToPage(page) {
    // 범위 검사
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    // 실제 리스트 렌더링
    MakeWorkList(currentPage);

    // dot 상태 업데이트
    updateDots(currentPage);

    // 모달/스크롤 초기화 등 추가 작업 필요하면 여기서 호출 가능
    // e.g. reset scroll: const modalTit = mWindow.querySelector('.modal-tit'); if(modalTit) modalTit.scrollTop = 0;
  }

  // 왼쪽/오른쪽 버튼 이벤트 바인딩
  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      if (currentPage > 1) goToPage(currentPage - 1);
    });
  }
  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      if (currentPage < totalPages) goToPage(currentPage + 1);
    });
  }

  // dots 클릭 바인딩 (delegation 또는 개별 바인딩)
  function bindDotClicks() {
    // 이벤트 위임: dotsContainer에 클릭달기
    dotsContainer.addEventListener("click", (e) => {
      const dot = e.target.closest(".dot");
      if (!dot) return;
      const page = parseInt(dot.dataset.val, 10);
      if (Number.isNaN(page)) return;
      goToPage(page);
    });
  }

  // 초기화 (페이지 수에 따라 dot 렌더링/바인딩 후 첫 렌더 호출)
  renderDotsIfNeeded();
  bindDotClicks();
  goToPage(1); // 초기 페이지 렌더링

  function MakeWorkList(pgNum) {
    const total = workTitle.length;
    const firstNum = (pgNum - 1) * UNIT_NUM + 1;
    const lastNum = Math.min(pgNum * UNIT_NUM, total);

    // 2. html코드 생성하기 ////
    let hCode = "<section class='booksbox'>";

    // for문으로 반복코드 생성하기
    // for(시;한;증){코드}
    // 이미지가 1~50번까지 이므로 i는 1부터 50까지 반복
    // for (let i = 1; i <= 24; i++) {
    for (let i = firstNum; i <= lastNum; i++) {
      hCode += `
        <ul class="list" data-num="${i}">
          <div class="section">
      <button class="modal-btn" onclick="openModal(event)"></button>
   
            <li class="book">
                <img src="./images/book${i}.jpg" alt="book${i}" class="img-box">
            </li>
            <li class="booktxt">
             <h3>${workTitle[i - 1]}</h3>
            </li> 
            </div>
    </ul>

        `;
    } /// for /////

    hCode += "</section>";

    // 3. html코드 삽입하기
    wrap.innerHTML = hCode;
  }
}); ///////// 로드함수 ///////////////////

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

const bookInfo = [
  {
    index: 1,
    title: "『 Infinity Net: The Autobiography of Yayoi Kusama 』",
    author: "Yayoi Kusama",
    publisher: "Tate Publishing",
    detail: `“Infinity Net” is a memoir by Yayoi Kusama, one of the most important figures in the contemporary art world, exploring her unique and fascinating life and art. This autobiography details Kusama's journey from overcoming obsessive-compulsive disorder to breaking down cultural barriers through art and creating her own unique artistic world.The 2021 revised edition includes a new foreword by Francis Morris and a poem by Yayoi Kusama, allowing a deeper understanding of her work and thoughts. During her ten years in New York, Kusama transformed from a poor artist to a mainstay of the counterculture art scene. She solidified her position through her association with art world giants such as Georgia O'Keeffe, Donald Judd, and Andy Warhol. She speaks candidly about the obsessions that plagued her childhood and her entire life, and discusses her journey to explore her inner world through art. After returning to Japan, Kusama was admitted to a mental hospital and found artistic inspiration there.
     
      Over the past decade, he has established himself as an internationally recognized artist, having been featured in several major exhibitions. Translated into English by Ralph McCarthy, this autobiography explores Kusama’s ongoing artistic exploration and It powerfully tells the story of how, despite the hardships she endured, she forged her own path through art. "Infinity Net" explores the life and art of Yayoi Kusama, the challenges she faced and her achievements, in a profound and dreamlike way. It shows how her art shaped her. This autobiography leaves a powerful impression on readers through Kusama\'s boundless creativity and dreamlike intensity.`,
  },
  {
    index: 2,
    title: "『 Yayoi Kusama: Festival of Life 』",
    author: "Yayoi Kusama, Jenni Sorkin",
    publisher: "David Zwirner Books",
    detail: `Yayoi Kusama's art is sensual, utopian, and original, and despite its highly personal nature, is loved by diverse audiences around the world. Throughout her career, Kusama has broken down the traditional boundaries between work, artist, and viewer.
      From paintings to performances, room-sized installations, sculptural installations, literature, film, fashion, design, and interventions within existing architectural structures.
      Kusama's work ranges beyond major art movements of the late 20th century, including Pop Art and Minimalism. Her work radiates vitality and passion, and is autobiographical and at times confessional. Kusama's work conveys the vitality of a living artist through her work.
     
      "Yayoi Kusama: Festival of Life" is an exhibition catalogue covering Kusama\'s exhibition held at the Chelsea branch of David Zwirner Gallery in New York in late 2017. Includes her iconic “My Eternal Soul” series, new large-scale floral sculptures, polka-dotted environments, and two infinity mirrored rooms. The book offers fresh perspectives on Kusama's work, including new scholarly research and posters by Jenni Sorkin.`,
  },
  {
    index: 3,
    title: "『 Yayoi Kusama: Revised & expanded edition 』",
    author: "Yayoi Kusama, Tatehata, Hoptman, Kultermann, Taft",
    publisher: "Phaidon Press",
    detail: `Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art. Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering. Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.
      
      Kusama has gained international acclaim for her groundbreaking work that explores themes such as infinity, self-image, sexuality, and compulsive repetition. Her work, which first gained attention in Manhattan's psychedelic and pop culture scenes in the 1960s, combined patterning to create often participatory installations and series of paintings. This book is an updated version of a monograph published in 2000 and explores Kusama's work in great detail. Enriched with in-depth essays by Catherine Taft and a new collection of the author's poetry, it delves deeper into her artistic world.`,
  },
  {
    index: 4,
    title: "『 Yayoi Kusama: The Journal 』",
    author: "The Artist Journals",
    publisher: "David Zwirner Book",
    detail: `Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art.

    Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering.
Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.

    This journal captures the vibrant and dynamic art of Yayoi Kusama, providing an ideal canvas for creative thinking. Renowned Japanese artist Kusama's kaleidoscopic works have captivated millions of visitors to museums and galleries around the world. Her signature polka dots, organic forms and hypnotic optical effects navigate the boundaries between plane and depth, presence and absence, beauty and the sublime. This journal is Kusama's first as an artist and features her work on the cover and last page, providing the perfect inspiration for all your creative endeavors.`,
  },
  {
    index: 5,
    title: "『Yayoi Kusama: Cosmic Nature 』",
    author: "Mika Yoshitake",
    publisher: "Rizzoli",
    detail: `Yayoi Kusama's art is the result of boundless curiosity and intense creative drive. Throughout her long and varied career, her deep connection to nature is a theme that has been consistently explored in her work, yet often overlooked. From her early sketches of flowers from her family's plant nursery to more recent creations. From monumental plant-shaped sculptures to microscopic life forms, Kusama draws us into the patterns, connections and cycles of life.

      'Yayoi Kusama: Cosmic Nature' is an exhibition catalogue comprehensively exploring Kusama's longstanding fascination with the natural world on display at the New York Botanical Garden. The exhibition highlights Kusama's deep-rooted appreciation and adaptation to nature in her art, as a source of inspiration and strength essential to her artistic language. The profound vitality evident in Kusama’s work permeates everything she explores, evoking a sense of cosmic and transcendent nature. Yoshitake Mika, an independent scholar specializing in postwar Japanese art, and Joanna L. Groarke, curator of the exhibition at the New York Botanical Garden (BG), and co-editor of the catalogue
      
      This volume brings together essays by a range of art historians, curators, and scientists who offer unique interpretations of Kusama's relationship with the natural world. Contains over 120 drawings, paintings, sculptures and archival photographs, and features beautiful views of the works on display in BG's gardens and galleries in New York. 'Yayoi Kusama: Cosmic Nature' offers a new perspective on one of the world's most celebrated contemporary artists.`,
  },
  {
    index: 6,
    title: "『 Yayoi Kusama: 1945 to Now 』",
    author: "Doryun Chong, Mika Yoshitake",
    publisher: "Thames and Hudson",
    detail: `Yayoi Kusama is an internationally renowned artist whose career spans seven decades and a variety of mediums. Starting out as a hub of artistic experimentation in Asia in the mid-20th century, he established himself as a major figure in the New York art world in the 1960s. She continues to communicate a deeply personal and spiritual worldview through her art.
      
     'Yayoi Kusama: 1945 to Now' is the most comprehensive exploration of her work to date. It explores her aesthetic and philosophical concerns through six thematic sections: ‘Infinity’, ‘Accumulation’, ‘Biocosmos’, ‘Radical Connectivity’, ‘Death’ and ‘The Force of Life’.
      
      The book includes previously unpublished writings by Kusama, correspondence with Georgia O'Keeffe, interviews with critic Yoshie Yoshida,  and roundtable discussions with leading experts in the field. Also included are curatorial essays and a detailed visual chronology of Kusama's life, making it an invaluable resource for readers seeking a deeper understanding of Kusama and her work. This monograph demonstrates that Kusama's art, despite being shaped by international currents, maintains a deep connection to Japanese tradition and culture. Enthralling for those already familiar with Kusama's work as well as those new to it, this book is the ideal guide to exploring her artistic journey.
 `,
  },
  {
    index: 7,
    title: "『 Yayoi Kusama: Infinity Mirrors 』",
    author:
      "Mika Yoshitake, Yayoi Kusama, Melissa Chiu, Alexander Dumbadze , Gloria Sutton, Miwako Tezuka, Alex Jones",
    publisher: "DelMonico Books",
    detail: `This book is the first and most comprehensive exploration of the world-renowned Japanese artist Yayoi Kusama's iconic Infinity Mirror Room series. The series has had a lasting influence on modern art for over 50 years, and Kusama's rooms create the illusion of infinite space filled with colorful light reflections. This book follows these immersive installations, exploring how Kusama’s work emerged from the self-sabotage of the Vietnam War era.  It explores how the various forms have come to symbolize the harmonious aspirations of the present.
      
      This book places Kusama's pioneering work in historical context, from her early, incomplete installations to the moody shifts in her more recent work. This book gives readers the opportunity to examine the influence of this series throughout Kusama's career. Yayoi Kusama has been active in various artistic fields such as sculpture and installation, as well as painting, performance, video art, fashion, and literature. In his early career in Japan, he worked mainly on paper, and after moving to New York in the late 1950s, he joined the avant-garde art movement. He worked in soft sculpture and influenced artists such as Andy Warhol and Claes Oldenburg.
     
      She also began engaging in performance-oriented work, using her own unique dot patterns. After returning to Japan in 1973, she enjoyed a period of relative quiet, but began to receive attention again in the 1980s, and her work continues to enjoy steady popularity to this day.",
  `,
  },
  {
    index: 8,
    title: "『 Yayoi Kusama: Every Day I Pray for Love 』",
    author: "Yayoi Kusama",
    publisher: "David Zwirner Books",
    detail: `This book contains Yayoi Kusama's most personal insights and poetic recollections, taking readers into her private world.
      This book delves into her creative process, the important role language plays in her work, and the influence of language on her paintings, sculptures, and everyday life.
      Shedding new light on the author's use of language, this book provides an impressive overview of Kusama's poetry across a variety of media.
      
      Emphasizing the importance of words, special attention is paid to captivating and poetic phrases in the titles of works, such as “I want to show you the infinite splendor of the stars in the universe.”
      These titles are not only an essential part of Kusama’s artwork, but are also unique maxims and compelling statements on universal spirituality in their own right.
      The poems in the book reveal Kusama's personal ordeals, human ideals, and heroic pursuit of her art.
      
      It is organized around the acclaimed exhibition 'EVERY DAY I PRAY FOR LOVE' held at David Zwirner Gallery in New York in 2019.
      This book contains over 300 pages of new illustrations, sculptures, and Infinity Mirror Room artwork.
      Kusama's chronological photographs included in the book provide a visual timeline of this unique artist, documenting her long career and artistic development.
  `,
  },
  {
    index: 9,
    title: "『 草間彌生全版画集 All prints of KUSAMA YAYOI 1979-2004 』",
    author: "Yayoi Kusama",
    publisher: "Abe Publishing",
    detail: ` Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art. Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering.
     
    Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.",
 `,
  },
  {
    index: 10,
    title: "『 Louis Vuitton Yayoi Kusama 』",
    author:
      "Yayoi Kusama, Delphine Arnault, Akira Tatehata, Hans Ulrich Obrist, Mika Yoshitake",
    publisher: "Rizzoli",
    detail: ` Global luxury fashion brand Louis Vuitton

      World-renowned artist Yayoi Kusama is joining forces again to present an ambitious project. 

      This book, which tells the story of collaboration, introduces Yayoi Kusama's artwork and Louis Vuitton's fashion collection together. Edited by Ferdinando Verdi and Isabel Venero, it features contributions from renowned experts in the fields of fashion and art.`,
  },
  {
    index: 11,
    title: "『 Yayoi Kusama: All About My Love 』",
    author: "Yayoi Kusama, Akira Shibutami",
    publisher: "Thames & Hudson",
    detail: ` Yayoi Kusama is a leading figure in avant-garde art who achieved international fame after moving to the United States from Matsumoto, Nagano, Japan in 1958. In the past decade, her work has attracted record-breaking attendances through retrospectives held in major Western museums, including the Tate Modern in London and the Whitney Museum of American Art in New York.
     
     Her work is known for its repetitive dot patterns, and she has continually innovated and reinvented her style across a range of media including painting, drawing, sculpture, film, performance and installation. Her work ranges from intense semi-abstract images to soft sculptures known as 'accumulations' and 'infinity net' paintings.
      
      The book covers Kusama's early works, from her early immersion in painting to escape from hallucinations, to her 'Infinity Net' and 'Polka Dot' in New York, to her works at the Venice Biennale in the 1980s and 1990s, and It provides an in-depth overview of her career, from her current series, 'My Eternal Soul', to her works, each presented in chronological order with detailed descriptions.",
  `,
  },
  {
    index: 12,
    title: "『 Kusama 』",
    author: "Yayoi Kusama",
    publisher: "National Gallery of Victoria",
    detail: ` Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art.

     Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering. Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.
    
      This publication draws on Kusama's remarkable oeuvre, showcased in the National Gallery of Victoria's (NGV) major exhibition Yayoi Kusama. This landmark survey charts eighty years of Kusama's work, offering a comprehensive look at her groundbreaking artistic career.
 `,
  },
  {
    index: 13,
    title: "『  Between Heaven and Earth 』",
    author: "Yayoi Kusama",
    publisher: "Tokyo: Jiritsu Shobo.",
    detail: `Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art.

      Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering. Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.
    
      Between Heaven and Earth (Ten to Chi no Aida) depicts a girl devastated by a fear of adults and men. The wraparound band has a recommendation from Shinichi Nakazawa.
  `,
  },
  {
    index: 14,
    title: "『 Yayoi Kusama 』",
    author: "Yayoi Kusama",
    publisher: "Hatje Cantz",
    detail: ` The definitive catalog offering an in-depth exploration of Yayoi Kusama's seven-decade career, including rare early works and new productions

      This catalog accompanies the Fondation Beyeler's major autumn 2025 exhibition dedicated to the celebrated Japanese artist Yayoi Kusama (born 1929). As the first retrospective of Kusama's work in Switzerland, this landmark publication offers a comprehensive exploration of her more than seven-decade career. Developed in close collaboration with the artist and her studio, the catalog presents an in-depth look at Kusama's diverse body of work, from her early creations―some never before seen in Europe―to her most iconic pieces, as well as new productions and one of her renowned Infinity Mirror rooms. Richly illustrated, the catalog examines Kusama's signature artistic language, characterized by obsessive repetition and boundless mirrored spaces that transport viewers into infinite realms. It serves as an essential reference for anyone seeking to understand Kusama's enduring impact on contemporary art.
      
      Yayoi Kusama (born 1929) has worked not only in sculpture and installation but also painting, performance, video art, fashion, poetry, fiction and other arts. With her late-1950s move to New York City, she joined the ranks of the avant-garde, working in soft sculpture and influencing the likes of Warhol and Oldenburg. At this time, she was also involved with happenings and other performance-oriented works and began to deploy her signature dots. Her work fell into relative obscurity after her return to Japan in 1973, but a subsequent revival of interest in the 1980s elevated her work to the canonical status it still enjoys today.",
 `,
  },
  {
    index: 15,
    title: "『 Yayoi Kusama Midori Yamamura 』",
    author: "Midori Yamamura",
    publisher: "MIT Press Ltd",
    detail: `  An examination of Yayoi Kusama's work that goes beyond the usual biographical interpretation to consider her place in postwar global art history. An examination of Yayoi Kusama's work that goes beyond the usual biographical interpretation to consider her place in postwar global art history.
     
    Yayoi Kusama is the most famous artist to emerge from Japan in the period following World War II. Part of a burgeoning international art scene in the early 1960s, she exhibited in New York with Andy Warhol, Donald Judd, Claes Oldenburg, and other Pop and Minimalist luminaries, and in Europe with the Dutch Nul and the German Zero artist groups. Known for repetitive patterns, sewn soft sculptures, naked performance, and suggestive content, Kusama's work anticipated the politically charged feminist art of the 1970s. But Kusama and her work were soon eclipsed by a dealer-controlled art market monopoly of white male American artists. Returning to Japan in 1973, Kusama became almost as famous for her self-proclaimed mental illness and permanent residence in a psychiatric hospital as she was for her art. In this book, Midori Yamamura eschews the usual critical fascination with Kusama's biography to consider the artist in her social and cultural milieu. By examining Kusama's art alongside that of her peers, Yamamura offers a new perspective on Kusama's career.
     
    Yamamura shows that Kusama, who came of age in totalitarian wartime Japan, embraced art as an anticonformist pursuit, seeking a subjective autonomy that resulted in the singular expression of her art. Examining Kusama\'s association with European and New York art movements of the 1960s and her creation of psychedelic light-and-sound "Happenings," Yamamura argues that Kusama and her heterogeneous peers defied and undermined various pillars of modernity during the crucial transition from the modern nation-state to global free-market capitalism. The art market rediscovered Kusama in the 1990s, and she has since had a series of high-profile exhibitions. Recounting Kusama's story, Yamamura offers an incisive, penetrating analysis of postwar art's globalization as viewed from the periphery.",
  `,
  },
  {
    index: 16,
    title: "『 Love Forever: Yayoi Kusama, 1958-1968 』",
    author: "Laura Hoptman, Akira Tatehata, Lynn Zelevansky",
    publisher: "Los Angeles County Museum of Art",
    detail: ` Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art.
     
     Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering.
     
     Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.",
`,
  },
  {
    index: 17,
    title: "『 草間彌生全版画: 1979-2011 JP Oversized 』",
    author: "1990",
    publisher: "Art Brut, Pop Art",
    detail: ` Resone is the latest compilation of print works by Yayoi Kusama, a leading artist in modern Japan. “We added 27 new prints up to 2011 to the out-of-print ”“Yayoi Kusama”“ (2006), and the entire page design was renewed to create a layout in the form of ”“catalog resone””.”
    
     Starting in Spain from 2011 to 2012, large-scale exhibitions of Yayoi Kusama will be held at the Paris Pompidou Center, London Tate Gallery, New York Whitney Museum and major Western museums, and new exhibitions will be held at the Osaka National Museum of Art in Japan. The “Kusama Year” will begin this year.
    
     It is already an indispensable print collection in the art world and print market from the previous Yayoi Kusama's full print collection, but this time each piece of work has become much easier to see, and it is a must-have book for fans to take a general look at Yayoi Kusama's art.
  `,
  },
  {
    index: 18,
    title: "『 Yayoi Kusama: Give Me Love 』",
    author: "Akira Tatehata,Yayoi Kusama",
    publisher: "David Zwirner",
    detail: `  Yayoi Kusama: Give Me Love documents the artist’s most recent exhibition at David Zwirner, New York, which marked the US debut of The Obliteration Room, an all-white, domestic interior that viewers are invited to cover with dot stickers of various sizes and colors.
      
    Widely recognized as one of the most popular artists in the world, Yayoi Kusama has shaped her own narrative of postwar and contemporary art. Minimalism and Pop art, abstraction and conceptualism coincide in her practice, which spans painting, sculpture, performance, room-sized and outdoor installation, the written word, films, fashion, design, and architectural interventions. Born in 1929 in Matsumoto, Japan, Yayoi Kusama briefly studied painting in Kyoto before moving to New York City in the late 1950s. 
    
    In the mid-1960s, she established herself in New York as an important avant-garde artist by staging groundbreaking happenings, events, and exhibitions. Now in her late 80s, Kusama is entering one of the richest creative periods of her life. Immersed in her studio six days a week, Kusama has spoken of her renewed dedication to creating art over the past years: [N]ew ideas come welling up every day….Now I am more keenly aware of the time that remains and more in awe of the vast scope of art.
      
      Taking The Obliteration Room as its centerpiece, this catalogue reveals, in vivid large-scale plates, the transformation of the space from a clean white interior to a stunningly saturated room, with ceilings, walls, and furniture covered in myriad multicolored stickers put there by viewers over the course of the exhibition. The catalogue also includes beautiful reproductions of Kusama’s new large-format paintings from My Eternal Soul series. Ranging from bright and densely pixelated forms, to umber figures with darker blues and muted oranges, these paintings demonstrate the artist’s striking command of color, and her exceptional control over balance and contrast. Bold brushstrokes hover between figuration and abstraction; vibrant, animated, and intense, these paintings introduce their own powerful pictorial logic, at once contemporary and universal. The catalogue continues with a selection of new, large Pumpkin sculptures, a form that Kusama has been exploring since her studies in Japan in the 1950s, and which gained prominence in the 1980s, continuing to remain an essential part of her practice. Made of shiny stainless steel and featuring painted dots or dot-shaped perforations that recall The Obliteration Room, these immersive works seem created on human scale, with the tallest measuring 70 inches (178 cm). Vibrant plates capture how color, shape, size, and surface merge in these sculptures and mesmerize the viewer. Texts include a Hymn to Yayoi Kusama by art critic and poet Akira Tatehata and a poem by the artist herself.",
`,
  },
  {
    index: 19,
    title: "『 Yayoi Kusama: A Retrospective 』",
    author: "Yayoi Kusama, Stephanie Rosenthal",
    publisher: "Prestel",
    detail: `This book commemorates the first European retrospective of Yayoi Kusama and provides a comprehensive overview of the Japanese artist's influential work spanning over eight decades. Set against the backdrop of a groundbreaking retrospective at Gropius Bau, this publication delves deeply into Kusama’s life and art through original insights from experts.
     
    The book traces Kusama's creative development from her early paintings to her sculptures and installations. Featuring a wide range of images and materials, the book is accompanied by essays from authors with diverse academic backgrounds, and covers Kusama's accomplishments in fashion, film, art marketing, and publishing. Essays by various authors focus on Kusama's diverse engagement with the arts and genre-specific observations of her performance, installation, and painting series.
      
      This rich and comprehensive retrospective provides readers interested in Kusama with a deeper understanding of her creative journey and extensive career.`,
  },
  {
    index: 20,
    title: "『 別冊Discover Japan 草間彌生を知りたい JP Oversized 』",
    author: "Yayoi Kusama",
    publisher: "Discover Japan",
    detail: `It features Yayoi Kusama, an avant-garde artist who captivates the world. I will report on the scenes of the “Western Tour Retrospective Exhibition,” which excited the people of London, New York, Paris and Spain, and the “Yayoi Kusama Forever Eternal Eternity,” which started this year, and look back on her dramatic half-life. “Yayoi Kusama” by Louis Vuitton “Collection” and introduced museums all over Japan where you can see Yayoi Kusama's works right now, and I listened carefully to Yayoi Kusama himself about his current production and feelings, which can be said to be the golden age. *It is the same magazine that was distributed under the name of “A Publishing Company” until January 2019.`,
  },
  {
    index: 21,
    title:
      "『 EYE OF GYRE Special Project Yayoi Kusama “Room of Eternal Love” Photo Exhibition 』",
    author: "Yayoi Kusama",
    publisher: "Elle Studio International",
    detail: `Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art.
     
      Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering.
     
      Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.`,
  },
  {
    index: 22,
    title: "『 YAYOI KUSAMA: IN INFINITY 』",
    author: "1990",
    publisher: "Art Brut, Pop Art",
    detail: `This book is a compilation of Yayoi Kusama's best-known and best-selling series, Infinity Mirror Rooms. We explore her influence on modern art history over the past 50 years.
    
    World-renowned Japanese artist Yayoi Kusama has worked in a variety of media, including painting, sculpture, and performance/installation art.
     
      Kusama's Infinity Mirror Room, which started in Phalli's Field! It is a landscape filled with multicolored lights and whimsical shapes. It keeps the audience in a space filled with mirrors.These mirrored spaces distort the room to project the illusion of the place, constantly reflecting it.`,
  },
  {
    index: 23,
    title: "『 Yayoi Kusama 』",
    author: "Yayoi Kusama",
    publisher: "D.A.P./Tate",
    detail: `Yayoi Kusama is from Japan and is a globally recognized contemporary artist. She is known for her use of infinite repetitive dot patterns and bold colors, and her works are expressed in various forms, including paintings, sculptures, installation art, and performance art.

    Kusama's art is deeply connected to her personal psychological experiences, especially the hallucinations she has experienced since childhood, which was also how she fought mental suffering. Kusama continues to pursue self-reflection and exploration of the inner world through art, and through this process, she has established a unique and unrivaled position in the world of contemporary art. Her work becomes a medium for the audience to reflect on themselves and guide them into a world of infinite imagination.
    
    Like many another artist émigré, Kusama had a plan, and it began, as such schemes often do, with what she was able to carry on her back, and sell: a cache of small works on paper, luminous drawings in gouache, ink and pastel. A film of Kusama's New York years might find her peeling the sheets leaf by leaf from the luggage that accompanied her from Tokyo to Seattle to New York, offering them as calling cards and as barter. Early scenes might feature marathon sessions of solitary work as she painted her vast Infinity Nets, and nocturnal raids when she liberated discarded items from the street, and sat for hours with her neighbor Donald Judd stitching and stuffing cotton sacks to fashion the stiff phallic protuberances she would use to cover her Accumulation sculptures. Her prodigious energies would soon migrate to installations, happenings, body painting, film, fashion and 'sexual revolution'. She would protest the war in Vietnam with an 'Anatomic Explosion' on Wall Street. She would become a tabloid sensation. By the time she left New York and returned to Japan for good in 1973, Kusama was, by popular account, 'as famous as Andy Warhol'. But her appeal for the avant-garde had been exhausted, unlike his, by the machinery of self-promotion. Or so they say. Chroniclers of the scene deemed her return a retreat, whether under the banner of emotional breakdown or career meltdown. 'She wore herself out.' 'She overplayed her hand.' 'She sold out.' 'She lost her mind.' The explanations tend to arrive in the form of epithets. And then there is another theory. She was sick and tired of war, burnt out on Vietnam, disillusioned by the failure of the era's utopian project of pacifism and liberation. Her departure was an act of political protest as much as of emotional surrender.`,
  },
  {
    index: 24,
    title: "『 Yayoi Kusama : Present Infinite 』",
    author: "Yayoi Kusama",
    publisher: "Skira",
    detail: `Kusama Yayoi is a Japanese contemporary artist known for her repetitive dot patterns and hallucinatory imagery. She works across a variety of media, including painting, sculpture, installation, and performance, exploring themes of self-effacement and obsessive repetition. These themes are intertwined with her long-standing psychological struggles, which she reflects in her work.
      
    After moving to New York in the late 1950s and establishing her career, she established a distinctive style that garnered international recognition. Kusama continues to work prolifically today, creating powerful visual experiences through iconic works like polka dots and infinity mirrored rooms.`,
  },
];

// 객체구조
// 1. idx: 고유번호
// 2. title: 작품명
// 3. author: 저자
// 4. publisher: 출판사
// 5. detail: 책내용

// 전역 참조
const mWindow = document.getElementById("modal");

// openModal 함수 (이벤트 리스너로 바인딩될 때 사용)
function openModal(e) {
  // 버튼(또는 클릭한 요소) 가져오기. addEventListener로 바인딩하면 e.currentTarget이 안전.
  const btn = e.currentTarget || e.target;

  // data-num을 가진 가장 가까운 조상 찾기 (더 안전)
  const ancestor = btn.closest("[data-num]");
  const idx = ancestor ? ancestor.dataset.num : null; // dataset.num 은 getAttribute('data-num')와 같음

  if (!idx) {
    console.warn("data-num을 찾을 수 없습니다.");
    return;
  }

  // 모달 내부에서 이미지 요소들 다시 선택 (초기화 시점의 노드와 달라질 수 있으니 매번)
  const smallImgs = mWindow.querySelectorAll(".small > img");
  const bigImgs = mWindow.querySelectorAll(".big > img");

  // 이미지 수에 따라 안전하게 설정
  smallImgs.forEach((img, i) => {
    const suffix = i === 0 ? "" : `-${i}`;
    img.src = `./images/book${idx}${suffix}.jpg`;
  });
  bigImgs.forEach((img, i) => {
    const suffix = i === 0 ? "" : `-${i}`;
    img.src = `./images/book${idx}${suffix}.jpg`;
  });

  // 이미지 src 바꾼 뒤 swiper 업데이트 (DOM 변경 반영)
  if (typeof swiper2 !== "undefined" && swiper2) {
    swiper2.update();
    swiper2.slideTo(0, 0);
  }

  // bookInfo에서 해당 항목 찾기 (타입 안전성을 위해 문자열로 비교)
  const book = bookInfo.find((v) => String(v.index) === String(idx));
  if (book) {
    const titleEl = mWindow.querySelector(".modal-tit h3");
    const authorEl = mWindow.querySelector(".author");
    const publisherEl = mWindow.querySelector(".publisher");
    const detailEl = mWindow.querySelector(".detail");

    if (titleEl) titleEl.textContent = book.title;
    if (authorEl) authorEl.textContent = book.author;
    if (publisherEl) publisherEl.textContent = book.publisher;
    if (detailEl) {
      // 1. replace()를 사용하여 줄바꿈 문자를 <br/>로 변경
      const formattedDetail = book.detail.replace(/\n/g, "<br/>");

      // 2. innerHTML에 할당하여 <br/>이 HTML 태그로 인식되도록 합니다.
      detailEl.innerHTML = formattedDetail;
    }
  } else {
    console.warn("bookInfo에서 해당 인덱스를 찾지 못했습니다:", idx);
  }

  // 스크롤 초기화?
  requestAnimationFrame(() => {
    const modalTit = mWindow.querySelector(".modal-tit");
    if (modalTit) {
      modalTit.scrollTop = 0; // 또는 modalTit.scrollTo({ top: 0, behavior: 'auto' });
    }
  });
  // const titleEl = mWindow.querySelector(".modal-tit h3");
  // const authorEl = mWindow.querySelector(".author");
  // const publisherEl = mWindow.querySelector(".publisher");
  // const detailEl = mWindow.querySelector(".detail");

  // bookInfo.some((v) => {
  //   if (String(v.index) === String(idx)) {
  //     if (titleEl) titleEl.textContent = v.title;
  //     if (authorEl) authorEl.textContent = v.author;
  //     if (publisherEl) publisherEl.textContent = v.publisher;
  //     if (detailEl) detailEl.textContent = v.detail;
  //     return true; // some은 true를 반환하면 순회를 멈춥니다.
  //   }
  //   return false;
  // })

  // if (!found) {
  //   console.warn('bookInfo에서 해당 인덱스를 찾지 못했습니다:', idx);
  // }

  //   // 변경부분
  //   const container = mWindow.querySelector(".detail"); // 모달의 detail 요소
  //   const text = book.detail || ""; // 예: "문장1\n문장2\n\n문단2..."
  //   container.innerHTML = ""; // 기존 내용 제거

  //   // 문단 단위로 나누기 (연속된 공백/줄바꿈 기준)
  //   const paragraphs = text.split(/\n\s*\n/);

  //   paragraphs.forEach((par) => {
  //     const pEl = document.createElement("p");

  //     // 문단 내부에서 줄바꿈을 <br>로 처리하려면 라인마다 텍스트 노드 + <br> 추가
  //     const lines = par.split("\n");
  //     lines.forEach((line, i) => {
  //       if (i > 0) pEl.appendChild(document.createElement("br"));
  //       pEl.appendChild(document.createTextNode(line));
  //     });

  //     container.appendChild(pEl);
  //   });
  // /////////////////////////

  // 모달 표시 및 바디 스크롤 막기
  mWindow.style.display = "block";
  document.body.style.overflow = "hidden";

  // 필요하면 false 반환 (폼 제출 방지 등)
  return false;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = "auto"; // 바디스크롤막기해제
}

// // 모달 배경 클릭시 닫기
// window.addEventListener("click", (event) => {
//   const modal = document.getElementById("modal");
//   if (event.target === modal) {
//     closeModal();
//   }
// });

// <![CDATA[  <-- For SVG support
if ("WebSocket" in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName("link"));
      var head = document.getElementsByTagName("head")[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (
          (elem.href && typeof rel != "string") ||
          rel.length == 0 ||
          rel.toLowerCase() == "stylesheet"
        ) {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, "");
          elem.href =
            url +
            (url.indexOf("?") >= 0 ? "&" : "?") +
            "_cacheOverride=" +
            new Date().valueOf();
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === "http:" ? "ws://" : "wss://";
    var address =
      protocol + window.location.host + window.location.pathname + "/ws";
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == "reload") window.location.reload();
      else if (msg.data == "refreshcss") refreshCSS();
    };
    if (
      sessionStorage &&
      !sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")
    ) {
      console.log("Live reload enabled.");
      sessionStorage.setItem("IsThisFirstTime_Log_From_LiveServer", true);
    }
  })();
} else {
  console.error(
    "Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading."
  );
}

// document.querySelector(".ab2").onclike = () => {
//    console.log('오른쪽이야~!!!');

// };

// document.querySelector(".ab1").addEventListener("click", () => {
//   swiper.slidePrev();
// });

// swiper.on("slideChange", () => {
//   console.log("맨처음인가?", swiper.isBeginning);
//   console.log("맨끝인가?", swiper.isEnd);

//   if(swiper.isBeginning) {
//       btnPrev.style.opacity = "50%";
//   }

//   else if(swiper.isEnd) {
//       btnNext.style.opacity = "50%";
//   }

//   else {
//      btnNext.style.display = "inline-block";
//      btnNext.style.opacity = "1";
//       btnPrev.style.display = "inline-block";
//       btnPrev.style.opacity = "1";
//   }
// });
