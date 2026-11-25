# MASTER SYSTEM DEVELOPMENT PROMPT
# COMPLETE PHARMACY MANAGEMENT SYSTEM — UI/UX DESIGN, DEVELOPMENT, INTEGRATION, TESTING AND PRODUCTION READINESS

## 1. ROLE AND PROJECT MISSION

Act as a senior multidisciplinary software engineering team consisting of:

- Senior Software Architect.
- Senior React 18 Frontend Developer.
- Senior Node.js and Express Backend Developer.
- Database Architect.
- Pharmacy Management Systems Specialist.
- UI/UX Designer.
- Cybersecurity Engineer.
- Quality Assurance and Automation Engineer.
- DevOps and Deployment Engineer.

Your responsibility is to thoroughly inspect, design, repair, complete, integrate, test and prepare the existing Pharmacy Management System for professional commercial operations.

This is an existing application. You must work directly on the provided source code and preserve its established business logic, valuable functionality, working components and existing records wherever possible.

Do not create an unrelated replacement application.

The ultimate objective is to deliver a complete, reliable, modern, secure, maintainable and production-ready Pharmacy Management System that operates locally using XAMPP MySQL/MariaDB and Node.js, while remaining architecturally prepared for future PostgreSQL migration.

The system must support real pharmacy workflows, accurate financial records, medicine inventory management, batch and expiry tracking, POS transactions, purchasing, supplier management, customer records, reporting and user permissions.

**Primary implementation principle: Inspect → Plan → Design → Implement → Integrate → Test → Verify → Document.**

Do not stop after producing an audit report, a dashboard mockup or a demonstration application. Continue through actual implementation and verification.

---

# 2. MANDATORY TECHNOLOGY STACK

Use the following technology stack as the implementation baseline.

## Frontend

- React 18.
- TypeScript.
- Tailwind CSS.
- Vite, unless the existing compatible build configuration provides a sound reason to retain another tool.
- React Router for application navigation.
- TanStack Query for server-state management and API communication.
- TanStack Table for advanced data tables.
- React Hook Form for form management.
- Zod for validation.
- Lucide React for icons.
- Recharts for dashboard charts and analytics.
- Radix UI primitives where accessible dialogs, dropdowns, popovers and other interactive components are needed.
- A suitable toast notification library, such as Sonner, where appropriate.

## Backend

- Node.js.
- Express.js.
- TypeScript.
- RESTful API architecture.
- Knex.js as the database query builder and migration layer.
- mysql2 as the initial MySQL/MariaDB database driver.
- Zod for server-side request validation.
- Secure session management.
- Structured application logging.

## Database

Initial environment:
- XAMPP.
- MySQL or MariaDB.
- phpMyAdmin for database administration.
- MySQL2 driver for Node.js connectivity.

Future database:
- PostgreSQL.
- PostgreSQL driver: pg.
- Database configuration and migrations prepared for both database engines.

**Important technical requirement:** MySQLi is a PHP extension and must not be used directly by the Express/Node.js backend. Use mysql2 for MySQL/MariaDB connectivity.

Database access must be centralised through the repository/data-access layer. Database engine selection must be controlled through environment configuration.

## Development and quality tools

Use appropriate compatible versions of:

- ESLint.
- Prettier.
- Vitest.
- React Testing Library.
- Supertest.
- Playwright.
- TypeScript compiler.
- npm or the existing compatible package manager.

Before adding dependencies, inspect existing packages and check React 18 compatibility. Avoid unnecessary packages and dependency duplication.

Do not upgrade the application to React 19.

Preserve lockfiles and verify dependency compatibility.

---

# 3. FIRST TASK: COMPLETE EXISTING PROJECT AUDIT

Before making modifications, inspect the complete application.

Do not assume its current architecture or technologies without inspecting them.

Inspect:

1. Complete project directory.
2. Existing frontend architecture.
3. Existing backend architecture.
4. Application entry points.
5. Existing routes and pages.
6. Existing components.
7. Database schema and migrations.
8. Database relationships.
9. Authentication implementation.
10. Existing user roles and permissions.
11. Environment configuration.
12. API endpoints.
13. POS implementation.
14. Medicine and inventory implementation.
15. Purchasing and supplier workflows.
16. Customer management.
17. Existing dashboards and reports.
18. Existing validation and error handling.
19. Installed packages and dependencies.
20. Existing tests and deployment configuration.

Identify:

- Broken functionality.
- Missing features.
- Incomplete modules.
- Broken imports.
- Database errors.
- Incorrect business calculations.
- Missing relationships.
- Security vulnerabilities.
- Duplicate or inconsistent implementations.
- Unresponsive controls.
- API integration failures.
- Runtime and compilation errors.
- Poorly structured components.
- Performance problems.

Create:

- PROJECT_AUDIT.md
- SYSTEM_ARCHITECTURE.md
- EXISTING_FEATURES.md
- IMPLEMENTATION_PLAN.md

Classify issues by severity:

- Critical: Financial corruption, stock corruption, unauthorised access or application failure.
- High: Major broken workflows or important security weaknesses.
- Medium: Incorrect functionality or significant usability problems.
- Low: Minor interface or maintainability improvements.

Create a recoverable backup before modifying important code or data.

Do not delete or overwrite existing records, database tables or configuration files without a verified backup and explicit authorisation.

After completing the audit, proceed directly with implementation in controlled phases.

