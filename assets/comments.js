// @ts-nocheck

function initCommentsSlider(section) {
  const viewport = section.querySelector(".comments-slider__viewport");

  const pages = section.querySelectorAll(".comments-slider__page");

  const prevButton = section.querySelector(".comments-slider__button--prev");

  const nextButton = section.querySelector(".comments-slider__button--next");

  const dots = section.querySelectorAll(".comments-slider__dot");

  if (!viewport || !pages.length || !prevButton || !nextButton) {
    return;
  }

  let currentPage = 0;

  const totalPages = pages.length;

  function updateSlider() {
    const pageWidth = viewport.clientWidth;

    viewport.scrollTo({
      left: pageWidth * currentPage,
      behavior: "smooth",
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentPage;

      dot.classList.toggle("active", isActive);

      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    prevButton.disabled = currentPage === 0;

    nextButton.disabled = currentPage === totalPages - 1;
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;

      updateSlider();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++;

      updateSlider();
    }
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const page = parseInt(dot.dataset.page, 10);

      if (Number.isNaN(page)) {
        return;
      }

      currentPage = page;

      updateSlider();
    });
  });

  /*
   * Keep the current page aligned
   * when the browser is resized.
   */
  window.addEventListener("resize", () => {
    viewport.scrollLeft = viewport.clientWidth * currentPage;
  });

  updateSlider();
}

/*
 * Initialize all comment sections.
 */
function initAllCommentsSliders() {
  const sections = document.querySelectorAll(".comments-section");

  sections.forEach((section) => {
    if (section.dataset.commentsInitialized === "true") {
      return;
    }

    section.dataset.commentsInitialized = "true";

    initCommentsSlider(section);
  });
}

/*
 * Normal page load.
 */
document.addEventListener("DOMContentLoaded", () => {
  initAllCommentsSliders();
});

/*
 * Shopify Theme Editor.
 */
document.addEventListener("shopify:section:load", (event) => {
  const target = event.target;

  let section = null;

  if (target && target.matches && target.matches(".comments-section")) {
    section = target;
  } else if (target && target.querySelector) {
    section = target.querySelector(".comments-section");
  }

  if (!section) {
    return;
  }

  if (section.dataset.commentsInitialized === "true") {
    return;
  }

  section.dataset.commentsInitialized = "true";

  initCommentsSlider(section);
});
