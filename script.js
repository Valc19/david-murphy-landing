/* ==========================================================================
   David Murphy — Encore Realty — landing logic (vanilla JS, no dependencies)
   Cloned from colorado-rental-landing's script.js.
   - All copy lives in STRINGS so a future EN/ES toggle is trivial.
   - Form submits to Mailchimp via JSONP so the visitor never leaves the page.
   ========================================================================== */

/* -------------------------------------------------------------------------
   1. COPY STRINGS  (single source — swap `lang` or add `es` later)
   ------------------------------------------------------------------------- */
const STRINGS = {
  en: {
    "cta.primary": "Get My Free Home Value Report",
    "cta.sticky": "Get My Free Report",

    // Hero — seller lead engine angle ("what's it worth", not an instant AVM)
    "hero.headline": "Thinking About Selling in San Carlos? Get the Real Numbers First.",
    "hero.sub": "Get a free, personalized home value report — real San Carlos market data, honest advice, zero pressure. Delivered within 24 hours, not some instant online guess.",
    "hero.bullet1": "No cost, no obligation",
    "hero.bullet2": "Real San Carlos market data",
    "hero.bullet3": "We only talk if you want to",

    // Form
    "form.title": "Get your free home value report",
    "form.subtitle": "Takes about 60 seconds. Delivered within 24 hours.",
    "form.name": "Full name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.address": "Property address",
    "form.situation": "What best describes your situation? (optional)",
    "form.situation.placeholder": "Select one…",
    "form.situation.opt1": "Just curious what it's worth",
    "form.situation.opt2": "Thinking about selling within a year",
    "form.situation.opt3": "Ready to sell now",
    "form.situation.opt4": "Downsizing or upgrading",
    "form.situation.opt5": "Other",
    "form.consent": "I agree to receive calls/texts from David Murphy about my home value request. Msg & data rates may apply. Consent is not a condition of purchase.",
    "form.reassure": "No cost. No obligation. Your information stays private.",

    // Validation messages (friendly)
    "err.name": "Please enter your name.",
    "err.email": "Please enter a valid email address.",
    "err.phone": "Please enter a phone number we can reach you at.",
    "err.address": "Please enter the property address.",
    "err.consent": "Please check the box so we know it's okay to contact you.",
    "err.generic": "Something went wrong. Please try again, or call (720) 635-4872.",

    // Success
    "success.title": "Thanks — you're all set!",
    "success.body": "David will be in touch within 1–2 business days with your home value report.",
    "success.call": "Prefer to talk now? Call (720) 635-4872",

    // Trust bar
    "trust.1": "San Carlos Local",
    "trust.2": "Licensed Realtor",
    "trust.3": "No Obligation",
    "trust.4": "Real Estate + Property Management Expert",

    // Problem
    "problem.title": "Selling shouldn't feel like guesswork.",
    "problem.p1": "Online estimators give you a number that's often way off — they don't know your street.",
    "problem.p2": "You're not sure what your home would actually sell for in today's market.",
    "problem.p3": "You don't want to deal with a pushy agent just to get a straight answer.",
    "problem.p4": "You want a clear recommendation — not a sales pitch.",

    // What you get
    "get.title": "Here's exactly what you'll receive",
    "get.c1.title": "A real market analysis",
    "get.c1.body": "A personalized comparative market analysis for your specific home — not a generic online guess.",
    "get.c2.title": "An honest sell-vs-stay comparison",
    "get.c2.body": "A straight look at today's market and what selling now could mean for you.",
    "get.c3.title": "A clear recommendation",
    "get.c3.body": "A clear next step — with zero obligation either way.",

    // How it works
    "how.title": "Three simple steps",
    "how.s1": "Tell us about your property (60-second form).",
    "how.s2": "David personally reviews it using real San Carlos market data.",
    "how.s3": "You get your report within 24 hours — and we only talk if you want to.",

    // Why David
    "david.title": "You'll be working with a San Carlos local who actually answers the phone",
    "david.bio": "David Murphy has served the San Carlos neighborhood for over 10 years and is proud to call it home. As a Realtor and property management specialist with Encore Realty, he gives homeowners straight answers about their property — not a sales pitch.",
    "david.quote": "“My job is to give you real numbers, not pressure. Whether you sell today or five years from now, you deserve to know exactly where you stand.”",

    // Testimonials
    "testi.title": "What San Carlos homeowners say",
    "testi.note": "Real testimonials from local homeowners — added as they come in.",

    // FAQ
    "faq.title": "Questions homeowners ask",
    "faq.q1": "Is this really free?",
    "faq.a1": "Yes, completely. No catch and no obligation.",
    "faq.q2": "Am I obligated to list with you?",
    "faq.a2": "Not at all. The report is yours to keep, whether or not we ever work together.",
    "faq.q3": "How is this different from a Zillow Zestimate?",
    "faq.a3": "Online estimators use automated data and are often significantly off. David personally reviews your specific property and today's local market — not an algorithm.",
    "faq.q4": "How long does it take?",
    "faq.a4": "Typically within 24 hours.",

    // Final CTA
    "final.title": "Find out what your San Carlos home is really worth.",
    "final.sub": "Get your free, no-obligation home value report today.",

    // Footer
    "footer.tagline": "Real Estate & Property Management Specialist · San Carlos, San Diego",
    "footer.license": "David Murphy, Realtor — DRE #02370029 · Encore Realty Inc — DRE #01308692",
    "footer.equalhousing": "Equal Housing Opportunity. If you are currently working with a real estate agent, please disregard this notice — it is not our intention to solicit the offerings of other brokers.",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "All rights reserved.",
    "footer.disclosure": "Home value reports are estimates based on comparable local sales and market data, not formal appraisals.",
  },
};

