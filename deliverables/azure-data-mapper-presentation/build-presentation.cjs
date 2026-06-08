const path = require("path");
const PptxGenJS = require("/Users/jayantchoudhary/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs");

const pptx = new PptxGenJS();
const OUT_FILE = path.join(__dirname, "azure-data-mapper-presentation.pptx");

pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "OpenAI";
pptx.subject = "Azure Logic Apps Standard Data Mapper";
pptx.title = "Azure Data Mapper for Mapping";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineSlideMaster({
  title: "CODEx_MASTER",
  bkgd: "F8FBFF",
  objects: [],
  slideNumber: { x: 12.3, y: 7.02, color: "6B7280", fontFace: "Aptos", fontSize: 9 },
});

const W = 13.333;
const H = 7.5;

const C = {
  ink: "0F172A",
  azure: "0078D4",
  azureDark: "005A9E",
  cyan: "00B7C3",
  teal: "0F766E",
  gold: "C0841A",
  rose: "BE185D",
  green: "15803D",
  red: "B91C1C",
  slate: "475569",
  muted: "64748B",
  line: "D7E3F3",
  soft: "EEF6FF",
  soft2: "F8FBFF",
  white: "FFFFFF",
  smoke: "E5EEF8",
  fog: "F3F7FC",
};

function addTopBar(slide, color = C.ink) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: 0.28,
    line: { color },
    fill: { color },
  });
}

function addPill(slide, text, x, y, w, fill, color = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.06,
    line: { color: fill, pt: 1 },
    fill: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.06,
    y: y + 0.05,
    w: w - 0.12,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addTitle(slide, kicker, title, subtitle, opts = {}) {
  addTopBar(slide, opts.barColor || C.ink);
  addPill(slide, kicker, 0.65, 0.48, opts.kickerWidth || 1.45, opts.kickerFill || C.azure, opts.kickerColor || C.white);
  slide.addText(title, {
    x: 0.65,
    y: 0.92,
    w: 8.8,
    h: 0.56,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: opts.titleColor || C.ink,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.67,
      y: 1.43,
      w: 11.5,
      h: 0.4,
      fontFace: "Aptos",
      fontSize: 11.5,
      color: C.slate,
      margin: 0,
    });
  }
  slide.addShape(pptx.ShapeType.line, {
    x: 0.67,
    y: 1.93,
    w: 12.0,
    h: 0,
    line: { color: C.line, pt: 1.1 },
  });
  slide.addText("Research basis: Microsoft Learn, Azure Logic Apps releases, W3C XSLT 3.0", {
    x: 7.65,
    y: 7.02,
    w: 4.4,
    h: 0.18,
    align: "right",
    fontFace: "Aptos",
    fontSize: 8.5,
    color: C.muted,
    margin: 0,
  });
}

function addCard(slide, cfg) {
  const {
    x,
    y,
    w,
    h,
    title,
    body,
    accent = C.azure,
    fill = C.white,
    titleColor = C.ink,
    bodyColor = C.slate,
    titleSize = 15,
    bodySize = 11.5,
    mono = false,
  } = cfg;

  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.06,
    line: { color: C.line, pt: 1.1 },
    fill: { color: fill },
    shadow: { type: "outer", color: "DDE7F3", blur: 1, angle: 45, distance: 1, opacity: 0.08 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.08,
    h,
    line: { color: accent, pt: 0 },
    fill: { color: accent },
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.18,
      y: y + 0.13,
      w: w - 0.28,
      h: 0.26,
      fontFace: "Aptos Display",
      fontSize: titleSize,
      bold: true,
      color: titleColor,
      margin: 0,
    });
  }
  if (body) {
    slide.addText(body, {
      x: x + 0.18,
      y: y + 0.45,
      w: w - 0.28,
      h: h - 0.58,
      fontFace: mono ? "Courier New" : "Aptos",
      fontSize: bodySize,
      color: bodyColor,
      margin: 0.02,
      breakLine: false,
      fit: "shrink",
      valign: "top",
    });
  }
}

