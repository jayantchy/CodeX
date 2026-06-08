const issueData = [
  {
    id: "#8507",
    category: "Local testing",
    severity: "High risk",
    title: "Filter on repeating elements breaks child function paths",
    summary: "Generated paths can be wrong when Filter is used on repeating data with downstream child functions.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/8507",
  },
  {
    id: "#6205",
    category: "Local testing",
    severity: "High risk",
    title: "Filter string comparisons fail in map testing",
    summary: "String comparison behavior in Filter is inconsistent enough that teams should validate exact cases in generated XSLT.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/6205",
  },
  {
    id: "#8490",
    category: "Local testing",
    severity: "Medium",
    title: "Copy does not work for JSON arrays of strings",
    summary: "Simple looking payload shapes can still hit mapper edge cases.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/8490",
  },
  {
    id: "#7894",
    category: "Local testing",
    severity: "Medium",
    title: "Output from Data Mapper into next HTTP action is problematic",
    summary: "Some flows appear to need a Compose-style workaround before the next action consumes mapper output.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/7894",
  },
  {
    id: "#8509",
    category: "Local testing",
    severity: "Watch",
    title: "Need a button to regenerate XSLT",
    summary: "Local testing still depends on remembering to save so the current XSLT is regenerated.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/8509",
  },
  {
    id: "#6924",
    category: "Schemas",
    severity: "High risk",
    title: "Referenced JSON schema fails to load",
    summary: "Schemas using $ref can be a major portability problem across machines and maps.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/6924",
  },
  {
    id: "#6802",
    category: "Schemas",
    severity: "High risk",
    title: "JSON and XML schemas with the same basename collide",
    summary: "Using the same file stem for JSON and XML schema files can make the mapper load the wrong file.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/6802",
  },
  {
    id: "#5415",
    category: "Schemas",
    severity: "Medium",
    title: "XSD load null reference error",
    summary: "Schema loading can still fail before any mapping logic is even tested.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/5415",
  },
  {
    id: "#6391",
    category: "Schemas",
    severity: "Medium",
    title: "Cannot choose the root from a multi-root schema",
    summary: "Complex schemas are not always represented cleanly in the authoring surface.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/6391",
  },
  {
    id: "#7623",
    category: "Workspace",
    severity: "High risk",
    title: "Selected folder is not recognized as a logic app project",
    summary: "A clean clone can fail early if the wrong folder is opened or project recognition regresses.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/7623",
  },
  {
    id: "#7247",
    category: "Workspace",
    severity: "Medium",
    title: "Reopened app content causes actions not to load",
    summary: "Opening downloaded or reused project content can destabilize the designer experience.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/7247",
  },
  {
    id: "#9086",
    category: "Workspace",
    severity: "Medium",
    title: "Could not find path to extension bundle",
    summary: "Dependency and bootstrap resolution can fail locally even when project files are present.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/9086",
  },
  {
    id: "#9243",
    category: "Extension regressions",
    severity: "High risk",
    title: "createWorkspace failure in Standard extension",
    summary: "A fresh June 2026 regression cluster affects basic project creation and open flows.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/9243",
  },
  {
    id: "#9242",
    category: "Extension regressions",
    severity: "High risk",
    title: "util_1.isNullOrUndefined is not a function",
    summary: "Public reports tie this regression to deployment script generation and designer flows.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/9242",
  },
  {
    id: "#9250",
    category: "Extension regressions",
    severity: "High risk",
    title: "path argument must be string, received undefined",
    summary: "This issue points to current extension fragility in Standard project handling.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/9250",
  },
  {
    id: "#9251",
    category: "Extension regressions",
    severity: "High risk",
    title: "Unable to open workflow in Logic App Standard",
    summary: "Another signal that version pinning matters immediately for team onboarding.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/9251",
  },
  {
    id: "#6757",
    category: "Feature gaps",
    severity: "Watch",
    title: "Union scenario support is still open",
    summary: "Some important transformation patterns remain product gaps rather than straightforward bugs.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/6757",
  },
  {
    id: "#6984",
    category: "Feature gaps",
    severity: "Watch",
    title: "Dynamic map selection at runtime is still open",
    summary: "Architectures that need runtime-selected maps still require extra design work.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/6984",
  },
  {
    id: "#8197",
    category: "Feature gaps",
    severity: "Watch",
    title: "Remove preview tag from Transform XSLT action remains open",
    summary: "This highlights that parts of the overall mapper execution story still feel unfinished.",
    repo: "Azure/LogicAppsUX",
    url: "https://github.com/Azure/LogicAppsUX/issues/8197",
  },
];