---

# 4. DESIGN DIRECTION: PROFESSIONAL MODERN-CLASSIC PHARMACY DASHBOARD

Use the provided Pharmacy Management System dashboard image as the primary visual reference.

The goal is to create a premium commercial application with a professional healthcare identity.

Do not produce a generic admin template.

The entire application must maintain one consistent design language.

## 4.1 Visual identity

Use a modern classic interface combining:

- Deep navy navigation.
- White and very light grey content backgrounds.
- Blue primary actions.
- Emerald green success indicators.
- Carefully selected purple and orange accents.
- Clean typography.
- Rounded but restrained cards.
- Subtle borders and shadows.
- Well-organised tables.
- Clear visual hierarchy.
- Professional icons.
- Consistent spacing.

Suggested design palette:

Primary navy: #10264A

Secondary navy: #17365F

Primary blue: #2563EB

Success green: #10B981

Warning orange: #F59E0B

Danger red: #DC2626

Purple: #7C3AED

Main background: #F6F8FC

Card background: #FFFFFF

Primary text: #172554

Secondary text: #64748B

Muted border: #E2E8F0

Define all colours as reusable CSS variables or Tailwind theme tokens.

Do not randomly introduce new colours throughout the application.

## 4.2 Application layout

Build a consistent application shell.

### Left sidebar

The navigation sidebar should include:

- Pharmacy logo and application identity.
- Dashboard.
- POS / Sales.
- Medicines.
- Categories.
- Inventory.
- Stock Adjustments.
- Stock Transfers, if supported.
- Suppliers.
- Purchasing.
- Purchase Orders.
- Goods Received.
- Customers.
- Prescriptions.
- Sales History.
- Returns and Refunds.
- Reports and Analytics.
- User Management.
- Roles and Permissions.
- Audit Logs.
- Settings.
- Help and Support.

Group related navigation items logically.

Implement:

- Collapsible sidebar.
- Active navigation highlighting.
- Lucide icons.
- Tooltips for collapsed navigation.
- Mobile drawer navigation.
- Permission-aware menu visibility.

Hiding a menu item is not a replacement for backend authorisation.

### Top navigation

Include:

- Global search.
- Notifications.
- Current branch or pharmacy location, where applicable.
- Current date and time.
- Pharmacy operational status.
- Logged-in user profile.
- Role information.
- Profile menu.
- Logout.

The global search should support relevant medicines, barcodes, customers, suppliers and transaction references according to user permissions.

### Main content

Every page should have:

- Clear page title.
- Descriptive subtitle.
- Primary action.
- Relevant filters.
- Consistent card and table layout.
- Loading states.
- Empty states.
- Error states.
- Success feedback.
- Responsive behaviour.

## 4.3 Reusable frontend components

Build reusable components rather than duplicating UI code.

Create shared components for:

- AppLayout.
- Sidebar.
- Topbar.
- PageHeader.
- Breadcrumbs.
- StatCard.
- DataTable.
- SearchInput.
- FilterPanel.
- DateRangePicker.
- StatusBadge.
- ConfirmDialog.
- FormDialog.
- Drawer.
- Tabs.
- Dropdown.
- Pagination.
- EmptyState.
- LoadingSkeleton.
- ErrorState.
- ToastNotifications.
- Charts.
- CurrencyDisplay.
- DateDisplay.
- PermissionGuard.

All interactive components must work.

Do not create decorative buttons with no real functionality.

---

# 5. COMPLETE DASHBOARD DESIGN AND IMPLEMENTATION

The dashboard is the first screen users encounter after authentication.

It must deliver meaningful operational information immediately.

Use the generated dashboard image as the visual reference.

## 5.1 Welcome section

Display:

- Welcome message.
- Logged-in user's name.
- User role.
- Current date.
- Current time.
- Pharmacy operational status.
- Branch selector if multi-branch operations are supported.

## 5.2 Main KPI cards

Include:

1. Total Sales Today.
2. Total Transactions Today.
3. Current Inventory Value.
4. Active Customers.
5. Low-Stock Medicines.
6. Medicines Expiring Soon.
7. Outstanding Customer Balances, where applicable.
8. Today's Gross Profit, only when reliable cost data is available.

Use:

- Meaningful icons.
- Correct currency formatting.
- Comparison with previous periods where appropriate.
- Clear trend indicators.
- Tooltips explaining metric definitions.

KPI values must come from actual backend data.

Never hardcode sample dashboard figures in production.

## 5.3 Sales analytics

Implement:

- Daily sales chart.
- Weekly sales chart.
- Monthly sales chart.
- Sales trend comparison.
- Transaction count.
- Sales by payment method.
- Sales by medicine category.
- Top-selling medicines.

Provide configurable date ranges.

## 5.4 Inventory dashboard

Display:

- Total medicines.
- In-stock products.
- Low-stock products.
- Out-of-stock medicines.
- Expiring batches.
- Expired batches.
- Inventory value.
- Recent stock movements.

Include a visual inventory distribution chart.

## 5.5 Recent transactions

Display a professional table containing:

- Transaction reference.
- Date and time.
- Transaction type.
- Customer.
- Cashier.
- Amount.
- Payment status.
- Transaction status.
- View action.

## 5.6 Stock alerts

Provide alerts for:

- Medicines below reorder level.
- Expiring batches.
- Expired batches.
- Out-of-stock items.
- Pending stock adjustments.
- Outstanding supplier balances where applicable.

Allow authorised users to navigate directly to the relevant record.

## 5.7 Quick actions

Provide functional shortcuts for:

- New Sale.
- Add Medicine.
- Receive Stock.
- Create Purchase Order.
- Add Customer.
- Add Supplier.
- View Sales.
- View Reports.

## 5.8 Dashboard filtering

Support:

- Today.
- Yesterday.
- Last 7 days.
- Last 30 days.
- This month.
- Previous month.
- Custom range.

Dashboard metrics must respect the selected date range and current user's permissions.

All dashboard queries must be efficient and indexed appropriately.

---

# 6. COMPLETE POINT OF SALE SYSTEM

The POS is the most important operational module.

Give it special attention.

Design a dedicated POS interface optimised for fast pharmacy operations.

## 6.1 POS layout

Use a professional POS layout with:

Left or primary section:
- Product search.
- Barcode input.
- Product categories.
- Product results.
- Stock availability.
- Product pricing.
- Batch availability.

Right or secondary section:
- Shopping cart.
- Selected products.
- Quantities.
- Unit prices.
- Discounts.
- Subtotal.
- Taxes.
- Grand total.
- Customer selection.
- Payment controls.
- Complete Sale button.

Ensure that the interface remains usable on common cashier desktop and tablet screens.

## 6.2 Product lookup

Support:

- Medicine name search.
- Generic name search.
- Brand search.
- Barcode lookup.
- Category filtering.
- Strength and dosage form filtering.
- Relevant stock availability.
- Batch and expiry information.

Search should be responsive and optimised for large medicine catalogues.

## 6.3 Cart operations

Support:

- Add medicine.
- Remove medicine.
- Increase quantity.
- Decrease quantity.
- Enter quantity manually.
- Select supported sales units.
- Apply authorised discounts.
- Display stock warnings.
- Prevent invalid quantities.
- Calculate totals automatically.

Use exact and consistent financial calculations.

The server must independently validate all important totals and prices before completing a sale.

## 6.4 Payment methods

Support available payment methods:

- Cash.
- Mobile Money.
- Card.
- Bank transfer.
- Split payments.
- Authorised credit or account payments.

Implement proper payment status management.

Never mark an external payment as successful merely because a cashier selected a payment method.

External payment integrations must have verified provider callbacks, status checks and duplicate-event protection.

## 6.5 Transaction integrity

Use database transactions for all related database operations.

Enforce:

- Sale and sale items remain consistent.
- Payments reconcile to the transaction.
- Stock is only deducted according to the confirmed sale workflow.
- Insufficient stock prevents unauthorised sales.
- Duplicate requests cannot create duplicate sales.
- Failed operations roll back correctly.
- Financial records remain auditable.

Implement idempotency keys.

Support appropriate database locking or atomic stock updates to prevent concurrent overselling.

For external payments, distinguish pending, confirmed and failed states. Use stock reservations where the business rules require them, and ensure abandoned reservations can be safely released.

## 6.6 Receipts

Generate professional printable receipts.

Include:

- Pharmacy identity.
- Contact information.
- Receipt reference.
- Date and time.
- Cashier.
- Customer, where applicable.
- Medicine descriptions.
- Quantities.
- Unit prices.
- Discounts.
- Taxes.
- Total.
- Payment details.
- Amount paid.
- Change or outstanding balance.
- Applicable return information.

Support standard printers and compatible thermal printers.

Printing a receipt must never create another sale.

---

# 7. MEDICINE MANAGEMENT

Implement complete medicine CRUD operations.

Include:

- Medicine name.
- Generic name.
- Brand.
- Category.
- Description.
- Manufacturer.
- Strength.
- Dosage form.
- Barcode.
- SKU.
- Unit of measure.
- Purchase price.
- Selling price.
- Minimum stock level.
- Reorder quantity.
- Prescription classification.
- Tax configuration where applicable.
- Status.

Support:

- Registration.
- Editing.
- Search.
- Filtering.
- Pagination.
- Archiving.
- Medicine details.
- Batch information.
- Purchase history.
- Sales history.

Avoid physically deleting medicines referenced by historical transactions.

---

# 8. BATCH AND EXPIRY MANAGEMENT

The application must support pharmacy-specific batch-level inventory.

Store:

- Medicine.
- Batch number.
- Supplier.
- Purchase reference.
- Manufacturing date where available.
- Expiry date.
- Quantity received.
- Available quantity.
- Purchase cost.
- Selling price where batch-level pricing applies.
- Storage location.
- Batch status.

Implement:

- FEFO stock allocation.
- Expiry alerts.
- Expired stock restrictions.
- Damaged stock handling.
- Batch-level stock reconciliation.
- Batch-specific sales history.
- Batch-specific adjustments.

Never allow expired or quarantined stock to be sold.

Implement unit conversions where supported, including packs, strips and individual units.

All inventory quantities must have a consistent base-unit representation.

---

# 9. COMPLETE INVENTORY MANAGEMENT

Provide:

- Inventory overview.
- Stock receiving.
- Stock adjustments.
- Stock transfers where supported.
- Stock reconciliation.
- Batch management.
- Expiry management.
- Damaged goods.
- Stock returns.
- Low-stock notifications.
- Inventory valuation.

Maintain a stock movement ledger.

