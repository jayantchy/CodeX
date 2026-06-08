# Azure Data Mapper Presentation Research Notes

Research scope: Azure Logic Apps Standard Data Mapper

Assumption:
The request says "Azure data mapper functionality for mapping" and asks about XSLT 3.0, `.lml`, local testing, and syncing artifacts across developer machines. Those details match the Microsoft feature documented as **Data Mapper in Azure Logic Apps (Standard)**, not Azure Data Factory mapping data flows.

## 1. Use case

- Transform XML-to-XML and JSON-to-JSON inside Standard logic app workflows.
- Bridge gaps between partner, ERP, SAP, EDI, and internal schemas.
- Build B2B order, invoice, and canonical-model transformations.
- Test mappings locally in Visual Studio Code before deploying.
- Use `Run XSLT`, `Execute XPath`, and custom XML functions for edge cases.

## 2. XSLT 3.0

- Microsoft Learn says Standard workflows support map types `XSLT`, `XSLT 2.0`, and `XSLT 3.0`.
- Data Mapper custom XML functions are documented as "XSLT 3.0 style" functions.
- The `Run XSLT` function can execute external `.xslt` or `.xml` snippets stored under `Artifacts/DataMapper/Extensions/InlineXSLT`.
- W3C says XSLT 3.0 adds streaming, packages for modularity, higher-order functions through XPath 3.0, and map/array support via XPath 3.1.

## 3. Advantages vs disadvantages

Advantages:

- Visual authoring plus generated runtime `.xslt`.
- Local test panel with sample payloads.
- XSLT 3.0 oriented extension points.
- Works well with source control because artifacts live in the Standard project.
- Can call maps directly from Standard workflows with the `Transform using Data Mapper XSLT` action.

Disadvantages:

- Authoring is currently Visual Studio Code only and Windows only.
- Data Mapper is Standard-only, not Consumption authoring.
- Maps created with Data Mapper must use `Transform using Data Mapper XSLT`, not the generic `Transform XML` action.
- The team must version both visual and generated artifacts.
- Some local authoring behaviors are still rough around testing and function behavior.

## 4. Compatibility with XSLT 1.0

- Logic Apps still supports legacy XSLT maps through `Transform XML`.
- Microsoft Learn lists `XSLT`, `XSLT 2.0`, and `XSLT 3.0` as supported map types.
- Visual Studio 2019 Enterprise Integration Tools still produce classic XSLT-based maps.
- Data Mapper-generated maps are not a drop-in replacement for every legacy flow because they run through a different action and ship with an `.lml` design artifact.

Inference:
The safest modernization model is coexistence:

- Keep stable XSLT 1.0 style maps running through `Transform XML`.
- Use Data Mapper for new Standard projects where visual editing and local authoring matter.

## 5. Bugs and sharp edges with local testing

Documented limitations and issues:

- Data Mapper works only in Visual Studio Code and only on Windows.
- Not available in the Azure portal and not for Consumption projects.
- `.csv` schemas are unsupported.
- The code pane is read-only.
- Schema nodes are static while function nodes are movable.
- The `Filter` function handles numeric comparisons like `>=10`, but string comparisons can behave inconsistently.
- Mapping parent arrays auto-adds a loop, but child array item mappings still must be created manually.
- You should save the map before testing so the current `.xslt` is regenerated.
- If schema loading is flaky, Microsoft suggests placing files in `Artifacts/Schemas` and using `Select existing`.

Recent release note:

- The Azure Logic Apps Standard GitHub releases page includes a May 25, 2026 entry for version `1.19.5` that says it fixed a "runtime issue with using a logic app as the map source."

## 6. How to maintain `.lml`, `.xslt`, and related files across developer machines plus CI/CD

Commit these artifacts:

- `Artifacts/MapDefinitions/*.lml`
- `Artifacts/Maps/*.xslt`
- `Artifacts/Schemas/*.xsd` and schema `.json`
- `Artifacts/DataMapper/Extensions/Functions/*.xml`
- `Artifacts/DataMapper/Extensions/InlineXSLT/*`
- workflow folders and `workflow.json`
- `connections.json` after parameterization
- `host.json`
- generated deployment and pipeline files when the team uses the official scaffolding

Do not commit:

- `local.settings.json`

Team practices:

- Standardize extension version across the team.
- Restart Visual Studio Code after Azure Logic Apps Standard extension updates.
- Keep sample payloads in the repo for repeatable test runs.
- Review both `.lml` and generated `.xslt` in pull requests.

Official CI/CD direction:

- Microsoft documents parameterizing connections at design time.
- The Azure Logic Apps Standard extension can generate deployment scripts and Azure DevOps pipelines for infra, CI, and CD.
- The deployment model separates workflow app artifacts from infrastructure, which makes multi-environment promotion cleaner.

Recommended CI checks:

- Validate JSON files.
- Validate XSD and XSLT well-formedness.
- Package the Standard logic app project.
- Deploy infra and app separately.
- Run smoke tests against the workflow endpoint or a test trigger after deployment.

## Primary sources

Microsoft Learn:

- Create maps to transform data in logic app workflows with Visual Studio Code
  - https://learn.microsoft.com/azure/logic-apps/create-maps-data-transformation-visual-studio-code
- Add maps for transform operations to use in workflows created with Azure Logic Apps
  - https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps
- Transform XML in workflows with Azure Logic Apps
  - https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-transform
- DevOps deployment for Standard logic app workflows in Azure Logic Apps
  - https://learn.microsoft.com/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps
- Automate build and deployment for Standard logic app workflows with Azure DevOps and Visual Studio Code
  - https://learn.microsoft.com/azure/logic-apps/automate-build-deployment-standard

Azure GitHub:

- Azure Logic Apps (Standard) releases
  - https://github.com/Azure/logicapps/releases

Standards:

- W3C: XSL Transformations (XSLT) Version 3.0 is now a Recommendation
  - https://www.w3.org/news/2017/xsl-transformations-xslt-version-3-0-is-now-a-w3c-recommendation/
- W3C XSLT 3.0 specification
  - https://www.w3.org/TR/xslt-30/
