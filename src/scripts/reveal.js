function initReveal() {
  document.documentElement.classList.add("reveal-ready");

  const revealElements = Array.from(document.querySelectorAll("[data-reveal]"))
    .filter((element) => element.getAttribute("data-reveal-initialized") !== "true");
  const processSections = Array.from(document.querySelectorAll("[data-process]"))
    .filter((section) => section.getAttribute("data-process-initialized") !== "true");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealElements.forEach((element) => {
    element.setAttribute("data-reveal-initialized", "true");
    if (!element.classList.contains("reveal-visible") && !element.classList.contains("is-revealed")) {
      element.classList.add("reveal-pending");
    }
  });
  processSections.forEach((section) => section.setAttribute("data-process-initialized", "true"));

  function revealElement(element) {
    if (element.classList.contains("reveal-visible")) return;
    element.classList.remove("reveal-pending");
    element.classList.add("is-revealed", "reveal-visible");
  }

  function revealProcess(section) {
    section.classList.add("in-view");
  }

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(revealElement);
    processSections.forEach(revealProcess);
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => revealObserver.observe(element));

    const processObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealProcess(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    processSections.forEach((section) => processObserver.observe(section));
  }

  processSections.forEach((section) => {
    window.setTimeout(() => revealProcess(section), 2000);
  });
}

if (document.documentElement.dataset.revealLifecycleInitialized !== "true") {
  document.documentElement.dataset.revealLifecycleInitialized = "true";
  document.addEventListener("DOMContentLoaded", initReveal);
  document.addEventListener("astro:page-load", initReveal);
}