const THEME_KEY = "azure-data-mapper-theme-v2";
const QUIZ_KEY = "azure-data-mapper-quiz-v1";
const VISITED_KEY = "azure-data-mapper-visited-v1";

/* ═══════════════════════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════════════════════ */

const systemTheme = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
const themeToggle = document.querySelector("[data-theme-toggle]");

function storedTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" || value === "azure" ? value : null;
  } catch (_error) {
    return null;
  }
}

function setTheme(theme, persist = false) {
  let next = "light";
  let label = "☀ Light";
  
  if (theme === "dark") {
    next = "dark";
    label = "☾ Dark";
  } else if (theme === "azure") {
    next = "azure";
    label = "☁ Azure";
  }

  document.documentElement.dataset.theme = next;
  if (themeToggle) {
    // Next theme to switch TO when clicked
    let nextToggle = "☾ Dark";
    if (next === "dark") nextToggle = "☁ Azure";
    else if (next === "azure") nextToggle = "☀ Light";
    
    themeToggle.textContent = nextToggle;
    themeToggle.setAttribute("aria-label", "Switch to " + nextToggle + " mode");
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
    const current = document.documentElement.dataset.theme;
    let nextTheme = "dark";
    if (current === "dark") nextTheme = "azure";
    else if (current === "azure") nextTheme = "light";
    setTheme(nextTheme, true);
  });
  systemTheme?.addEventListener("change", () => {
    if (!storedTheme()) setTheme(systemTheme.matches ? "dark" : "light");
  });
}

/* ═══════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════ */

function initNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || href === `./${current}`) link.setAttribute("aria-current", "page");
  });
}

/* ═══════════════════════════════════════════════════════════
   MOBILE HAMBURGER MENU
   ═══════════════════════════════════════════════════════════ */

function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".nav-overlay");

  if (!hamburger || !nav) return;

  function closeNav() {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
    overlay?.classList.remove("visible");
    document.body.style.overflow = "";
  }

  function openNav() {
    hamburger.classList.add("active");
    nav.classList.add("open");
    overlay?.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  hamburger.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay?.addEventListener("click", closeNav);

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) closeNav();
  });

  // Close on nav link click
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
}

/* ═══════════════════════════════════════════════════════════
   QUIZ
   ═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════
   SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════════ */

function initScrollAnimations() {
  const elements = document.querySelectorAll('section, .card, .step, .issue, .resource, .visual-panel, .hero-copy, .band, .function-card, .troubleshoot-item, .animate-on-scroll');
  elements.forEach(el => el.classList.add('animate-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   COPY-TO-CLIPBOARD
   ═══════════════════════════════════════════════════════════ */

function initCopyButtons() {
  document.querySelectorAll('pre').forEach((pre) => {
    // Skip if already wrapped
    if (pre.parentElement?.classList.contains('code-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = `<svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/></svg>Copy`;
    wrapper.appendChild(btn);

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent;
      try {
        await navigator.clipboard.writeText(code);
        btn.classList.add('copied');
        btn.innerHTML = `<svg viewBox="0 0 16 16"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>Copied!`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/></svg>Copy`;
        }, 2000);
      } catch (err) {
        // Fallback for browsers without clipboard API
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   CANVAS NODES — CLICK HANDLERS & SIDE PANEL
   ═══════════════════════════════════════════════════════════ */

function initCanvasNodes() {
  const nodes = document.querySelectorAll('.logic-node[data-url]');
  const sidePanel = document.getElementById('side-panel');
  const panelContent = document.getElementById('side-panel-content');
  const panelTitle = document.getElementById('side-panel-title');
  const closeBtn = document.getElementById('close-panel');

  if (!sidePanel || nodes.length === 0) return;

  // Make nodes keyboard-focusable
  nodes.forEach(node => {
    if (!node.getAttribute('tabindex')) node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
  });

  function closePanel() {
    sidePanel.classList.remove('open');
    nodes.forEach(n => n.classList.remove('active'));
  }

  closeBtn?.addEventListener('click', closePanel);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidePanel.classList.contains('open')) closePanel();
  });

  async function loadNode(node) {
    nodes.forEach(n => n.classList.remove('active'));
    node.classList.add('active');

    // Track visited
    markVisited(node.dataset.url);

    const url = node.dataset.url;
    const title = node.querySelector('h3')?.textContent || 'Properties';
    panelTitle.textContent = title;

    try {
      panelContent.innerHTML = '<div class="placeholder-content"><span class="kicker">Loading</span><div class="shimmer-line" style="width:90%"></div><div class="shimmer-line"></div><div class="shimmer-line"></div></div>';
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
        initCopyButtons();
        initSchemaTabs();
      } else {
        panelContent.innerHTML = '<div class="placeholder-content"><span class="kicker">Error</span><h2>Content not found.</h2></div>';
      }
    } catch (err) {
      console.error('Failed to load content:', err);
      panelContent.innerHTML = '<div class="placeholder-content"><span class="kicker">Error</span><h2>Failed to load content.</h2><p>Please ensure you are running this on a web server (e.g., GitHub Pages or local server) as file:// protocol blocks fetch requests.</p></div>';
    }
  }

  nodes.forEach(node => {
    node.addEventListener('click', (e) => {
      if (e.target.closest('.split-node') && node.classList.contains('split-node')) return;
      loadNode(node);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (e.target.closest('.split-node') && node.classList.contains('split-node')) return;
        loadNode(node);
      }
    });
  });

  // Arrow key navigation between nodes
  const focusableNodes = Array.from(nodes).filter(n => !n.classList.contains('split-node'));
  focusableNodes.forEach((node, idx) => {
    node.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && idx < focusableNodes.length - 1) {
        e.preventDefault();
        focusableNodes[idx + 1].focus();
      } else if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault();
        focusableNodes[idx - 1].focus();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   VISITED PROGRESS TRACKING
   ═══════════════════════════════════════════════════════════ */

function getVisited() {
  try {
    return JSON.parse(localStorage.getItem(VISITED_KEY) || "[]");
  } catch (_error) {
    return [];
  }
}

function markVisited(url) {
  try {
    const visited = getVisited();
    if (!visited.includes(url)) {
      visited.push(url);
      localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
    }
    // Update dots
    document.querySelectorAll('.logic-node[data-url]').forEach(node => {
      if (visited.includes(node.dataset.url)) {
        node.classList.add('visited');
      }
    });
  } catch (_error) {
    // Progress tracking is optional.
  }
}

function initProgress() {
  const visited = getVisited();
  document.querySelectorAll('.logic-node[data-url]').forEach(node => {
    // Add progress dot
    const dot = document.createElement('span');
    dot.className = 'progress-dot';
    dot.title = 'Visited';
    node.appendChild(dot);

    if (visited.includes(node.dataset.url)) {
      node.classList.add('visited');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   SCHEMA TABS (Sample page)
   ═══════════════════════════════════════════════════════════ */

function initSchemaTabs() {
  document.querySelectorAll('.schema-container').forEach(container => {
    const tabs = container.querySelectorAll('.schema-tab');
    const panels = container.querySelectorAll('.schema-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        container.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */

initTheme();
initNav();
initMobileNav();
initQuiz();
initScrollAnimations();
initCanvasNodes();
initCopyButtons();
initProgress();
initSchemaTabs();