Every quantity change must reference an authorised business event.

Examples:

- Purchase receipt.
- POS sale.
- Customer return.
- Supplier return.
- Stock adjustment.
- Transfer.
- Expired stock write-off.
- Damaged stock write-off.

The current stock balance must be reconcilable against the stock movement history.

Do not modify stock balances without recording a traceable reason and audit event.

---

# 10. SUPPLIER AND PURCHASING MANAGEMENT

## Supplier Management

Support:

- Supplier registration.
- Supplier contacts.
- Address information.
- Tax details where applicable.
- Supplier status.
- Purchase history.
- Outstanding balances.
- Supplier invoices.

## Procurement

Implement:

- Purchase orders.
- Purchase order items.
- Supplier selection.
- Expected delivery.
- Purchase approval where required.
- Goods received.
- Batch registration.
- Supplier invoices.
- Purchase returns.
- Purchase payments.
- Outstanding purchase balances.

A goods receipt must update batch-level inventory correctly.

Do not update stock merely because a purchase order was created.

Only authorised receiving operations should update actual stock.

Support partial deliveries and outstanding purchase quantities.

---

# 11. CUSTOMER MANAGEMENT

Provide:

- Customer registration.
- Customer profiles.
- Contact details.
- Customer category where relevant.
- Purchase history.
- Outstanding balances where authorised.
- Customer account status.
- Prescription-related records.

Customer data must be protected according to applicable privacy requirements.

Only authorised personnel may access sensitive prescription and customer information.

---

# 12. PRESCRIPTION MANAGEMENT

Implement a controlled prescription workflow.

Include:

- Prescription reference.
- Customer or patient reference.
- Prescribing professional information where required.
- Prescription date.
- Prescribed medicines.
- Dosage instructions.
- Quantity.
- Expiry or validity where applicable.
- Attachment records.
- Pharmacist verification.
- Dispensing status.
- Dispensing history.

Implement configurable rules for prescription-required and restricted medicines.

Where approval is required, ensure that only authorised users can approve dispensing.

Do not bypass legally required pharmacy controls.

Validate applicable pharmacy regulations with the operating jurisdiction before enabling production dispensing workflows.

Prescription documents and patient information must not be exposed publicly or logged as ordinary application data.

---

# 13. SALES RETURNS AND REFUNDS

Implement controlled return and refund workflows.

Support:

- Original transaction lookup.
- Original receipt reference.
- Return item selection.
- Returned quantity validation.
- Reason for return.
- Refund amount.
- Refund payment method.
- Authorised approval.
- Inventory treatment.
- Return history.
- Audit records.

Never allow returning more units than were originally sold, except where an explicitly authorised adjustment workflow exists.

Returned stock must not automatically become saleable.

Its condition must determine whether it is restocked, quarantined or disposed of.

All refunds must reference their original transactions.

Never delete completed sales to process refunds.

Use reversal and adjustment records.

---

# 14. CUSTOMER AND SUPPLIER FINANCIAL ACCOUNTS

Where the existing business model supports credit, implement:

- Customer accounts.
- Supplier accounts.
- Credit limits.
- Outstanding balances.
- Payment allocation.
- Account statements.
- Transaction history.
- Receivable reports.
- Payable reports.

Separate sales, payments, credits, refunds and adjustments.

Do not calculate outstanding balances using unreliable frontend-only calculations.

---

# 15. USERS, ROLES AND PERMISSIONS

Implement secure role-based access control.

Suggested initial roles:

1. Super Administrator.
2. Pharmacy Administrator.
3. Pharmacist.
4. Cashier.
5. Inventory Manager.
6. Procurement Officer.
7. Accountant.
8. Auditor.
9. Custom roles where necessary.

Discover existing roles before introducing new ones.

Provide permissions at module and action level.

Examples:

- View.
- Create.
- Edit.
- Approve.
- Delete or archive.
- Export.
- Refund.
- Adjust stock.
- Manage prices.
- Manage users.
- View financial reports.

Permissions must be enforced by the backend on every protected endpoint.

Use least-privilege defaults.

Implement:

- Secure password hashing.
- Login protection.
- Session management.
- Session expiration.
- Password reset procedures.
- Account deactivation.
- Failed login monitoring.
- Audit logging.

Never store authentication tokens in insecure browser localStorage where secure cookie-based session handling is appropriate.

---

# 16. REPORTS AND ANALYTICS

Build a complete reporting module.

Include:

## Sales
- Daily sales.
- Weekly sales.
- Monthly sales.
- Annual sales.
- Sales by cashier.
- Sales by medicine.
- Sales by category.
- Sales by payment method.

## Inventory
- Current inventory.
- Low-stock report.
- Out-of-stock report.
- Expiring medicines.
- Expired medicines.
- Batch report.
- Stock movement history.
- Inventory valuation.

## Purchasing
- Purchase orders.
- Goods received.
- Supplier payments.
- Supplier outstanding balances.
- Purchase returns.

## Financial
- Revenue.
- Payments received.
- Refunds.
- Outstanding balances.
- Cost of goods sold.
- Gross profit.
- Expenses, if expense management exists.
- Net profit, only when all necessary inputs are recorded.

## Customers
- Customer purchases.
- Customer account balances.
- Customer transaction history.

## Reports functionality

Implement:

