(function () {
  const wrapper    = document.getElementById("slidesWrapper");
  const slides     = Array.from(document.querySelectorAll(".slide"));
  const scrollHint = document.getElementById("scrollHint");
  const hintArrow  = document.querySelector(".scroll-arrow");
  const hintText   = document.querySelector(".scroll-hint-text");
  let current = 0;
  let locked  = false;

  // The first transition (0→1) is horizontal; after that, vertical
  // Slides 0 and 1 are in the horizontal strip; slides 2+ stack vertically below slide 1
  const HORIZ_COUNT = 2; // slides 0 and 1 move horizontally

  slides.forEach(function (s) {
    const c = s.querySelector(".typing-cursor");
    c.style.animation = "none";
    c.style.opacity = "0";
  });

  function runTypewriter(slide) {
    const target = slide.querySelector(".typewriter-target");
    const cursor = slide.querySelector(".typing-cursor");
    target.textContent = "";
    cursor.style.animation = "blink 0.75s step-end infinite";
    cursor.style.opacity = "1";
    const text = slide.dataset.heading || "";
    let i = 0;
    function type() {
      if (i < text.length) {
        target.textContent += text[i++];
        setTimeout(type, 100);
      } else {
        cursor.style.animation = "none";
        cursor.style.opacity = "0";
      }
    }
    setTimeout(type, current === 0 ? 400 : 200);
  }

  function revealAfterFade(slide) {
    const af = slide.querySelector(".afterFade");
    af.style.display = "none";
    setTimeout(function () {
      if (window.$ && $.fn.fadeIn) {
        $(af).fadeIn(600);
      } else {
        af.style.display = "";
      }
    }, current === 0 ? 1600 : 1400);
  }

  function updateScrollHint() {
    if (current === slides.length - 1) {
      scrollHint.classList.add("hidden");
      return;
    }
    scrollHint.classList.remove("hidden");
    // Show down arrow when in vertical mode (current >= HORIZ_COUNT - 1)
    if (current >= HORIZ_COUNT - 1) {
      hintArrow.innerHTML = "&#8595;"; // down arrow
      hintArrow.classList.add("nudge-down");
      hintArrow.classList.remove("nudge-right");
    } else {
      hintArrow.innerHTML = "&#8594;"; // right arrow
      hintArrow.classList.add("nudge-right");
      hintArrow.classList.remove("nudge-down");
    }
  }

  function gotoSlide(index) {
    if (index < 0 || index >= slides.length || locked) return;
    locked = true;
    current = index;

    if (current < HORIZ_COUNT) {
      // Horizontal: shift the wrapper left
      wrapper.style.transform = `translateX(-${current * 90}vw) translateY(0)`;
    } else {
      // Vertical: keep wrapper shifted to show second column, then shift down
      const vertIndex = current - (HORIZ_COUNT - 1); // 1-based
      wrapper.style.transform = `translateX(-${(HORIZ_COUNT - 1) * 90}vw) translateY(-${vertIndex * 100}vh)`;
    }

    updateScrollHint();
    runTypewriter(slides[current]);
    revealAfterFade(slides[current]);
    setTimeout(function () { locked = false; }, 900);
  }

  // Init first slide
  runTypewriter(slides[0]);
  revealAfterFade(slides[0]);
  updateScrollHint();

  window.addEventListener("wheel", function (e) {
    e.preventDefault();
    const dx = e.deltaX;
    const dy = e.deltaY;
    const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    if (delta > 20) gotoSlide(current + 1);
    else if (delta < -20) gotoSlide(current - 1);
  }, { passive: false });

})();