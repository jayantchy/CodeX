# Azure Logic Apps Data Mapper: Open Issues, XSLT 1.0 CDATA Notes, and Git-Based Team Setup

Date: June 8, 2026

Scope:

- Azure Logic Apps Standard Data Mapper in Visual Studio Code
- Public Microsoft Learn documentation
- Public GitHub issues in `Azure/LogicAppsUX` and `Azure/logicapps`

Important limitation:

- This is a thorough pass over public sources, not an internal Microsoft bug database export.
- “All open issues” below means the public issues I found that are directly relevant to Data Mapper, local testing, or sharing Standard projects across developer machines.

## Short answer

1. Yes, there are still meaningful open issues around local map testing and Data Mapper authoring.
2. XSLT 1.0 and CDATA are often misunderstood:
   - source CDATA is treated as plain text by the XSLT data model
   - output CDATA is controlled by serialization, usually via `xsl:output`
   - legacy XSLT 1.0 maps may also use `CDATA` inside `msxsl:script` blocks to embed C# safely
3. For team use, the cleanest approach is:
   - treat `.lml` as the design source of truth
   - commit `.xslt`, schemas, workflow JSON, and parameterized `connections.json`
   - do **not** commit `local.settings.json`
   - standardize VS Code extension versions and bootstrap steps

## What Microsoft officially documents

From Microsoft Learn:

- Data Mapper is only for **Azure Logic Apps Standard** projects in **VS Code**
- It currently works only on **Windows**
- Saving a map creates:
  - `Artifacts/MapDefinitions/<name>.lml`
  - `Artifacts/Maps/<name>.xslt`
- Before using the local test panel, you should **save the map first** so the current `.xslt` is regenerated
- If schema loading is problematic, Microsoft recommends placing schemas in `Artifacts/Schemas` and selecting them from there
- Maps created with Data Mapper must use **Transform using Data Mapper XSLT**, not the generic **Transform XML** action

Primary docs:

- [Create maps to transform data in logic app workflows with Visual Studio Code](https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code)
- [Add maps for transform operations to use in workflows created with Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps)
- [Transform XML in workflows with Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform)

## XSLT 1.0 and the CDATA question

This is the cleanest way to think about it:

### 1. CDATA in source XML is not a special node in XSLT 1.0

Once the XML parser reads the document, CDATA and normal text both become text nodes in the XPath/XSLT data model.

Practical meaning:

- XSLT 1.0 usually **cannot tell** whether text came from:
  - normal escaped text
  - a CDATA section

So if your “issue” is “why did my CDATA disappear?”, the answer is usually:

- it did not disappear semantically
- it stopped being preserved as a *CDATA wrapper*
- the text value remained

### 2. If you want CDATA in the output, that is a serialization choice

In classic XSLT 1.0, CDATA output is generally controlled using `xsl:output` with `cdata-section-elements`.

So:

- **input CDATA** is parsed into text
- **output CDATA** has to be requested during output serialization

Primary source:

- [W3C XSLT 1.0 Recommendation](https://www.w3.org/TR/xslt.html)

### 3. Legacy XSLT 1.0 maps may use CDATA for embedded custom code

Microsoft’s Logic Apps maps documentation still shows a classic XSLT 1.0-style `msxsl:script` example where C# code is wrapped in `CDATA`.

That use of CDATA is different:

- it is not about preserving payload text
- it is about embedding code inside XML without escaping every special character

Primary source:

- [Microsoft Learn: Add maps for transform operations to use in workflows created with Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps)

### 4. I did not find a current public Azure open issue specifically about CDATA

I searched public open issues in:

- `Azure/LogicAppsUX`
- `Azure/logicapps`

for:

- `CDATA`
- `cdata-section-elements`
- `msxsl:script`
- `XSLT 1.0`

Result:

- no current open public issue directly targeting CDATA behavior

So if you are hitting a CDATA problem, it is more likely one of these:

- expected XSLT 1.0 behavior
- generated XSLT output/serialization behavior
- a mapper-generated transform issue that shows up indirectly

## Public open issues I found that matter for local map testing

These are the highest-signal issues if your main pain is “testing maps locally in VS Code”.

### Transformation correctness and test output

- [#8507 Using the filter function on a repeating element breaks child functions](https://github.com/Azure/LogicAppsUX/issues/8507)
  - Critical
  - High value issue because it affects generated XSLT correctness, not just the UI
- [#6205 Cannot test map with 'Filter' when third argument to compare is a string](https://github.com/Azure/LogicAppsUX/issues/6205)
  - Matches Microsoft’s documented warning that string comparisons in `Filter` are inconsistent
- [#8490 "Copy" doesn't work for JSON's array of strings](https://github.com/Azure/LogicAppsUX/issues/8490)
- [#5872 Unable to map from string to string array using Logic Apps Data Mappers](https://github.com/Azure/LogicAppsUX/issues/5872)
- [#7894 Issues while using Output from DataMapper in my next action 'HTTP'](https://github.com/Azure/LogicAppsUX/issues/7894)
  - Suggests a runtime/action-shape quirk where a Compose step becomes a workaround
- [#6549 Missing inlinexslt code when linking a Run XSLT function to an element](https://github.com/Azure/LogicAppsUX/issues/6549)
  - Relevant if you mix mapper logic with inline XSLT

### Testing workflow and authoring friction

- [#8509 Add button to Data Mapper Design surface to regenerate XSLT](https://github.com/Azure/LogicAppsUX/issues/8509)
  - Very relevant because local testing depends on regenerated `.xslt`
- [#6986 Cannot switch between multiple test payload](https://github.com/Azure/LogicAppsUX/issues/6986)
  - Forces copy/paste between test cases
- [#8512 Mapper Loses function position in designer](https://github.com/Azure/LogicAppsUX/issues/8512)
  - Makes complex map maintenance harder
- [#8508 Common keyboard shortcuts do not work on the data mapper designer](https://github.com/Azure/LogicAppsUX/issues/8508)
- [#6755 Delete key removes adjacent functions along with connection line](https://github.com/Azure/LogicAppsUX/issues/6755)

## Public open issues I found that matter for schemas and map loading

- [#6924 Unable to load the referenced json schema](https://github.com/Azure/LogicAppsUX/issues/6924)
  - Very relevant if your schemas use `$ref`
- [#5415 'Object reference not set to an instance of an object.' error when loading xsd](https://github.com/Azure/LogicAppsUX/issues/5415)
- [#6802 Map breaks when I have JSON and XML schemas with the same name in the same folder](https://github.com/Azure/LogicAppsUX/issues/6802)
  - Important practical takeaway: **do not reuse the same basename across JSON and XML schemas**
- [#6391 Schema with multiple root nodes. Cannot choose root node in the Data Mapper.](https://github.com/Azure/LogicAppsUX/issues/6391)
- [#6970 Support for UBL schemas](https://github.com/Azure/LogicAppsUX/issues/6970)

## Public open issues I found that matter for project setup and sharing across developer machines

These are the ones most relevant to your “how do we move from my setup to everyone else’s VS Code setup using Git?” question.

### Project/workspace recognition

- [#7623 "The selected folder is not a logic app project" when creating a new data map on a brand new default workspace](https://github.com/Azure/LogicAppsUX/issues/7623)
- [#6824 `host.json` and `local.settings.json` under `workflow_designtime` are not appearing as expected](https://github.com/Azure/LogicAppsUX/issues/6824)
- [#7247 Actions not loading and Salesforce action missing after reopening downloaded app content in VS Code](https://github.com/Azure/LogicAppsUX/issues/7247)
- [#8425 Designer can't get function metadata for some apps](https://github.com/Azure/LogicAppsUX/issues/8425)

### Dependency/runtime bootstrap problems

- [#8695 Node dependency update uses undefined version](https://github.com/Azure/LogicAppsUX/issues/8695)
- [#9086 Could not find path to extension bundle](https://github.com/Azure/LogicAppsUX/issues/9086)
- [#7989 Logic Apps Designer does not start](https://github.com/Azure/LogicAppsUX/issues/7989)
- [#8100 Failed to stop previous running Functions host within 30 seconds](https://github.com/Azure/LogicAppsUX/issues/8100)
- [#8599 Popup about `azurewebjobsstorage` on first debug](https://github.com/Azure/LogicAppsUX/issues/8599)

### Very recent extension stability issues

These look especially important right now because they affect basic project open/create behavior:

- [#9243 Azure logic app VS Code Standard extension issue](https://github.com/Azure/LogicAppsUX/issues/9243)
  - `createWorkspace` failure with `isNullOrUndefined is not a function`
- [#9242 Error: util_1.isNullOrUndefined is not a function](https://github.com/Azure/LogicAppsUX/issues/9242)
  - affects deployment script generation and open designer flows
- [#9250 The "path" argument must be of type string. Received undefined](https://github.com/Azure/LogicAppsUX/issues/9250)
  - Standard (VSCode)
- [#9251 Unable to open the workflow in logic app standard](https://github.com/Azure/LogicAppsUX/issues/9251)

Interpretation:

- There appears to be a **fresh extension instability cluster** around early June 2026, especially with VS Code `1.123.0` and newer extension bundles.
- If your team is onboarding multiple developers now, **pinning the extension/tooling version matters more than usual**.

## Data Mapper feature gaps that are open but not necessarily bugs

These are not always “broken local test” issues, but they matter for real project maintainability:

- [#6756 Display schema node properties](https://github.com/Azure/LogicAppsUX/issues/6756)
- [#6757 Support for union scenario](https://github.com/Azure/LogicAppsUX/issues/6757)
- [#6759 Auto-mapping for identical source and destination nodes](https://github.com/Azure/LogicAppsUX/issues/6759)
- [#6760 Rename functions/provide friendly name](https://github.com/Azure/LogicAppsUX/issues/6760)
- [#6761 Support for variables in Custom Value inputs](https://github.com/Azure/LogicAppsUX/issues/6761)
- [#6669 New UX for organizing Schemas](https://github.com/Azure/LogicAppsUX/issues/6669)
- [#6754 Improve usability of large maps on small canvas](https://github.com/Azure/LogicAppsUX/issues/6754)
- [#6670 Support for CSV, EDI, IDoC](https://github.com/Azure/LogicAppsUX/issues/6670)
- [#6985 AI map generation](https://github.com/Azure/LogicAppsUX/issues/6985)
- [#6984 Dynamically select the map at runtime](https://github.com/Azure/LogicAppsUX/issues/6984)
- [#8197 Remove preview tag from Transform XSLT action](https://github.com/Azure/LogicAppsUX/issues/8197)

## What I would treat as the highest-risk issues for your team

If your priority is “stable team delivery”, the top risks are:

1. **Schema loading instability**
   - `#6924`, `#5415`, `#6802`, `#6970`
2. **Filter/local test correctness**
   - `#6205`, `#8507`
3. **Version/tooling instability in recent VS Code extension releases**
   - `#9243`, `#9242`, `#9250`, `#9251`, `#8695`, `#9086`
4. **Project recognition/bootstrap issues when another developer clones the repo**
   - `#7623`, `#6824`, `#7247`, `#7989`

## Recommended Git model for sharing a Standard Logic App project across developer machines

This is the model I’d recommend.

### Source of truth

Treat these as repo-managed source artifacts:

- `Artifacts/MapDefinitions/*.lml`
- `Artifacts/Maps/*.xslt`
- `Artifacts/Schemas/*`
- `Artifacts/DataMapper/Extensions/Functions/*`
- `Artifacts/DataMapper/Extensions/InlineXSLT/*`
- all workflow folders and `workflow.json`
- root `host.json`
- root `connections.json`
- generated deployment assets if your team uses the official deployment scaffolding
- a checked-in `parameters` file strategy for non-secret values

### Do not commit

Do **not** commit:

- `local.settings.json`
- `workflow-designtime/local.settings.json`
- any machine-specific storage keys, runtime URLs, or raw connection secrets

### Important source-of-truth rule for Data Mapper

If you use the visual mapper:

- treat `.lml` as the **authoring source**
- treat generated `.xslt` as the **runtime artifact**

Practical consequence:

- if someone manually edits the generated `.xslt`, a later save from the mapper may overwrite it
- if you intentionally hand-edit `.xslt`, document that clearly in the repo

### Recommended folder and naming hygiene

To reduce mapper bugs:

- keep schema filenames unique
- do **not** place `Customer.json` and `Customer.xsd` with the same basename in the same folder
- avoid overly clever relative reference patterns until your team verifies they load correctly in your exact extension version
- keep sample payloads in a `tests/mapsamples/` or similar folder even though the mapper does not yet support a native multi-payload chooser

## Recommended `.gitignore` rules

Suggested entries:

```gitignore
# Logic Apps Standard local secrets
local.settings.json
**/local.settings.json

# Optional local VS Code noise if your team does not want it committed
.vscode/settings.json

# Mac/Windows noise
.DS_Store
Thumbs.db
```

If your team wants reproducible onboarding, consider **committing**:

- `.vscode/extensions.json`

and optionally **not** committing:

- `.vscode/settings.json`

unless you intentionally standardize workspace settings.

## Recommended team bootstrap steps

Create a short onboarding README that every developer follows.

### 1. Pin the tooling

Pin and document:

- VS Code version
- Azure Logic Apps (Standard) extension version
- Azure Functions Core Tools version

Reason:

- current public issues suggest that version drift causes real breakage

### 2. Clone and open the correct folder

Have every developer:

- clone the repo
- open the **logic app project root**
- not a subfolder like `Artifacts/Maps`
- not an arbitrary parent workspace with mixed unrelated content

This directly reduces the chance of issue `#7623`.

### 3. Install extensions consistently

At minimum:

- Azure Logic Apps (Standard)
- Azure Functions Core Tools prerequisites

Because Microsoft says the old separate Data Mapper extension was merged into the Standard extension, avoid mixing old and new extension states.

### 4. Recreate local settings from a template

Commit a file such as:

```json
{
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
}
```

as something like:

- `local.settings.sample.json`

Then each developer creates their own local `local.settings.json`.

### 5. Parameterize `connections.json`

Microsoft explicitly recommends parameterizing connection references for environment portability.

For local teamwork, that means:

- keep resource IDs and endpoints parameterized where possible
- keep secrets in local settings or app settings
- do not commit live raw connection keys unless absolutely necessary

### 6. Generate deployment scripts once, then version them

If you use the official extension flow:

- generate deployment scripts
- commit the generated deployment YAML/templates
- review them like code

Primary source:

- [Automate build and deployment for Standard logic app workflows with Azure DevOps and Visual Studio Code](https://learn.microsoft.com/azure/logic-apps/automate-build-deployment-standard)

## Recommended operating model for your team

If I were standardizing this for a team today, I would use these rules:

1. Pick one extension version and freeze it for the team until the June 2026 regressions settle.
2. Commit `.lml`, `.xslt`, schemas, and workflow JSON together in the same PR.
3. Require a local test payload plus expected output for every non-trivial map.
4. Save the map before every test run.
5. Avoid string-based `Filter` logic in Data Mapper until you verify the exact case in generated XSLT.
6. Avoid duplicate schema basenames and fragile JSON schema refs.
7. Use a `local.settings.sample.json` file plus repo onboarding docs.
8. Keep `connections.json` parameterized and treat secrets as local-only or deployment-injected.

## My practical recommendation for your exact situation

Because you have already seen local test issues:

- keep using Data Mapper for design, but review the generated `.xslt` when results look suspicious
- especially review transforms using:
  - `Filter`
  - repeating collections
  - string-array mappings
  - referenced schemas
- if a map is business-critical, store:
  - sample input
  - expected output
  - notes on any known workaround

For XSLT 1.0 + CDATA specifically:

- do not expect source CDATA wrappers to survive as a distinct concept
- if you need CDATA in output, make that an output serialization decision
- if you are using classic `msxsl:script`, remember CDATA there is for embedding code, not payload semantics

## Primary sources

Microsoft Learn:

- [Create maps to transform data in logic app workflows with Visual Studio Code](https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code)
- [Add maps for transform operations to use in workflows created with Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps)
- [Transform XML in workflows with Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform)
- [DevOps deployment for Standard logic app workflows in Azure Logic Apps](https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps)
- [Automate build and deployment for Standard logic app workflows with Azure DevOps and Visual Studio Code](https://learn.microsoft.com/azure/logic-apps/automate-build-deployment-standard)

W3C:

- [XSLT 1.0 Recommendation](https://www.w3.org/TR/xslt.html)

GitHub:

- [Azure/LogicAppsUX issues](https://github.com/Azure/LogicAppsUX/issues)
- [Azure/logicapps issues](https://github.com/Azure/logicapps/issues)
