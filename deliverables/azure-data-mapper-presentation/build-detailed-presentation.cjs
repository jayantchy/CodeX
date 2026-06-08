const path = require("path");
const PptxGenJS = require("/Users/jayantchoudhary/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs");

const pptx = new PptxGenJS();
const OUT_FILE = path.join(__dirname, "azure-data-mapper-detailed-presentation.pptx");

pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "OpenAI";
pptx.subject = "Azure Logic Apps Standard Data Mapper deep-dive";
pptx.title = "Azure Data Mapper Deep Dive";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineSlideMaster({
  title: "DETAIL_MASTER",
  bkgd: "F7FBFF",
  objects: [],
  slideNumber: { x: 12.2, y: 7.0, color: "64748B", fontFace: "Aptos", fontSize: 9 },
});

const W = 13.333;
const C = {
  ink: "0F172A",
  azure: "0078D4",
  azureDark: "005A9E",
  cyan: "00A4B4",
  teal: "0F766E",
  gold: "B7791F",
  rose: "BE185D",
  green: "15803D",
  red: "B91C1C",
  orange: "C2410C",
  slate: "475569",
  muted: "64748B",
  line: "D6E3F1",
  soft: "EEF6FF",
  soft2: "F7FBFF",
  fog: "F2F7FC",
  smoke: "E5EEF8",
  white: "FFFFFF",
  mint: "F2FBF6",
  blush: "FFF5F5",
  sand: "FFF9EB",
};

function addTopBar(slide, color = C.ink) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: 0.26,
    line: { color, pt: 0 },
    fill: { color },
  });
}

function addPill(slide, text, x, y, w, fill, color = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.05,
    line: { color: fill, pt: 1 },
    fill: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.06,
    y: y + 0.05,
    w: w - 0.12,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color,
    align: "center",
    margin: 0,
  });
}

function addTitle(slide, kicker, title, subtitle, opts = {}) {
  addTopBar(slide, opts.barColor || C.ink);
  addPill(slide, kicker, 0.64, 0.46, opts.kickerWidth || 1.55, opts.kickerFill || C.azure, opts.kickerColor || C.white);
  slide.addText(title, {
    x: 0.64,
    y: 0.92,
    w: 8.95,
    h: 0.56,
    fontFace: "Aptos Display",
    fontSize: 23,
    bold: true,
    color: opts.titleColor || C.ink,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.66,
      y: 1.42,
      w: 11.6,
      h: 0.42,
      fontFace: "Aptos",
      fontSize: 11.4,
      color: C.slate,
      margin: 0,
    });
  }
  slide.addShape(pptx.ShapeType.line, {
    x: 0.66,
    y: 1.92,
    w: 12.02,
    h: 0,
    line: { color: C.line, pt: 1.1 },
  });
  slide.addText("Research basis: Microsoft Learn, public Azure GitHub issues, W3C XSLT specs", {
    x: 7.25,
    y: 7.01,
    w: 4.8,
    h: 0.18,
    align: "right",
    fontFace: "Aptos",
    fontSize: 8.3,
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
    titleSize = 14.5,
    bodySize = 11.2,
    mono = false,
  } = cfg;

  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.06,
    line: { color: C.line, pt: 1.05 },
    fill: { color: fill },
    shadow: { type: "outer", color: "DDE7F3", blur: 1, angle: 45, distance: 1, opacity: 0.06 },
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
      y: y + 0.12,
      w: w - 0.28,
      h: 0.25,
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
      y: y + 0.43,
      w: w - 0.28,
      h: h - 0.55,
      fontFace: mono ? "Courier New" : "Aptos",
      fontSize: bodySize,
      color: bodyColor,
      margin: 0.02,
      fit: "shrink",
      valign: "top",
      breakLine: false,
    });
  }
}

function addMetric(slide, value, label, x, y, fill, textColor = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 2.22,
    h: 0.96,
    rectRadius: 0.06,
    line: { color: fill, pt: 0 },
    fill: { color: fill },
  });
  slide.addText(value, {
    x: x + 0.12,
    y: y + 0.11,
    w: 1.98,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: textColor,
    margin: 0,
    align: "center",
  });
  slide.addText(label, {
    x: x + 0.12,
    y: y + 0.5,
    w: 1.98,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 10,
    color: textColor,
    margin: 0,
    align: "center",
  });
}

function addFlowNode(slide, label, x, y, w, accent, fill = C.white, textColor = C.ink) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.62,
    rectRadius: 0.06,
    line: { color: accent, pt: 1.3 },
    fill: { color: fill },
  });
  slide.addText(label, {
    x: x + 0.08,
    y: y + 0.17,
    w: w - 0.16,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 10.9,
    bold: true,
    color: textColor,
    align: "center",
    fit: "shrink",
    margin: 0,
  });
}

