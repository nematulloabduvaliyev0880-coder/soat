// SOAT
document.addEventListener("DOMContentLoaded", () => {
    const hourHand = document.querySelector(".h");
    const minuteHand = document.querySelector(".m");
    const secondHand = document.querySelector(".s");

    const digitalHours = document.querySelector(".hours");
    const digitalMinutes = document.querySelector(".minutes");

    function updateClock() {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ms = now.getMilliseconds();

        secondHand.style.transform =
            `rotate(${seconds * 6 + ms * 0.006}deg)`;

        minuteHand.style.transform =
            `rotate(${minutes * 6 + seconds * 0.1}deg)`;

        hourHand.style.transform =
            `rotate(${(hours % 12) * 30 + minutes * 0.5}deg)`;

        digitalHours.textContent =
            String(hours).padStart(2, "0");

        digitalMinutes.textContent =
            String(minutes).padStart(2, "0");

        requestAnimationFrame(updateClock);
    }

    updateClock();

    // TABLAR
    const tabItems = document.querySelectorAll(".tabsItem");
    const tabLinks = document.querySelectorAll(".tabsLink");
    const tabContents = document.querySelectorAll(".tabsContentItem");

    tabLinks.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            tabItems.forEach(item =>
                item.classList.remove("active")
            );

            tabContents.forEach(item =>
                item.classList.remove("active")
            );

            tabItems[index].classList.add("active");
            tabContents[index].classList.add("active");
        });
    });

    // SEKUNDOMER
    const min = document.querySelector(".stopwatch__minutes");
    const sec = document.querySelector(".stopwatch__seconds");
    const ms = document.querySelector(".stopwatch__mseconds");

    const buttons = document.querySelector(".buttons");
    const start = document.querySelector(".stopwatch__btn");
    const indicator = document.querySelector(".tabsLink__span");

    const pause = document.createElement("button");
    pause.className = "stopwatch__btn2";
    pause.textContent = "Pause";
    pause.type = "button";

    const reset = document.createElement("button");
    reset.className = "stopwatch__btn3";
    reset.textContent = "Reset";
    reset.type = "button";

    buttons.append(pause, reset);

    let startTime = 0;
    let elapsedTime = 0;
    let animationId = null;
    let isRunning = false;

    function showTime(time) {
        const total = Math.floor(time);

        min.textContent =
            String(Math.floor(total / 60000)).padStart(2, "0");

        sec.textContent =
            String(Math.floor(total / 1000) % 60).padStart(2, "0");

        ms.textContent =
            String(Math.floor(total % 1000 / 10)).padStart(2, "0");
    }

    function updateStopwatch() {
        if (!isRunning) return;

        elapsedTime = performance.now() - startTime;
        showTime(elapsedTime);

        animationId = requestAnimationFrame(updateStopwatch);
    }

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        startTime = performance.now() - elapsedTime;

        start.textContent = "Running...";
        start.disabled = true;
        pause.textContent = "Pause";

        indicator.classList.remove("active_clear");
        indicator.classList.add("active");

        animationId = requestAnimationFrame(updateStopwatch);
    }

    function pauseTimer() {
        if (!isRunning) return;

        isRunning = false;
        cancelAnimationFrame(animationId);

        elapsedTime = performance.now() - startTime;
        showTime(elapsedTime);

        start.textContent = "Start";
        start.disabled = false;
        pause.textContent = "Resume";

        indicator.classList.remove("active");
        indicator.classList.add("active_clear");
    }

    function resetTimer() {
        isRunning = false;
        cancelAnimationFrame(animationId);

        elapsedTime = 0;
        startTime = 0;

        showTime(0);

        start.textContent = "Start";
        start.disabled = false;
        pause.textContent = "Pause";

        indicator.classList.remove("active", "active_clear");
    }

    start.addEventListener("click", startTimer);
    pause.addEventListener("click", () => {
        if (isRunning) {
            pauseTimer();
        } else if (elapsedTime > 0) {
            startTimer();
        }
    });

    reset.addEventListener("click", resetTimer);

    showTime(0);
});