/* -------------------------------------------------------------------------
   2. APPLY STRINGS to [data-i18n] nodes
   ------------------------------------------------------------------------- */
const LANG = "en";
function applyStrings(lang) {
  const dict = STRINGS[lang] || STRINGS.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });
}
const t = (key) => (STRINGS[LANG] && STRINGS[LANG][key]) || key;

/* -------------------------------------------------------------------------
   3. INIT
   ------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyStrings(LANG);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initSmoothScroll();
  initAccordion();
  initStickyCta();
  initForm();
});

/* -------------------------------------------------------------------------
   4. SMOOTH SCROLL for [data-scroll] anchors → form (respects header height)
   ------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[data-scroll]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector(".site-header")?.offsetHeight || 0;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
      window.scrollTo({ top: y, behavior: "smooth" });
      // move focus to first field for accessibility
      const firstInput = target.querySelector("input, select, button");
      if (firstInput) setTimeout(() => firstInput.focus({ preventScroll: true }), 450);
    });
  });
}

/* -------------------------------------------------------------------------
   5. FAQ ACCORDION
   ------------------------------------------------------------------------- */
function initAccordion() {
  document.querySelectorAll(".acc-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
    });
  });
}

/* -------------------------------------------------------------------------
   6. STICKY MOBILE CTA — show after hero scrolls away, hide when form visible
   ------------------------------------------------------------------------- */
