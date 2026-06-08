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

function initScrollAnimations() {
  const elements = document.querySelectorAll('section, .card, .step, .issue, .resource, .visual-panel, .hero-copy, .band');
  elements.forEach(el => el.classList.add('animate-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

function initCanvasNodes() {
  const nodes = document.querySelectorAll('.logic-node[data-url]');
  const sidePanel = document.getElementById('side-panel');
  const panelContent = document.getElementById('side-panel-content');
  const panelTitle = document.getElementById('side-panel-title');
  const closeBtn = document.getElementById('close-panel');

  if (!sidePanel || nodes.length === 0) return;

  function closePanel() {
    sidePanel.classList.remove('open');
    nodes.forEach(n => n.classList.remove('active'));
  }

  closeBtn?.addEventListener('click', closePanel);

  nodes.forEach(node => {
    node.addEventListener('click', async (e) => {
      if (e.target.closest('.split-node') && node.classList.contains('split-node')) return;
      
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      
      const url = node.dataset.url;
      const title = node.querySelector('h3').textContent;
      panelTitle.textContent = title;
      
      try {
        panelContent.innerHTML = '<div class="placeholder-content"><span class="kicker">Loading</span><h2>Fetching data...</h2></div>';
        sidePanel.classList.add('open');
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        const text = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const pageContent = doc.querySelector('.page');
        
        if (pageContent) {
          panelContent.innerHTML = '';
          panelContent.appendChild(pageContent);
          initQuiz();
          initScrollAnimations();
        } else {
          panelContent.innerHTML = '<div class="placeholder-content"><span class="kicker">Error</span><h2>Content not found.</h2></div>';
        }
      } catch (err) {
        console.error('Failed to load content:', err);
        panelContent.innerHTML = '<div class="placeholder-content"><span class="kicker">Error</span><h2>Failed to load content.</h2><p>Please ensure you are running this on a web server (e.g., GitHub Pages or local server) as file:// protocol blocks fetch requests.</p></div>';
      }
    });
  });
}

initTheme();
initNav();
initQuiz();
initScrollAnimations();
initCanvasNodes();

