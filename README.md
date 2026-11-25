# PharmaPro — Smart Pharmacy Management

**A modern pharmacy management interface designed around the workflows that matter: sales, medicines, inventory, purchasing, customers and operational visibility.**

PharmaPro is a responsive pharmacy management frontend demonstration built to show how everyday pharmacy activities can be brought together in one clear, connected workspace. Its dashboard takes inspiration from the supplied design reference, while the supporting modules demonstrate practical user journeys for pharmacy teams and administrators.

> **Project status — interactive frontend demo:** This repository contains a browser-based demonstration built with HTML, Tailwind CSS, vanilla JavaScript and `localStorage`. It is intended for evaluation, demonstration and further product development. It is **not** a production pharmacy platform and must not be used to manage real patient information, prescriptions, dispensing decisions, inventory records, payments or financial reporting.

---

## Product preview

[**View PharmaPro App– Live Application**](https://pauldeveloper73.github.io/pharmacy-app/)

## ![PharmaPro dashboard preview](assets/PharmaPro%20Pharmacy%20Dashboard.png)

---

## At a glance

- **Project:** PharmaPro — Smart Pharmacy Management
- **Delivery:** Responsive frontend prototype / interactive demo
- **Frontend:** HTML5, Tailwind CSS and vanilla JavaScript
- **Demo persistence:** Browser `localStorage`
- **Local hosting:** XAMPP Apache or a simple local web server
- **Backend and database:** Not included in this demo
- **Primary purpose:** Demonstrate the interface, navigation and selected pharmacy workflows that can be developed further into a complete business application

## The product concept

Pharmacies manage several connected activities throughout the day. PharmaPro explores a unified workspace for those activities, reducing the need to move between disconnected screens and helping users find key information quickly.

The interface is organised around a familiar dashboard, direct navigation and task-focused screens. The goal is to make important information easy to scan and common actions easy to reach, whether a user is reviewing sales, checking stock, receiving supplies or looking up a customer.

### What the demo showcases

- A dashboard with sales indicators, inventory distribution, recent transactions, stock alerts and quick actions.
- A point-of-sale interface with medicine lookup, a shopping cart, quantity controls and a demonstration checkout flow.
- Medicine, category, batch, supplier and customer record screens.
- Inventory adjustments and purchasing/receiving demonstrations.
- Sales history, returns, reports and CSV export examples.
- Profile, notifications, settings, audit-history and help interfaces.
- A responsive layout for desktop, laptop, tablet and mobile screens.

## Modules and demonstrated workflows

| Module                           | What users can explore                                                                                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dashboard**                    | Reference-inspired overview, KPI cards, sales trend, inventory distribution, recent transactions, stock alerts and quick actions.                                                                     |
| **POS / Sales**                  | Search medicines, look up a seeded SKU or barcode, add items to a cart, adjust quantities, select a customer, apply a discount, choose a demonstration payment method and complete a local demo sale. |
| **Medicines**                    | Add, view, edit and archive medicine records; search, filter, sort and paginate the list.                                                                                                             |
| **Medicine Categories**          | Review and manage demonstration medicine categories.                                                                                                                                                  |
| **Inventory**                    | Review stock levels and displayed valuation, record controlled demo adjustments and inspect stock movement history.                                                                                   |
| **Batches & Expiry**             | Browse sample batch and expiry information with search and filtering.                                                                                                                                 |
| **Stock Adjustments**            | Record positive or negative demo adjustments with a reason and confirmation.                                                                                                                          |
| **Purchasing & Purchase Orders** | Create and review purchase orders and receive outstanding quantities in the demo workflow.                                                                                                            |
| **Goods Received**               | Review recorded demo goods-receiving activity.                                                                                                                                                        |
| **Suppliers**                    | Create, edit, search and archive supplier records.                                                                                                                                                    |
| **Customers**                    | Create, edit, search and archive customer records and review demonstration account balances.                                                                                                          |
| **Prescriptions**                | Register and review sample prescription records. This is not a clinical verification or dispensing system.                                                                                            |
| **Sales History**                | Search, sort and review locally recorded demo transactions.                                                                                                                                           |
| **Returns & Refunds**            | Record returns for review. The demo does not issue real refunds or automatically return items to saleable stock.                                                                                      |
| **Reports**                      | Review demonstration sales, purchasing, returns and inventory summaries; export supported data to CSV or use the browser print function.                                                              |
| **Users & Roles**                | Manage sample staff profiles and display role labels. These labels do not provide real access control.                                                                                                |
| **Settings**                     | Adjust the demo pharmacy profile, currency display, inventory thresholds and other local preferences.                                                                                                 |
| **Audit Logs**                   | Review selected activity entries recorded in the current browser.                                                                                                                                     |
| **Help & Support**               | Read common workflow guidance and explore the local demonstration support form.                                                                                                                       |

### Shared interface interactions

The demo also includes working sidebar navigation, desktop sidebar collapse, a mobile navigation drawer, global search, notification and profile dropdowns, modal forms, confirmation prompts, table search, filters, sorting, pagination, local data export and reset controls.

The POS demonstration updates local sample stock after a confirmed demo sale. Printing a receipt does not create another sale. Receiving stock and adjusting inventory create corresponding local movement records. These behaviours demonstrate the intended user experience; they do not provide the guarantees of a transactional server-side system.

## Screens and design direction

The dashboard follows the supplied PharmaPro reference: deep navy navigation, a light workspace, four coloured summary cards, a sales chart, an inventory-status visual, quick-action tiles, recent transactions and stock alerts.

The same visual language carries through the other screens using consistent spacing, typography, status indicators, cards, tables, forms and responsive navigation. The layout is designed desktop-first for pharmacy counter workflows while adapting to smaller screens.

## Run the demo locally

### Option 1 — XAMPP on Windows

1. Download and extract the project archive.
2. Copy the `pharmapro-demo` folder into your XAMPP web root. The usual location is:

   ```text
   C:\xampp\htdocs\pharmapro-demo
   ```

3. Open the XAMPP Control Panel and start **Apache**.
4. Visit the application in your browser:

   ```text
   http://localhost/pharmapro-demo/
   ```

**MySQL is not required for this demonstration.** XAMPP Apache serves the frontend files; this project does not connect to XAMPP MySQL/MariaDB.

### Option 2 — Python local server

From the project directory, run:

```bash
py -m http.server 8080
```

Then visit:

```text
http://localhost:8080/
```

Use a current version of Chrome, Edge, Firefox or Safari for the best experience.

## Explore the demonstration

1. Open the Dashboard and review the sample sales and inventory overview.
2. Use the sidebar to visit the available modules.
3. Open POS / Sales, search for a medicine and add it to the cart.
4. Adjust quantities and complete a demonstration checkout.
5. Return to Medicines or Inventory to see the corresponding local demo changes.
6. Try the table search, filters, sorting and pagination controls.
7. Open the profile and notification menus in the top bar.
8. Visit Settings to export a local JSON backup or reset the demonstration records.

The initial dataset includes synthetic sample medicines, suppliers, customers, staff, purchase orders, transactions and notifications. The sample workspace uses **KES** and Nairobi-based example details; update the demo settings when presenting a different market. These records are illustrative and are not real business or patient data.

## Technology and implementation

| Technology                | Purpose in this demo                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **HTML5**                 | Semantic application shell and page structure.                                                       |
| **Tailwind CSS Play CDN** | Utility-based styling loaded from the Tailwind CDN.                                                  |
| **Custom CSS**            | Dashboard design system, reusable interface styling and responsive layouts.                          |
| **Vanilla JavaScript**    | Navigation, rendering, forms, dialogs, tables, POS interactions, charts and demo business workflows. |
| **Browser localStorage**  | Persistence for sample records and selected interface settings in the current browser.               |
| **Inline SVG**            | Icons and dashboard chart visuals without a separate chart or icon framework.                        |

### Project structure

```text
pharmapro-demo/
├── index.html
├── README.md
├── PROJECT_NOTES.md
├── QA_CHECKLIST.md
├── assets/
│   └── styles.css
└── js/
    └── app.js
```

### Data persistence and reset

- Demo records are stored under the browser key `pharmapro.demo.v1`.
- Changes remain available after refresh in the same browser and website origin.
- Another browser, browser profile or computer has its own separate demo data.
- Use **Export local data backup** in Settings to download a JSON copy of the current local demo state.
- Use **Reset demo data** to restore the original sample dataset. Reset replaces the current local demo state; export a backup first if you need to retain changes.

Do not use browser storage as the source of truth for real pharmacy, patient, financial or inventory records.

## Important scope and production considerations

PharmaPro is presented as an interactive frontend concept. The current package does not include a backend, database, real authentication or external service integrations. The following capabilities must be designed, implemented and tested before the product can be considered for live pharmacy operations:

- **Backend and database:** Build a secure API and connect it to a relational database such as MySQL/MariaDB. Establish migrations, constraints, indexes, backups and tested recovery procedures, with a separately verified PostgreSQL migration path if required.
- **Authentication and permissions:** Implement secure sign-in, password hashing, server-managed sessions, account recovery and server-side role and permission enforcement. The role labels in this demo are illustrative only.
- **Sales and financial integrity:** Recalculate and validate prices and totals on the server, use database transactions and idempotency controls, and implement reconciliation for sales, payments, refunds and reversals.
- **Inventory integrity:** Implement a batch-level stock ledger, FEFO allocation, unit conversions, concurrency protection, expiry controls and authorised stock adjustments.
- **Payments:** Connect payment providers through verified callbacks and reconciliation. Cash, Mobile Money, card and bank-transfer selections in this demo do not process payments or move money.
- **Pharmacy and prescription controls:** Implement jurisdiction-appropriate professional review, prescription verification, restricted-medicine controls, protected records and applicable regulatory requirements before any dispensing use.
- **Privacy and security:** Protect customer and patient data, validate inputs on the server, secure file handling, apply access controls and avoid storing sensitive information in browser storage or public assets.
- **Reporting and compliance:** Reconcile reports with source transactions and implement the accounting, tax and statutory rules applicable to the operating jurisdiction.
- **Quality assurance:** Complete browser-based end-to-end, integration, security, accessibility, performance, backup/restore and operational testing using synthetic test data.

XAMPP in the local setup is used only to serve the static frontend through Apache. Starting MySQL in XAMPP will not connect this project to a database. The Tailwind Play CDN is convenient for this demo and requires an internet connection; a production deployment should use a pinned, locally compiled Tailwind CSS build.

## Verification status

The project has been checked with JavaScript syntax validation (`node --check`) and a lightweight render smoke check covering the initial dashboard and 19 module views.

The following have **not** been completed for this frontend-only package: full browser end-to-end testing across browsers and devices, XAMPP database integration, Express API testing, real payment integration, PostgreSQL migration testing, security testing of a production backend, and verification against pharmacy regulatory requirements. The included `QA_CHECKLIST.md` provides a manual checklist for exploring the available demo interactions.

## Further development opportunities

The current prototype can serve as a starting point for a requirements-led implementation. A production roadmap could include:

1. Confirm pharmacy workflows, user roles, operating jurisdiction and reporting requirements.
2. Design the database schema, API contracts and secure authentication model.
3. Connect the medicine, customer, supplier and inventory modules to persistent server-side records.
4. Implement transactional POS, batch/expiry controls, purchasing, receiving and returns.
5. Integrate and verify payment providers, receipts and financial reconciliation.
6. Complete security, usability, performance and operational testing before deployment.

The final scope, timeline and implementation approach should be agreed after reviewing the organisation's requirements and existing systems.

---

## Developer and project contact

**Kisakye Paul — Software Developer & Project Owner**

I design and develop websites, web applications and custom digital solutions with an emphasis on practical workflows, thoughtful user experience, maintainable architecture and software that addresses real operational needs.

- **Email:** [kisakyepaul73@gmail.com](mailto:kisakyepaul73@gmail.com)
- **WhatsApp:** Contact Kisakye Paul directly for a project discussion.
- **GitHub:** [github.com/pauldeveloper73](https://github.com/pauldeveloper73)
- **Portfolio:** [Explore the developer portfolio](https://pauldeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/)

For pharmacy software enquiries, custom web applications, school management solutions, workflow automation or an implementation discussion, please use the contact details above. Include your organisation, the operational challenge you want to solve, the key features you need and your preferred timeline so the enquiry can be assessed appropriately.

**BUILT WITH PURPOSE. DEVELOPED WITH PRECISION. DESIGNED FOR REAL-WORLD PHARMACY OPERATIONS.**

© Kisakye Paul — PharmaPro Smart Pharmacy Management Demo. All rights reserved, subject to the repository's applicable licence and third-party terms.
