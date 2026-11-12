window.RevealNoPdfFragment = function () {
  return {
    id: "RevealNoPdfFragment",
    init: function (deck) {
      if (deck.getConfig().view !== "print") {
        return;
      }

      // Run before Reveal creates a PDF page for each remaining fragment step.
      deck.getRevealElement().querySelectorAll(".slides > section").forEach(function (slide) {
        const hiddenSteps = new Set();
        const hiddenLayers = new Set();
        const initialLayers = [];

        slide.querySelectorAll(".r-stack").forEach(function (stack) {
          const candidates = Array.from(stack.children).filter(function (layer) {
            return layer.classList.contains("fragment") &&
              layer.classList.contains("fade-in") &&
              !layer.classList.contains("no-pdf-fragment") &&
              layer.querySelector(".fragment.fade-out.no-pdf-fragment");
          });
          candidates.sort(function (a, b) {
            return Number(a.getAttribute("data-fragment-index")) -
              Number(b.getAttribute("data-fragment-index"));
          });
          if (candidates.length > 0) {
            initialLayers.push(candidates[0]);
          }
        });

        slide.querySelectorAll(".fragment.fade-in.no-pdf-fragment").forEach(function (fragment) {
          if (fragment.querySelector(".fragment.fade-out.no-pdf-fragment")) {
            const index = fragment.getAttribute("data-fragment-index");
            if (index !== null) {
              hiddenSteps.add(index);
              hiddenLayers.add(fragment);
            }
          }
        });

        hiddenLayers.forEach(function (layer) {
          layer.remove();
        });

        if (hiddenSteps.size > 0) {
          slide.querySelectorAll(".fragment").forEach(function (fragment) {
            if (
              hiddenSteps.has(fragment.getAttribute("data-fragment-index")) &&
              !fragment.classList.contains("no-pdf-fragment")
            ) {
              const parentLayer = fragment.parentElement.closest(".fragment.fade-in");
              if (parentLayer) {
                fragment.classList.remove("fragment", "visible", "current-fragment");
                fragment.removeAttribute("data-fragment-index");
              } else {
                fragment.remove();
              }
            }
          });
        }

        slide.querySelectorAll(".fragment.no-pdf-fragment").forEach(function (fragment) {
          fragment.classList.remove("fragment", "visible", "current-fragment");
          fragment.removeAttribute("data-fragment-index");
        });

        initialLayers.forEach(function (layer) {
          layer.classList.remove("fragment", "visible", "current-fragment");
          layer.removeAttribute("data-fragment-index");
        });

        if (hiddenSteps.size > 0) {
          const indexes = Array.from(new Set(
            Array.from(slide.querySelectorAll(".fragment"))
              .map(function (fragment) { return fragment.getAttribute("data-fragment-index"); })
              .filter(function (index) { return index !== null; })
          )).sort(function (a, b) { return Number(a) - Number(b); });
          const renumbered = new Map(indexes.map(function (index, position) {
            return [index, String(position)];
          }));

          slide.querySelectorAll(".fragment").forEach(function (fragment) {
            const index = fragment.getAttribute("data-fragment-index");
            if (renumbered.has(index)) {
              fragment.setAttribute("data-fragment-index", renumbered.get(index));
            }
          });
        }
      });
    },
  };
};