const cdataFacts = [
  {
    title: "Source CDATA is usually just text to XSLT 1.0",
    body:
      "After the XML parser reads the document, CDATA sections and normal escaped text both become text nodes in the XSLT data model. That means the CDATA wrapper usually does not survive as a distinct thing that your transform can reason about.",
  },
  {
    title: "Output CDATA is a serializer choice",
    body:
      "If you need CDATA in the output, treat that as an output-serialization concern. In classic XSLT 1.0, that usually means xsl:output plus cdata-section-elements, not an assumption that input CDATA will echo back automatically.",
  },
  {
    title: "CDATA inside msxsl:script is a different case",
    body:
      "Legacy maps sometimes wrap embedded C# in CDATA inside msxsl:script. That usage is about embedding code safely inside XML, not about preserving the semantic shape of payload text.",
  },
  {
    title: "Public research result",
    body:
      "I did not find a current public Azure open issue that directly targets CDATA behavior in Data Mapper. The likely explanation for most CDATA confusion is standards behavior or serializer configuration, not a mapper-specific CDATA bug.",
  },
];

const checklistSteps = [
  "Install the agreed VS Code version, Azure Logic Apps Standard extension version, and Azure Functions Core Tools.",
  "Open the logic app project root, not Artifacts/Maps or another subfolder.",
  "Copy local.settings.sample.json to local.settings.json and add local values.",
  "Verify Artifacts/MapDefinitions, Artifacts/Maps, and Artifacts/Schemas are present after clone.",
  "Open the workflow designer and the .lml map from the project root.",
  "If schema loading fails, reselect schemas from Artifacts/Schemas.",
  "Save before using the mapper test panel so .xslt is regenerated.",
  "Review .lml and generated .xslt together in pull requests.",
];

const sourceLinks = [
  {
    label: "Create maps to transform data in logic app workflows with Visual Studio Code",
    url: "https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
  },
  {
    label: "Add maps for transform operations to use in workflows created with Azure Logic Apps",
    url: "https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
  },
  {
    label: "Transform XML in workflows with Azure Logic Apps",
    url: "https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform",
  },
  {
    label: "DevOps deployment for Standard logic app workflows in Azure Logic Apps",
    url: "https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps",
  },
  {
    label: "Automate build and deployment for Standard logic app workflows",
    url: "https://learn.microsoft.com/azure/logic-apps/automate-build-deployment-standard",
  },
  {
    label: "W3C XSLT 1.0 Recommendation",
    url: "https://www.w3.org/TR/xslt.html",
  },
  {
    label: "W3C XSLT 3.0 Recommendation",
    url: "https://www.w3.org/TR/xslt-30/",
  },
];

const quizQuestions = [
  {
    id: "q1",
    question: "Which artifact is the visual design source in Logic Apps Standard Data Mapper?",
    answers: [
      { label: ".lml", correct: true, explanation: "The .lml file is the mapper design source, while generated .xslt is the runtime artifact." },
      { label: ".xslt", correct: false, explanation: "The .xslt file is the runtime transform output, not the visual design source." },
      { label: "workflow.json", correct: false, explanation: "The workflow references the map, but it is not the design artifact for the map itself." },
    ],
  },
  {
    id: "q2",
    question: "What is the safest interpretation of CDATA in XSLT 1.0 input?",
    answers: [
      { label: "CDATA always remains a special node through the transform", correct: false, explanation: "In normal XSLT processing, source CDATA is parsed into text nodes." },
      { label: "CDATA is mostly parsed as normal text", correct: true, explanation: "That is why many CDATA problems are serializer or expectation issues, not preserved input wrappers." },
      { label: "CDATA is unsupported in Logic Apps", correct: false, explanation: "CDATA exists in XML; the question is how it is parsed and serialized." },
    ],
  },
  {
    id: "q3",
    question: "Which public hosting path is the easiest fit for this deliverable right now?",
    answers: [
      { label: "GitHub Pages", correct: true, explanation: "This site is static, and the repo now includes a workflow prepared for GitHub Pages." },
      { label: "A VM with IIS", correct: false, explanation: "It would work, but it is heavier than needed for a static site." },
      { label: "SQL Database", correct: false, explanation: "This is not a site-hosting platform." },
    ],
  },
];

const badgeDefinitions = [
  { id: "explorer", label: "Explorer", description: "Visit every main section." },
  { id: "cdata-whisperer", label: "CDATA Whisperer", description: "Open every CDATA fact card." },
  { id: "bug-hunter", label: "Bug Hunter", description: "Inspect four public issues." },
  { id: "risk-tamer", label: "Risk Tamer", description: "Inspect three high-risk issues." },
  { id: "quiz-ace", label: "Quiz Ace", description: "Answer all quiz prompts correctly." },
  { id: "release-captain", label: "Release Captain", description: "Reach 75% launch readiness." },
];

const categories = ["All", "Local testing", "Schemas", "Workspace", "Extension regressions", "Feature gaps"];
const trackedSections = ["mission", "overview", "xslt", "issues", "team", "sources"];
const STORAGE_KEY = "azure-data-mapper-game-state-v3";
const THEME_STORAGE_KEY = "azure-data-mapper-theme-v1";

const localSettingsSnippet = `{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "WORKFLOWS_TENANT_ID": "",
    "WORKFLOWS_SUBSCRIPTION_ID": "",
    "WORKFLOWS_RESOURCE_GROUP_NAME": "",
    "servicebus_connectionString": "",
    "connectionKey": ""
  }
}`;

const gitignoreSnippet = `# Logic Apps Standard local secrets
local.settings.json
**/local.settings.json

# Optional VS Code per-user workspace settings
.vscode/settings.json

# OS noise
.DS_Store
Thumbs.db`;

const accordionRoot = document.getElementById("cdata-accordion");
const issuesGrid = document.getElementById("issues-grid");
const categoryChips = document.getElementById("category-chips");
const issueSearch = document.getElementById("issue-search");
const issueCount = document.getElementById("issue-count");
const sourceLinksRoot = document.getElementById("source-links");
const checklistRoot = document.getElementById("checklist");
const tabsRoot = document.getElementById("team-tabs");
const badgeRow = document.getElementById("badge-row");
const missionCardsRoot = document.getElementById("mission-cards");
const quizRoot = document.getElementById("quiz-stack");
const toastStack = document.getElementById("toast-stack");
const resetProgressButton = document.getElementById("reset-progress");
const sectionNavLinks = Array.from(document.querySelectorAll(".section-nav a"));
const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = document.getElementById("theme-toggle-icon");
const themeToggleValue = document.getElementById("theme-toggle-value");
const systemThemeMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

let activeCategory = "All";
let gameState = loadGameState();

function defaultGameState() {
  return {
    xp: 0,
    visitedSections: [],
    viewedIssues: [],
    openedFacts: [],
    answeredQuiz: {},
    checklistXpClaims: [],
    exploredTabs: [],
  };
}

function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultGameState();
    return { ...defaultGameState(), ...JSON.parse(raw) };
  } catch (_error) {
    return defaultGameState();
  }
}

function saveGameState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

function getStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
  } catch (_error) {
    return null;
  }
}

function getSystemTheme() {
  return systemThemeMedia?.matches ? "dark" : "light";
}

function updateThemeToggle(theme) {
  if (!themeToggle || !themeToggleIcon || !themeToggleValue) return;

  const isDark = theme === "dark";
  themeToggle.dataset.mode = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggleIcon.textContent = isDark ? "MOON" : "SUN";
  themeToggleValue.textContent = isDark ? "Dark mode" : "Light mode";
}

function applyTheme(theme, persist = false) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  updateThemeToggle(nextTheme);

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (_error) {
      // Ignore storage failures and keep the current in-memory theme.
    }
  }
}

function initializeTheme() {
  applyTheme(document.documentElement.dataset.theme || getStoredTheme() || getSystemTheme());

  if (systemThemeMedia?.addEventListener) {
    systemThemeMedia.addEventListener("change", () => {
      if (!getStoredTheme()) {
        applyTheme(getSystemTheme());
      }
    });
  }
}

function setThemeHandlers() {
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark", true);
  });
}

function uniquePush(collection, value) {
  if (!collection.includes(value)) {
    collection.push(value);
    return true;
  }
  return false;
}

function showToast(title, message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  toastStack.appendChild(toast);
  window.setTimeout(() => {
    toast.remove();
  }, 2600);
}