- Date filtering.
- Search.
- Sorting.
- Pagination.
- Export to CSV.
- Print-friendly reports.
- PDF export where required.
- Permission-controlled access.

All financial figures must reconcile against underlying transactions.

Clearly distinguish sales revenue, cash received, outstanding balances, refunds and profit.

---

# 17. NOTIFICATIONS AND ALERTS

Implement a reusable notification centre.

Include:

- Low-stock alerts.
- Expiry alerts.
- Expired stock alerts.
- Purchase order status.
- Pending goods receipts.
- Pending payments.
- Payment failures.
- Unusual inventory adjustments.
- User and security alerts.

Notifications should be actionable and permission-aware.

Avoid repeatedly displaying the same unresolved alert without proper status management.

---

# 18. SYSTEM SETTINGS

Create a structured settings module.

Include:

## Pharmacy settings
- Pharmacy name.
- Logo.
- Address.
- Telephone.
- Email.
- Tax registration details.
- Receipt footer.
- Return policy.

## Financial settings
- Currency.
- Tax rates.
- Decimal and rounding configuration.
- Discount permissions.
- Payment methods.
- Credit policies.

## Inventory settings
- Default units.
- Reorder rules.
- Expiry notification periods.
- Batch requirements.

## Operational settings
- Time zone.
- Date format.
- Receipt settings.
- Session policies.
- Notification preferences.

## Security settings
- Password policies.
- Session expiration.
- Login limits.
- Access policies.
- Audit retention.

Do not hardcode the currency, tax rules, time zone or legal compliance requirements throughout the application.

Make them configurable and validate them against the pharmacy's actual operating requirements.

---

# 19. DATABASE ARCHITECTURE AND POSTGRESQL READINESS

Use a clean, maintainable relational database architecture.

Organise database access using repositories and services.

Keep business logic independent of database engine-specific syntax.

Use Knex.js migrations and query builder features where practical.

Avoid scattering raw MySQL-specific queries across controllers and frontend code.

Potential database entities include:

- users
- roles
- permissions
- user_roles
- role_permissions
- pharmacies or branches, if required
- medicines
- medicine_categories
- medicine_brands
- units_of_measure
- unit_conversions
- suppliers
- customers
- prescriptions
- prescription_items
- medicine_batches
- inventory_locations
- stock_movements
- purchase_orders
- purchase_order_items
- goods_receipts
- goods_receipt_items
- sales
- sale_items
- payments
- payment_events
- returns
- return_items
- refunds
- cash_sessions
- expenses, if supported
- notifications
- audit_logs
- idempotency_keys
- system_settings

Treat this as a proposed entity list, not permission to create duplicate tables. Inspect and map the existing schema before implementing changes.

## Database requirements

- Primary keys.
- Foreign keys.
- Unique constraints.
- Appropriate indexes.
- Referential integrity.
- Transaction support.
- Prepared statements or parameterised queries.
- Consistent timestamps.
- Exact decimal or integer-minor-unit monetary representation.
- Controlled deletion and archival.
- Versioned migrations.
- Backup and restoration procedures.

Use appropriate data types compatible with both database engines.

Pay special attention to:

- Auto-increment differences.
- UUIDs.
- Decimal handling.
- Date and timestamp handling.
- Boolean fields.
- JSON support.
- Unique constraints.
- Index definitions.
- Transaction isolation.
- Case sensitivity.
- SQL functions.

Use database transactions for financial and inventory operations.

Use portable query builder operations when possible.

For unavoidable database-specific operations, place them behind a documented adapter and implement equivalent behaviour for both engines.

Environment configuration:

DB_CLIENT=mysql2

DB_HOST=127.0.0.1

DB_PORT=3306

DB_NAME=pharmacy_management

DB_USER=root

DB_PASSWORD=

For PostgreSQL:

DB_CLIENT=pg

DB_HOST=127.0.0.1

DB_PORT=5432

DB_NAME=pharmacy_management

DB_USER=postgres

DB_PASSWORD=

The values above are examples only. Discover the real local configuration and never assume that the example credentials are correct.

Do not create PostgreSQL-only dependencies in the local MySQL environment unless required for compatibility testing.

---

# 20. BACKEND API ARCHITECTURE

Use a clean Express API structure.

Recommended organisation:

server/
  src/
    config/
    database/
      migrations/
      repositories/
      seeds/
    middleware/
    modules/
      auth/
      dashboard/
      users/
      roles/
      medicines/
      categories/
      inventory/
      batches/
      suppliers/
      purchasing/
      customers/
      prescriptions/
      pos/
      sales/
      payments/
      returns/
      refunds/
      reports/
      notifications/
      settings/
      audit/
    services/
    utils/
    validators/
    app.ts
    server.ts

Adapt this structure to the existing project where appropriate.

Each module should separate:

- Routes.
- Controllers.
- Services.
- Repositories.
- Validation.
- Permissions.
- Tests.

Use versioned REST endpoints:

/api/v1/auth

/api/v1/dashboard

/api/v1/medicines

/api/v1/inventory

/api/v1/batches

/api/v1/pos

/api/v1/sales

/api/v1/payments

/api/v1/suppliers

/api/v1/purchases

/api/v1/customers

/api/v1/prescriptions

/api/v1/reports

/api/v1/users

/api/v1/roles

/api/v1/settings

/api/v1/notifications

/api/v1/audit

Implement consistent:

- HTTP status codes.
- Request validation.
- Response formats.
- Pagination.
- Search.
- Filtering.
- Error handling.
- Authentication middleware.
- Permission middleware.

Never expose database credentials, internal stack traces or sensitive patient information through API errors.

---

# 21. FRONTEND ARCHITECTURE

Use React 18 and TypeScript.

Recommended organisation:

client/
  src/
    app/
    assets/
    components/
      common/
      layout/
      forms/
      tables/
      charts/
      dialogs/
    features/
      auth/
      dashboard/
      pos/
      medicines/
      inventory/
      batches/
      suppliers/
      purchasing/
      customers/
      prescriptions/
      sales/
      returns/
      reports/
      users/
      settings/
    hooks/
    lib/
    services/
    routes/
    types/
    utils/
    styles/
    main.tsx

Maintain a clear distinction between:

- Server state.
- UI state.
- Form state.
- Authentication state.

Use TanStack Query for remote data.

Use React Hook Form and Zod for complex forms.

Use shared API clients rather than implementing fetch logic repeatedly in pages.

Avoid unnecessary global state libraries.

Implement:

- Protected routes.
- Permission-aware routes.
- Reusable layout components.
- Error boundaries.
- Lazy loading.
- Proper loading and empty states.
- Accessible forms.
- Consistent API error notifications.

Every page must be connected to the actual backend.

Never replace missing backend functionality with hardcoded frontend arrays in production.

---

# 22. COMPLETE UI/UX REQUIREMENTS FOR EVERY MODULE

Do not apply professional styling only to the dashboard.

The entire application must maintain the same quality.

Each module must have its own complete interface.

## Data listing pages

Include:

- Page title.
- Primary action.
- Search bar.
- Filters.
- Data table.
- Pagination.
- Sorting.
- Status indicators.
- Action menu.
- Empty state.
- Loading state.

## Create and edit forms

Include:

- Properly grouped fields.
- Clear labels.
- Required field indicators.
- Inline validation.
- Helpful error messages.
- Save and cancel actions.
- Confirmation where appropriate.

## Details pages

Include:

- Key information.
- Related records.
- Activity history.
- Status.
- Relevant actions.
- Audit information where authorised.

## Modals and confirmation dialogs

Use professional accessible dialogs.

Avoid browser alert and confirm popups.

Require confirmation for:

- Important stock adjustments.
- Irreversible operations.
- Refunds.
- Financial reversals.
- User deactivation.
- Destructive actions.

Use archival instead of physical deletion when historical and regulatory records must be retained.

---

# 23. SECURITY AND DATA PROTECTION

Implement professional security practices.

Protect against:

- SQL injection.
- Cross-site scripting.
- Cross-site request forgery.
- Broken access control.
- Privilege escalation.
- Session hijacking.
- Brute-force login attacks.
- Insecure file uploads.
- Exposed environment variables.
- Sensitive information leakage.
- Improper error reporting.

Use:

- Helmet.
- Strict CORS configuration.
- Secure cookie settings.
- CSRF protection appropriate to the authentication architecture.
- Login rate limiting.
- Server-side permission checks.
- Secure password hashing using Argon2id or an appropriately configured alternative.
- Input validation.
- Output escaping.
- File upload validation.
- Protected private file storage.
- Structured and redacted logs.
- Database backups.

Sensitive prescription attachments must be stored outside public web directories and served only through authorised routes.

Maintain auditable records of:

- Financial transactions.
- Refunds.
- Stock adjustments.
- User permissions.
- Sensitive record access where required.
- Critical system configuration changes.

Never log passwords, session tokens, payment credentials or private prescription contents.

---

# 24. PERFORMANCE AND RESPONSIVENESS

The application must work efficiently on:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

Desktop should be the primary operational environment, particularly for POS and inventory management.

Optimise:

- Medicine search.
- Barcode lookup.
- Large tables.
- Dashboard queries.
- Reports.
- API requests.
- Database indexes.
- Frontend bundle size.
- Lazy-loaded modules.
- Image loading.

Use server-side pagination and filtering for large datasets.

Avoid fetching an entire medicine or transaction database simply to display one page.

Use efficient caching for appropriate read-only data.

Invalidate caches correctly after sales, inventory changes and purchasing operations.

---

# 25. XAMPP LOCAL DEVELOPMENT AND DEPLOYMENT

The initial application must work using the existing XAMPP installation.

Configure:

- XAMPP MySQL/MariaDB.
- Node.js API server.
- React development environment.
- Database connection.
- Environment variables.
- CORS.
- API routing.
- Application build.

Expected local architecture:

React 18 frontend → Express API → Knex data access → XAMPP MySQL/MariaDB.

The frontend and API may run as separate development services.

For example:

Frontend: http://localhost:5173

Backend: http://localhost:4000

API: http://localhost:4000/api/v1

Use configurable ports and inspect the existing environment before applying these examples.

XAMPP Apache may serve the built frontend or act as a suitable reverse proxy where configured.

Do not confuse Apache/PHP execution with Node.js execution. Express must be started as a Node.js process.

Provide:

- Development startup commands.
- Production build commands.
- Database creation instructions.
- Migration commands.
- Backup commands.
- Restore instructions.
- Troubleshooting documentation.

Do not expose the development server or phpMyAdmin publicly.

---

# 26. AUTOMATED TESTING AND VERIFICATION

Testing must be based on actual application functionality.

