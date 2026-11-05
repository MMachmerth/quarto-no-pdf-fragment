window.RevealNoPdfFragment = function () {
  return {
    id: "RevealNoPdfFragment",
    init: function (deck) {
      if (deck.getConfig().view !== "print") {
        return;
      }

      // Run before Reveal creates a PDF page for each remaining fragment step.
      deck.getRevealElement()
        .querySelectorAll(".fragment.no-pdf-fragment")
        .forEach(function (fragment) {
          fragment.classList.remove("fragment", "visible", "current-fragment");
          fragment.removeAttribute("data-fragment-index");
        });
    },
  };
};
