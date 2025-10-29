 window.addEventListener("load", () => {
            // 변경대상: 상단영역 .top
            const header = document.querySelector(".top");

            // 이전 스크롤 위치값 저장변수
            let prevScroll = 0;

            // 스크롤 이벤트 설정하기
            window.addEventListener('scroll', () => {
                // 스크롤 위치값 구하기
                let curScroll = window.scrollY;

                // (1) 아랫방향: 이전 스크롤위치값 < 현재 스크롤위치값
                if(prevScroll < curScroll && curScroll > 50) {
                    console.log('스크롤 내려간다~~!');
                    // 스크롤 내려가면 헤더 높이 줄이고 로고 작게
                    header.classList.add('scrolled');
                } 
                // (2) 윗방향: 이전 스크롤위치값 > 현재 스크롤위치값
                else if(prevScroll > curScroll && curScroll < 50) {
                    console.log('스크롤 올라간다~~!');
                    // 스크롤 올라가면 헤더 원래대로
                    header.classList.remove('scrolled');
                }

                // 중요!!! 마지막에 이전스크롤위치를 저장!
                prevScroll = curScroll;
            });
        });