# PharmaPro Demo — Manual QA Checklist

Use synthetic data only. The application saves changes in the current browser's localStorage.

## Navigation and layout

- [ ] Open Dashboard and verify the four KPI cards, sales chart, inventory chart, quick actions, recent transactions and stock alerts.
- [ ] Open every primary sidebar link.
- [ ] Expand More Modules and open Categories, Batches & Expiry, Stock Adjustments, Purchase Orders, Goods Received, Prescriptions, Sales History and Returns & Refunds.
- [ ] Collapse and expand the desktop sidebar.
- [ ] At a narrow viewport, open and close the mobile navigation drawer.
- [ ] Open the notification menu, mark notifications read and follow a notification.
- [ ] Open the avatar menu, edit the profile, visit settings/help and sign out/return to demo.
- [ ] Search for a medicine, customer, supplier and sale in the global search.

## Tables and forms

- [ ] Search a medicine by name and by SKU.
- [ ] Filter medicines by stock status and category.
- [ ] Sort a table column in ascending and descending order.
- [ ] Move between table pages.
- [ ] Add a medicine and verify it appears in the medicine list and POS.
- [ ] Edit a medicine and verify the saved values persist after refresh.
- [ ] Archive a supplier, customer or user after confirming the prompt.
- [ ] Cancel a destructive action and verify no record changes.
- [ ] Add a category and use it when creating a medicine.

## POS

- [ ] Search for a medicine by name.
- [ ] Enter a seeded barcode or SKU and press Enter.
- [ ] Add more than one medicine to the cart.
- [ ] Increase, decrease and remove cart quantities.
- [ ] Attempt to add more than available stock.
- [ ] Select a customer and payment method.
- [ ] Apply a discount and verify the total changes.
- [ ] Complete a demo sale and confirm the transaction.
- [ ] Verify stock decreases and a stock movement is created.
- [ ] Print the receipt; verify printing does not create another sale.
- [ ] Refresh and verify the local transaction remains.

## Purchasing and inventory

- [ ] Create a purchase order and verify it remains Pending.
- [ ] Receive goods against the purchase order.
- [ ] Verify product stock and displayed inventory value update.
- [ ] Perform a positive stock adjustment with a reason.
- [ ] Perform a negative stock adjustment that does not result in negative stock.
- [ ] Attempt an adjustment that would make stock negative and verify it is rejected.
- [ ] Review Stock Adjustments and Goods Received movement records.

## Reports, settings and local data

- [ ] Change the report period and verify the sales list and sales total respond to the selected range.
- [ ] Export report data to CSV.
- [ ] Export a module table to CSV.
- [ ] Export a JSON local data backup.
- [ ] Change pharmacy profile and currency settings; verify the dashboard reflects saved values.
- [ ] Refresh the page and verify localStorage persistence.
- [ ] Reset demo data only after confirming the reset warning.

## Verification limitations

The included code has passed `node --check` and a lightweight Node-based render smoke check for the initial dashboard and 19 module views. Full cross-browser visual testing, real XAMPP database connectivity, backend API testing, automated browser end-to-end testing, payment integration testing, PostgreSQL migration testing and production security testing were not performed because this package contains no backend or database integration.
