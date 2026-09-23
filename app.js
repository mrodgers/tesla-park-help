(function () {
  "use strict";

  var form = document.getElementById("demo-form");
  var input = document.getElementById("sample-code");
  var codeEl = document.getElementById("display-code");
  var metaEl = document.getElementById("display-meta");
  var eink = document.querySelector(".eink");
  var note = document.getElementById("demo-note");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var SAMPLES = ["GUEST-4821", "PK-7F3A", "VISITOR9"];
  var sampleIndex = 0;

  function sanitize(raw) {
    return String(raw || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9\-]/g, "")
      .slice(0, 24);
  }

  function validThroughLabel() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    return (
      "Valid through " +
      d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    );
  }

  function updateDisplay(code) {
    var clean = sanitize(code);
    if (!clean) {
      codeEl.textContent = "———";
      metaEl.textContent = "Waiting for a code";
      return;
    }

    if (!reduceMotion && eink) {
      eink.classList.remove("is-updating");
      // Force reflow so animation can replay
      void eink.offsetWidth;
      eink.classList.add("is-updating");
    }

    codeEl.textContent = clean;
    metaEl.textContent = validThroughLabel();

    if (note) note.hidden = false;
  }

  if (form && input) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = sanitize(input.value);
      if (!value) {
        value = SAMPLES[sampleIndex % SAMPLES.length];
        sampleIndex += 1;
        input.value = value;
      }
      updateDisplay(value);
    });

    input.addEventListener("input", function () {
      var value = sanitize(input.value);
      if (value.length >= 3) {
        updateDisplay(value);
      } else if (!value) {
        codeEl.textContent = "———";
        metaEl.textContent = "Waiting for a code";
      }
    });

    input.addEventListener("paste", function () {
      window.setTimeout(function () {
        updateDisplay(input.value);
      }, 0);
    });
  }
})();
