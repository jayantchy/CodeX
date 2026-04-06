# Retail Burst Power BI Report Spec

## Overview
This report uses `sample_retail_powerbi.xlsx` as a Power BI Service import source for a bold retail sales demo. The workbook is intentionally normalized so filters propagate cleanly from dimensions into the fact table.

## Data Model
- `Sales[ProductID]` to `Products[ProductID]`: many-to-one, single direction
- `Sales[CustomerID]` to `Customers[CustomerID]`: many-to-one, single direction
- `Sales[OrderDate]` to `Calendar[Date]`: many-to-one, single direction
- `Targets[MonthStart]` can stay disconnected for v1, or connect to a month-level calendar helper if you want target-vs-actual visuals on the same axis

## Recommended Measures
```DAX
Revenue = SUM(Sales[NetSales])

Gross Revenue = SUM(Sales[GrossSales])

Profit = SUM(Sales[Profit])

Total Cost = SUM(Sales[TotalCost])

Orders = DISTINCTCOUNT(Sales[OrderID])

Units Sold = SUM(Sales[Quantity])

Avg Order Value = DIVIDE([Revenue], [Orders], 0)

Margin % = DIVIDE([Profit], [Revenue], 0)

Discount % = DIVIDE(SUM(Sales[DiscountAmount]), [Gross Revenue], 0)

Revenue Target = SUM(Targets[RevenueTarget])

Profit Target = SUM(Targets[ProfitTarget])
```

## Page 1: Executive Overview
- Top row KPI cards: `Revenue`, `Profit`, `Margin %`, `Orders`, `Avg Order Value`
- Trend visual: line and clustered column chart with `Calendar[YearMonth]`, `Revenue`, `Profit`
- Category contribution: donut or treemap using `Products[Category]` and `Revenue`
- Regional performance: filled map or bubble map with `Customers[State]` and `Revenue`
- Top performers: horizontal bar chart for top 10 `Products[ProductName]` by `Revenue`
- Slicers: `Calendar[YearMonth]`, `Customers[Region]`, `Sales[Channel]`, `Products[Category]`

## Page 2: Sales Analysis
- Matrix: `Customers[Region]`, `Products[Category]`, `Products[Subcategory]` with `Revenue`, `Profit`, `Margin %`
- Scatter chart: `Revenue` on X, `Margin %` on Y, details by `Products[Subcategory]`, size by `Units Sold`
- Discount impact chart: `Discount %` versus `Profit` by `Sales[Channel]`
- Segment comparison: stacked column by `Customers[Segment]` and `Sales[Channel]`
- Detail table: `OrderID`, `OrderDate`, `ProductName`, `Region`, `Channel`, `Revenue`, `Profit`, `Margin %`

## Drillthrough Page
- Drillthrough target: `Products[ProductName]`
- Visuals on the page:
  - 24-month trend for selected product
  - Revenue split by `Customers[Region]`
  - Profit and margin by channel
  - Table of recent orders for the selected product
- Keep all drillthrough filters enabled and add a clear back button

## Interaction Rules
- Sync the page-level slicers across Page 1 and Page 2
- Leave cross-filtering enabled between trend, category, region, and top product visuals
- Add report page tooltips to trend and regional visuals with `Revenue`, `Profit`, `Margin %`, and `Orders`
- Turn on drilldown for `Calendar[Year] -> Calendar[Quarter] -> Calendar[MonthName]` and `Category -> Subcategory -> ProductName`
- Add a reset bookmark that returns slicers to the default all-data state

## Styling Direction
- Apply `powerbi-theme.json` before building visuals
- Use warm coral for headline KPIs and teal/indigo as secondary accents
- Keep page background light and cards white with rounded corners
- Use conditional formatting on `Profit` and `Margin %`:
  - positive: green
  - near target: amber
  - negative: red
- Limit each page to a clean 12-column layout with generous spacing between cards and charts