function addNumberBadge(slide, num, x, y, fill) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x,
    y,
    w: 0.34,
    h: 0.34,
    line: { color: fill, pt: 0 },
    fill: { color: fill },
  });
  slide.addText(String(num), {
    x,
    y: y + 0.04,
    w: 0.34,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
}

function addFlowNode(slide, label, x, y, w, accent, textColor = C.ink) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.62,
    rectRadius: 0.06,
    line: { color: accent, pt: 1.4 },
    fill: { color: C.white },
  });
  slide.addText(label, {
    x: x + 0.08,
    y: y + 0.17,
    w: w - 0.16,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: textColor,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
}

function addArrow(slide, x, y, w, color = C.azure) {
  slide.addShape(pptx.ShapeType.chevron, {
    x,
    y,
    w,
    h: 0.3,
    line: { color, pt: 0 },
    fill: { color },
  });
}

function notes(title, lines) {
  return `${title}\n\n${lines.join("\n")}`;
}

function buildTitleSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.ink };

  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.35,
    y: -0.55,
    w: 4.5,
    h: 4.5,
    line: { color: C.azureDark, pt: 0 },
    fill: { color: C.azureDark, transparency: 18 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 10.35,
    y: 0.55,
    w: 2.4,
    h: 2.4,
    line: { color: C.cyan, pt: 0 },
    fill: { color: C.cyan, transparency: 28 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -0.55,
    y: 5.55,
    w: 2.5,
    h: 2.5,
    line: { color: C.gold, pt: 0 },
    fill: { color: C.gold, transparency: 16 },
  });

  addPill(slide, "AZURE LOGIC APPS STANDARD", 0.78, 0.62, 2.55, C.azure);
  slide.addText("Azure Data Mapper for Mapping", {
    x: 0.78,
    y: 1.23,
    w: 7.15,
    h: 0.72,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Use cases, XSLT 3.0, tradeoffs, XSLT 1.0 coexistence, local testing issues, and team-friendly CI/CD.", {
    x: 0.8,
    y: 2.12,
    w: 8.85,
    h: 0.6,
    fontFace: "Aptos",
    fontSize: 13,
    color: "D9E7F7",
    margin: 0,
  });
  slide.addText("Research snapshot: June 2026", {
    x: 0.8,
    y: 2.78,
    w: 2.7,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10.5,
    color: "A7C8EA",
    bold: true,
    margin: 0,
  });

  addPill(slide, "Use cases", 0.8, 3.5, 1.28, C.azureDark);
  addPill(slide, "XSLT 3.0", 2.18, 3.5, 1.35, C.cyan, C.ink);
  addPill(slide, "Compatibility", 3.64, 3.5, 1.6, C.teal);
  addPill(slide, "Local testing", 5.34, 3.5, 1.55, C.rose);
  addPill(slide, "CI/CD", 7.0, 3.5, 1.05, C.gold, C.ink);

  addFlowNode(slide, "Source XML / JSON", 0.95, 5.1, 2.05, C.cyan, C.white);
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.95,
    y: 5.1,
    w: 2.05,
    h: 0.62,
    line: { color: C.cyan, pt: 0 },
    fill: { color: C.cyan },
  });
  slide.addText("Source XML / JSON", {
    x: 1.05,
    y: 5.28,
    w: 1.85,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  addArrow(slide, 3.1, 5.28, 0.45, C.azure);
  addFlowNode(slide, "Data Mapper (.lml)", 3.55, 5.02, 2.1, C.azure);
  addArrow(slide, 5.75, 5.28, 0.45, C.azure);
  addFlowNode(slide, "Generated .xslt", 6.2, 5.02, 1.95, C.gold);
  addArrow(slide, 8.25, 5.28, 0.45, C.azure);
  addFlowNode(slide, "Transform using Data Mapper XSLT", 8.7, 4.88, 3.1, C.green);

  slide.addText("Prepared from Microsoft Learn, Azure/logicapps release notes, and the W3C XSLT 3.0 standard.", {
    x: 0.8,
    y: 6.63,
    w: 11.2,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 9.5,
    color: "AEC6E0",
    margin: 0,
  });

  slide.addNotes(notes("Slide 1 sources", [
    "Assumption: this presentation targets Azure Logic Apps Standard Data Mapper because the request mentions XSLT 3.0, .lml, and local testing.",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "W3C: https://www.w3.org/news/2017/xsl-transformations-xslt-version-3-0-is-now-a-w3c-recommendation/",
  ]));
}

function buildUseCasesSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "01",
    "Where Data Mapper Fits",
    "The feature is built for Logic Apps Standard projects that need schema-driven transformations inside a workflow."
  );

  addFlowNode(slide, "Schema files (.xsd / .json)", 0.82, 2.3, 2.15, C.cyan);
  addArrow(slide, 3.05, 2.56, 0.38, C.azure);
  addFlowNode(slide, "Visual map (.lml)", 3.4, 2.3, 1.9, C.azure);
  addArrow(slide, 5.38, 2.56, 0.38, C.azure);
  addFlowNode(slide, "Runtime map (.xslt)", 5.72, 2.3, 1.95, C.gold);
  addArrow(slide, 7.76, 2.56, 0.38, C.azure);
  addFlowNode(slide, "Workflow action", 8.1, 2.3, 1.72, C.green);
  addArrow(slide, 9.9, 2.56, 0.38, C.azure);
  addFlowNode(slide, "Target app / partner", 10.25, 2.3, 2.15, C.teal);

  addCard(slide, {
    x: 0.82,
    y: 3.35,
    w: 2.9,
    h: 1.45,
    title: "B2B and partner messages",
    body: "- Orders, invoices, and trading-partner schema changes\n- Canonical model conversion before routing",
    accent: C.azure,
  });
  addCard(slide, {
    x: 3.88,
    y: 3.35,
    w: 2.9,
    h: 1.45,
    title: "App and SaaS integration",
    body: "- XML/XML and JSON/JSON reshaping\n- Prepare payloads for ERP, SAP, SQL, or downstream APIs",
    accent: C.cyan,
  });
  addCard(slide, {
    x: 6.94,
    y: 3.35,
    w: 2.9,
    h: 1.45,
    title: "Edge-case logic",
    body: "- Use custom XML functions\n- Use Execute XPath or Run XSLT when drag-and-drop is not enough",
    accent: C.gold,
  });
  addCard(slide, {
    x: 10.0,
    y: 3.35,
    w: 2.5,
    h: 1.45,
    title: "Local-first workflow",
    body: "- Design and test before Azure deployment\n- Then upload or package artifacts into the Standard app",
    accent: C.green,
  });

  addCard(slide, {
    x: 0.82,
    y: 5.18,
    w: 11.68,
    h: 1.15,
    title: "Best fit",
    body: "Data Mapper is strongest when the team wants deterministic, schema-aware transforms that live beside the workflow code and can move through source control and deployment pipelines like any other app artifact.",
    accent: C.ink,
    fill: C.fog,
    bodySize: 12.2,
  });

  slide.addNotes(notes("Slide 2 sources", [
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform",
  ]));
}

function buildXsltSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "02",
    "XSLT 3.0: What It Means Here",
    "Microsoft documents XSLT 3.0 support in Logic Apps maps, while W3C defines the broader capability set behind the language."
  );

  addCard(slide, {
    x: 0.82,
    y: 2.28,
    w: 5.5,
    h: 3.85,
    title: "What Microsoft documents in Data Mapper",
    body:
      "- Standard workflows support map types XSLT, XSLT 2.0, and XSLT 3.0.\n" +
      "- Saving a map generates two artifacts: a visual .lml file and a runtime .xslt file.\n" +
      "- Custom XML functions are described as XSLT 3.0 style functions.\n" +
      "- Run XSLT can execute external snippets stored under Artifacts/DataMapper/Extensions/InlineXSLT.\n" +
      "- Data Mapper maps are called through Transform using Data Mapper XSLT.",
    accent: C.azure,
  });

  addCard(slide, {
    x: 6.52,
    y: 2.28,
    w: 5.98,
    h: 3.85,
    title: "What XSLT 3.0 adds at the standard level",
    body:
      "- Streaming for large transforms without holding the entire document in memory.\n" +
      "- Packages for modular stylesheet design.\n" +
      "- Higher-order functions via XPath 3.0.\n" +
      "- Map and array support via XPath 3.1 additions.\n" +
      "- Better fit for reusable transformation libraries than legacy XSLT 1.0 alone.",
    accent: C.cyan,
  });

  addCard(slide, {
    x: 0.82,
    y: 6.32,
    w: 11.68,
    h: 0.58,
    title: "Practical takeaway",
    body: "For Azure teams, XSLT 3.0 matters less as a buzzword and more as a way to keep advanced transform logic explicit, portable, and versionable inside the Standard project.",
    accent: C.gold,
    fill: "FFF9E9",
    bodySize: 11.3,
  });

  slide.addNotes(notes("Slide 3 sources", [
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "W3C news note: https://www.w3.org/news/2017/xsl-transformations-xslt-version-3-0-is-now-a-w3c-recommendation/",
    "W3C spec: https://www.w3.org/TR/xslt-30/",
    "Caveat: W3C features describe the language standard; Data Mapper exposes a subset through its UI and extension model.",
  ]));
}

function buildProsConsSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "03",
    "Advantages vs Disadvantages",
    "The feature is productive for schema-led teams, but it still has important authoring and portability limits."
  );

  addCard(slide, {
    x: 0.82,
    y: 2.28,
    w: 5.6,
    h: 4.2,
    title: "Advantages",
    body:
      "- Visual mapping plus generated XSLT keeps the design and runtime views connected.\n" +
      "- Local test panel shortens feedback loops before deployment.\n" +
      "- XSLT 3.0 style custom functions allow more expressive transforms.\n" +
      "- Artifacts live in the Standard project, so Git and CI/CD fit naturally.\n" +
      "- Good for deterministic B2B and enterprise integration scenarios.",
    accent: C.green,
    fill: "F4FBF5",
  });

  addCard(slide, {
    x: 6.9,
    y: 2.28,
    w: 5.6,
    h: 4.2,
    title: "Disadvantages",
    body:
      "- Authoring is currently Visual Studio Code only and Windows only.\n" +
      "- Data Mapper works only inside Standard logic app projects.\n" +
      "- Maps must run through Transform using Data Mapper XSLT, not generic Transform XML.\n" +
      "- You have to maintain both .lml and .xslt in the repo.\n" +
      "- Some functions and local test behaviors still have known edge cases.",
    accent: C.red,
    fill: "FFF5F5",
  });

  addCard(slide, {
    x: 0.82,
    y: 6.63,
    w: 11.68,
    h: 0.45,
    title: "Bottom line",
    body: "Strong fit for governed transformations in Logic Apps Standard; weaker fit if the team needs cross-platform visual authoring or a single-file map model.",
    accent: C.ink,
    fill: C.fog,
    bodySize: 11.2,
  });

  slide.addNotes(notes("Slide 4 sources", [
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code#limitations-and-known-issues",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "This slide synthesizes tradeoffs from the docs and project structure guidance.",
  ]));
}

function buildCompatibilitySlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "04",
    "Compatibility with XSLT 1.0",
    "Compatibility is real, but it is operational coexistence more than a one-click authoring migration."
  );

  addCard(slide, {
    x: 0.82,
    y: 2.28,
    w: 3.65,
    h: 3.95,
    title: "What remains compatible",
    body:
      "- Logic Apps still supports legacy XSLT maps.\n" +
      "- Transform XML remains the action for classic map execution.\n" +
      "- Visual Studio 2019 Enterprise Integration Tools still generate XSLT-based maps.\n" +
      "- Microsoft lists XSLT, XSLT 2.0, and XSLT 3.0 as supported map types.",
    accent: C.green,
    fill: "F4FBF5",
  });

  addCard(slide, {
    x: 4.84,
    y: 2.28,
    w: 3.65,
    h: 3.95,
    title: "What is not drop-in",
    body:
      "- Data Mapper-generated maps use a different action: Transform using Data Mapper XSLT.\n" +
      "- Data Mapper also adds a design artifact: .lml.\n" +
      "- The authoring surface is Standard-only and Windows-only today.\n" +
      "- Portal use needs the map uploaded to the Standard logic app resource.",
    accent: C.red,
    fill: "FFF5F5",
  });

  addCard(slide, {
    x: 8.86,
    y: 2.28,
    w: 3.64,
    h: 3.95,
    title: "Recommended migration rule",
    body:
      "1. Keep stable XSLT 1.0 flows running as-is.\n" +
      "2. Use Data Mapper for new Standard projects.\n" +
      "3. Migrate only where local visual editing, custom functions, or repository-based delivery give a clear payoff.",
    accent: C.azure,
    fill: C.white,
  });

  slide.addText("Inference: Microsoft documents support and execution paths clearly, but it does not describe Data Mapper as a universal replacement for every older XSLT authoring path.", {
    x: 0.86,
    y: 6.42,
    w: 11.2,
    h: 0.35,
    fontFace: "Aptos",
    fontSize: 10,
    italic: true,
    color: C.muted,
    margin: 0,
  });

  slide.addNotes(notes("Slide 5 sources", [
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Inference note: the coexistence recommendation is a practical reading of the documented actions and artifact model.",
  ]));
}

function buildBugsSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "05",
    "Local Testing: Bugs and Sharp Edges",
    "The current docs and release notes show a feature that is usable, but still not friction-free for local authoring."
  );

  addCard(slide, {
    x: 0.82,
    y: 2.3,
    w: 3.65,
    h: 1.22,
    title: "Platform limit",
    body: "Authoring currently works only in Visual Studio Code on Windows.",
    accent: C.red,
    fill: "FFF5F5",
  });
  addCard(slide, {
    x: 4.84,
    y: 2.3,
    w: 3.65,
    h: 1.22,
    title: "Project scope",
    body: "Not available in the Azure portal and not inside Consumption projects.",
    accent: C.rose,
    fill: "FFF5FB",
  });
  addCard(slide, {
    x: 8.86,
    y: 2.3,
    w: 3.64,
    h: 1.22,
    title: "Schema friction",
    body: "If schema loading is flaky, Microsoft suggests placing files in Artifacts/Schemas and selecting existing files from there.",
    accent: C.gold,
    fill: "FFF9E9",
  });
  addCard(slide, {
    x: 0.82,
    y: 3.83,
    w: 3.65,
    h: 1.22,
    title: "Test freshness",
    body: "Save the map before running the local test panel so the latest .xslt is regenerated.",
    accent: C.azure,
  });
  addCard(slide, {
    x: 4.84,
    y: 3.83,
    w: 3.65,
    h: 1.22,
    title: "Function behavior",
    body: "The Filter function handles numeric comparisons correctly, but string comparisons can behave inconsistently.",
    accent: C.red,
    fill: "FFF5F5",
  });
  addCard(slide, {
    x: 8.86,
    y: 3.83,
    w: 3.64,
    h: 1.22,
    title: "Array mapping surprise",
    body: "Parent arrays get an automatic loop, but child array item mappings still have to be wired manually.",
    accent: C.cyan,
  });

  addCard(slide, {
    x: 0.82,
    y: 5.38,
    w: 11.68,
    h: 1.15,
    title: "Recent product signal",
    body: "The Azure Logic Apps Standard releases page includes a May 25, 2026 note for version 1.19.5 that says a runtime issue with using a logic app as the map source was fixed. That suggests the mapper stack is still actively maturing.",
    accent: C.ink,
    fill: C.fog,
    bodySize: 11.6,
  });

  slide.addNotes(notes("Slide 6 sources", [
    "Microsoft Learn limitations: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code#limitations-and-known-issues",
    "Microsoft Learn save/test flow: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code#test-your-map",
    "Azure Logic Apps releases page: https://github.com/Azure/logicapps/releases",
  ]));
}

function buildRepoSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "06",
    "Keeping .lml, .xslt, and Related Files in Sync",
    "Treat Data Mapper as code: version the design artifact, the generated XSLT, and the schemas together."
  );

  addCard(slide, {
    x: 0.82,
    y: 2.28,
    w: 5.45,
    h: 4.45,
    title: "Recommended repo layout",
    body:
      "Artifacts/\n" +
      "  MapDefinitions/\n" +
      "    OrderToCanonical.lml\n" +
      "  Maps/\n" +
      "    OrderToCanonical.xslt\n" +
      "  Schemas/\n" +
      "    Order.xsd\n" +
      "    CanonicalOrder.xsd\n" +
      "  DataMapper/Extensions/\n" +
      "    Functions/\n" +
      "    InlineXSLT/\n" +
      "WorkflowA/workflow.json\n" +
      "connections.json\n" +
      "host.json",
    accent: C.azure,
    mono: true,
    bodySize: 11,
  });

  addCard(slide, {
    x: 6.55,
    y: 2.28,
    w: 5.95,
    h: 2.15,
    title: "Commit these",
    body:
      "- .lml design files\n" +
      "- generated .xslt files\n" +
      "- schemas, custom functions, inline XSLT, workflow JSON, parameterized connections.json, host.json",
    accent: C.green,
    fill: "F4FBF5",
  });

  addCard(slide, {
    x: 6.55,
    y: 4.58,
    w: 5.95,
    h: 1.1,
    title: "Do not commit",
    body: "local.settings.json",
    accent: C.red,
    fill: "FFF5F5",
    bodySize: 13,
  });

  addCard(slide, {
    x: 6.55,
    y: 5.88,
    w: 5.95,
    h: 0.84,
    title: "Team rules",
    body: "Pin the extension version, restart VS Code after updates, and keep sample payloads in the repo for repeatable local tests.",
    accent: C.gold,
    fill: "FFF9E9",
    bodySize: 10.8,
  });

  slide.addNotes(notes("Slide 7 sources", [
    "Microsoft Learn artifact locations: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code#save-your-map",
    "Microsoft Learn project structure and local.settings.json guidance: https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps",
    "Microsoft Learn map upload to project folders: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps#add-map-to-standard-logic-app-resource",
  ]));
}

function buildCICDSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "07",
    "CI/CD Pattern",
    "Microsoft's official scaffolding is Azure DevOps-centric, but the artifact model also fits GitHub Actions and other pipeline tools."
  );

  const stages = [
    { label: "Commit", color: C.azure, x: 0.85, num: 1 },
    { label: "CI validate", color: C.cyan, x: 3.05, num: 2 },
    { label: "Package app", color: C.gold, x: 5.25, num: 3 },
    { label: "Deploy infra", color: C.teal, x: 7.45, num: 4 },
    { label: "Deploy workflow", color: C.green, x: 9.65, num: 5 },
  ];

  stages.forEach((stage, idx) => {
    addNumberBadge(slide, stage.num, stage.x, 2.35, stage.color);
    addFlowNode(slide, stage.label, stage.x + 0.38, 2.18, 1.55, stage.color);
    if (idx < stages.length - 1) {
      addArrow(slide, stage.x + 1.98, 2.46, 0.5, C.azure);
    }
  });

  addCard(slide, {
    x: 0.85,
    y: 3.45,
    w: 3.72,
    h: 2.72,
    title: "Official pipeline pieces",
    body:
      "- Parameterize connection references at design time.\n" +
      "- Generate infra, CI, and CD scripts from the Azure Logic Apps Standard extension.\n" +
      "- Use workflowparameters/parameters.json for environment-specific packaging.",
    accent: C.azure,
  });

  addCard(slide, {
    x: 4.8,
    y: 3.45,
    w: 3.72,
    h: 2.72,
    title: "Recommended CI checks",
    body:
      "- Validate JSON and repo structure\n" +
      "- Check XSD and XSLT files are well formed\n" +
      "- Build the Standard app artifact\n" +
      "- Run smoke tests after deployment",
    accent: C.cyan,
  });

  addCard(slide, {
    x: 8.75,
    y: 3.45,
    w: 3.72,
    h: 2.72,
    title: "Design principle",
    body:
      "Separate workflow app code from infrastructure. That keeps environment promotion cleaner and reduces the blast radius of simple mapping changes.",
    accent: C.green,
    fill: "F4FBF5",
  });

  slide.addNotes(notes("Slide 8 sources", [
    "Microsoft Learn overview: https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps",
    "Microsoft Learn automation: https://learn.microsoft.com/azure/logic-apps/automate-build-deployment-standard",
    "The note about GitHub Actions is an implementation recommendation based on the documented generic artifact model, not a Microsoft-generated scaffold.",
  ]));
}

function buildRecommendationSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "08",
    "Recommended Working Model",
    "A practical operating model for a team that wants repeatable mapping delivery without losing developer productivity."
  );

  const blocks = [
    {
      title: "1. Use Data Mapper for new Standard work",
      body: "Pick it when the team benefits from visual editing, local testing, and repo-managed transform assets.",
      x: 0.82,
      y: 2.28,
      accent: C.azure,
    },
    {
      title: "2. Keep legacy XSLT 1.0 stable",
      body: "Do not rewrite proven maps just to modernize the syntax. Migrate only when there is a real delivery or maintainability gain.",
      x: 6.6,
      y: 2.28,
      accent: C.green,
    },
    {
      title: "3. Review both design and runtime artifacts",
      body: "Pull requests should inspect .lml, generated .xslt, schemas, and workflow references together.",
      x: 0.82,
      y: 4.12,
      accent: C.gold,
    },
    {
      title: "4. Standardize delivery",
      body: "Parameterize connections, exclude local.settings.json, generate deployment assets, and smoke test every environment.",
      x: 6.6,
      y: 4.12,
      accent: C.rose,
    },
  ];

  blocks.forEach((b) => {
    addCard(slide, {
      x: b.x,
      y: b.y,
      w: 5.75,
      h: 1.45,
      title: b.title,
      body: b.body,
      accent: b.accent,
      bodySize: 11.4,
    });
  });

  addCard(slide, {
    x: 0.82,
    y: 6.08,
    w: 11.68,
    h: 0.7,
    title: "Executive summary",
    body: "Azure Data Mapper is strongest as a governed transformation layer in Logic Apps Standard, not as a universal replacement for every older XSLT authoring path.",
    accent: C.ink,
    fill: C.fog,
    bodySize: 11.3,
  });

  slide.addNotes(notes("Slide 9 sources", [
    "This slide summarizes the prior evidence rather than introducing new sources.",
    "Core references: Microsoft Learn Data Mapper, maps, Transform XML, DevOps deployment, and Azure Logic Apps releases.",
  ]));
}

function buildSourcesSlide() {
  const slide = pptx.addSlide("CODEx_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "09",
    "Source Trail",
    "Primary sources used for this deck. Full URLs and notes are also saved in research-notes.md beside the presentation."
  );

  addCard(slide, {
    x: 0.82,
    y: 2.28,
    w: 5.65,
    h: 3.9,
    title: "Microsoft Learn",
    body:
      "- Create maps to transform data in logic app workflows with Visual Studio Code\n" +
      "- Add maps for transform operations to use in workflows created with Azure Logic Apps\n" +
      "- Transform XML in workflows with Azure Logic Apps\n" +
      "- DevOps deployment for Standard logic app workflows in Azure Logic Apps\n" +
      "- Automate build and deployment for Standard logic app workflows with Azure DevOps and Visual Studio Code",
    accent: C.azure,
  });

  addCard(slide, {
    x: 6.85,
    y: 2.28,
    w: 5.65,
    h: 1.55,
    title: "Azure product signals",
    body: "- Azure Logic Apps (Standard) GitHub releases page for recent mapper-related fixes and additions",
    accent: C.green,
    fill: "F4FBF5",
  });

  addCard(slide, {
    x: 6.85,
    y: 4.05,
    w: 5.65,
    h: 1.55,
    title: "Standards",
    body: "- W3C XSLT 3.0 Recommendation note\n- W3C XSLT 3.0 specification",
    accent: C.gold,
    fill: "FFF9E9",
  });

  addCard(slide, {
    x: 0.82,
    y: 6.35,
    w: 11.68,
    h: 0.44,
    title: "Companion file",
    body: "deliverables/azure-data-mapper-presentation/research-notes.md",
    accent: C.ink,
    fill: C.fog,
    mono: true,
    bodySize: 11.5,
  });

  slide.addNotes(notes("Slide 10 sources", [
    "Research notes file: deliverables/azure-data-mapper-presentation/research-notes.md",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/automate-build-deployment-standard",
    "GitHub releases: https://github.com/Azure/logicapps/releases",
    "W3C: https://www.w3.org/news/2017/xsl-transformations-xslt-version-3-0-is-now-a-w3c-recommendation/",
    "W3C spec: https://www.w3.org/TR/xslt-30/",
  ]));
}

async function main() {
  buildTitleSlide();
  buildUseCasesSlide();
  buildXsltSlide();
  buildProsConsSlide();
  buildCompatibilitySlide();
  buildBugsSlide();
  buildRepoSlide();
  buildCICDSlide();
  buildRecommendationSlide();
  buildSourcesSlide();

  await pptx.writeFile({ fileName: OUT_FILE });
  console.log(`Created ${OUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
