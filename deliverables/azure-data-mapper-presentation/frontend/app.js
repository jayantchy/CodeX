const THEME_KEY = "azure-data-mapper-theme-v2";
const QUIZ_KEY = "azure-data-mapper-quiz-v1";

const systemTheme = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
const themeToggle = document.querySelector("[data-theme-toggle]");

function storedTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch (_error) {
    return null;
  }
}

function setTheme(theme, persist = false) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  if (themeToggle) {
    themeToggle.textContent = next === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (_error) {
      // The visual theme still works if storage is unavailable.
    }
  }
}

function initTheme() {
  const initial = document.documentElement.dataset.theme || storedTheme() || (systemTheme?.matches ? "dark" : "light");
  setTheme(initial);
  themeToggle?.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
  });
  systemTheme?.addEventListener("change", () => {
    if (!storedTheme()) setTheme(systemTheme.matches ? "dark" : "light");
  });
}

function initNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.setAttribute("aria-current", "page");
  });
}

function getQuizState() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_KEY) || "{}");
  } catch (_error) {
    return {};
  }
}

function setQuizState(state) {
  try {
    localStorage.setItem(QUIZ_KEY, JSON.stringify(state));
  } catch (_error) {
    // Quiz remains usable without saved progress.
  }
}

function initQuiz() {
  const quizRoot = document.querySelector("[data-quiz]");
  if (!quizRoot) return;

  const state = getQuizState();
  const scoreNode = document.querySelector("[data-score]");

  function updateScore() {
    const answered = Object.values(state);
    const correct = answered.filter(Boolean).length;
    if (scoreNode) scoreNode.textContent = `${correct}/${document.querySelectorAll(".quiz-card").length}`;
  }

  document.querySelectorAll(".quiz-card").forEach((card) => {
    const questionId = card.dataset.question;
    const result = card.querySelector(".quiz-result");

    if (questionId in state) {
      card.querySelectorAll(".answer-button").forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") button.classList.add("correct");
      });
      if (result) result.hidden = false;
    }

    card.querySelectorAll(".answer-button").forEach((button) => {
      button.addEventListener("click", () => {
        if (questionId in state) return;
        const isCorrect = button.dataset.correct === "true";
        state[questionId] = isCorrect;
        setQuizState(state);
        button.classList.add(isCorrect ? "correct" : "wrong");
        card.querySelectorAll(".answer-button").forEach((other) => {
          other.disabled = true;
          if (other.dataset.correct === "true") other.classList.add("correct");
        });
        if (result) result.hidden = false;
        updateScore();
      });
    });
  });

  document.querySelector("[data-reset-quiz]")?.addEventListener("click", () => {
    setQuizState({});
    location.reload();
  });

  updateScore();
}

initTheme();
initNav();
initQuiz();
