(function () {
  "use strict";

  var form = document.getElementById("demo-form");
  var input = document.getElementById("sample-code");
  var codeEl = document.getElementById("display-code");
  var metaEl = document.getElementById("display-meta");
  var eink = document.querySelector(".eink");
  var note = document.getElementById("demo-note");
  var mailtoLink = document.getElementById("mailto-link");
  var copyBtn = document.getElementById("copy-email");
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
    if (mailtoLink) {
      var subject = encodeURIComponent("Guest code for EV14E28");
      var body = encodeURIComponent(
        "Guest code: " +
          clean +
          "\nPlate: EV14E28\nValid through: (if known)\n"
      );
      mailtoLink.href =
        "mailto:mrodgers.junk@gmail.com?subject=" + subject + "&body=" + body;
    }
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

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "mrodgers.junk@gmail.com";
      var done = function () {
        copyBtn.setAttribute("data-copied", "true");
        copyBtn.textContent = "Copied";
        window.setTimeout(function () {
          copyBtn.removeAttribute("data-copied");
          copyBtn.textContent = "Copy";
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function () {
          fallbackCopy(email, done);
        });
      } else {
        fallbackCopy(email, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      done();
    } catch (err) {
      /* ignore */
    }
    document.body.removeChild(ta);
  }
})();