function initStickyCta() {
  const bar = document.getElementById("sticky-cta");
  const form = document.getElementById("lead-form");
  if (!bar) return;

  let formInView = false;

  // Hide the bar while the form itself is on screen (avoids redundancy).
  if ("IntersectionObserver" in window && form) {
    new IntersectionObserver(
      ([entry]) => {
        formInView = entry.isIntersecting;
        bar.classList.toggle("hidden-by-form", formInView);
      },
      { threshold: 0.25 }
    ).observe(form);
  }

  const onScroll = () => {
    const scrolledPastHero = window.pageYOffset > window.innerHeight * 0.6;
    bar.classList.toggle("visible", scrolledPastHero && !formInView);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* -------------------------------------------------------------------------
   7. LEAD FORM — inline validation + Mailchimp JSONP submit
   ------------------------------------------------------------------------- */
function initForm() {
  const form = document.getElementById("rental-form");
  if (!form) return;

  const feedback = document.getElementById("form-feedback");
  const successBox = document.getElementById("form-success");
  const submitBtn = form.querySelector(".btn-submit");

  // ---- validators ----
  // Each validator receives the INPUT ELEMENT (not just its value) so
  // checkbox fields can check `.checked` instead of `.value`.
  const validators = {
    "f-name": (input) => (input.value.trim().length >= 2 ? "" : t("err.name")),
    "f-email": (input) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()) ? "" : t("err.email")),
    "f-phone": (input) => (input.value.replace(/\D/g, "").length >= 10 ? "" : t("err.phone")),
    "f-address": (input) => (input.value.trim().length >= 4 ? "" : t("err.address")),
    "f-consent": (input) => (input.checked ? "" : t("err.consent")),
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const errEl = document.querySelector(`[data-error-for="${id}"]`);
    const msg = validators[id] ? validators[id](input) : "";
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      errEl.textContent = msg;
      errEl.classList.add("show");
    } else {
      input.removeAttribute("aria-invalid");
      errEl.textContent = "";
      errEl.classList.remove("show");
    }
    return !msg;
  }

  // validate on blur once touched; clear error as they fix it
  Object.keys(validators).forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => validateField(id));
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(id);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "";
    feedback.classList.remove("error");

    const allValid = Object.keys(validators)
      .map(validateField)
      .every(Boolean);

    if (!allValid) {
      const firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    submitToMailchimp(form, {
      onStart: () => submitBtn.classList.add("is-loading"),
      onSuccess: () => {
        form.hidden = true;
        successBox.hidden = false;
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        // (Optional) fire analytics/conversion pixel here.
      },
      onError: (message) => {
        submitBtn.classList.remove("is-loading");
        feedback.textContent = message || t("err.generic");
        feedback.classList.add("error");
      },
    });
  });
}

/* -------------------------------------------------------------------------
   8. MAILCHIMP JSONP submit (no backend, no page redirect, no CORS issue)
   ------------------------------------------------------------------------- */
function submitToMailchimp(form, { onStart, onSuccess, onError }) {
  const action = form.getAttribute("action");

  // Guard: if placeholders weren't replaced, don't pretend it worked.
  if (action.includes("PLACEHOLDER") || action.includes("YOUR_DC")) {
    console.warn(
      "[Mailchimp] Form action still has placeholders. " +
      "Replace the action URL and field names — see README.md."
    );
    // In dev we still show success so the flow is reviewable.
    onStart();
    setTimeout(onSuccess, 600);
    return;
  }

  onStart();

  // Build query string from the form (Mailchimp expects EMAIL, FNAME, etc.)
  const params = new URLSearchParams(new FormData(form)).toString();
  const cb = "mc_cb_" + Date.now();
  const url = action + (action.includes("?") ? "&" : "?") + params + "&c=" + cb;

  const script = document.createElement("script");
  const timeout = setTimeout(() => cleanup(onError, null), 10000);

  window[cb] = (data) => {
    clearTimeout(timeout);
    if (data && data.result === "success") {
      onSuccess();
    } else {
      // Mailchimp returns "already subscribed" as an error — treat as success.
      const msg = (data && data.msg) || "";
      if (/already subscribed/i.test(msg)) onSuccess();
      else onError(stripHtml(msg));
    }
    cleanupScript();
  };

  function cleanup(cbErr, msg) { cbErr(msg); cleanupScript(); }
  function cleanupScript() {
    if (script.parentNode) script.parentNode.removeChild(script);
    try { delete window[cb]; } catch (e) { window[cb] = undefined; }
  }

  script.src = url.replace("/post?", "/post-json?");
  script.onerror = () => { clearTimeout(timeout); cleanup(onError, null); };
  document.body.appendChild(script);
}

function stripHtml(s) {
  if (!s) return "";
  const d = document.createElement("div");
  d.innerHTML = s;
  return d.textContent || d.innerText || "";
}