function levelInfo(xp) {
  const levels = [
    { name: "Map Scout", min: 0, next: 120 },
    { name: "Schema Runner", min: 120, next: 260 },
    { name: "Issue Hunter", min: 260, next: 420 },
    { name: "Release Captain", min: 420, next: 620 },
    { name: "Integration Architect", min: 620, next: 9999 },
  ];
  const current = levels.find((level, index) => xp >= level.min && xp < levels[index + 1]?.min) || levels[levels.length - 1];
  const next = levels.find((level) => level.min > xp);
  if (!next) {
    return { name: current.name, percent: 100, caption: "You have fully cleared the current challenge path." };
  }
  const span = next.min - current.min;
  const percent = Math.min(100, Math.round(((xp - current.min) / span) * 100));
  return {
    name: current.name,
    percent,
    caption: `${next.min - xp} XP to reach ${next.name}.`,
  };
}

function getViewedIssueObjects() {
  return issueData.filter((issue) => gameState.viewedIssues.includes(issue.id));
}

function getReadinessPercent() {
  const checkedCount = checklistSteps.filter((_step, index) => localStorage.getItem(checklistKey(index)) === "true").length;
  return Math.round((checkedCount / checklistSteps.length) * 100);
}

function computeBadges() {
  const viewedIssues = getViewedIssueObjects();
  const highRiskCount = viewedIssues.filter((issue) => issue.severity === "High risk").length;
  const correctQuizCount = Object.values(gameState.answeredQuiz).filter(isQuizResultCorrect).length;
  const readiness = getReadinessPercent();

  return {
    explorer: gameState.visitedSections.length >= trackedSections.length,
    "cdata-whisperer": gameState.openedFacts.length >= cdataFacts.length,
    "bug-hunter": gameState.viewedIssues.length >= 4,
    "risk-tamer": highRiskCount >= 3,
    "quiz-ace": correctQuizCount >= quizQuestions.length,
    "release-captain": readiness >= 75,
  };
}

function computeMissions() {
  const viewedIssues = getViewedIssueObjects();
  const highRiskCount = viewedIssues.filter((issue) => issue.severity === "High risk").length;
  const answeredCount = Object.keys(gameState.answeredQuiz).length;
  const readiness = getReadinessPercent();

  return [
    {
      title: "Explorer Circuit",
      progress: `${gameState.visitedSections.length}/${trackedSections.length} sections visited`,
      complete: gameState.visitedSections.length >= trackedSections.length,
      description: "Scroll through every major section at least once.",
    },
    {
      title: "Risk Hunt",
      progress: `${highRiskCount}/3 high-risk issues inspected`,
      complete: highRiskCount >= 3,
      description: "Open the most important issue cards and see where the public pain points cluster.",
    },
    {
      title: "Quiz Run",
      progress: `${answeredCount}/${quizQuestions.length} prompts answered`,
      complete: answeredCount >= quizQuestions.length,
      description: "Use the quiz to lock in the key artifact and deployment ideas.",
    },
    {
      title: "Launch Drill",
      progress: `${readiness}% readiness`,
      complete: readiness >= 75,
      description: "Raise readiness by checking off the onboarding and release tasks.",
    },
  ];
}

function awardXp(amount, reason, detail = "") {
  gameState.xp += amount;
  saveGameState();
  renderGameUi();
  showToast(`+${amount} XP`, detail ? `${reason}: ${detail}` : reason);
}

function markSectionVisited(sectionId) {
  if (uniquePush(gameState.visitedSections, sectionId)) {
    saveGameState();
    awardXp(35, "Section explored", sectionId);
  }
}

function markFactOpened(index) {
  if (uniquePush(gameState.openedFacts, index)) {
    saveGameState();
    awardXp(15, "CDATA fact unlocked");
  }
}

function markIssueViewed(issueId) {
  if (uniquePush(gameState.viewedIssues, issueId)) {
    saveGameState();
    const issue = issueData.find((entry) => entry.id === issueId);
    const amount = issue?.severity === "High risk" ? 28 : 18;
    awardXp(amount, "Issue inspected", issueId);
  }
}

function markChecklistXp(index) {
  if (uniquePush(gameState.checklistXpClaims, index)) {
    saveGameState();
    awardXp(12, "Launch task completed");
  }
}

function answerQuiz(questionId, answerIndex) {
  if (gameState.answeredQuiz[questionId]) return;
  const question = quizQuestions.find((entry) => entry.id === questionId);
  const answer = question.answers[answerIndex];
  gameState.answeredQuiz[questionId] = { correct: answer.correct, selectedIndex: answerIndex };
  saveGameState();
  awardXp(answer.correct ? 42 : 16, "Quiz answered", answer.correct ? "Correct answer" : "Learning attempt");
  renderQuiz();
  renderGameUi();
}

function isQuizResultCorrect(result) {
  return typeof result === "object" ? result.correct : result === "correct";
}

