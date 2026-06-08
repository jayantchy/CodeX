# Team Onboarding Checklist for Logic Apps Standard + Data Mapper

Use this when a new developer clones the repo.

## 1. Install and pin tooling

- Install the agreed VS Code version
- Install the agreed Azure Logic Apps (Standard) extension version
- Install Azure Functions Core Tools
- Restart VS Code after extension install or update

## 2. Clone and open the right folder

- Clone the repo
- Open the **logic app project root**
- Do not open `Artifacts/Maps` or another subfolder directly

## 3. Create local settings

- Copy `local.settings.sample.json` to `local.settings.json`
- Fill in local secrets and environment-specific values
- Do not commit `local.settings.json`

## 4. Verify project structure

- Confirm `Artifacts/MapDefinitions` contains `.lml` files
- Confirm `Artifacts/Maps` contains generated `.xslt` files
- Confirm `Artifacts/Schemas` contains all required schemas
- Confirm `connections.json` opens without unresolved local merge mistakes

## 5. Open the workflow and mapper

- Open `workflow.json` with the designer
- Open the `.lml` map in Data Mapper
- If schema loading fails, reselect schemas from `Artifacts/Schemas`

## 6. Test safely

- Save the map before using the test panel
- Test with sample payloads committed in the repo
- If results look wrong, inspect the generated `.xslt`

## 7. Watch for known issues

- Filter string comparisons can be inconsistent
- Repeating collections plus functions can generate wrong paths
- Duplicate schema basenames can load the wrong file
- Newer VS Code extension releases may introduce workspace/open-designer regressions

## 8. Pull request review

- Review `.lml` and generated `.xslt` together
- Review schema changes with mapping changes
- Call out any manual edits to generated `.xslt`
