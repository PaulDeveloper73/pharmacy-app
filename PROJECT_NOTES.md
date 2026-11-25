# PharmaPro Demo — Implementation Notes

## Design reference

The dashboard follows the supplied image's main visual composition: deep navy navigation, PharmaPro brand mark, pale top bar, global search, user and notification menus, welcome/date strip, four pastel KPI cards, sales overview chart, inventory donut, quick-action grid, recent transactions, stock alerts and a dark healthcare callout card.

The application collapses the desktop sidebar on request and switches to an off-canvas drawer on smaller screens. The KPI and dashboard grids reflow for tablet and phone widths.

## Attached requirements considered

The attached requirements document describes a larger React/Express/Knex application with XAMPP MySQL and PostgreSQL migration readiness. This delivered package intentionally follows the more specific technology instruction in the user request: HTML, Tailwind CSS, vanilla JavaScript and localStorage. Its modules and interactions are a frontend demo interpretation of the attached pharmacy scope; it is not the full backend architecture described in that requirements document.

## Important behaviour decisions

- Completed demo POS sales update local product quantities and create a sale, transaction and stock movement record.
- Printing a receipt never creates a second sale.
- Stock receiving updates inventory only after the receipt confirmation.
- Manual adjustments require a reason and confirmation.
- Archive actions preserve records by changing their status; they do not physically delete historical data.
- Returns are saved for review and do not automatically return stock to saleable inventory.
- Mobile Money, card and bank-transfer choices are labels for demo behaviour, not connected payment processing.
- User role names are display data only; no permission boundary is enforced in the browser.

## Verification performed

- JavaScript syntax validation with `node --check`.
- Project structure and XAMPP run instructions reviewed.

A full browser end-to-end run, XAMPP database test, PostgreSQL test, security audit and production-readiness test suite have not been executed. This is a localStorage frontend demo, not a production deployment candidate.