function getSelectedQuizIndex(questionId) {
  const result = gameState.answeredQuiz[questionId];
  if (typeof result === "object") return result.selectedIndex;
  return -1;
}

function renderBadges() {
  const unlocked = computeBadges();
  badgeRow.innerHTML = badgeDefinitions
    .map(
      (badge) => `
        <span class="badge ${unlocked[badge.id] ? "unlocked" : ""}" title="${badge.description}">
          ${badge.label}
        </span>
      `
    )
    .join("");
}

function renderMissionCards() {
  const missions = computeMissions();
  missionCardsRoot.innerHTML = missions
    .map(
      (mission) => `
        <article class="mission-card ${mission.complete ? "complete" : ""}">
          <h4>${mission.title}</h4>
          <p>${mission.description}</p>
          <span>${mission.progress}</span>
          <div class="mission-status">${mission.complete ? "Unlocked" : "In progress"}</div>
        </article>
      `
    )
    .join("");
}

function renderGameUi() {
  const level = levelInfo(gameState.xp);
  document.getElementById("player-level").textContent = level.name;
  document.getElementById("player-xp").textContent = String(gameState.xp);
  document.getElementById("player-sections").textContent = `${gameState.visitedSections.length}/${trackedSections.length}`;
  document.getElementById("xp-progress-bar").style.width = `${level.percent}%`;
  document.getElementById("level-caption").textContent = level.caption;
  renderBadges();
  renderMissionCards();
  updateReadiness();
}

function renderAccordion() {
  accordionRoot.innerHTML = cdataFacts
    .map(
      (fact, index) => `
        <article class="accordion-item ${index === 0 ? "open" : ""}" data-fact-index="${index}">
          <button class="accordion-trigger" type="button">${fact.title}</button>
          <div class="accordion-body" style="${index === 0 ? "max-height: 220px;" : ""}">
            <div class="accordion-body-inner">
              <p>${fact.body}</p>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  accordionRoot.querySelectorAll(".accordion-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const body = item.querySelector(".accordion-body");
      const isOpen = item.classList.contains("open");
      item.classList.toggle("open", !isOpen);
      body.style.maxHeight = isOpen ? "0px" : `${body.scrollHeight}px`;
      if (!isOpen) {
        markFactOpened(Number(item.dataset.factIndex));
      }
    });
  });

  markFactOpened(0);
}

function renderCategoryChips() {
  categoryChips.innerHTML = categories
    .map(
      (category) => `
        <button class="chip ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");

  categoryChips.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.category;
      renderCategoryChips();
      renderIssues();
    });
  });
}

function severityClass(severity) {
  if (severity === "High risk") return "severity-high";
  if (severity === "Medium") return "severity-medium";
  return "severity-watch";
}

function renderIssues() {
  const query = issueSearch.value.trim().toLowerCase();
  const filtered = issueData.filter((issue) => {
    const matchesCategory = activeCategory === "All" || issue.category === activeCategory;
    const text = `${issue.id} ${issue.title} ${issue.summary} ${issue.repo}`.toLowerCase();
    return matchesCategory && (!query || text.includes(query));
  });

  issueCount.textContent = String(filtered.length);
  issuesGrid.innerHTML = filtered
    .map((issue) => {
      const viewed = gameState.viewedIssues.includes(issue.id);
      return `
        <article class="issue-card ${viewed ? "viewed" : ""}" data-issue-id="${issue.id}">
          <header>
            <div>
              <h3>
                <a href="${issue.url}" target="_blank" rel="noreferrer">${issue.id} ${issue.title}</a>
              </h3>
            </div>
          </header>
          <p>${issue.summary}</p>
          <div class="issue-meta">
            <span>${issue.category}</span>
            <span>${issue.repo}</span>
          </div>
          <div class="issue-tags">
            <span class="${severityClass(issue.severity)}">${issue.severity}</span>
          </div>
        </article>
      `;
    })
    .join("");

  issuesGrid.querySelectorAll(".issue-card a").forEach((link) => {
    link.addEventListener("click", () => {
      const card = link.closest(".issue-card");
      markIssueViewed(card.dataset.issueId);
      card.classList.add("viewed");
    });
  });
}

