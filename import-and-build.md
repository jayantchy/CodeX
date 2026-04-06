# Import And Build In Power BI Service

## Artifacts
- `sample_retail_powerbi.xlsx`
- `powerbi-theme.json`
- `report-spec.md`

## Import Flow
1. Open your target Power BI workspace in the Power BI Service.
2. Upload `sample_retail_powerbi.xlsx`.
3. If the workspace offers an import or semantic model creation choice, import the workbook data and load the workbook tables.
4. Confirm the imported tables appear as `SalesTable`, `ProductsTable`, `CustomersTable`, `CalendarTable`, and `TargetsTable`.
5. Open the semantic model or report editing experience and create the relationships described in `report-spec.md` if Power BI does not auto-detect them correctly.

## Theme Setup
1. Open the report in edit mode.
2. Use the theme import option and select `powerbi-theme.json`.
3. Verify the palette is applied to cards, bars, maps, and slicers before manual formatting.
4. Reapply visual-level formatting only where the theme does not cover a requirement, such as conditional formatting rules.

## Build Sequence
1. Create the recommended DAX measures from `report-spec.md`.
2. Build Page 1 as the executive overview.
3. Add synchronized slicers for date, region, channel, and category.
4. Build Page 2 with matrix, scatter, discount impact, segment comparison, and detail table visuals.
5. Add the product drillthrough page and back button.
6. Create a reset bookmark after the default slicer state is finalized.
7. Test every slicer and visual interaction before publishing.

## Validation Checklist
- The `Sales` table joins cleanly to `Products`, `Customers`, and `Calendar`
- KPI cards show nonzero values
- Trend charts show 24 months of variation
- Regions, channels, categories, and customer segments all have visible data
- Some rows have negative profit, so red conditional formatting can be demonstrated
- Drillthrough opens with the selected product context intact

## Current Microsoft Guidance
Microsoft Learn currently states that Power BI supports `.xlsx` and `.xlsm` workbooks under 1 GB, and recommends formatting worksheet ranges as tables for easier use in Power BI. It also notes that the legacy semantic-model import experience in the Power BI Service is being retired in phases through **August 31, 2026**.

The theme file is provided as standard Power BI theme JSON based on Microsoft’s documented report theme structure.

## Sources
- https://learn.microsoft.com/en-us/power-bi/connect-data/service-excel-workbook-files
- https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom
- https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes
