window.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector(".wrap");
  const pagingList = document.querySelectorAll(".dot");

  const UNIT_NUM = 6;
  const workTitle = [
    "work1","work2","work3","work4","work5","work6",
    "work7","work8","work9","work10","work11","work12",
    "work13","work14","work15","work16","work17","work18"
  ];

  MakeWorkList(1);

  pagingList.forEach((el) => {
    el.addEventListener("click", (e) => {
      // e.preventDefault();
      const page = parseInt(el.dataset.val, 10);
      if (Number.isNaN(page)) return;
      MakeWorkList(page);
    });
  });

  function MakeWorkList(pgNum) {
    const total = workTitle.length;
    const firstNum = (pgNum - 1) * UNIT_NUM + 1;
    const lastNum  = Math.min(pgNum * UNIT_NUM, total);

    let hCode = "<ul>";
    for (let i = firstNum; i <= lastNum; i++) {
      hCode += `
        <li>
          <img src="./images/paint${i}.jpg" alt="paint${i}">
          <h3>${workTitle[i - 1]}</h3>
        </li>
      `;
    }
    hCode += "</ul>";

    wrap.innerHTML = hCode;
  }
});