Never claim a test passed without executing it.

## Frontend tests

Test:

- Login.
- Navigation.
- Forms.
- Search.
- Filters.
- Modals.
- Tables.
- Permissions.
- Dashboard rendering.
- POS interactions.
- Loading states.
- Error states.

## Backend tests

Test:

- API validation.
- Authentication.
- Permissions.
- Database queries.
- Transaction rollback.
- Idempotency.
- Error handling.
- File upload security.
- Rate limits.

## Database tests

Test:

- Migrations.
- Foreign keys.
- Unique constraints.
- Transactions.
- Decimal accuracy.
- Concurrent stock changes.
- Referential integrity.
- Data persistence.

## Complete POS end-to-end test

Execute these scenarios using controlled test data:

1. Login as an authorised cashier.
2. Search for a medicine.
3. Find the medicine by barcode.
4. Add products to the cart.
5. Change quantities.
6. Apply an authorised discount.
7. Validate the totals.
8. Complete a cash transaction.
9. Complete an external payment workflow where integration exists.
10. Complete a split payment where supported.
11. Generate a receipt.
12. Print a receipt.
13. Verify stock deduction.
14. Verify batch quantities.
15. Attempt to sell more stock than available.
16. Attempt to sell an expired batch.
17. Process a legitimate medicine return.
18. Process an authorised refund.
19. Attempt a duplicate submission.
20. Verify reports against transaction records.

## Failure and concurrency testing

Simulate:

- Database interruption.
- API timeout.
- Failed external payment.
- Duplicate payment callback.
- Duplicate POS request.
- Two cashiers selling the same remaining stock simultaneously.
- Application interruption during transaction processing.
- Receipt printing failure after a completed sale.

Verify that all financial and inventory records remain consistent.

Never use actual patient or customer data in test environments.

## PostgreSQL testing

Where PostgreSQL is available, run the migrations and critical workflow tests against it.

Where PostgreSQL is unavailable, provide and validate the migration configuration, review cross-database compatibility and document which tests remain unexecuted.

---

# 27. PRODUCTION DEPLOYMENT PREPARATION

The production configuration must be separate from development.

Implement:

- Production environment variables.
- Secure secrets.
- Production database configuration.
- Build optimisation.
- HTTPS.
- Secure cookies.
- Logging.
- Monitoring.
- Error tracking.
- Database backups.
- Database restoration.
- Migration procedures.
- Access controls.
- File storage.
- Health-check endpoints.
- Deployment documentation.
- Recovery procedures.

XAMPP is the initial local development environment, not automatically the recommended public production hosting environment.

Provide an appropriate production deployment approach for the actual hosting infrastructure.

Do not include development credentials, demonstration accounts or sample patient records in the production build.

---

# 28. IMPLEMENTATION EXECUTION ORDER

Work through the following stages systematically.

## Stage 1 — Discovery
Inspect all existing files, architecture, dependencies and database structures.

Deliver the audit and implementation plan.

## Stage 2 — Backup and environment
Create backups and establish reliable XAMPP and Node.js execution.

## Stage 3 — Architecture
Establish the frontend structure, backend modules, database abstraction and environment configurations.

## Stage 4 — UI design system
Implement the visual identity, application layout, sidebar, topbar, typography, cards, tables, forms and shared components.

Use the supplied dashboard image as the main visual reference.

## Stage 5 — Authentication
Repair login, sessions, users, roles and permissions.

## Stage 6 — Dashboard
Implement real dashboard KPIs, charts, recent transactions, alerts and quick actions.

## Stage 7 — Medicine and inventory
Implement medicine management, batches, stock receiving, stock movements and FEFO.

## Stage 8 — POS
Implement the complete POS workflow, payments, stock deduction, receipts and returns.

## Stage 9 — Procurement and customers
Integrate suppliers, purchases, goods received, customers, prescriptions and account balances where applicable.

## Stage 10 — Reports
Implement operational, financial, supplier, customer and inventory reporting.

## Stage 11 — Security and performance
Review security, permissions, database queries and frontend performance.

## Stage 12 — Testing
Execute unit, integration and end-to-end tests.

## Stage 13 — PostgreSQL compatibility
Verify database portability and document remaining differences.

## Stage 14 — Production deployment
Prepare environment configuration, backups, recovery and deployment documentation.

Do not mark a stage complete merely because the relevant page has been generated.

A stage is complete only when its functionality has been implemented and its relevant tests have been executed.

---

# 29. NON-NEGOTIABLE DEVELOPMENT RULES

1. Preserve working functionality.
2. Do not unnecessarily rebuild the application.
3. Do not introduce React 19.
4. Do not use PHP MySQLi in the Node.js backend.
5. Use mysql2 for the current MySQL/MariaDB connection.
6. Keep PostgreSQL migration compatibility in mind throughout implementation.
7. Do not hardcode production records or KPI values.
8. Do not create non-functional buttons.
9. Do not leave placeholder pages presented as completed features.
10. Do not use frontend-only permission checks.
11. Do not trust client-side sale totals.
12. Do not allow duplicate sales or payments.
13. Do not deduct stock from unconfirmed transactions.
14. Do not allow expired batches to be sold.
15. Do not silently delete important business records.
16. Do not expose patient or prescription information.
17. Do not introduce unnecessary dependencies.
18. Do not break the existing UI without a justified improvement.
19. Test each module after implementation.
20. Maintain clear and readable source code.
21. Document all important architectural decisions.
22. Never claim unexecuted tests have passed.
23. Never hide errors by disabling application features.
24. Never overwrite the existing database without an approved backup and migration plan.
25. Do not declare production readiness while known critical defects remain.

When a requirement depends on an unavailable payment provider, printer, external service or database server, implement the available integration layer and clearly document what remains.

When a business or regulatory decision is not established by the existing project, record the uncertainty and make the behaviour configurable rather than inventing pharmacy policy.

---

# 30. REQUIRED FINAL DELIVERABLES

At the end of implementation, provide the following.

## A. Project audit report
- Existing architecture.
- Technologies discovered.
- Initial defects.
- Root causes.
- Severity.
- Changes implemented.

## B. Architecture documentation
- Frontend architecture.
- Backend architecture.
- API structure.
- Database architecture.
- Authentication flow.
- Permission architecture.
- Data flow.

## C. UI/UX implementation report
- Design system.
- Shared components.
- Responsive behaviour.
- Implemented modules.
- Remaining visual issues.

## D. XAMPP setup report
- Required services.
- Database configuration.
- Local startup instructions.
- Database migration commands.
- Troubleshooting.

## E. POS verification report
- Product search.
- Cart operations.
- Transaction processing.
- Payment verification.
- Stock deductions.
- Batch allocation.
- Receipts.
- Returns and refunds.
- Duplicate prevention.
- Failure scenarios.

## F. PostgreSQL readiness report
- Schema compatibility.
- Database adapters.
- Migrations.
- SQL compatibility.
- Tests executed.
- Remaining migration work.

## G. Security report
- Authentication.
- Permissions.
- Data protection.
- Vulnerabilities addressed.
- Remaining security risks.

## H. Testing report
- Tests executed.
- Passed tests.
- Failed tests.
- Not-executed tests.
- Test evidence.
- Outstanding defects.

## I. Deployment documentation

Create:

- README.md
- INSTALLATION.md
- DEVELOPMENT.md
- DATABASE_SETUP.md
- DATABASE_MIGRATION.md
- BACKUP_AND_RESTORE.md
- API_DOCUMENTATION.md
- SECURITY.md
- TESTING.md
- DEPLOYMENT.md
- TROUBLESHOOTING.md

## J. Final project package

Provide:

- Complete source code.
- Database migrations.
- Environment example files.
- Test files.
- Updated documentation.
- Production build configuration.
- Deployment instructions.

Do not include private credentials or real customer/patient information.

---

# 31. FINAL ACCEPTANCE CRITERIA

The application must meet the following measurable conditions before it can be declared production-ready.

| Area | Acceptance requirement |
|---|---|
| Existing project | Existing working features preserved |
| UI/UX | Consistent professional design across all modules |
| React | React 18 implementation |
| Styling | Tailwind CSS design system |
| Backend | Express API operational |
| Database | Reliable XAMPP MySQL/MariaDB connectivity |
| PostgreSQL | Compatible architecture and migration preparation |
| Authentication | Secure and verified |
| Permissions | Enforced on backend |
| Dashboard | Real database-driven analytics |
| Medicines | Complete and verified CRUD |
| Inventory | Accurate quantity and batch tracking |
| FEFO | Verified eligible batch allocation |
| POS | Complete sales workflow |
| Payments | Correct payment states and reconciliation |
| Receipts | Accurate generation and printing |
| Returns | Controlled and auditable |
| Procurement | Purchase-to-inventory integration |
| Prescriptions | Protected and authorised workflows |
| Reports | Figures reconcile with underlying records |
| Security | No unresolved known critical security vulnerabilities |
| Performance | No unresolved critical bottlenecks |
| Testing | Critical workflows executed successfully |
| Recovery | Backup and restore procedure verified |
| Documentation | Complete installation and operation instructions |

The target is zero known critical defects, no unresolved high-risk defects without an explicitly approved mitigation, verified core workflows and documented operational limitations.

Do not claim that software is guaranteed to be 100% error-free. Production readiness must be supported by actual implementation evidence and testing.

---

# 32. FINAL EXECUTION INSTRUCTION

Begin by inspecting the complete existing project.

Do not start by generating a new dashboard or replacing existing files.

Understand the application, its database, its business logic and existing functionality first.

Then systematically design, repair, implement and integrate the entire system.

Use the supplied professional dashboard image as the visual direction for the application.

Ensure that all modules share one coherent design system and that the entire frontend is properly integrated with the Express API and real database.

Prioritise financial accuracy, pharmacy inventory integrity, transaction security and reliable daily operations.

Work through all implementation stages rather than stopping at planning, recommendations, screenshots or frontend prototypes.

At every stage, report:

- What was inspected.
- What was implemented.
- What was corrected.
- What was tested.
- What passed.
- What failed.
- What remains outstanding.

**FINAL OBJECTIVE: DELIVER A FULLY INTEGRATED, PROFESSIONALLY DESIGNED, FUNCTIONAL, SECURE, TESTED AND PRODUCTION-READY PHARMACY MANAGEMENT SYSTEM USING REACT 18, TAILWIND CSS, NODE.JS, EXPRESS AND XAMPP MYSQL/MARIADB, WITH A WELL-ENGINEERED FUTURE POSTGRESQL MIGRATION PATH.**