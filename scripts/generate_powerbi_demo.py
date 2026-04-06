#!/usr/bin/env python3
"""Generate a Power BI-ready retail workbook with random demo data.

The workbook is written as a minimal OOXML `.xlsx` file using only the Python
standard library so it can run in constrained environments.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import random
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from xml.sax.saxutils import escape


OUTPUT_XLSX = "sample_retail_powerbi.xlsx"
RANDOM_SEED = 42


@dataclass(frozen=True)
class Product:
    product_id: str
    product_name: str
    category: str
    subcategory: str
    brand: str
    unit_cost: float
    unit_price: float


@dataclass(frozen=True)
class Customer:
    customer_id: str
    customer_name: str
    segment: str
    region: str
    state: str
    city: str
    country: str


@dataclass(frozen=True)
class SheetSpec:
    name: str
    headers: list[str]
    rows: list[list[object]]
    table_name: str


REGION_GEOGRAPHY = {
    "West": [("California", "Los Angeles"), ("Washington", "Seattle"), ("Arizona", "Phoenix")],
    "Central": [("Illinois", "Chicago"), ("Colorado", "Denver"), ("Missouri", "St. Louis")],
    "South": [("Texas", "Austin"), ("Georgia", "Atlanta"), ("Florida", "Miami")],
    "East": [("New York", "New York"), ("Massachusetts", "Boston"), ("Virginia", "Richmond")],
}

CATEGORY_MAP = {
    "Electronics": {
        "Phones": ["Apex Mobile", "Blue Orbit", "Nova Tech"],
        "Computers": ["Northwind", "Vertex", "Nova Tech"],
        "Audio": ["Waveform", "Blue Orbit", "PulseOne"],
    },
    "Home": {
        "Furniture": ["Harbor House", "Oakline", "Vista Living"],
        "Kitchen": ["ChefPoint", "Harbor House", "Mosaic"],
        "Decor": ["Mosaic", "Vista Living", "Luma"],
    },
    "Fashion": {
        "Accessories": ["ModeCo", "Urban Loop", "Luma"],
        "Footwear": ["StrideX", "Urban Loop", "ModeCo"],
        "Outerwear": ["NorthPeak", "ModeCo", "StrideX"],
    },
    "Beauty": {
        "Skincare": ["PureGlow", "Verde", "Halo"],
        "Haircare": ["Verde", "Halo", "PureGlow"],
        "Wellness": ["Halo", "Zenly", "PureGlow"],
    },
    "Sports": {
        "Fitness": ["Summit", "ActiveCore", "PeakForm"],
        "Outdoor": ["PeakForm", "Summit", "TrailNest"],
        "Cycling": ["TrailNest", "ActiveCore", "Summit"],
    },
    "Grocery": {
        "Snacks": ["FreshWave", "Daily Table", "GoodRoot"],
        "Beverages": ["FreshWave", "SparkHouse", "Daily Table"],
        "Organic": ["GoodRoot", "Verde Market", "Daily Table"],
    },
}

CHANNELS = ["Online", "Store", "Marketplace", "Wholesale"]
SEGMENTS = ["Consumer", "Corporate", "Home Office", "Small Business"]


def excel_serial(date_value: dt.date) -> int:
    return (date_value - dt.date(1899, 12, 30)).days


def column_name(index: int) -> str:
    result = []
    while index > 0:
        index, remainder = divmod(index - 1, 26)
        result.append(chr(65 + remainder))
    return "".join(reversed(result))


def xml_escape(value: object) -> str:
    return escape(str(value), {'"': "&quot;", "'": "&apos;"})


def build_products(rng: random.Random) -> list[Product]:
    products: list[Product] = []
    product_number = 1
    for category, subcategories in CATEGORY_MAP.items():
        for subcategory, brands in subcategories.items():
            for brand in brands:
                for variant_number in range(1, 5):
                    unit_cost = round(rng.uniform(8, 220), 2)
                    margin_multiplier = rng.uniform(1.18, 1.75)
                    unit_price = round(unit_cost * margin_multiplier, 2)
                    product_name = f"{brand} {subcategory[:-1] if subcategory.endswith('s') else subcategory} {variant_number}"
                    products.append(
                        Product(
                            product_id=f"P{product_number:04d}",
                            product_name=product_name,
                            category=category,
                            subcategory=subcategory,
                            brand=brand,
                            unit_cost=unit_cost,
                            unit_price=unit_price,
                        )
                    )
                    product_number += 1
    return products


def build_customers(rng: random.Random, count: int = 320) -> list[Customer]:
    customers: list[Customer] = []
    prefixes = [
        "Aster", "Bright", "Cedar", "Delta", "Ember", "Fable", "Golden", "Harbor",
        "Indigo", "Juniper", "Keystone", "Lake", "Metro", "North", "Olive", "Prime",
        "Quartz", "River", "Summit", "True", "Union", "Vista", "Willow", "Zen",
    ]
    suffixes = ["Retail", "Mart", "Studio", "House", "Outlet", "Collective", "Market", "Supply"]
    for customer_number in range(1, count + 1):
        region = rng.choice(list(REGION_GEOGRAPHY))
        state, city = rng.choice(REGION_GEOGRAPHY[region])
        segment = rng.choice(SEGMENTS)
        customer_name = f"{rng.choice(prefixes)} {rng.choice(suffixes)} {customer_number:03d}"
        customers.append(
            Customer(
                customer_id=f"C{customer_number:04d}",
                customer_name=customer_name,
                segment=segment,
                region=region,
                state=state,
                city=city,
                country="United States",
            )
        )
    return customers


def build_calendar(start_date: dt.date, end_date: dt.date) -> list[list[object]]:
    rows: list[list[object]] = []
    current = start_date
    while current <= end_date:
        fiscal_year = current.year if current.month >= 7 else current.year - 1
        fiscal_quarter = ((current.month - 7) % 12) // 3 + 1
        rows.append(
            [
                current,
                current.year,
                f"Q{((current.month - 1) // 3) + 1}",
                current.month,
                current.strftime("%B"),
                current.strftime("%b"),
                current.strftime("%Y-%m"),
                current.isoweekday(),
                current.strftime("%A"),
                fiscal_year,
                f"FQ{fiscal_quarter}",
            ]
        )
        current += dt.timedelta(days=1)
    return rows


def build_targets(
    rng: random.Random, months: Iterable[dt.date], categories: list[str]
) -> list[list[object]]:
    rows: list[list[object]] = []
    target_id = 1
    for month_start in months:
        seasonal_factor = 1.0 + (0.18 if month_start.month in (11, 12) else 0.05 if month_start.month in (5, 6) else 0.0)
        for region in REGION_GEOGRAPHY:
            for category in categories:
                revenue_target = round(rng.uniform(42000, 90000) * seasonal_factor, 2)
                profit_target = round(revenue_target * rng.uniform(0.12, 0.2), 2)
                margin_target = round((profit_target / revenue_target) * 100, 2)
                rows.append(
                    [
                        f"T{target_id:05d}",
                        month_start,
                        region,
                        category,
                        revenue_target,
                        profit_target,
                        margin_target,
                    ]
                )
                target_id += 1
    return rows


def weighted_choice(rng: random.Random, items: list[object], weights: list[float]) -> object:
    threshold = rng.random() * sum(weights)
    current = 0.0
    for item, weight in zip(items, weights):
        current += weight
        if current >= threshold:
            return item
    return items[-1]


def build_sales(
    rng: random.Random,
    products: list[Product],
    customers: list[Customer],
    dates: list[dt.date],
    count: int = 10000,
) -> list[list[object]]:
    rows: list[list[object]] = []
    date_weights = [1 + (index / max(1, len(dates) - 1)) * 1.4 for index, _ in enumerate(dates)]
    for order_number in range(1, count + 1):
        product = rng.choice(products)
        customer = rng.choice(customers)
        order_date = weighted_choice(rng, dates, date_weights)
        channel = weighted_choice(rng, CHANNELS, [0.42, 0.28, 0.18, 0.12])
        quantity = max(1, int(round(rng.triangular(1, 10, 3))))
        list_price = product.unit_price * rng.uniform(0.97, 1.06)
        gross_sales = round(quantity * list_price, 2)
        discount_pct = round(
            weighted_choice(rng, [0.00, 0.05, 0.10, 0.15, 0.20, 0.30, 0.38], [0.12, 0.2, 0.22, 0.18, 0.14, 0.09, 0.05]),
            2,
        )
        discount_amount = round(gross_sales * discount_pct, 2)
        net_sales = round(gross_sales - discount_amount, 2)
        unit_cost = round(product.unit_cost * rng.uniform(0.98, 1.08), 2)
        total_cost = round(unit_cost * quantity, 2)
        profit = round(net_sales - total_cost, 2)
        margin_pct = round((profit / net_sales) * 100, 2) if net_sales else 0.0
        shipping_days = max(1, int(round(rng.triangular(1, 9, 3))))
        rows.append(
            [
                f"O{order_number:06d}",
                order_date,
                product.product_id,
                customer.customer_id,
                channel,
                quantity,
                round(list_price, 2),
                gross_sales,
                discount_pct,
                discount_amount,
                net_sales,
                unit_cost,
                total_cost,
                profit,
                margin_pct,
                shipping_days,
            ]
        )
    return rows


def infer_cell_xml(cell_ref: str, value: object) -> str:
    if value is None:
        return ""
    if isinstance(value, dt.date):
        return f'<c r="{cell_ref}" s="1"><v>{excel_serial(value)}</v></c>'
    if isinstance(value, bool):
        return f'<c r="{cell_ref}" t="b"><v>{1 if value else 0}</v></c>'
    if isinstance(value, int):
        return f'<c r="{cell_ref}"><v>{value}</v></c>'
    if isinstance(value, float):
        if math.isfinite(value):
            formatted = f"{value:.2f}".rstrip("0").rstrip(".")
            return f'<c r="{cell_ref}"><v>{formatted}</v></c>'
        return ""
    return f'<c r="{cell_ref}" t="inlineStr"><is><t>{xml_escape(value)}</t></is></c>'


def worksheet_xml(spec: SheetSpec) -> str:
    total_rows = len(spec.rows) + 1
    total_cols = len(spec.headers)
    last_column = column_name(total_cols)
    data_rows: list[str] = []

    header_cells = [
        infer_cell_xml(f"{column_name(index)}1", header)
        for index, header in enumerate(spec.headers, start=1)
    ]
    data_rows.append(f'<row r="1" spans="1:{total_cols}">{"".join(header_cells)}</row>')

    for row_number, row_values in enumerate(spec.rows, start=2):
        row_cells = [
            infer_cell_xml(f"{column_name(column_index)}{row_number}", value)
            for column_index, value in enumerate(row_values, start=1)
        ]
        data_rows.append(f'<row r="{row_number}" spans="1:{total_cols}">{"".join(row_cells)}</row>')

    auto_ref = f"A1:{last_column}{total_rows}"
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f'<dimension ref="{auto_ref}"/>'
        '<sheetViews><sheetView tabSelected="1" workbookViewId="0"/></sheetViews>'
        '<sheetFormatPr defaultRowHeight="15"/>'
        f'<sheetData>{"".join(data_rows)}</sheetData>'
        f'<autoFilter ref="{auto_ref}"/>'
        '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>'
        '<tableParts count="1"><tablePart r:id="rId1"/></tableParts>'
        '</worksheet>'
    )


def worksheet_rels_xml(table_index: int) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f'<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/table" '
        f'Target="../tables/table{table_index}.xml"/>'
        '</Relationships>'
    )


def table_xml(spec: SheetSpec, table_index: int) -> str:
    last_column = column_name(len(spec.headers))
    last_row = len(spec.rows) + 1
    table_ref = f"A1:{last_column}{last_row}"
    columns = "".join(
        f'<tableColumn id="{index}" name="{xml_escape(header)}"/>'
        for index, header in enumerate(spec.headers, start=1)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        f'id="{table_index}" name="{xml_escape(spec.table_name)}" displayName="{xml_escape(spec.table_name)}" '
        f'ref="{table_ref}" totalsRowShown="0">'
        f'<autoFilter ref="{table_ref}"/>'
        f'<tableColumns count="{len(spec.headers)}">{columns}</tableColumns>'
        '<tableStyleInfo name="TableStyleMedium2" showFirstColumn="0" showLastColumn="0" '
        'showRowStripes="1" showColumnStripes="0"/>'
        '</table>'
    )


def content_types_xml(sheet_count: int, table_count: int) -> str:
    overrides = [
        '<Override PartName="/docProps/app.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
        '<Override PartName="/docProps/core.xml" '
        'ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
        '<Override PartName="/xl/workbook.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
    ]
    overrides.extend(
        f'<Override PartName="/xl/worksheets/sheet{index}.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        for index in range(1, sheet_count + 1)
    )
    overrides.extend(
        f'<Override PartName="/xl/tables/table{index}.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"/>'
        for index in range(1, table_count + 1)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        f'{"".join(overrides)}'
        '</Types>'
    )


def package_rels_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
        'Target="xl/workbook.xml"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" '
        'Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" '
        'Target="docProps/app.xml"/>'
        '</Relationships>'
    )


def workbook_xml(sheets: list[SheetSpec]) -> str:
    sheet_nodes = "".join(
        f'<sheet name="{xml_escape(spec.name)}" sheetId="{index}" r:id="rId{index}"/>'
        for index, spec in enumerate(sheets, start=1)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<bookViews><workbookView xWindow="0" yWindow="0" windowWidth="24000" windowHeight="12000"/></bookViews>'
        f'<sheets>{sheet_nodes}</sheets>'
        '<calcPr calcId="191029"/>'
        '</workbook>'
    )


def workbook_rels_xml(sheets: list[SheetSpec]) -> str:
    rels = [
        f'<Relationship Id="rId{index}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
        f'Target="worksheets/sheet{index}.xml"/>'
        for index in range(1, len(sheets) + 1)
    ]
    rels.append(
        f'<Relationship Id="rId{len(sheets) + 1}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" '
        'Target="styles.xml"/>'
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f'{"".join(rels)}'
        '</Relationships>'
    )


def styles_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<numFmts count="0"/>'
        '<fonts count="1"><font><sz val="11"/><color theme="1"/><name val="Aptos"/><family val="2"/></font></fonts>'
        '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>'
        '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="2">'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
        '<xf numFmtId="14" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>'
        '</cellXfs>'
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        '</styleSheet>'
    )


def core_xml() -> str:
    created = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        '<dc:title>Sample Retail Power BI Workbook</dc:title>'
        '<dc:creator>Codex</dc:creator>'
        '<cp:lastModifiedBy>Codex</cp:lastModifiedBy>'
        f'<dcterms:created xsi:type="dcterms:W3CDTF">{created}</dcterms:created>'
        f'<dcterms:modified xsi:type="dcterms:W3CDTF">{created}</dcterms:modified>'
        '</cp:coreProperties>'
    )


def app_xml(sheet_names: list[str]) -> str:
    heading_pairs = (
        '<HeadingPairs><vt:vector size="2" baseType="variant">'
        '<vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant>'
        f'<vt:variant><vt:i4>{len(sheet_names)}</vt:i4></vt:variant>'
        '</vt:vector></HeadingPairs>'
    )
    titles = "".join(f"<vt:lpstr>{xml_escape(name)}</vt:lpstr>" for name in sheet_names)
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        '<Application>Microsoft Excel</Application>'
        f'{heading_pairs}'
        f'<TitlesOfParts><vt:vector size="{len(sheet_names)}" baseType="lpstr">{titles}</vt:vector></TitlesOfParts>'
        '</Properties>'
    )


def write_workbook(path: Path, sheets: list[SheetSpec]) -> None:
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types_xml(len(sheets), len(sheets)))
        zf.writestr("_rels/.rels", package_rels_xml())
        zf.writestr("docProps/core.xml", core_xml())
        zf.writestr("docProps/app.xml", app_xml([sheet.name for sheet in sheets]))
        zf.writestr("xl/workbook.xml", workbook_xml(sheets))
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml(sheets))
        zf.writestr("xl/styles.xml", styles_xml())

        for index, sheet in enumerate(sheets, start=1):
            zf.writestr(f"xl/worksheets/sheet{index}.xml", worksheet_xml(sheet))
            zf.writestr(f"xl/worksheets/_rels/sheet{index}.xml.rels", worksheet_rels_xml(index))
            zf.writestr(f"xl/tables/table{index}.xml", table_xml(sheet, index))


def build_workbook() -> tuple[list[SheetSpec], dict[str, object]]:
    rng = random.Random(RANDOM_SEED)
    today = dt.date.today()
    end_date = today.replace(day=1) - dt.timedelta(days=1)
    start_date = (end_date.replace(day=1) - dt.timedelta(days=730)).replace(day=1)
    dates = [start_date + dt.timedelta(days=offset) for offset in range((end_date - start_date).days + 1)]
    month_starts = sorted({date_value.replace(day=1) for date_value in dates})

    products = build_products(rng)
    customers = build_customers(rng)
    sales_rows = build_sales(rng, products, customers, dates)
    calendar_rows = build_calendar(start_date, end_date)
    target_rows = build_targets(rng, month_starts, sorted(CATEGORY_MAP))

    product_rows = [
        [
            product.product_id,
            product.product_name,
            product.category,
            product.subcategory,
            product.brand,
            product.unit_cost,
            product.unit_price,
        ]
        for product in products
    ]
    customer_rows = [
        [
            customer.customer_id,
            customer.customer_name,
            customer.segment,
            customer.region,
            customer.state,
            customer.city,
            customer.country,
        ]
        for customer in customers
    ]

    sheets = [
        SheetSpec(
            name="Sales",
            table_name="SalesTable",
            headers=[
                "OrderID",
                "OrderDate",
                "ProductID",
                "CustomerID",
                "Channel",
                "Quantity",
                "UnitPrice",
                "GrossSales",
                "DiscountPct",
                "DiscountAmount",
                "NetSales",
                "UnitCost",
                "TotalCost",
                "Profit",
                "MarginPct",
                "ShippingDays",
            ],
            rows=sales_rows,
        ),
        SheetSpec(
            name="Products",
            table_name="ProductsTable",
            headers=["ProductID", "ProductName", "Category", "Subcategory", "Brand", "UnitCost", "UnitPrice"],
            rows=product_rows,
        ),
        SheetSpec(
            name="Customers",
            table_name="CustomersTable",
            headers=["CustomerID", "CustomerName", "Segment", "Region", "State", "City", "Country"],
            rows=customer_rows,
        ),
        SheetSpec(
            name="Calendar",
            table_name="CalendarTable",
            headers=[
                "Date",
                "Year",
                "Quarter",
                "MonthNumber",
                "MonthName",
                "MonthShort",
                "YearMonth",
                "WeekdayNumber",
                "WeekdayName",
                "FiscalYear",
                "FiscalQuarter",
            ],
            rows=calendar_rows,
        ),
        SheetSpec(
            name="Targets",
            table_name="TargetsTable",
            headers=["TargetID", "MonthStart", "Region", "Category", "RevenueTarget", "ProfitTarget", "MarginTargetPct"],
            rows=target_rows,
        ),
    ]

    negative_profit_rows = sum(1 for row in sales_rows if float(row[13]) < 0)
    summary = {
        "seed": RANDOM_SEED,
        "date_range": {"start": start_date.isoformat(), "end": end_date.isoformat()},
        "counts": {
            "sales_rows": len(sales_rows),
            "product_rows": len(product_rows),
            "customer_rows": len(customer_rows),
            "calendar_rows": len(calendar_rows),
            "target_rows": len(target_rows),
        },
        "negative_profit_rows": negative_profit_rows,
        "sales_channels": CHANNELS,
        "segments": SEGMENTS,
        "categories": sorted(CATEGORY_MAP),
    }
    return sheets, summary


def validate_workbook(path: Path) -> dict[str, object]:
    required_members = {
        "[Content_Types].xml",
        "_rels/.rels",
        "docProps/app.xml",
        "docProps/core.xml",
        "xl/workbook.xml",
        "xl/_rels/workbook.xml.rels",
        "xl/styles.xml",
        "xl/worksheets/sheet1.xml",
        "xl/worksheets/sheet2.xml",
        "xl/worksheets/sheet3.xml",
        "xl/worksheets/sheet4.xml",
        "xl/worksheets/sheet5.xml",
        "xl/tables/table1.xml",
        "xl/tables/table2.xml",
        "xl/tables/table3.xml",
        "xl/tables/table4.xml",
        "xl/tables/table5.xml",
    }
    with zipfile.ZipFile(path) as zf:
        members = set(zf.namelist())
        missing = sorted(required_members - members)
        if missing:
            raise RuntimeError(f"Workbook is missing OOXML members: {missing}")
        worksheet_files = sorted(member for member in members if member.startswith("xl/worksheets/sheet"))
        table_files = sorted(member for member in members if member.startswith("xl/tables/table"))
        return {
            "worksheets": worksheet_files,
            "tables": table_files,
            "file_size_bytes": path.stat().st_size,
        }


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a Power BI-ready retail Excel workbook.")
    parser.add_argument(
        "--output",
        default=OUTPUT_XLSX,
        type=Path,
        help=f"Output workbook path (default: {OUTPUT_XLSX})",
    )
    parser.add_argument(
        "--summary",
        default=None,
        type=Path,
        help="Optional JSON file path for dataset summary metadata.",
    )
    args = parser.parse_args()

    sheets, summary = build_workbook()
    write_workbook(args.output, sheets)
    validation = validate_workbook(args.output)
    summary["validation"] = validation

    if args.summary:
        args.summary.write_text(json.dumps(summary, indent=2), encoding="utf-8")

    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