function addArrow(slide, x, y, w, color = C.azure) {
  slide.addShape(pptx.ShapeType.chevron, {
    x,
    y,
    w,
    h: 0.27,
    line: { color, pt: 0 },
    fill: { color },
  });
}

function addStrip(slide, text, x, y, w, accent, fill = C.fog) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.58,
    rectRadius: 0.05,
    line: { color: accent, pt: 1 },
    fill: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.16,
    y: y + 0.16,
    w: w - 0.32,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 10.8,
    color: C.ink,
    bold: true,
    margin: 0,
  });
}

function notes(title, lines) {
  return `${title}\n\n${lines.join("\n")}`;
}

function buildTitleSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.ink };

  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: 7.5,
    line: { color: C.ink, pt: 0 },
    fill: { color: C.ink },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.8,
    y: -0.65,
    w: 5.1,
    h: 5.1,
    line: { color: C.azureDark, pt: 0 },
    fill: { color: C.azureDark, transparency: 14 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 10.0,
    y: 0.65,
    w: 2.6,
    h: 2.6,
    line: { color: C.cyan, pt: 0 },
    fill: { color: C.cyan, transparency: 26 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -0.55,
    y: 5.4,
    w: 2.5,
    h: 2.5,
    line: { color: C.gold, pt: 0 },
    fill: { color: C.gold, transparency: 18 },
  });

  addPill(slide, "AZURE LOGIC APPS STANDARD", 0.78, 0.62, 2.58, C.azure);
  slide.addText("Azure Data Mapper Deep Dive", {
    x: 0.78,
    y: 1.2,
    w: 7.9,
    h: 0.74,
    fontFace: "Aptos Display",
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(
    "Expanded from the research Markdown: use cases, XSLT 3.0, XSLT 1.0 CDATA behavior, open issue clusters, local test pain points, and Git-first team delivery.",
    {
      x: 0.8,
      y: 2.06,
      w: 8.75,
      h: 0.68,
      fontFace: "Aptos",
      fontSize: 13,
      color: "D7E7F7",
      margin: 0,
    }
  );
  slide.addText("Research snapshot: June 8, 2026", {
    x: 0.8,
    y: 2.84,
    w: 2.9,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 10.5,
    color: "A7C8EA",
    bold: true,
    margin: 0,
  });

  addMetric(slide, ".lml + .xslt", "Dual artifacts to manage", 0.82, 3.52, C.azure);
  addMetric(slide, "XSLT 3.0", "Supported map type in docs", 3.32, 3.52, C.cyan, C.ink);
  addMetric(slide, "Open issues", "Still matter for local authoring", 5.82, 3.52, C.rose);
  addMetric(slide, "Git + CI/CD", "Works when standardized", 8.32, 3.52, C.gold, C.ink);

  addFlowNode(slide, "Source XML / JSON", 1.0, 5.25, 2.0, C.cyan, C.cyan, C.white);
  addArrow(slide, 3.08, 5.5, 0.45, C.azure);
  addFlowNode(slide, "Data Mapper (.lml)", 3.55, 5.17, 2.08, C.azure);
  addArrow(slide, 5.72, 5.5, 0.45, C.azure);
  addFlowNode(slide, "Generated .xslt", 6.2, 5.17, 1.94, C.gold);
  addArrow(slide, 8.22, 5.5, 0.45, C.azure);
  addFlowNode(slide, "Transform using Data Mapper XSLT", 8.7, 5.02, 3.15, C.green);

  slide.addText("Built from deliverables/research-notes.md and open-issues-and-git-setup-notes.md", {
    x: 0.82,
    y: 6.63,
    w: 8.4,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 9.4,
    color: "B6CCE5",
    margin: 0,
  });

  slide.addNotes(notes("Slide 1 sources", [
    "Assumption: this targets Azure Logic Apps Standard Data Mapper because the request references XSLT 3.0, .lml, local testing, and VS Code.",
    "Local research file: research-notes.md",
    "Local research file: open-issues-and-git-setup-notes.md",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
  ]));
}

function buildWhatItIsSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "01",
    "What Data Mapper Actually Is",
    "In Logic Apps Standard, Data Mapper is a VS Code authoring surface that produces runtime XSLT and expects project-based delivery."
  );

  addFlowNode(slide, "Schemas in Artifacts/Schemas", 0.86, 2.32, 2.35, C.cyan);
  addArrow(slide, 3.3, 2.58, 0.38, C.azure);
  addFlowNode(slide, "Visual design in .lml", 3.72, 2.32, 2.15, C.azure);
  addArrow(slide, 5.96, 2.58, 0.38, C.azure);
  addFlowNode(slide, "Generated .xslt", 6.38, 2.32, 1.92, C.gold);
  addArrow(slide, 8.39, 2.58, 0.38, C.azure);
  addFlowNode(slide, "Workflow action in Standard app", 8.82, 2.18, 3.0, C.green);

  addCard(slide, {
    x: 0.86,
    y: 3.45,
    w: 3.8,
    h: 2.65,
    title: "Microsoft-documented shape",
    body:
      "- Works for Azure Logic Apps Standard projects in VS Code.\n" +
      "- Saving a map creates Artifacts/MapDefinitions/<name>.lml and Artifacts/Maps/<name>.xslt.\n" +
      "- Maps created this way run through Transform using Data Mapper XSLT.",
    accent: C.azure,
  });
  addCard(slide, {
    x: 4.78,
    y: 3.45,
    w: 3.85,
    h: 2.65,
    title: "Why the artifact split matters",
    body:
      "- .lml is the visual design source.\n" +
      "- .xslt is the runtime artifact that the workflow executes.\n" +
      "- Teams need review rules for both because a future save can overwrite generated output.",
    accent: C.gold,
    fill: C.sand,
  });
  addCard(slide, {
    x: 8.75,
    y: 3.45,
    w: 3.75,
    h: 2.65,
    title: "Current operational limits",
    body:
      "- Authoring is VS Code only.\n" +
      "- Microsoft documents Windows-only support for the mapper authoring surface.\n" +
      "- Local testing works best when the project structure is clean and saved artifacts are current.",
    accent: C.red,
    fill: C.blush,
  });

  addStrip(
    slide,
    "Working mental model: Data Mapper is not just a visual helper. It is a project-scoped transformation asset pipeline inside Logic Apps Standard.",
    0.86,
    6.35,
    11.64,
    C.ink
  );

  slide.addNotes(notes("Slide 2 sources", [
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
  ]));
}

function buildUseCasesSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "02",
    "Use Cases and Best Fit",
    "The sweet spot is governed, schema-aware transforms that need to travel with the workflow code instead of living as ad hoc transformation logic."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.26,
    w: 2.82,
    h: 1.78,
    title: "B2B payload reshaping",
    body: "- Orders, invoices, AS2 or X12 sidecars\n- Canonical model conversion before routing",
    accent: C.azure,
  });
  addCard(slide, {
    x: 3.84,
    y: 2.26,
    w: 2.82,
    h: 1.78,
    title: "App integration",
    body: "- ERP and SAP handoff\n- Transform partner payloads before HTTP, SQL, or messaging steps",
    accent: C.cyan,
  });
  addCard(slide, {
    x: 6.82,
    y: 2.26,
    w: 2.82,
    h: 1.78,
    title: "Local design-test loop",
    body: "- Test with sample payloads in VS Code\n- Inspect generated XSLT before deployment",
    accent: C.gold,
    fill: C.sand,
  });
  addCard(slide, {
    x: 9.8,
    y: 2.26,
    w: 2.7,
    h: 1.78,
    title: "Edge-case extension",
    body: "- Use Execute XPath\n- Use custom XML functions or Run XSLT for gaps",
    accent: C.green,
    fill: C.mint,
  });

  addCard(slide, {
    x: 0.86,
    y: 4.35,
    w: 5.6,
    h: 2.0,
    title: "Good fit",
    body:
      "- Teams want deterministic transforms that look like code assets, not hidden portal configuration.\n" +
      "- Schemas are stable enough to justify managed artifacts.\n" +
      "- Pull requests can review map design, generated XSLT, schemas, and workflow references together.",
    accent: C.green,
    fill: C.mint,
  });
  addCard(slide, {
    x: 6.68,
    y: 4.35,
    w: 5.82,
    h: 2.0,
    title: "Less ideal fit",
    body:
      "- Cross-platform visual authoring is a requirement today.\n" +
      "- The team wants a single-file transform model with no generated artifact.\n" +
      "- The project relies heavily on mapper features that still show instability in public issues.",
    accent: C.red,
    fill: C.blush,
  });

  slide.addNotes(notes("Slide 3 sources", [
    "Local research file: research-notes.md",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform",
  ]));
}

function buildXslt3Slide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "03",
    "XSLT 3.0 in the Logic Apps Context",
    "The docs tell you what Azure supports operationally, while the W3C spec explains the language capabilities that make modern XSLT more expressive."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.26,
    w: 5.56,
    h: 3.9,
    title: "What Microsoft documents",
    body:
      "- Logic Apps maps support XSLT, XSLT 2.0, and XSLT 3.0 map types.\n" +
      "- Data Mapper custom XML functions are described as XSLT 3.0 style functions.\n" +
      "- Run XSLT can call snippets stored under Artifacts/DataMapper/Extensions/InlineXSLT.\n" +
      "- Data Mapper maps execute through Transform using Data Mapper XSLT, not the generic Transform XML path.",
    accent: C.azure,
  });
  addCard(slide, {
    x: 6.62,
    y: 2.26,
    w: 5.88,
    h: 3.9,
    title: "Why XSLT 3.0 matters technically",
    body:
      "- Streaming enables more scalable transform patterns for large inputs.\n" +
      "- Packages support modular stylesheet organization.\n" +
      "- Higher-order functions from XPath 3.0 make complex logic more composable.\n" +
      "- Map and array support from XPath 3.1 improves data structure expressiveness.\n" +
      "- The standard is better suited to reusable transformation libraries than XSLT 1.0 alone.",
    accent: C.cyan,
  });

  addStrip(
    slide,
    "Practical read: for Azure teams, XSLT 3.0 is valuable when advanced transform behavior must stay explicit, reviewable, and project-local.",
    0.86,
    6.36,
    11.64,
    C.gold,
    C.sand
  );

  slide.addNotes(notes("Slide 4 sources", [
    "Local research file: research-notes.md",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "W3C: https://www.w3.org/TR/xslt-30/",
    "W3C news: https://www.w3.org/news/2017/xsl-transformations-xslt-version-3-0-is-now-a-w3c-recommendation/",
    "Inference note: the W3C feature list describes the language standard; Data Mapper exposes only the capabilities surfaced by the product.",
  ]));
}

function buildCompatibilitySlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "04",
    "Compatibility with XSLT 1.0",
    "Compatibility is real, but the right operational model is coexistence rather than assuming Data Mapper is a direct replacement for every legacy flow."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.26,
    w: 3.66,
    h: 3.9,
    title: "What stays compatible",
    body:
      "- Logic Apps still supports classic XSLT maps.\n" +
      "- Transform XML remains the normal execution action for legacy XSLT.\n" +
      "- Visual Studio 2019 Enterprise Integration Tools still represent older authoring paths.\n" +
      "- Microsoft lists XSLT, XSLT 2.0, and XSLT 3.0 as supported map types.",
    accent: C.green,
    fill: C.mint,
  });
  addCard(slide, {
    x: 4.86,
    y: 2.26,
    w: 3.72,
    h: 3.9,
    title: "What is not drop-in",
    body:
      "- Data Mapper maps execute through a different action.\n" +
      "- Data Mapper introduces the .lml design artifact.\n" +
      "- The authoring surface is Standard-only and Windows-only today.\n" +
      "- Manual edits to generated .xslt can be overwritten by later mapper saves.",
    accent: C.red,
    fill: C.blush,
  });
  addCard(slide, {
    x: 8.92,
    y: 2.26,
    w: 3.58,
    h: 3.9,
    title: "Recommended migration rule",
    body:
      "1. Keep proven XSLT 1.0 maps stable.\n" +
      "2. Use Data Mapper for new Standard projects where visual authoring or repo-managed assets add value.\n" +
      "3. Migrate older maps selectively, not by default.",
    accent: C.azure,
  });

  addStrip(
    slide,
    "Inference from the docs: modernization should be incremental and evidence-based, not a blanket rewrite.",
    0.86,
    6.36,
    11.64,
    C.ink
  );

  slide.addNotes(notes("Slide 5 sources", [
    "Local research file: research-notes.md",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform",
    "Inference note: the coexistence recommendation is a practical interpretation of the separate actions and artifact models documented by Microsoft.",
  ]));
}

function buildCDataSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "05",
    "XSLT 1.0 and CDATA: The Real Behavior",
    "Most CDATA confusion is not an Azure-only bug. It comes from how XML parsers and XSLT 1.0 represent text."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.24,
    w: 3.72,
    h: 3.95,
    title: "Source CDATA",
    body:
      "- After parsing, CDATA and normal escaped text become text nodes.\n" +
      "- XSLT 1.0 normally cannot tell whether text originated from a CDATA wrapper.\n" +
      "- So the text value survives even when the CDATA wrapper does not.",
    accent: C.azure,
  });
  addCard(slide, {
    x: 4.8,
    y: 2.24,
    w: 3.72,
    h: 3.95,
    title: "Output CDATA",
    body:
      "- Output CDATA is a serialization decision.\n" +
      "- In classic XSLT 1.0, that is usually controlled with xsl:output and cdata-section-elements.\n" +
      "- If the output serializer is not told to emit CDATA, you should not expect it automatically.",
    accent: C.gold,
    fill: C.sand,
    mono: false,
  });
  addCard(slide, {
    x: 8.74,
    y: 2.24,
    w: 3.76,
    h: 3.95,
    title: "Legacy msxsl:script case",
    body:
      "- Some XSLT 1.0 style examples wrap C# code in CDATA inside msxsl:script.\n" +
      "- That usage is about embedding code safely inside XML.\n" +
      "- It is not a payload-preservation mechanism.",
    accent: C.rose,
    fill: C.blush,
  });

  addStrip(
    slide,
    "Research outcome: I did not find a current public Azure open issue specifically targeting CDATA behavior in Data Mapper or Logic Apps.",
    0.86,
    6.36,
    11.64,
    C.green,
    C.mint
  );

  slide.addNotes(notes("Slide 6 sources", [
    "Local research file: open-issues-and-git-setup-notes.md",
    "W3C XSLT 1.0: https://www.w3.org/TR/xslt.html",
    "Microsoft Learn maps page: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "Inference note: the absence of a public issue does not prove there is no private bug, only that no current public issue was found in the searched repositories.",
  ]));
}

function buildIssueLandscapeSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "06",
    "Public Open Issue Landscape",
    "The strongest signal is not one isolated defect. It is a cluster: transform correctness, schema loading, workspace recognition, and fresh extension instability."
  );

  addMetric(slide, "11", "Local test + correctness issues reviewed", 0.88, 2.22, C.azure);
  addMetric(slide, "5", "Schema or map-loading issues reviewed", 3.38, 2.22, C.gold, C.ink);
  addMetric(slide, "13", "Workspace or tooling issues reviewed", 5.88, 2.22, C.rose);
  addMetric(slide, "11", "Feature-gap issues reviewed", 8.38, 2.22, C.cyan, C.ink);

  addCard(slide, {
    x: 0.88,
    y: 3.55,
    w: 2.86,
    h: 2.45,
    title: "Local testing and transform correctness",
    body:
      "- #8507 repeating Filter breaks child function paths\n" +
      "- #6205 Filter string comparisons fail in tests\n" +
      "- #8490 copy fails for JSON array of strings",
    accent: C.azure,
  });
  addCard(slide, {
    x: 3.92,
    y: 3.55,
    w: 2.86,
    h: 2.45,
    title: "Schema loading",
    body:
      "- #6924 referenced JSON schema load failure\n" +
      "- #6802 same basename JSON and XML schema confusion\n" +
      "- #6391 multi-root schema root selection issue",
    accent: C.gold,
    fill: C.sand,
  });
  addCard(slide, {
    x: 6.96,
    y: 3.55,
    w: 2.86,
    h: 2.45,
    title: "Workspace and bootstrap",
    body:
      "- #7623 selected folder not recognized as a logic app project\n" +
      "- #7247 reopened content causes action-loading issues\n" +
      "- #9086 extension bundle path missing",
    accent: C.rose,
    fill: C.blush,
  });
  addCard(slide, {
    x: 10.0,
    y: 3.55,
    w: 2.5,
    h: 2.45,
    title: "Fresh June 2026 regressions",
    body:
      "- #9243 createWorkspace failure\n" +
      "- #9242 isNullOrUndefined failure\n" +
      "- #9250 path argument undefined\n" +
      "- #9251 workflow cannot open",
    accent: C.red,
    fill: "FFEAEA",
  });

  addStrip(
    slide,
    "Interpretation: if you are onboarding a team now, version pinning is not optional. The public issue stream points to current extension churn.",
    0.88,
    6.3,
    11.62,
    C.ink
  );

  slide.addNotes(notes("Slide 7 sources", [
    "Local research file: open-issues-and-git-setup-notes.md",
    "GitHub issue search basis: Azure/LogicAppsUX and Azure/logicapps public issues",
    "Examples: #8507, #6205, #6924, #6802, #7623, #9243, #9242, #9250, #9251",
  ]));
}

function buildLocalTestingSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "07",
    "Local Testing Problems and Practical Workarounds",
    "The main pain points are freshness of generated XSLT, Filter behavior, repeating collections, and test ergonomics."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.22,
    w: 5.65,
    h: 4.5,
    title: "High-signal local test issues",
    body:
      "- Save the map before testing so the .xslt is regenerated.\n" +
      "- Filter string comparisons are inconsistent enough to deserve caution.\n" +
      "- Repeating collections plus child functions can generate the wrong paths.\n" +
      "- Multiple test payload switching is still an open usability gap.\n" +
      "- Output handoff to the next action can require a Compose-style workaround in some flows.",
    accent: C.red,
    fill: C.blush,
  });
  addCard(slide, {
    x: 6.72,
    y: 2.22,
    w: 5.78,
    h: 4.5,
    title: "Recommended team workaround playbook",
    body:
      "1. Always save before running the test panel.\n" +
      "2. Commit at least one sample input and expected output for every important map.\n" +
      "3. Inspect generated .xslt when results look suspicious, especially around Filter and child arrays.\n" +
      "4. Prefer numeric comparison tests over fragile string-based Filter cases until your exact extension version is proven.\n" +
      "5. Add a workflow-level smoke test after deployment because local test success is not the entire runtime story.",
    accent: C.green,
    fill: C.mint,
  });

  slide.addNotes(notes("Slide 8 sources", [
    "Local research file: open-issues-and-git-setup-notes.md",
    "Microsoft Learn local test guidance: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code#test-your-map",
    "GitHub issue examples: #8507, #6205, #6986, #7894, #8509",
  ]));
}

function buildSchemaWorkspaceSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "08",
    "Schema Loading and Workspace Stability",
    "These problems are the ones most likely to affect a cloned repository on another developer machine even before any business logic is touched."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.22,
    w: 3.74,
    h: 4.45,
    title: "Schema-loading traps",
    body:
      "- #6924: referenced JSON schema does not load.\n" +
      "- #5415: XSD load null reference failure.\n" +
      "- #6802: same basename for JSON and XML schema loads the wrong file.\n" +
      "- #6970: UBL schema support/loading remains rough.",
    accent: C.gold,
    fill: C.sand,
  });
  addCard(slide, {
    x: 4.82,
    y: 2.22,
    w: 3.74,
    h: 4.45,
    title: "Workspace-recognition traps",
    body:
      "- #7623: selected folder not recognized as a logic app project.\n" +
      "- #6824: workflow_designtime host/local settings visibility confusion.\n" +
      "- #7247: reopened content causes actions to stop loading.\n" +
      "- #8425: designer metadata fetch failures.",
    accent: C.rose,
    fill: C.blush,
  });
  addCard(slide, {
    x: 8.78,
    y: 2.22,
    w: 3.72,
    h: 4.45,
    title: "Team-level mitigation",
    body:
      "- Keep schema basenames unique.\n" +
      "- Put schemas in Artifacts/Schemas and avoid clever relative paths until validated.\n" +
      "- Open the logic app project root, not a subfolder.\n" +
      "- Pin VS Code, the Logic Apps Standard extension, and Functions Core Tools versions.",
    accent: C.azure,
  });

  slide.addNotes(notes("Slide 9 sources", [
    "Local research file: open-issues-and-git-setup-notes.md",
    "Team onboarding checklist: team-onboarding-checklist.md",
    "GitHub issue examples: #6924, #5415, #6802, #7623, #6824, #7247, #8425",
  ]));
}

function buildGitModelSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "09",
    "Git Model: Moving from One Local Setup to Every Developer Machine",
    "The safest source-of-truth model is to version the visual map, generated runtime map, schemas, and workflow assets together, while keeping secrets local."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.18,
    w: 5.3,
    h: 4.62,
    title: "Repo-managed source of truth",
    body:
      "Artifacts/\n" +
      "  MapDefinitions/*.lml\n" +
      "  Maps/*.xslt\n" +
      "  Schemas/*\n" +
      "  DataMapper/Extensions/Functions/*\n" +
      "  DataMapper/Extensions/InlineXSLT/*\n" +
      "workflow folders + workflow.json\n" +
      "connections.json (parameterized)\n" +
      "host.json\n" +
      "deployment assets if generated",
    accent: C.azure,
    mono: true,
    bodySize: 10.8,
  });
  addCard(slide, {
    x: 6.38,
    y: 2.18,
    w: 2.86,
    h: 2.1,
    title: "Do not commit",
    body:
      "- local.settings.json\n" +
      "- machine-specific secrets\n" +
      "- raw connection keys unless explicitly required",
    accent: C.red,
    fill: C.blush,
  });
  addCard(slide, {
    x: 9.46,
    y: 2.18,
    w: 3.04,
    h: 2.1,
    title: "Important rule",
    body:
      "- Treat .lml as the authoring source.\n" +
      "- Treat generated .xslt as the runtime artifact.\n" +
      "- Document any intentional manual .xslt edits.",
    accent: C.gold,
    fill: C.sand,
  });
  addCard(slide, {
    x: 6.38,
    y: 4.54,
    w: 6.12,
    h: 2.26,
    title: "To keep machines aligned",
    body:
      "1. Pin VS Code, the extension version, and Functions Core Tools.\n" +
      "2. Commit local.settings.sample.json and onboarding docs.\n" +
      "3. Parameterize connections.json.\n" +
      "4. Review .lml, .xslt, and schema changes in the same pull request.",
    accent: C.green,
    fill: C.mint,
  });

  slide.addNotes(notes("Slide 10 sources", [
    "Local research file: open-issues-and-git-setup-notes.md",
    "Companion file: local.settings.sample.json",
    "Companion file: gitignore.logicapps-standard.txt",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps",
  ]));
}

function buildOnboardingSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "10",
    "Onboarding Checklist for a Fresh Clone",
    "This is the operational checklist I would hand to every developer so the project opens consistently and the mapper behaves as predictably as possible."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.22,
    w: 5.72,
    h: 4.45,
    title: "Bootstrap steps",
    body:
      "1. Install the agreed VS Code, Logic Apps Standard extension, and Functions Core Tools versions.\n" +
      "2. Open the logic app project root, not Artifacts/Maps or another subfolder.\n" +
      "3. Copy local.settings.sample.json to local.settings.json and fill environment-specific values.\n" +
      "4. Verify Artifacts/MapDefinitions, Artifacts/Maps, and Artifacts/Schemas are present.",
    accent: C.azure,
  });
  addCard(slide, {
    x: 6.8,
    y: 2.22,
    w: 5.7,
    h: 4.45,
    title: "Open, test, and review",
    body:
      "5. Open the workflow designer and the .lml map.\n" +
      "6. If schemas fail to load, reselect them from Artifacts/Schemas.\n" +
      "7. Save before using the test panel and compare against committed sample payloads.\n" +
      "8. Review .lml and generated .xslt together in pull requests.",
    accent: C.cyan,
  });

  slide.addNotes(notes("Slide 11 sources", [
    "Companion file: team-onboarding-checklist.md",
    "Companion file: local.settings.sample.json",
    "Companion file: gitignore.logicapps-standard.txt",
  ]));
}

function buildCICDSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "11",
    "CI/CD Pattern That Survives Team Growth",
    "Microsoft's official flow is Azure DevOps-oriented, but the artifact model is general enough for any pipeline system if the project is parameterized cleanly."
  );

  addFlowNode(slide, "Commit map + schema + workflow", 0.92, 2.25, 2.2, C.azure);
  addArrow(slide, 3.2, 2.52, 0.42, C.azure);
  addFlowNode(slide, "CI validate JSON / XSD / XSLT", 3.64, 2.25, 2.22, C.cyan);
  addArrow(slide, 5.95, 2.52, 0.42, C.azure);
  addFlowNode(slide, "Package Standard app", 6.4, 2.25, 1.92, C.gold);
  addArrow(slide, 8.41, 2.52, 0.42, C.azure);
  addFlowNode(slide, "Deploy infra", 8.86, 2.25, 1.6, C.teal);
  addArrow(slide, 10.55, 2.52, 0.42, C.azure);
  addFlowNode(slide, "Deploy workflow + smoke test", 11.0, 2.11, 1.82, C.green);

  addCard(slide, {
    x: 0.92,
    y: 3.55,
    w: 3.74,
    h: 2.78,
    title: "Officially aligned pieces",
    body:
      "- Parameterize connection references.\n" +
      "- Generate deployment scripts from the Standard extension if you use the Microsoft scaffolding path.\n" +
      "- Separate infrastructure promotion from workflow app promotion.",
    accent: C.azure,
  });
  addCard(slide, {
    x: 4.84,
    y: 3.55,
    w: 3.72,
    h: 2.78,
    title: "Recommended CI checks",
    body:
      "- Validate JSON.\n" +
      "- Check XSD and XSLT are well-formed.\n" +
      "- Verify repo structure for required artifacts.\n" +
      "- Run smoke tests after deployment.",
    accent: C.cyan,
  });
  addCard(slide, {
    x: 8.74,
    y: 3.55,
    w: 3.76,
    h: 2.78,
    title: "Most important policy",
    body:
      "- Keep secrets deployment-injected or local-only.\n" +
      "- Keep connections.json portable.\n" +
      "- Keep sample payloads and expected outputs with the repo so regressions are visible early.",
    accent: C.green,
    fill: C.mint,
  });

  slide.addNotes(notes("Slide 12 sources", [
    "Local research file: research-notes.md",
    "Local research file: open-issues-and-git-setup-notes.md",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/automate-build-deployment-standard",
  ]));
}

function buildRecommendationSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "12",
    "Recommended Working Model",
    "If the goal is stable delivery, these are the rules most likely to reduce churn without giving up the value of Data Mapper."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.24,
    w: 5.75,
    h: 1.5,
    title: "Use Data Mapper where it earns its keep",
    body: "Favor it for new Standard projects that benefit from visual authoring, local test loops, and versioned transformation assets.",
    accent: C.azure,
  });
  addCard(slide, {
    x: 6.75,
    y: 2.24,
    w: 5.75,
    h: 1.5,
    title: "Keep legacy XSLT 1.0 stable",
    body: "Do not rewrite working maps just to modernize syntax. Migrate only when the workflow and team model clearly benefit.",
    accent: C.green,
    fill: C.mint,
  });
  addCard(slide, {
    x: 0.86,
    y: 4.0,
    w: 5.75,
    h: 1.5,
    title: "Standardize the environment",
    body: "Pin VS Code, the Standard extension, and Functions Core Tools. The June 2026 public issue cluster is enough reason by itself.",
    accent: C.rose,
    fill: C.blush,
  });
  addCard(slide, {
    x: 6.75,
    y: 4.0,
    w: 5.75,
    h: 1.5,
    title: "Review design and runtime together",
    body: "Every non-trivial mapping change should review .lml, generated .xslt, schema changes, and workflow references together.",
    accent: C.gold,
    fill: C.sand,
  });

  addStrip(
    slide,
    "Executive read: Data Mapper is strongest as a governed transformation layer in Logic Apps Standard, not as a universal replacement for all older XSLT authoring paths.",
    0.86,
    6.26,
    11.64,
    C.ink
  );

  slide.addNotes(notes("Slide 13 sources", [
    "This slide synthesizes prior findings rather than adding new evidence.",
    "Core local references: research-notes.md, open-issues-and-git-setup-notes.md, team-onboarding-checklist.md",
  ]));
}

function buildSourcesSlide() {
  const slide = pptx.addSlide("DETAIL_MASTER");
  slide.background = { color: C.soft2 };
  addTitle(
    slide,
    "13",
    "Source Trail",
    "These are the core references behind the deck. The companion Markdown files stay beside the deliverables for deeper reading."
  );

  addCard(slide, {
    x: 0.86,
    y: 2.24,
    w: 5.72,
    h: 3.94,
    title: "Local companion files",
    body:
      "- research-notes.md\n" +
      "- open-issues-and-git-setup-notes.md\n" +
      "- team-onboarding-checklist.md\n" +
      "- local.settings.sample.json\n" +
      "- gitignore.logicapps-standard.txt",
    accent: C.azure,
    mono: true,
  });
  addCard(slide, {
    x: 6.8,
    y: 2.24,
    w: 5.7,
    h: 1.85,
    title: "Primary official docs",
    body:
      "- Create maps to transform data in logic app workflows with Visual Studio Code\n" +
      "- Add maps for transform operations to use in workflows created with Azure Logic Apps\n" +
      "- DevOps deployment for Standard logic app workflows",
    accent: C.green,
    fill: C.mint,
  });
  addCard(slide, {
    x: 6.8,
    y: 4.31,
    w: 5.7,
    h: 1.85,
    title: "Standards and issue sources",
    body:
      "- W3C XSLT 1.0 and XSLT 3.0 specifications\n" +
      "- Azure/LogicAppsUX issues\n" +
      "- Azure/logicapps issues and releases",
    accent: C.gold,
    fill: C.sand,
  });

  addStrip(
    slide,
    "The interactive frontend uses the same findings so the deck and the browser view stay aligned.",
    0.86,
    6.3,
    11.64,
    C.cyan,
    C.soft
  );

  slide.addNotes(notes("Slide 14 sources", [
    "Local file: research-notes.md",
    "Local file: open-issues-and-git-setup-notes.md",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps",
    "Microsoft Learn: https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps",
    "W3C: https://www.w3.org/TR/xslt.html",
    "W3C: https://www.w3.org/TR/xslt-30/",
    "GitHub issues: https://github.com/Azure/LogicAppsUX/issues and https://github.com/Azure/logicapps/issues",
  ]));
}

async function main() {
  buildTitleSlide();
  buildWhatItIsSlide();
  buildUseCasesSlide();
  buildXslt3Slide();
  buildCompatibilitySlide();
  buildCDataSlide();
  buildIssueLandscapeSlide();
  buildLocalTestingSlide();
  buildSchemaWorkspaceSlide();
  buildGitModelSlide();
  buildOnboardingSlide();
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