function renderQuiz() {
  quizRoot.innerHTML = quizQuestions
    .map((question) => {
      const result = gameState.answeredQuiz[question.id];
      const resultCorrect = isQuizResultCorrect(result);
      const selectedIndex = getSelectedQuizIndex(question.id);
      return `
        <article class="quiz-card">
          <h4>${question.question}</h4>
          <p class="quiz-question">Choose the strongest answer.</p>
          <div class="answer-list">
            ${question.answers
              .map((answer, index) => {
                let stateClass = "";
                if (result) {
                  if (answer.correct) stateClass = "correct";
                  if (!answer.correct && !resultCorrect && index === selectedIndex) {
                    stateClass = "wrong";
                  }
                }
                return `
                  <button class="answer-button ${stateClass}" type="button" data-question-id="${question.id}" data-answer-index="${index}" ${
                    result ? "disabled" : ""
                  }>
                    <span>${answer.label}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
          ${
            result
              ? `<p class="quiz-result">${
                  resultCorrect ? "Correct. " : "Not quite. "
                }${question.answers.find((answer) => answer.correct).explanation}</p>`
              : ""
          }
        </article>
      `;
    })
    .join("");

  quizRoot.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", () => {
      answerQuiz(button.dataset.questionId, Number(button.dataset.answerIndex));
    });
  });
}

function renderSources() {
  sourceLinksRoot.innerHTML = sourceLinks
    .map((source) => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a></li>`)
    .join("");
}

function checklistKey(index) {
  return `azure-data-mapper-check-${index}`;
}

function updateReadiness() {
  const readiness = getReadinessPercent();
  document.getElementById("readiness-score").textContent = `${readiness}%`;
}

function renderChecklist() {
  checklistRoot.innerHTML = checklistSteps
    .map((step, index) => {
      const checked = localStorage.getItem(checklistKey(index)) === "true";
      return `
        <label class="check-item ${checked ? "done" : ""}">
          <input type="checkbox" data-index="${index}" ${checked ? "checked" : ""} />
          <span>${step}</span>
        </label>
      `;
    })
    .join("");

  checklistRoot.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener("change", () => {
      const index = Number(input.dataset.index);
      localStorage.setItem(checklistKey(index), String(input.checked));
      input.closest(".check-item").classList.toggle("done", input.checked);
      if (input.checked) {
        markChecklistXp(index);
      } else {
        saveGameState();
      }
      renderGameUi();
    });
  });
}

function setSnippets() {
  document.getElementById("local-settings-snippet").textContent = localSettingsSnippet;
  document.getElementById("gitignore-snippet").textContent = gitignoreSnippet;
}

async function copyText(kind) {
  const text = kind === "local-settings" ? localSettingsSnippet : gitignoreSnippet;
  try {
    await navigator.clipboard.writeText(text);
  } catch (_error) {
    // Ignore clipboard failures in local file mode; the UI stays usable.
  }
}

function setCopyHandlers() {
  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      await copyText(button.dataset.copy);
      const original = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1100);
    });
  });
}

function setTabHandlers() {
  tabsRoot.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      tabsRoot.querySelectorAll(".tab").forEach((other) => other.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`.tab-panel[data-panel="${tab.dataset.tab}"]`).classList.add("active");
      if (uniquePush(gameState.exploredTabs, tab.dataset.tab)) {
        saveGameState();
        awardXp(6, "Team tab explored", tab.dataset.tab);
      }
    });
  });
}

function setSectionTracking() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markSectionVisited(entry.target.id);
          updateActiveNav(entry.target.id);
        }
      });
    },
    { threshold: 0.45 }
  );

  trackedSections.forEach((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);
  });
}

function updateActiveNav(activeId) {
  sectionNavLinks.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target === activeId);
  });
}

function setManualNavTracking() {
  sectionNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href")?.replace("#", "");
      if (target) updateActiveNav(target);
    });
  });
}

function resetProgress() {
  gameState = defaultGameState();
  saveGameState();
  checklistSteps.forEach((_step, index) => {
    localStorage.removeItem(checklistKey(index));
  });
  activeCategory = "All";
  issueSearch.value = "";
  renderCategoryChips();
  renderAccordion();
  renderIssues();
  renderQuiz();
  renderChecklist();
  renderGameUi();
  showToast("Progress reset", "The missions, XP, and readiness score are back to zero.");
}

function initialize() {
  initializeTheme();
  renderAccordion();
  renderCategoryChips();
  renderIssues();
  renderQuiz();
  renderSources();
  renderChecklist();
  setSnippets();
  setCopyHandlers();
  setTabHandlers();
  setThemeHandlers();
  setSectionTracking();
  setManualNavTracking();
  renderGameUi();

  issueSearch.addEventListener("input", renderIssues);
  resetProgressButton.addEventListener("click", resetProgress);
}

initialize();
