"use strict";


/* =========================================
   CONFIG
========================================= */

const WEDDING_DATE = new Date(
    "2026-10-24T12:00:00+09:00"
);


/* =========================================
   D-DAY
========================================= */

function updateDDay() {

    const ddayElement =
        document.getElementById("dday");

    if (!ddayElement) return;

    const now = new Date();

    const difference =
        WEDDING_DATE.getTime() - now.getTime();

    const day =
        Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );


    if (day > 0) {

        ddayElement.textContent =
            `D-${String(day).padStart(3, "0")}`;

    } else if (day === 0) {

        ddayElement.textContent =
            "D-DAY";

    } else {

        ddayElement.textContent =
            "결혼했습니다";

    }
}

updateDDay();

setInterval(updateDDay, 1000 * 60 * 60);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================================
   GALLERY MODAL
========================================= */

const galleryItems =
    document.querySelectorAll(".gallery__item");

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const modalClose =
    document.getElementById("modalClose");


galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        const image =
            item.dataset.image;

        modalImage.src = image;

        imageModal.classList.add("active");

        imageModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    });

});


function closeModal() {

    imageModal.classList.remove(
        "active"
    );

    imageModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


imageModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === imageModal
        ) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


/* =========================================
   ACCOUNT ACCORDION
========================================= */

const accountButtons =
    document.querySelectorAll(
        ".account__toggle"
    );


accountButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const group =
                button.closest(
                    ".account__group"
                );


            const isOpen =
                group.classList.contains(
                    "open"
                );


            document
                .querySelectorAll(
                    ".account__group"
                )
                .forEach((item) => {

                    item.classList.remove(
                        "open"
                    );

                });


            if (!isOpen) {

                group.classList.add(
                    "open"
                );

            }

        }
    );

});


/* =========================================
   ACCOUNT COPY
========================================= */

const copyButtons =
    document.querySelectorAll(
        ".copy-button"
    );

const toast =
    document.getElementById("toast");


copyButtons.forEach((button) => {

    button.addEventListener(
        "click",
        async () => {

            const account =
                button.dataset.account;


            try {

                await navigator.clipboard.writeText(
                    account
                );

                showToast(
                    "계좌번호가 복사되었습니다."
                );

            } catch (error) {

                fallbackCopy(account);

            }

        }
    );

});


function fallbackCopy(text) {

    const textarea =
        document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(
        textarea
    );

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showToast(
        "계좌번호가 복사되었습니다."
    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2000);

}


/* =========================================
   SHARE
========================================= */

const shareButton =
    document.getElementById(
        "shareButton"
    );


shareButton.addEventListener(
    "click",
    async () => {

        const shareData = {

            title:
                "김민수 ♥ 김지영 결혼합니다",

            text:
                "2026년 10월 24일 토요일 오후 12시\n저희 결혼식에 초대합니다.",

            url:
                window.location.href

        };


        /*
         * 모바일 Web Share API
         */

        if (
            navigator.share &&
            /Android|iPhone|iPad|iPod/i.test(
                navigator.userAgent
            )
        ) {

            try {

                await navigator.share(
                    shareData
                );

            } catch (error) {

                // 사용자가 공유창을 닫은 경우
                console.log(
                    "공유 취소"
                );

            }

            return;
        }


        /*
         * PC 또는 Web Share 미지원
         */

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            showToast(
                "청첩장 주소가 복사되었습니다."
            );

        } catch (error) {

            showToast(
                "주소를 복사할 수 없습니다."
            );

        }

    }
);


/* =========================================
   MAP
========================================= */

const kakaoMapButton =
    document.getElementById(
        "kakaoMapButton"
    );

const naverMapButton =
    document.getElementById(
        "naverMapButton"
    );


/*
 * 실제 서비스에서는
 * 예식장 주소를 넣어주세요.
 */

const ADDRESS =
    "서울특별시 강남구 테헤란로 123";


kakaoMapButton.addEventListener(
    "click",
    () => {

        const url =
            "https://map.kakao.com/?q=" +
            encodeURIComponent(
                ADDRESS
            );

        window.open(
            url,
            "_blank"
        );

    }
);


naverMapButton.addEventListener(
    "click",
    () => {

        const url =
            "https://map.naver.com/p/search/" +
            encodeURIComponent(
                ADDRESS
            );

        window.open(
            url,
            "_blank"
        );

    }
);


/* =========================================
   MUSIC
========================================= */

const musicButton =
    document.getElementById(
        "musicButton"
    );

const bgMusic =
    document.getElementById(
        "bgMusic"
    );


let musicPlaying = false;


musicButton.addEventListener(
    "click",
    async () => {

        /*
         * 음악 파일이 없으면
         * 실행하지 않습니다.
         */

        if (!bgMusic.src) {

            showToast(
                "배경음악 파일을 연결해주세요."
            );

            return;

        }


        if (musicPlaying) {

            bgMusic.pause();

            musicPlaying = false;

            musicButton.classList.remove(
                "active"
            );

            musicButton.textContent = "?";

        } else {

            try {

                await bgMusic.play();

                musicPlaying = true;

                musicButton.classList.add(
                    "active"
                );

                musicButton.textContent =
                    "♪";

            } catch (error) {

                showToast(
                    "음악을 재생할 수 없습니다."
                );

            }

        }

    }
);


/* =========================================
   IMAGE ERROR
========================================= */

document
    .querySelectorAll("img")
    .forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.background =
                    "#e8e3dd";

                image.style.minHeight =
                    "100px";

                image.alt =
                    "이미지를 불러올 수 없습니다.";

            }
        );

    });