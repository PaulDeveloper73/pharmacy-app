/* PharmaPro demo application
   Frontend-only demonstration: all business records persist in localStorage.
   Do not use localStorage as a production database or authentication store.
*/
(() => {
  'use strict';

  const STORAGE_KEY = 'pharmapro.demo.v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => new Intl.NumberFormat('en-KE', { style: 'currency', currency: (typeof state !== 'undefined' && state?.settings?.currency) || 'KES', maximumFractionDigits: 0 }).format(Number(value || 0));
  const number = value => new Intl.NumberFormat('en-KE').format(Number(value || 0));
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const dateText = value => value ? new Date(`${String(value).slice(0,10)}T00:00:00`).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—';
  const dateTimeText = value => value ? new Date(value).toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';
  const uid = prefix => `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clone = value => JSON.parse(JSON.stringify(value));

  const ICONS = {
    dashboard:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    pill:'<path d="m10.5 20.5 10-10a6.36 6.36 0 0 0-9-9l-10 10a6.36 6.36 0 0 0 9 9Z"/><path d="m8.5 8.5 7 7"/>',
    package:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',
    truck:'<path d="M10 17h4V5H2v12h3"/><path d="M14 9h5l3 4v4h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/><path d="M19 9h-5m5 0v5"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V4a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    bars:'<path d="M4 19V9m6 10V5m6 14v-7m6 7V3"/>',
    shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>',
    eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    warning:'<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>',
    close:'<path d="m18 6-12 12M6 6l12 12"/>',
    filter:'<path d="M4 7h16M7 12h10m-7 5h4"/>',
    printer:'<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    receipt:'<path d="M4 2v20l4-2 4 2 4-2 4 2V2l-4 2-4-2-4 2-4-2Z"/><path d="M8 9h8m-8 4h8"/>',
    refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9a7 7 0 0 1 11.5-2L20 12M4 12l2.9 5a7 7 0 0 0 11.5-2"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h.01"/>',
    box:'<path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    wallet:'<rect x="2" y="5" width="20" height="15" rx="2"/><path d="M2 9h20m-5 4h2"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    list:'<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    bolt:'<path d="m13 2-3 9h7L9 22l3-9H5l8-11Z"/>',
    pharmacy:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 7v10M7 12h10"/>'
  };
  const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.package}</svg>`;

  function seedData() {
    const products = [
      {id:'MED-001',sku:'PH-0001',name:'Amoxicillin 500mg',generic:'Amoxicillin',brand:'MediCare',category:'Antibiotics',strength:'500mg',form:'Capsules',barcode:'616110001001',batch:'AMX-2404-A',expiry:'2027-04-30',stock:12,minStock:20,unit:'packs',purchasePrice:240,sellingPrice:320,status:'Active'},
      {id:'MED-002',sku:'PH-0002',name:'Paracetamol 500mg',generic:'Paracetamol',brand:'HealWell',category:'Pain Relief',strength:'500mg',form:'Tablets',barcode:'616110001002',batch:'PAR-2501-B',expiry:'2027-01-31',stock:1400,minStock:80,unit:'tablets',purchasePrice:75,sellingPrice:120,status:'Active'},
      {id:'MED-003',sku:'PH-0003',name:'Vitamin C 100mg',generic:'Ascorbic Acid',brand:'VitaPlus',category:'Vitamins',strength:'100mg',form:'Tablets',barcode:'616110001003',batch:'VTC-2502-C',expiry:'2027-02-28',stock:80,minStock:100,unit:'bottles',purchasePrice:120,sellingPrice:180,status:'Active'},
      {id:'MED-004',sku:'PH-0004',name:'Cetirizine 10mg',generic:'Cetirizine',brand:'AllerFree',category:'Allergy',strength:'10mg',form:'Tablets',barcode:'616110001004',batch:'CTZ-2505-A',expiry:'2027-05-31',stock:500,minStock:60,unit:'packs',purchasePrice:80,sellingPrice:140,status:'Active'},
      {id:'MED-005',sku:'PH-0005',name:'Metformin 500mg',generic:'Metformin HCl',brand:'GlucoCare',category:'Diabetes Care',strength:'500mg',form:'Tablets',barcode:'616110001005',batch:'MTF-2503-D',expiry:'2027-03-31',stock:600,minStock:80,unit:'packs',purchasePrice:180,sellingPrice:260,status:'Active'},
      {id:'MED-006',sku:'PH-0006',name:'Omeprazole 20mg',generic:'Omeprazole',brand:'GastroRelief',category:'Gastrointestinal',strength:'20mg',form:'Capsules',barcode:'616110001006',batch:'OMP-2507-A',expiry:'2027-07-31',stock:400,minStock:60,unit:'packs',purchasePrice:210,sellingPrice:300,status:'Active'},
      {id:'MED-007',sku:'PH-0007',name:'ORS Sachets',generic:'Oral Rehydration Salts',brand:'HydraAid',category:'Rehydration',strength:'Standard',form:'Powder',barcode:'616110001007',batch:'ORS-2510-B',expiry:'2027-10-31',stock:600,minStock:100,unit:'sachets',purchasePrice:90,sellingPrice:150,status:'Active'},
      {id:'MED-008',sku:'PH-0008',name:'Cough Syrup 100ml',generic:'Dextromethorphan',brand:'CoughEase',category:'Respiratory',strength:'100ml',form:'Syrup',barcode:'616110001008',batch:'CSY-2508-C',expiry:'2027-08-31',stock:300,minStock:50,unit:'bottles',purchasePrice:350,sellingPrice:500,status:'Active'},
      {id:'MED-009',sku:'PH-0009',name:'Artemether/Lumefantrine',generic:'Artemether + Lumefantrine',brand:'MalaCare',category:'Antimalarials',strength:'20/120mg',form:'Tablets',barcode:'616110001009',batch:'AL-2506-A',expiry:'2027-06-30',stock:90,minStock:20,unit:'packs',purchasePrice:950,sellingPrice:1250,status:'Active'},
      {id:'MED-010',sku:'PH-0010',name:'Ibuprofen 400mg',generic:'Ibuprofen',brand:'PainAway',category:'Pain Relief',strength:'400mg',form:'Tablets',barcode:'616110001010',batch:'IBU-2509-A',expiry:'2027-09-30',stock:200,minStock:45,unit:'packs',purchasePrice:105,sellingPrice:170,status:'Active'},
      {id:'MED-011',sku:'PH-0011',name:'Eye Drops 10ml',generic:'Chloramphenicol',brand:'ClearSight',category:'Eye Care',strength:'0.5%',form:'Drops',barcode:'616110001011',batch:'EYE-2509-B',expiry:'2027-09-30',stock:110,minStock:30,unit:'bottles',purchasePrice:200,sellingPrice:320,status:'Active'},
      {id:'MED-012',sku:'PH-0012',name:'Antacid Suspension',generic:'Aluminium Hydroxide',brand:'GastroCalm',category:'Gastrointestinal',strength:'200ml',form:'Suspension',barcode:'616110001012',batch:'ANT-2511-A',expiry:'2027-11-30',stock:190,minStock:30,unit:'bottles',purchasePrice:260,sellingPrice:380,status:'Active'},
      {id:'MED-013',sku:'PH-0013',name:'Salbutamol Inhaler',generic:'Salbutamol',brand:'AirFlow',category:'Respiratory',strength:'100mcg',form:'Inhaler',barcode:'616110001013',batch:'SAL-2510-A',expiry:'2027-10-31',stock:125,minStock:25,unit:'inhalers',purchasePrice:580,sellingPrice:750,status:'Active'},
      {id:'MED-014',sku:'PH-0014',name:'Insulin 10ml',generic:'Human Insulin',brand:'GlucoCare',category:'Diabetes Care',strength:'100IU/ml',form:'Injection',barcode:'616110001014',batch:'INS-2501-Z',expiry:'2027-01-31',stock:0,minStock:10,unit:'vials',purchasePrice:1600,sellingPrice:2100,status:'Active'}
    ];
    const customers = [
      {id:'CUS-001',name:'Amina Njeri',phone:'+254 712 345 678',email:'amina@example.com',type:'Regular',balance:0,status:'Active'},
      {id:'CUS-002',name:'David Otieno',phone:'+254 723 456 789',email:'david@example.com',type:'Regular',balance:1250,status:'Active'},
      {id:'CUS-003',name:'Grace Wanjiku',phone:'+254 734 567 890',email:'grace@example.com',type:'Walk-in',balance:0,status:'Active'},
      {id:'CUS-004',name:'Peter Kamau',phone:'+254 745 678 901',email:'peter@example.com',type:'Corporate',balance:4500,status:'Active'},
      {id:'CUS-005',name:'Mary Atieno',phone:'+254 756 789 012',email:'mary@example.com',type:'Regular',balance:0,status:'Active'},
      {id:'CUS-006',name:'Brian Kiptoo',phone:'+254 767 890 123',email:'brian@example.com',type:'Walk-in',balance:0,status:'Active'}
    ];
    const suppliers = [
      {id:'SUP-001',name:'MedSource Distributors',contact:'John Mwangi',phone:'+254 700 111 222',email:'orders@medsource.demo',location:'Nairobi',balance:125000,status:'Active'},
      {id:'SUP-002',name:'HealthPlus Wholesale',contact:'Sarah Wambui',phone:'+254 711 222 333',email:'sales@healthplus.demo',location:'Mombasa',balance:0,status:'Active'},
      {id:'SUP-003',name:'AfriMed Supplies',contact:'Peter Ouma',phone:'+254 722 333 444',email:'info@afrimed.demo',location:'Kisumu',balance:45000,status:'Active'},
      {id:'SUP-004',name:'CareLine Pharma',contact:'Lucy Njeri',phone:'+254 733 444 555',email:'care@careline.demo',location:'Nakuru',balance:0,status:'Active'},
      {id:'SUP-005',name:'Global Medical Hub',contact:'James Kariuki',phone:'+254 744 555 666',email:'hub@globalmed.demo',location:'Nairobi',balance:78000,status:'Active'}
    ];
    const users = [
      {id:'USR-001',name:'Dr. James Mwangi',email:'james@pharmapro.demo',phone:'+254 700 000 001',role:'Administrator',status:'Active'},
      {id:'USR-002',name:'Mary Wanjiru',email:'mary@pharmapro.demo',phone:'+254 700 000 002',role:'Pharmacist',status:'Active'},
      {id:'USR-003',name:'Kevin Otieno',email:'kevin@pharmapro.demo',phone:'+254 700 000 003',role:'Cashier',status:'Active'},
      {id:'USR-004',name:'Lucy Kamau',email:'lucy@pharmapro.demo',phone:'+254 700 000 004',role:'Inventory Manager',status:'Active'}
    ];
    const sales = Array.from({length:42}, (_, i) => {
      const d = new Date(); d.setHours(10, 42 - i * 2, 0, 0);
      const amount = i === 0 ? 1850 : i === 1 ? 950 : i < 32 ? 1399 : 1398;
      return {id:`SAL-${100245-i}`,reference:String(100245-i),date:d.toISOString(),customer:customers[i%customers.length].name,cashier:i%3===0?'Mary Wanjiru':'Kevin Otieno',items:1+(i%4),amount,paymentMethod:i%3===0?'Cash':i%3===1?'Mobile Money':'Card',status:'Completed'};
    });
    const now = new Date();
    const transactions = [
      {id:'TXN-100245',reference:'100245',date:new Date(now.getFullYear(),now.getMonth(),now.getDate(),10,42).toISOString(),type:'Sale',customer:'Amina Njeri',cashier:'Kevin Otieno',amount:1850,status:'Completed'},
      {id:'TXN-100244',reference:'100244',date:new Date(now.getFullYear(),now.getMonth(),now.getDate(),10,37).toISOString(),type:'Sale',customer:'David Otieno',cashier:'Mary Wanjiru',amount:950,status:'Completed'},
      {id:'TXN-PO-042',reference:'PO-0042',date:new Date(now.getFullYear(),now.getMonth(),now.getDate(),10,32).toISOString(),type:'Purchase',customer:'MedSource Distributors',cashier:'Dr. James Mwangi',amount:45000,status:'Completed'},
      {id:'TXN-RET-014',reference:'RET-014',date:new Date(now.getFullYear(),now.getMonth(),now.getDate(),10,20).toISOString(),type:'Return',customer:'Grace Wanjiku',cashier:'Mary Wanjiru',amount:420,status:'Completed'}
    ];
    return {
      user:{id:'USR-001',name:'Dr. James Mwangi',email:'james@pharmapro.demo',phone:'+254 700 000 001',role:'Administrator'},
      products, customers, suppliers, users, sales, transactions,
      categories:['Antibiotics','Pain Relief','Vitamins','Allergy','Diabetes Care','Gastrointestinal','Rehydration','Respiratory','Antimalarials','Eye Care'],
      purchases:[
        {id:'PO-0042',reference:'PO-0042',supplier:'MedSource Distributors',date:todayISO(),expectedDate:todayISO(),items:5,total:45000,status:'Received',notes:'Routine replenishment'},
        {id:'PO-0043',reference:'PO-0043',supplier:'HealthPlus Wholesale',date:todayISO(),expectedDate:todayISO(),items:3,total:72500,status:'Pending',notes:'Monthly stock order'},
        {id:'PO-0044',reference:'PO-0044',supplier:'AfriMed Supplies',date:todayISO(),expectedDate:todayISO(),items:4,total:36500,status:'Approved',notes:'Urgent medicine restock'}
      ],
      returns:[{id:'RET-014',reference:'RET-014',saleReference:'100243',customer:'Grace Wanjiku',date:todayISO(),reason:'Damaged pack',amount:420,status:'Refunded'}],
      prescriptions:[
        {id:'RX-0018',reference:'RX-0018',patient:'Peter Kamau',prescriber:'Dr. A. Njoroge',date:todayISO(),medicine:'Metformin 500mg',status:'Verified'},
        {id:'RX-0019',reference:'RX-0019',patient:'Grace Wanjiku',prescriber:'Dr. M. Ali',date:todayISO(),medicine:'Amoxicillin 500mg',status:'Pending Review'}
      ],
      stockMovements:[
        {id:'MOV-001',date:new Date().toISOString(),medicine:'Paracetamol 500mg',type:'Purchase Receipt',quantity:200,reason:'Opening demo stock',reference:'PO-0042',user:'Dr. James Mwangi'},
        {id:'MOV-002',date:new Date().toISOString(),medicine:'Amoxicillin 500mg',type:'Stock Adjustment',quantity:-8,reason:'Damaged packs',reference:'ADJ-001',user:'Lucy Kamau'}
      ],
      notifications:[
        {id:'N-001',title:'Amoxicillin 500mg is low on stock',detail:'Only 12 packs remain. Reorder level is 20.',time:'Just now',read:false,type:'warning',page:'inventory'},
        {id:'N-002',title:'Paracetamol batch expiring soon',detail:'One batch expires within 30 days.',time:'18 minutes ago',read:false,type:'warning',page:'batches'},
        {id:'N-003',title:'New purchase order awaiting receipt',detail:'PO-0043 is ready for goods receiving.',time:'1 hour ago',read:false,type:'info',page:'purchasing'}
      ],
      auditLogs:[{id:'AUD-001',date:new Date().toISOString(),user:'Dr. James Mwangi',action:'Signed in to demo workspace',module:'Authentication',record:'USR-001'},{id:'AUD-002',date:new Date().toISOString(),user:'Lucy Kamau',action:'Recorded a stock adjustment',module:'Inventory',record:'ADJ-001'}],
      settings:{pharmacyName:'PharmaPro Pharmacy',phone:'+254 700 123 456',email:'info@pharmapro.demo',address:'Westlands, Nairobi, Kenya',currency:'KES',taxRate:0,lowStockThreshold:20,expiryAlertDays:30,receiptFooter:'Thank you for choosing PharmaPro. Get well soon!',dateFormat:'DD MMM YYYY',timeZone:'Africa/Nairobi',pharmacyOpen:true},
      customerBase:1244,
      inventoryValue:1245000,
      salesPeriod:'Last 30 Days',
      reportPeriod:'Last 30 Days',
      cart:[],
      posCategory:'All',
      demoMode:true
    };
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...seedData(), ...JSON.parse(saved) };
    } catch (error) { console.warn('Could not load PharmaPro local data; seeding demo data.', error); }
    const initial = seedData();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(initial)); } catch (error) { console.warn('Local storage is unavailable.', error); }
    return initial;
  }
  let state = loadState();
  let currentPage = 'dashboard';
  let tableState = { query:'', status:'all', page:1, pageSize:8, sort:'', desc:false };
  let settingsTab = 'pharmacy';
  let sidebarCollapsed = false;
  let expandedMore = false;
  let pendingConfirmResolver = null;

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (error) { toast('Storage is full or unavailable. Export your demo data before continuing.', 'error'); }
  }
  function addAudit(action, module, record = '—') {
    state.auditLogs.unshift({id:uid('AUD'),date:new Date().toISOString(),user:state.user?.name || 'Demo User',action,module,record});
    state.auditLogs = state.auditLogs.slice(0,250);
    persist();
  }
  function toast(message, type = 'success') {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `${icon(type==='error'?'warning':'check',17)}<span>${esc(message)}</span>`;
    $('#toast-root').append(el);
    window.setTimeout(() => el.remove(), 3300);
  }

  const navGroups = [
    {label:'Overview',items:[['dashboard','Dashboard','dashboard']]},
    {label:'Pharmacy Operations',items:[['pos','POS / Sales','cart'],['medicines','Medicines','pill'],['inventory','Inventory','package'],['purchasing','Purchasing','truck']]},
    {label:'Relationships',items:[['suppliers','Suppliers','truck'],['customers','Customers','users']]},
    {label:'Administration',items:[['reports','Reports','chart'],['users','Users & Roles','user'],['settings','Settings','settings'],['audit','Audit Logs','file'],['help','Help & Support','help']]}
  ];
  const moreItems = [
    ['categories','Medicine Categories','list'],['batches','Batches & Expiry','calendar'],['stock-adjustments','Stock Adjustments','refresh'],['purchase-orders','Purchase Orders','receipt'],['goods-received','Goods Received','package'],['prescriptions','Prescriptions','file'],['sales-history','Sales History','receipt'],['returns','Returns & Refunds','refresh']
  ];
  function renderSidebar() {
    $('#sidebar-nav').innerHTML = navGroups.map(group => `<div class="nav-section"><span class="nav-section-label">${group.label}</span>${group.items.map(([id,label,ico]) => navItem(id,label,ico)).join('')}</div>`).join('') +
      `<div class="nav-section"><button class="nav-subtoggle" type="button" data-action="toggle-more"><span>More modules</span>${icon(expandedMore?'chevron':'arrow',15)}</button><div class="nav-subitems ${expandedMore?'':'hidden'}">${moreItems.map(([id,label,ico])=>navItem(id,label,ico)).join('')}</div></div>`;
    $$('.nav-item', $('#sidebar-nav')).forEach(item => {
      if (item.dataset.page === currentPage) item.classList.add('active');
    });
  }
  function navItem(id,label,ico) { return `<button type="button" class="nav-item ${currentPage===id?'active':''}" data-page="${id}" title="${label}">${icon(ico,20)}<span>${label}</span></button>`; }
  function navigate(page) {
    currentPage = page;
    tableState = {query:'',status:'all',page:1,pageSize:8,sort:'',desc:false};
    renderSidebar();
    renderCurrentPage();
    closeDropdowns();
    closeMobileSidebar();
    $('#main-content').focus({preventScroll:true});
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function renderCurrentPage() {
    const main = $('#main-content');
    if (currentPage === 'dashboard') main.innerHTML = renderDashboard();
    else if (currentPage === 'pos') main.innerHTML = renderPOS();
    else if (currentPage === 'reports') main.innerHTML = renderReports();
    else if (currentPage === 'settings') main.innerHTML = renderSettings();
    else if (currentPage === 'help') main.innerHTML = renderHelp();
    else if (currentPage === 'stock-adjustments') main.innerHTML = renderEntityPage('stock-adjustments');
    else if (currentPage === 'goods-received') main.innerHTML = renderEntityPage('goods-received');
    else if (currentPage === 'purchase-orders') main.innerHTML = renderEntityPage('purchase-orders');
    else if (currentPage === 'sales-history') main.innerHTML = renderEntityPage('sales-history');
    else main.innerHTML = renderEntityPage(currentPage);
    if (currentPage === 'pos') { renderCart(); renderPOSProducts($('#pos-search')?.value||''); }
    else if (entityConfigs[currentPage]) updateEntityTable();
  }

  function sparkline(color) {
    return `<svg class="sparkline" viewBox="0 0 105 45" aria-hidden="true"><path d="M2 38 C10 33 12 22 18 27 S29 41 36 31 S46 7 52 20 S64 36 70 23 S78 12 83 19 S92 31 103 9"/></svg>`;
  }
  function inventoryStats() {
    const inStock = state.products.filter(p=>Number(p.stock)>Number(p.minStock)).length;
    const low = state.products.filter(p=>Number(p.stock)>0 && Number(p.stock)<=Number(p.minStock)).length;
    const out = state.products.filter(p=>Number(p.stock)<=0).length;
    const total = Math.max(1,state.products.length);
    const inPct=Math.floor(inStock/total*100);
    const lowPct=Math.round(low/total*100);
    return {inStock,low,out,inPct,lowPct,outPct:Math.max(0,100-inPct-lowPct)};
  }
  function getSalesTotal() { return state.sales.reduce((sum,s)=>sum+Number(s.amount||0),0); }
  function salesChartSvg(period='Last 30 Days') {
    const baseBars = [20,32,29,21,34,30,27,36,39,42,37,44,46,52,56,49,43,35,29,41,47,51,34,40,49];
    const baseLine = [27,34,41,41,36,33,41,40,39,38,45,49,45,50,56,62,58,55,53,50,42,46,51,42,43,55];
    const factor = period==='Last 7 Days'?1.12:period==='This Month'?1.05:period==='Last Month'?.88:1;
    const bars = baseBars.map(v=>Math.min(76,Math.round(v*factor)));
    const line = baseLine.map(v=>Math.min(76,Math.round(v*(factor*.98))));
    const W=580,H=230,left=45,right=9,top=13,bottom=28,chartW=W-left-right,chartH=H-top-bottom,max=80;
    const step=chartW/bars.length, barW=step*.60;
    const grid=[0,20,40,60,80].map(v=>{const y=top+chartH-(v/max)*chartH;return `<line x1="${left}" y1="${y}" x2="${W-right}" y2="${y}" stroke="#e7edf6" stroke-width="1"/><text x="${left-11}" y="${y+4}" text-anchor="end" fill="#17294d" font-size="11">${v===0?'0':v+'K'}</text>`}).join('');
    const vertical=[0,6,12,18,24].map(i=>{const x=left+i*step;return `<line x1="${x}" y1="${top}" x2="${x}" y2="${top+chartH}" stroke="#eef2f8" stroke-width="1"/>`}).join('');
    const rects=bars.map((v,i)=>{const h=v/max*chartH,x=left+i*step+(step-barW)/2,y=top+chartH-h;return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="#2f80ed"/>`}).join('');
    const points=line.map((v,i)=>`${(left+i*step+step/2).toFixed(1)},${(top+chartH-(v/max)*chartH).toFixed(1)}`).join(' ');
    const dots=line.map((v,i)=>{const x=left+i*step+step/2,y=top+chartH-(v/max)*chartH;return `<circle cx="${x}" cy="${y}" r="2.5" fill="#10b981"/>`}).join('');
    const labelSet=period==='Last 7 Days'?[['Mon',0],['Tue',6],['Wed',12],['Thu',18],['Today',24]]:period==='This Month'?[['Nov 1',0],['Nov 7',6],['Nov 14',13],['Nov 21',20],['Today',24]]:period==='Last Month'?[['Oct 1',0],['Oct 7',6],['Oct 14',13],['Oct 21',20],['Oct 31',24]]:[['Apr 1',0],['Apr 7',6],['Apr 14',13],['Apr 21',20],['Apr 24',24]];
    const labels=labelSet.map(([t,i])=>`<text x="${left+i*step+step/2}" y="${H-3}" text-anchor="middle" fill="#152849" font-size="11" font-weight="600">${t}</text>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sales and transaction trend chart">${grid}${vertical}${rects}<polyline points="${points}" fill="none" stroke="#10b981" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>${dots}${labels}</svg>`;
  }
  function renderDashboard() {
    const inv=inventoryStats();
    const recent=state.transactions.slice(0,4);
    const activeCustomers=state.customerBase+state.customers.filter(c=>c.status==='Active').length;
    const totalSales=getSalesTotal();
    const stockAlerts=state.products.filter(p=>p.stock<=p.minStock).slice(0,3);
    const alertRows=stockAlerts.length?stockAlerts.map((p,i)=>`<div class="alert-row"><span class="alert-symbol" style="color:${p.stock===0?'#245fc5':i===0?'#d92b42':'#f59e0b'}">${icon(p.stock===0?'info':'warning',22)}</span><div class="alert-copy"><strong>${esc(p.name)}</strong><small>${p.stock===0?'Currently out of stock':`Only ${number(p.stock)} ${esc(p.unit)} left`}</small></div><span class="alert-badge ${p.stock===0?'blue':i===0?'red':'orange'}">${p.stock===0?'Out of Stock':'Low Stock'}</span></div>`).join('') : `<div class="empty-state">${icon('check',28)}<strong>No stock alerts</strong><p>Inventory levels look healthy.</p></div>`;
    return `<div class="content-page dashboard-page">
      <section class="welcome-row"><div class="welcome-title"><h1>Welcome back, ${esc(state.user.name)}!</h1><p>Here's what's happening with your pharmacy today.</p></div><div class="welcome-meta"><div class="datetime-pill"><span>${icon('calendar',16)}<b id="current-date">${new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'2-digit',year:'numeric'})}</b></span><span>${icon('clock',16)}<b id="current-time">${new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</b></span></div><div class="pharmacy-status"><i class="status-pulse"></i><span>${state.settings.pharmacyOpen?'Pharmacy Open':'Pharmacy Closed'}</span></div></div></section>
      <section class="stat-grid">
        <article class="stat-card blue"><div class="stat-icon">${icon('cart',40)}</div><div class="stat-copy"><label>Total Sales Today</label><strong>${money(totalSales)}</strong><small>↑ 12.5%</small></div>${sparkline()}</article>
        <article class="stat-card green"><div class="stat-icon">${icon('package',40)}</div><div class="stat-copy"><label>Total Transactions</label><strong>${number(state.sales.length)}</strong><small>↑ 8.3%</small></div>${sparkline()}</article>
        <article class="stat-card purple"><div class="stat-icon">${icon('box',40)}</div><div class="stat-copy"><label>Current Stock Value</label><strong>${money(state.inventoryValue)}</strong><small>↑ 5.1%</small></div>${sparkline()}</article>
        <article class="stat-card orange"><div class="stat-icon">${icon('users',40)}</div><div class="stat-copy"><label>Active Customers</label><strong>${number(activeCustomers)}</strong><small>↑ 6.7%</small></div>${sparkline()}</article>
      </section>
      <section class="dashboard-grid-top">
        <article class="panel sales-panel"><div class="panel-heading"><h2 class="panel-title">${icon('chart',23)}Sales Overview</h2><select class="period-select" id="dashboard-period" aria-label="Sales chart period"><option ${state.salesPeriod==='Last 30 Days'?'selected':''}>Last 30 Days</option><option ${state.salesPeriod==='Last 7 Days'?'selected':''}>Last 7 Days</option><option ${state.salesPeriod==='This Month'?'selected':''}>This Month</option><option ${state.salesPeriod==='Last Month'?'selected':''}>Last Month</option></select></div><div class="sales-legend"><span class="legend-key"><i class="legend-square"></i>Sales</span><span class="legend-key"><i class="legend-line"></i>Transactions</span></div><div class="sales-chart">${salesChartSvg()}</div></article>
        <article class="panel inventory-panel"><div class="panel-heading"><h2 class="panel-title">${icon('box',23)}Inventory Status</h2><button class="panel-link" type="button" data-page="inventory">View Details ${icon('arrow',14)}</button></div><div class="inventory-content"><div class="donut-wrap"><div class="donut" style="background:conic-gradient(#0dbb78 0 ${inv.inPct}%,#ff9d0a ${inv.inPct}% ${inv.inPct+inv.lowPct}%,#c91f3b ${inv.inPct+inv.lowPct}% 100%)"></div><div class="donut-label"><strong>${inv.inPct}%</strong><span>In Stock</span></div></div><div class="inventory-legend"><div><i class="legend-dot" style="background:#10b981"></i><span>In Stock</span><b>${inv.inPct}%</b></div><div><i class="legend-dot" style="background:#ff9d0a"></i><span>Low Stock</span><b>${inv.lowPct}%</b></div><div><i class="legend-dot" style="background:#c91f3b"></i><span>Out of Stock</span><b>${inv.outPct}%</b></div></div></div></article>
        <article class="panel quick-panel"><div class="panel-heading"><h2 class="panel-title">${icon('bolt',23)}Quick Actions</h2></div><div class="quick-actions"><button class="quick-action blue" data-action="new-sale">${icon('cart',27)}<span>New Sale<br/>(POS)</span></button><button class="quick-action green" data-action="add-medicine">${icon('pill',27)}<span>Add Medicine</span></button><button class="quick-action purple" data-action="purchase-stock">${icon('truck',27)}<span>Purchase Stock</span></button><button class="quick-action orange" data-page="reports">${icon('chart',27)}<span>View Reports</span></button><button class="quick-action cyan" data-page="users">${icon('users',27)}<span>Manage Users</span></button><button class="quick-action gray" data-page="settings">${icon('settings',27)}<span>Settings</span></button></div></article>
      </section>
      <section class="dashboard-grid-bottom">
        <article class="panel recent-panel"><div class="panel-heading"><h2 class="panel-title">${icon('list',23)}Recent Transactions</h2><button class="panel-link" type="button" data-page="sales-history">View All ${icon('arrow',14)}</button></div><div class="recent-table-wrap"><table class="recent-table"><thead><tr><th>#</th><th>Date & Time</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>${recent.map(t=>`<tr><td>${esc(t.reference)}</td><td>${new Date(t.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}, ${new Date(t.date).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</td><td><span class="type-pill ${t.type.toLowerCase()}">${esc(t.type)}</span></td><td>${money(t.amount)}</td><td><span class="status-pill">${esc(t.status)}</span></td></tr>`).join('')}</tbody></table></div></article>
        <article class="panel alerts-panel"><div class="panel-heading"><h2 class="panel-title">${icon('bell',23)}Stock Alerts</h2><button class="panel-link" type="button" data-page="inventory">View All ${icon('arrow',14)}</button></div><div class="alerts-list">${alertRows}</div></article>
        <article class="promo-card"><h3>Healthy Community,<br/>Our Priority</h3><p>Efficient. Reliable. Professional.</p><button type="button" data-page="help">Learn More ${icon('arrow',13)}</button></article>
      </section>
      <div class="demo-note">Demo workspace · Information is stored in this browser only. <button type="button" data-action="reset-demo">Reset demo data</button></div>
    </div>`;
  }

  const field = (name,label,type='text',opts={}) => ({name,label,type,...opts});
  const entityConfigs = {
    medicines:{title:'Medicine Management',subtitle:'Manage your medicine catalogue, pricing, batch details and prescription classification.',collection:'products',search:['name','generic','sku','barcode','category'],addLabel:'Add Medicine',add:true,columns:[['Medicine',r=>`<div class="table-primary">${esc(r.name)}</div><div class="table-secondary">${esc(r.generic||'')} · ${esc(r.strength||'')}</div>`],['SKU',r=>esc(r.sku)],['Category',r=>esc(r.category)],['Available Stock',r=>`${number(r.stock)} ${esc(r.unit)}`],['Selling Price',r=>money(r.sellingPrice)],['Expiry Date',r=>dateText(r.expiry)],['Status',r=>badge(r.stock===0?'Out of Stock':r.stock<=r.minStock?'Low Stock':r.status)]],fields:[field('name','Medicine Name','text',{required:true}),field('generic','Generic Name','text',{required:true}),field('brand','Brand','text'),field('category','Category','select',{options:()=>state.categories,required:true}),field('strength','Strength'),field('form','Dosage Form'),field('barcode','Barcode'),field('sku','SKU'),field('batch','Batch Number'),field('expiry','Expiry Date','date'),field('unit','Stock Unit','text',{placeholder:'packs'}),field('stock','Opening Stock','number',{min:0,required:true}),field('minStock','Reorder Level','number',{min:0,required:true}),field('purchasePrice','Purchase Price (KES)','number',{min:0,required:true}),field('sellingPrice','Selling Price (KES)','number',{min:0,required:true}),field('status','Status','select',{options:['Active','Inactive']})]},
    inventory:{title:'Inventory Overview',subtitle:'Monitor medicine quantities, reorder levels, batch availability and stock valuation.',collection:'products',search:['name','sku','barcode','batch'],add:false,columns:[['Medicine',r=>`<div class="table-primary">${esc(r.name)}</div><div class="table-secondary">${esc(r.sku)} · ${esc(r.batch||'No batch')}</div>`],['Category',r=>esc(r.category)],['On Hand',r=>`${number(r.stock)} ${esc(r.unit)}`],['Reorder Level',r=>number(r.minStock)],['Stock Status',r=>badge(r.stock===0?'Out of Stock':r.stock<=r.minStock?'Low Stock':'In Stock')],['Expiry',r=>dateText(r.expiry)],['Stock Value',r=>money(r.stock*r.purchasePrice)]],fields:[]},
    suppliers:{title:'Supplier Management',subtitle:'Maintain supplier contacts, balances and purchasing relationships.',collection:'suppliers',search:['name','contact','phone','email','location'],addLabel:'Add Supplier',add:true,columns:[['Supplier',r=>`<div class="table-primary">${esc(r.name)}</div><div class="table-secondary">${esc(r.email)}</div>`],['Contact Person',r=>esc(r.contact)],['Phone',r=>esc(r.phone)],['Location',r=>esc(r.location)],['Outstanding',r=>money(r.balance)],['Status',r=>badge(r.status)]],fields:[field('name','Supplier Name','text',{required:true}),field('contact','Contact Person'),field('phone','Phone Number','tel',{required:true}),field('email','Email Address','email'),field('location','Location'),field('balance','Outstanding Balance (KES)','number',{min:0}),field('status','Status','select',{options:['Active','Inactive']})]},
    customers:{title:'Customer Management',subtitle:'Manage customer profiles, contact details and account balances.',collection:'customers',search:['name','phone','email','type'],addLabel:'Add Customer',add:true,columns:[['Customer',r=>`<div class="table-primary">${esc(r.name)}</div><div class="table-secondary">${esc(r.id)}</div>`],['Phone',r=>esc(r.phone)],['Email',r=>esc(r.email)],['Customer Type',r=>esc(r.type)],['Outstanding',r=>money(r.balance)],['Status',r=>badge(r.status)]],fields:[field('name','Customer Name','text',{required:true}),field('phone','Phone Number','tel',{required:true}),field('email','Email Address','email'),field('type','Customer Type','select',{options:['Walk-in','Regular','Corporate']}),field('balance','Outstanding Balance (KES)','number',{min:0}),field('status','Status','select',{options:['Active','Inactive']})]},
    users:{title:'Users & Roles',subtitle:'Manage staff accounts and assign operational roles. Demo permissions are illustrative only.',collection:'users',search:['name','email','phone','role'],addLabel:'Add User',add:true,columns:[['User',r=>`<div class="table-primary">${esc(r.name)}</div><div class="table-secondary">${esc(r.email)}</div>`],['Phone',r=>esc(r.phone)],['Role',r=>badge(r.role,'info')],['Status',r=>badge(r.status)]],fields:[field('name','Full Name','text',{required:true}),field('email','Email Address','email',{required:true}),field('phone','Phone Number','tel'),field('role','Role','select',{options:['Administrator','Pharmacist','Cashier','Inventory Manager','Procurement Officer','Accountant','Auditor']}),field('status','Status','select',{options:['Active','Inactive']})]},
    purchasing:{title:'Purchasing & Procurement',subtitle:'Create purchase orders, track supplier deliveries and receive stock into inventory.',collection:'purchases',search:['reference','supplier','status'],addLabel:'Create Purchase Order',add:true,columns:[['Order Reference',r=>`<div class="table-primary">${esc(r.reference)}</div><div class="table-secondary">${dateText(r.date)}</div>`],['Supplier',r=>esc(r.supplier)],['Items',r=>number(r.items)],['Order Value',r=>money(r.total)],['Expected Delivery',r=>dateText(r.expectedDate)],['Status',r=>badge(r.status)]],fields:[field('supplier','Supplier','select',{options:()=>state.suppliers.map(s=>({value:s.name,label:s.name})),required:true}),field('medicine','Medicine','select',{options:()=>state.products.map(p=>({value:p.id,label:p.name})),required:true}),field('quantity','Quantity to Order','number',{required:true,min:1}),field('unitCost','Unit Cost (KES)','number',{required:true,min:0}),field('expectedDate','Expected Delivery','date'),field('notes','Order Notes','textarea')]},
    'purchase-orders':{title:'Purchase Orders',subtitle:'Review open, approved and completed purchase orders.',collection:'purchases',search:['reference','supplier','status'],addLabel:'New Purchase Order',add:true,columns:[['PO Reference',r=>`<span class="table-primary">${esc(r.reference)}</span>`],['Supplier',r=>esc(r.supplier)],['Order Date',r=>dateText(r.date)],['Items',r=>number(r.items)],['Total',r=>money(r.total)],['Status',r=>badge(r.status)]],fields:[]},
    'sales-history':{title:'Sales History',subtitle:'Review completed POS sales and open individual transaction receipts.',collection:'sales',search:['reference','customer','cashier','paymentMethod'],add:false,columns:[['Sale Reference',r=>`<span class="table-primary">${esc(r.reference)}</span>`],['Date & Time',r=>dateTimeText(r.date)],['Customer',r=>esc(r.customer)],['Cashier',r=>esc(r.cashier)],['Items',r=>number(r.items)],['Amount',r=>money(r.amount)],['Payment',r=>esc(r.paymentMethod)],['Status',r=>badge(r.status)]],fields:[]},
    returns:{title:'Returns & Refunds',subtitle:'Track returned items and refund decisions against original sale references.',collection:'returns',search:['reference','saleReference','customer','reason'],addLabel:'Record Return',add:true,columns:[['Return Ref',r=>`<span class="table-primary">${esc(r.reference)}</span>`],['Original Sale',r=>esc(r.saleReference)],['Customer',r=>esc(r.customer)],['Date',r=>dateText(r.date)],['Reason',r=>esc(r.reason)],['Refund Amount',r=>money(r.amount)],['Status',r=>badge(r.status)]],fields:[field('saleReference','Original Sale Reference','text',{required:true}),field('customer','Customer','text',{required:true}),field('medicine','Medicine','select',{options:()=>state.products.map(p=>({value:p.id,label:p.name})),required:true}),field('quantity','Quantity Returned','number',{required:true,min:1}),field('reason','Reason for Return','select',{options:['Damaged item','Wrong item supplied','Product quality concern','Other']}),field('amount','Refund Amount (KES)','number',{required:true,min:0})]},
    prescriptions:{title:'Prescription Register',subtitle:'Track prescription verification and dispensing review. This demo does not validate prescriptions.',collection:'prescriptions',search:['reference','patient','prescriber','medicine','status'],addLabel:'Register Prescription',add:true,columns:[['Prescription',r=>`<span class="table-primary">${esc(r.reference)}</span>`],['Patient',r=>esc(r.patient)],['Prescriber',r=>esc(r.prescriber)],['Medicine',r=>esc(r.medicine)],['Date',r=>dateText(r.date)],['Status',r=>badge(r.status)]],fields:[field('patient','Patient Name','text',{required:true}),field('prescriber','Prescriber','text',{required:true}),field('date','Prescription Date','date',{required:true}),field('medicine','Medicine','select',{options:()=>state.products.map(p=>({value:p.name,label:p.name})),required:true}),field('status','Review Status','select',{options:['Pending Review','Verified','Rejected']})]},
    categories:{title:'Medicine Categories',subtitle:'Organise the medicine catalogue into clear therapeutic and product groups.',collection:'categories',search:['name'],addLabel:'Add Category',add:true,columns:[['Category Name',r=>`<span class="table-primary">${esc(r.name)}</span>`],['Medicines',r=>number(state.products.filter(p=>p.category===r.name).length)],['Created From',r=>esc(r.source||'Demo catalogue')],['Status',r=>badge('Active')]],fields:[field('name','Category Name','text',{required:true})]},
    batches:{title:'Batches & Expiry Tracking',subtitle:'Review batch numbers, remaining quantities and medicine expiry dates.',collection:'products',search:['name','batch','sku'],add:false,columns:[['Medicine',r=>`<span class="table-primary">${esc(r.name)}</span>`],['Batch Number',r=>esc(r.batch||'—')],['Expiry Date',r=>dateText(r.expiry)],['Quantity',r=>`${number(r.stock)} ${esc(r.unit)}`],['Supplier / Source',r=>esc(r.brand||'—')],['Batch Status',r=>badge(r.stock<=0?'Out of Stock':new Date(`${r.expiry}T00:00:00`)<new Date()?'Expired':'Available')]],fields:[]},
    'stock-adjustments':{title:'Stock Adjustments',subtitle:'Review traceable inventory adjustments and the reasons recorded by staff.',collection:'stockMovements',search:['medicine','type','reason','reference','user'],add:false,columns:[['Movement Ref',r=>`<span class="table-primary">${esc(r.id)}</span>`],['Date',r=>dateTimeText(r.date)],['Medicine',r=>esc(r.medicine)],['Movement Type',r=>esc(r.type)],['Quantity',r=>`${Number(r.quantity)>0?'+':''}${number(r.quantity)}`],['Reason',r=>esc(r.reason)],['Recorded By',r=>esc(r.user)]],fields:[]},
    'goods-received':{title:'Goods Received',subtitle:'Review purchase receipts and stock movement records created by receiving operations.',collection:'stockMovements',search:['medicine','type','reference','reason'],add:false,columns:[['Receipt / Movement',r=>`<span class="table-primary">${esc(r.id)}</span>`],['Date',r=>dateTimeText(r.date)],['Medicine',r=>esc(r.medicine)],['Quantity Received',r=>number(r.quantity)],['Purchase Reference',r=>esc(r.reference)],['Recorded By',r=>esc(r.user)]],fields:[]},
    audit:{title:'Audit Logs',subtitle:'A local demonstration trail of important actions performed in this browser.',collection:'auditLogs',search:['user','action','module','record'],add:false,columns:[['Timestamp',r=>dateTimeText(r.date)],['User',r=>esc(r.user)],['Action',r=>esc(r.action)],['Module',r=>badge(r.module,'info')],['Record',r=>esc(r.record)]],fields:[]}
  };
  function badge(value,kind) {
    let cls=kind || (/active|completed|received|verified|refunded|available|in stock/i.test(value)?'success':/low|pending|approved|review|warning/i.test(value)?'warning':/out of stock|expired|rejected|inactive|failed/i.test(value)?'danger':/administrator|pharmacist|cashier|inventory|procurement|accountant|auditor/i.test(value)?'info':'neutral');
    return `<span class="badge ${cls}">${esc(value)}</span>`;
  }
  function getEntityRecords(page) {
    const config=entityConfigs[page]; if(!config) return [];
    const records=state[config.collection] || [];
    if(page==='categories') return records.map((name,i)=>typeof name==='string'?{id:`CAT-${i+1}`,name,source:'Demo catalogue'}:name);
    if(page==='batches') return records;
    if(page==='goods-received') return records.filter(r=>/purchase receipt|goods received/i.test(r.type));
    if(page==='stock-adjustments') return records.filter(r=>!/purchase receipt|goods received/i.test(r.type));
    return records;
  }
  function entityStats(page, records) {
    if(page==='medicines') return [['Total Medicines',records.length,'pill'],['In Stock',records.filter(r=>r.stock>r.minStock).length,'package'],['Low Stock',records.filter(r=>r.stock>0&&r.stock<=r.minStock).length,'warning'],['Out of Stock',records.filter(r=>r.stock<=0).length,'box']];
    if(page==='inventory') return [['Inventory Items',records.length,'package'],['In Stock',records.filter(r=>r.stock>r.minStock).length,'check'],['Needs Reorder',records.filter(r=>r.stock<=r.minStock&&r.stock>0).length,'warning'],['Inventory Value',money(state.inventoryValue),'wallet']];
    if(page==='suppliers') return [['Suppliers',records.length,'truck'],['Active Suppliers',records.filter(r=>r.status==='Active').length,'check'],['Supplier Balances',money(records.reduce((s,r)=>s+Number(r.balance||0),0)),'wallet'],['Purchase Orders',state.purchases.length,'receipt']];
    if(page==='customers') return [['Customer Profiles',state.customerBase+records.length,'users'],['Visible Demo Records',records.length,'user'],['Outstanding Balance',money(records.reduce((s,r)=>s+Number(r.balance||0),0)),'wallet'],['Corporate Accounts',records.filter(r=>r.type==='Corporate').length,'file']];
    if(page==='purchasing'||page==='purchase-orders') return [['Purchase Orders',records.length,'receipt'],['Pending',records.filter(r=>r.status==='Pending').length,'clock'],['Approved',records.filter(r=>r.status==='Approved').length,'check'],['Order Value',money(records.reduce((s,r)=>s+Number(r.total||0),0)),'wallet']];
    if(page==='sales-history') return [['Sales Count',records.length,'cart'],['Sales Value',money(records.reduce((s,r)=>s+Number(r.amount||0),0)),'wallet'],['Completed',records.filter(r=>r.status==='Completed').length,'check'],['Payments',new Set(records.map(r=>r.paymentMethod)).size,'file']];
    return [];
  }
  function renderEntityPage(page) {
    const config=entityConfigs[page];
    if(!config) return renderNotFound(page);
    const records=getEntityRecords(page);
    const stats=entityStats(page,records);
    const title=config.title;
    const addButton=config.add ? `<button class="btn btn-primary" type="button" data-action="add-record">${icon('plus',16)}${esc(config.addLabel||'Add New')}</button>` : '';
    return `<div class="content-page"><div class="page-header"><div><h1>${esc(title)}</h1><p>${esc(config.subtitle)}</p></div><div class="page-actions">${page==='inventory'?`<button class="btn btn-secondary" data-action="export-current">${icon('download',15)}Export</button>`:''}${addButton}</div></div>
      ${stats.length?`<div class="content-stats">${stats.map(([label,val,ico])=>`<article class="mini-stat"><div class="mini-stat-icon">${icon(ico,20)}</div><div><small>${esc(label)}</small><strong>${esc(val)}</strong></div></article>`).join('')}</div>`:''}
      <section class="table-panel"><div class="table-toolbar"><div class="table-toolbar-left"><input class="table-search" id="table-search" type="search" placeholder="Search ${esc(title.toLowerCase())}..." value="${esc(tableState.query)}"/><select id="table-status-filter" class="filter-select" aria-label="Filter by status"><option value="all">All statuses</option>${['In Stock','Low Stock','Out of Stock','Active','Inactive','Completed','Pending','Approved','Received','Verified','Pending Review','Refunded'].map(s=>`<option value="${s}" ${tableState.status===s?'selected':''}>${s}</option>`).join('')}</select>${['medicines','inventory','batches'].includes(page)?`<select id="table-category-filter" class="filter-select" aria-label="Filter by category"><option value="all">All categories</option>${state.categories.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('')}</select>`:''}</div><div class="table-toolbar-right"><span class="field-help">${records.length} records in this demo</span></div></div>
      <div class="data-table-wrap"><table class="data-table"><thead><tr>${config.columns.map(([label],i)=>`<th><button type="button" class="sort-heading" data-sort-column="${i}">${esc(label)} ${tableState.sort===sortFieldFor(currentPage,i)?(tableState.desc?'↓':'↑'):'↕'}</button></th>`).join('')}<th>Actions</th></tr></thead><tbody id="data-table-body"></tbody></table><div id="table-empty" class="empty-state hidden">${icon('file',30)}<strong>No matching records</strong><p>Try changing the search or filter, or add a new record.</p></div></div><div class="pagination" id="table-pagination"></div></section></div>`;
  }
  function renderNotFound(page) { return `<div class="content-page"><div class="page-header"><div><h1>Page not found</h1><p>The requested module “${esc(page)}” is not available in this demo.</p></div><button class="btn btn-primary" data-page="dashboard">${icon('dashboard',15)}Back to Dashboard</button></div></div>`; }
  function rowActions(page, record) {
    const buttons=[];
    buttons.push(`<button class="btn-icon" title="View details" data-row-action="view" data-id="${esc(record.id)}">${icon('eye',15)}</button>`);
    if(page==='inventory') buttons.push(`<button class="btn-icon" title="Adjust stock" data-row-action="adjust" data-id="${esc(record.id)}">${icon('refresh',15)}</button>`);
    if(page==='purchasing'||page==='purchase-orders') { if(record.status!=='Received') buttons.push(`<button class="btn-icon" title="Receive goods" data-row-action="receive" data-id="${esc(record.id)}">${icon('package',15)}</button>`); }
    if(['medicines','suppliers','customers','users','categories','purchasing','purchase-orders','prescriptions'].includes(page)) buttons.push(`<button class="btn-icon" title="Edit" data-row-action="edit" data-id="${esc(record.id)}">${icon('edit',15)}</button>`);
    if(['medicines','suppliers','customers','users'].includes(page)) buttons.push(`<button class="btn-icon" title="Archive" data-row-action="archive" data-id="${esc(record.id)}">${icon('trash',15)}</button>`);
    return `<div class="table-actions">${buttons.join('')}</div>`;
  }
  function sortFieldFor(page,index) {
    const fields={medicines:['name','sku','category','stock','sellingPrice','expiry','status'],inventory:['name','category','stock','minStock','stock','expiry','stock'],suppliers:['name','contact','phone','location','balance','status'],customers:['name','phone','email','type','balance','status'],users:['name','phone','role','status'],purchasing:['reference','supplier','items','total','expectedDate','status'],'purchase-orders':['reference','supplier','date','items','total','status'],'sales-history':['reference','date','customer','cashier','items','amount','paymentMethod','status'],returns:['reference','saleReference','customer','date','reason','amount','status'],prescriptions:['reference','patient','prescriber','medicine','date','status'],categories:['name','name','name','name'],batches:['name','batch','expiry','stock','brand','stock'],'stock-adjustments':['id','date','medicine','type','quantity','reason','user'],'goods-received':['id','date','medicine','quantity','reference','user'],audit:['date','user','action','module','record']};
    return fields[page]?.[index]||'id';
  }
  function updateEntityTable() {
    const config=entityConfigs[currentPage]; if(!config) return;
    const records=getEntityRecords(currentPage);
    const query=($('#table-search')?.value||'').trim().toLowerCase();
    const status=$('#table-status-filter')?.value || 'all';
    const category=$('#table-category-filter')?.value || 'all';
    let filtered=records.filter(r=>{
      const hay=config.search.map(k=>r[k]??'').join(' ').toLowerCase();
      let statusMatch=true;
      if(status!=='all') {
        if(currentPage==='inventory'||currentPage==='medicines'||currentPage==='batches') {
          const derived=r.stock===0?'Out of Stock':r.stock<=r.minStock?'Low Stock':'In Stock';
          statusMatch=derived===status || (status==='Active'&&r.status==='Active') || (status==='Inactive'&&r.status==='Inactive');
        } else statusMatch=String(r.status||'')===status;
      }
      const categoryMatch=category==='all'||r.category===category;
      return (!query||hay.includes(query))&&statusMatch&&categoryMatch;
    });
    if(tableState.sort) filtered.sort((a,b)=>{const av=a[tableState.sort]??'',bv=b[tableState.sort]??'';const an=Number(av),bn=Number(bv);const cmp=av!==''&&bv!==''&&Number.isFinite(an)&&Number.isFinite(bn)?an-bn:String(av).localeCompare(String(bv),undefined,{numeric:true});return cmp*(tableState.desc?-1:1);});
    const pages=Math.max(1,Math.ceil(filtered.length/tableState.pageSize));
    tableState.page=Math.min(tableState.page,pages);
    const start=(tableState.page-1)*tableState.pageSize;
    const visible=filtered.slice(start,start+tableState.pageSize);
    const tbody=$('#data-table-body');
    tbody.innerHTML=visible.map(record=>`<tr>${config.columns.map(([,render])=>`<td>${render(record)}</td>`).join('')}<td>${rowActions(currentPage,record)}</td></tr>`).join('');
    $('#table-empty')?.classList.toggle('hidden',visible.length>0);
    $('#table-pagination').innerHTML=`<span>Showing ${filtered.length?start+1:0}–${Math.min(start+tableState.pageSize,filtered.length)} of ${filtered.length} records</span><div class="pagination-controls"><button type="button" data-table-page="prev" ${tableState.page<=1?'disabled':''}>‹</button>${Array.from({length:pages},(_,i)=>i+1).slice(Math.max(0,tableState.page-3),Math.min(pages,tableState.page+2)).map(p=>`<button type="button" data-table-page="${p}" class="${p===tableState.page?'active':''}">${p}</button>`).join('')}<button type="button" data-table-page="next" ${tableState.page>=pages?'disabled':''}>›</button></div>`;
  }

  function formFieldHtml(f, value) {
    const type=typeof f.type==='string'?f.type:'text';
    const required=f.required?'required':'';
    const valueText=value===undefined||value===null?'':String(value);
    const options=typeof f.options==='function'?f.options():(f.options||[]);
    let control='';
    if(type==='select') {
      control=`<select class="field-input" name="${esc(f.name)}" ${required}>${options.map(opt=>{const v=typeof opt==='string'?opt:opt.value;const label=typeof opt==='string'?opt:opt.label;return `<option value="${esc(v)}" ${String(v)===valueText?'selected':''}>${esc(label)}</option>`}).join('')}</select>`;
    } else if(type==='textarea') {
      control=`<textarea class="field-textarea" name="${esc(f.name)}" ${required} placeholder="${esc(f.placeholder||'')}">${esc(valueText)}</textarea>`;
    } else {
      control=`<input class="field-input" name="${esc(f.name)}" type="${esc(type)}" value="${esc(valueText)}" ${required} ${f.min!==undefined?`min="${f.min}"`:''} ${f.step!==undefined?`step="${f.step}"`:type==='number'?'step="any"':''} placeholder="${esc(f.placeholder||'')}">`;
    }
    return `<div class="form-field ${f.full?'full':''}"><label>${esc(f.label)}${f.required?' <em>*</em>':''}</label>${control}${f.help?`<small class="field-help">${esc(f.help)}</small>`:''}</div>`;
  }
  function openEntityForm(page,id=null) {
    const config=entityConfigs[page==='purchase-orders'?'purchasing':page]; if(!config) return;
    const collection=config.collection;
    const record=id?(state[collection]||[]).find(r=>r.id===id):null;
    const fields=config.fields||[];
    if(!fields.length) { toast('This record type is read-only in the demo.', 'error'); return; }
    let initial=record?clone(record):{};
    if(page==='categories'&&id) initial={name:findRecord(page,id)?.name||''};
    const title=id?`Edit ${page==='medicines'?'Medicine':config.title.replace(' Management','').replace(' & Procurement','')}`:`${config.addLabel||'Add Record'}`;
    const modalBody=`<form id="dialog-form" data-form-kind="entity" data-entity-page="${esc(page)}" data-record-id="${esc(id||'')}"><div class="form-grid">${fields.map(f=>formFieldHtml(f,initial[f.name])).join('')}</div></form>`;
    openModal(title,id?'Update the fields below and save your changes.':'Enter the information below. Required fields are marked.',modalBody,`<button type="button" class="btn btn-secondary" data-modal-close>Cancel</button><button type="submit" form="dialog-form" class="btn btn-primary">${icon('check',15)}Save Record</button>`,'');
  }
  function openModal(title,description,body,footer='',size='') {
    $('#modal-root').innerHTML=`<div class="modal-backdrop" data-backdrop><section class="modal ${size}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><header class="modal-header"><div><h2>${esc(title)}</h2>${description?`<p>${esc(description)}</p>`:''}</div><button type="button" class="modal-close" data-modal-close aria-label="Close">${icon('close',16)}</button></header><div class="modal-body">${body}</div>${footer?`<footer class="modal-footer">${footer}</footer>`:''}</section></div>`;
    const first=$('input,select,textarea,button', $('.modal', $('#modal-root')));
    if(first) window.setTimeout(()=>first.focus(),30);
  }
  function closeModal() {
    if(pendingConfirmResolver){const resolve=pendingConfirmResolver;pendingConfirmResolver=null;resolve(false);}
    $('#modal-root').innerHTML='';
  }
  function confirmAction(title,message,confirmLabel='Confirm',danger=true) {
    if(pendingConfirmResolver)return Promise.resolve(false);
    return new Promise(resolve=>{
      pendingConfirmResolver=resolve;
      openModal(title,'Please review this action before proceeding.',`<div class="confirm-icon">${icon('warning',25)}</div><div class="confirm-copy">${esc(message)}</div>`,`<button class="btn btn-secondary" type="button" data-confirm-choice="cancel">Cancel</button><button class="btn ${danger?'btn-danger':'btn-primary'}" type="button" data-confirm-choice="yes">${esc(confirmLabel)}</button>`,'modal-sm');
      const root=$('#modal-root');
      root.addEventListener('click',function handler(e){
        const choice=e.target.closest('[data-confirm-choice]');
        if(choice){root.removeEventListener('click',handler);const complete=pendingConfirmResolver;pendingConfirmResolver=null;$('#modal-root').innerHTML='';if(complete)complete(choice.dataset.confirmChoice==='yes');}
      });
    });
  }
  function findRecord(page,id) {
    const key=entityConfigs[page]?.collection;
    if(!key) return null;
    if(page==='categories') { const item=(state.categories||[]).find((name,i)=>`CAT-${i+1}`===id||name===id);return item?{id,name:item}:null; }
    return (state[key]||[]).find(r=>r.id===id)||null;
  }
  async function handleRowAction(action,id) {
    const page=currentPage;
    const record=findRecord(page,id);
    if(!record) return;
    if(action==='view') { showRecordDetails(page,record);return; }
    if(action==='edit') { openEntityForm(page,id);return; }
    if(action==='adjust') { openStockAdjustment(record);return; }
    if(action==='receive') { openReceiveGoods(record);return; }
    if(action==='archive') {
      const yes=await confirmAction('Archive this record?',`You are about to archive “${record.name||record.reference||record.id}”. It will no longer be treated as an active record, but its history will be preserved. Continue?`,'Archive Record',true);
      if(!yes) return;
      if(page==='categories') state.categories=state.categories.filter(x=>x!==record.name);
      else record.status='Inactive';
      addAudit(`Archived ${record.name||record.reference||record.id}`,page,id);persist();renderCurrentPage();toast('Record archived successfully.');
    }
  }
  function showRecordDetails(page,record) {
    const rows=Object.entries(record).filter(([k,v])=>!['id'].includes(k)&&v!==undefined&&v!==null&&typeof v!=='object').map(([k,v])=>`<div class="detail-item"><small>${esc(k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()))}</small><strong>${esc(k.toLowerCase().includes('price')||k.toLowerCase().includes('amount')||k.toLowerCase().includes('balance')||k.toLowerCase()==='total'?money(v):k.toLowerCase().includes('date')||k.toLowerCase()==='expiry'?dateText(v):v)}</strong></div>`).join('');
    openModal('Record details',`${page.replaceAll('-',' ')} · ${record.id||'record'}`,`<div class="detail-grid">${rows||'<p class="confirm-copy">No additional details are available.</p>'}</div>`,`<button type="button" class="btn btn-secondary" data-modal-close>Close</button>`,'modal-lg');
  }
  function openStockAdjustment(product) {
    const body=`<form id="dialog-form" data-form-kind="adjust-stock" data-product-id="${esc(product.id)}"><div class="profile-detail"><div class="mini-stat-icon">${icon('package',22)}</div><div><strong>${esc(product.name)}</strong><div class="field-help">Current stock: ${number(product.stock)} ${esc(product.unit)}</div></div></div><div class="form-grid"><div class="form-field"><label>Adjustment Type <em>*</em></label><select name="direction" class="field-input"><option value="increase">Increase stock</option><option value="decrease">Decrease stock</option></select></div><div class="form-field"><label>Quantity <em>*</em></label><input name="quantity" class="field-input" type="number" min="1" step="1" required></div><div class="form-field full"><label>Reason <em>*</em></label><select name="reason" class="field-input" required><option value="">Select a reason</option><option>Physical stock count</option><option>Damaged goods</option><option>Expired stock write-off</option><option>Supplier correction</option><option>Data correction</option></select></div><div class="form-field full"><label>Notes</label><textarea name="notes" class="field-textarea" placeholder="Additional explanation for the audit trail"></textarea></div></div></form>`;
    openModal('Adjust inventory quantity','This action changes the demo stock balance and creates a movement record.',body,`<button class="btn btn-secondary" type="button" data-modal-close>Cancel</button><button class="btn btn-primary" type="submit" form="dialog-form">Review Adjustment</button>`);
  }
  function openReceiveGoods(order) {
    const body=`<form id="dialog-form" data-form-kind="receive-goods" data-order-id="${esc(order.id)}"><div class="profile-detail"><div class="mini-stat-icon">${icon('truck',22)}</div><div><strong>${esc(order.reference)} · ${esc(order.supplier)}</strong><div class="field-help">Order value ${money(order.total)} · Current status ${esc(order.status)}</div></div></div><div class="form-grid"><div class="form-field full"><label>Medicine Received <em>*</em></label><select class="field-input" name="medicineId" required>${state.products.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('')}</select></div><div class="form-field"><label>Quantity Received <em>*</em></label><input class="field-input" name="quantity" type="number" min="1" step="1" required></div><div class="form-field"><label>Batch Number <em>*</em></label><input class="field-input" name="batch" required placeholder="e.g. AMX-2601-A"></div><div class="form-field"><label>Expiry Date <em>*</em></label><input class="field-input" name="expiry" type="date" min="${todayISO()}" required></div><div class="form-field"><label>Purchase Unit Cost (KES)</label><input class="field-input" name="unitCost" type="number" min="0" step="any" value="0"></div><div class="form-field full"><label>Receiving Notes</label><textarea class="field-textarea" name="notes" placeholder="Condition, supplier note or discrepancy"></textarea></div></div></form>`;
    openModal('Receive goods into inventory','Stock is updated only after you submit the goods receipt.',body,`<button class="btn btn-secondary" type="button" data-modal-close>Cancel</button><button class="btn btn-primary" type="submit" form="dialog-form">Confirm Receipt</button>`,'modal-lg');
  }
  function saveEntityForm(form) {
    const page=form.dataset.entityPage;
    const config=entityConfigs[page==='purchase-orders'?'purchasing':page];
    if(!config) return;
    const id=form.dataset.recordId;
    const data=Object.fromEntries(new FormData(form).entries());
    for(const f of config.fields||[]) if(f.type==='number'||typeof f.type==='object') data[f.name]=Number(data[f.name]||0);
    if(page==='categories') {
      const name=data.name.trim();
      if(!name) return toast('Enter a category name.','error');
      if(id) { const idx=state.categories.indexOf(findRecord(page,id)?.name); if(idx>=0)state.categories[idx]=name; }
      else { if(state.categories.some(x=>x.toLowerCase()===name.toLowerCase()))return toast('That category already exists.','error');state.categories.push(name); }
    } else if(page==='purchasing'||page==='purchase-orders') {
      const product=state.products.find(p=>p.id===data.medicine);
      const qty=Number(data.quantity||0),unitCost=Number(data.unitCost||0);
      if(qty<1||!product)return toast('Select a medicine and enter a valid quantity.','error');
      const order={id:id||uid('PO'),reference:id?(state.purchases.find(p=>p.id===id)?.reference||id):`PO-${String(Date.now()).slice(-5)}`,supplier:data.supplier,date:todayISO(),expectedDate:data.expectedDate||todayISO(),items:1,total:qty*unitCost,status:'Pending',notes:data.notes||'',medicineId:product.id,medicine:product.name,quantityOrdered:qty,unitCost};
      if(id){const idx=state.purchases.findIndex(p=>p.id===id);if(idx>=0)state.purchases[idx]={...state.purchases[idx],...order,id};}else state.purchases.unshift(order);
    } else {
      const collection=config.collection;
      if(page==='medicines'&&!id) { data.id=uid('MED');data.sku=data.sku||`PH-${String(state.products.length+1).padStart(4,'0')}`;data.status=data.status||'Active';data.stock=Number(data.stock||0);data.minStock=Number(data.minStock||0);data.purchasePrice=Number(data.purchasePrice||0);data.sellingPrice=Number(data.sellingPrice||0);state.inventoryValue+=data.stock*data.purchasePrice; }
      if(page==='medicines'&&id) { const old=state.products.find(p=>p.id===id);if(old){const oldValue=Number(old.stock||0)*Number(old.purchasePrice||0);const newValue=Number(data.stock??old.stock)*Number(data.purchasePrice??old.purchasePrice);state.inventoryValue+=newValue-oldValue;} }
      if(page==='returns') { data.id=uid('RET');data.reference=data.id;data.date=todayISO();data.status='Pending Review'; }
      if(page==='prescriptions') { data.id=uid('RX');data.reference=data.id; }
      if(id) { const idx=state[collection].findIndex(r=>r.id===id);if(idx>=0)state[collection][idx]={...state[collection][idx],...data,id}; }
      else state[collection].unshift({id:data.id||uid(page.slice(0,3).toUpperCase()),status:data.status||'Active',...data});
    }
    addAudit(`${id?'Updated':'Created'} ${page} record`,page,id||'new');persist();closeModal();renderCurrentPage();renderSidebar();toast(`${config.title.replace(' Management','')} ${id?'updated':'created'} successfully.`);
  }
  function saveStockAdjustment(form) {
    const product=state.products.find(p=>p.id===form.dataset.productId);
    if(!product)return;
    const values=Object.fromEntries(new FormData(form).entries());
    const qty=Math.floor(Number(values.quantity));
    if(!qty||qty<1)return toast('Enter a valid quantity greater than zero.','error');
    const delta=values.direction==='increase'?qty:-qty;
    if(product.stock+delta<0)return toast('This adjustment would make stock negative.','error');
    confirmAction('Confirm stock adjustment',`${values.direction==='increase'?'Increase':'Decrease'} ${product.name} by ${qty} ${product.unit}? Reason: ${values.reason}. The movement will be saved to the audit trail.`,'Apply Adjustment',true).then(yes=>{
      if(!yes)return;
      product.stock+=delta;state.inventoryValue+=delta*Number(product.purchasePrice||0);
      state.stockMovements.unshift({id:uid('MOV'),date:new Date().toISOString(),medicine:product.name,type:'Stock Adjustment',quantity:delta,reason:values.reason+(values.notes?`: ${values.notes}`:''),reference:uid('ADJ'),user:state.user.name});
      addAudit(`Adjusted ${product.name} stock by ${delta}`, 'Inventory', product.id);persist();renderCurrentPage();toast('Stock adjustment recorded successfully.');
    });
  }
  function saveGoodsReceipt(form) {
    const values=Object.fromEntries(new FormData(form).entries());
    const product=state.products.find(p=>p.id===values.medicineId);
    const order=state.purchases.find(p=>p.id===form.dataset.orderId);
    const qty=Math.floor(Number(values.quantity));
    if(!product||!order||qty<1)return toast('Check the medicine and received quantity.','error');
    if(!values.batch||!values.expiry)return toast('Batch number and expiry date are required.','error');
    confirmAction('Confirm goods receipt',`Receive ${qty} ${product.unit} of ${product.name} into stock for ${order.reference}? This updates inventory and creates a stock movement record.`,'Receive Stock',false).then(yes=>{
      if(!yes)return;
      product.stock+=qty;product.batch=values.batch;product.expiry=values.expiry;
      if(Number(values.unitCost)>0)product.purchasePrice=Number(values.unitCost);
      state.inventoryValue+=qty*Number(product.purchasePrice||0);
      order.status='Received';order.receivedAt=new Date().toISOString();
      state.stockMovements.unshift({id:uid('GRN'),date:new Date().toISOString(),medicine:product.name,type:'Purchase Receipt',quantity:qty,reason:values.notes||'Goods received against purchase order',reference:order.reference,user:state.user.name,batch:values.batch,expiry:values.expiry});
      state.transactions.unshift({id:uid('TXN'),reference:order.reference,date:new Date().toISOString(),type:'Purchase',customer:order.supplier,cashier:state.user.name,amount:qty*Number(values.unitCost||product.purchasePrice),status:'Completed'});
      addAudit(`Received ${qty} units of ${product.name}`, 'Purchasing', order.reference);persist();closeModal();renderCurrentPage();toast('Goods received and inventory updated.');
    });
  }

  function renderPOS() {
    const categories=['All',...new Set(state.products.map(p=>p.category).filter(Boolean))];
    return `<div class="content-page"><div class="page-header"><div><h1>Point of Sale</h1><p>Search medicines, build the cart and complete a demo pharmacy sale.</p></div><div class="page-actions"><span class="badge info">Demo checkout · Local records only</span><button class="btn btn-secondary" data-action="clear-cart">${icon('refresh',15)}Clear Cart</button></div></div>
      <div class="pos-layout"><section class="pos-products"><div class="pos-toolbar"><input id="pos-search" class="pos-search" type="search" placeholder="Search by medicine, brand, generic name or barcode..."/><select id="pos-stock-filter" class="filter-select"><option value="available">Available stock</option><option value="all">All products</option><option value="low">Low stock</option></select></div><div class="category-chips">${categories.map(cat=>`<button class="category-chip ${state.posCategory===cat?'active':''}" data-pos-category="${esc(cat)}">${esc(cat)}</button>`).join('')}</div><div id="pos-product-grid" class="product-grid"></div></section>
      <section class="pos-cart"><div class="pos-cart-header"><h3>Current Sale</h3><span class="cart-count" id="cart-count">${state.cart.reduce((s,i)=>s+i.quantity,0)} items</span></div><div class="cart-items" id="cart-items"></div><div class="cart-form"><div class="form-field"><label>Customer</label><select id="pos-customer" class="field-control"><option value="">Walk-in Customer</option>${state.customers.filter(c=>c.status==='Active').map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</select></div><div class="form-field"><label>Payment Method</label><select id="pos-payment" class="field-control"><option>Cash</option><option>Mobile Money (Demo)</option><option>Card (Demo)</option><option>Bank Transfer (Demo)</option></select></div><div class="form-field"><label>Discount (KES)</label><input id="pos-discount" class="field-control" type="number" min="0" step="1" value="0"/></div><div class="form-field"><label>Amount Tendered (KES)</label><input id="pos-tendered" class="field-control" type="number" min="0" step="1" placeholder="Cash received"/></div></div><div class="cart-summary" id="cart-summary"></div></section></div>
      <div class="demo-note">Sales created here are saved to this browser's localStorage. External payments are simulated and are not sent to a payment provider.</div></div>`;
  }
  function renderPOSProducts(query='') {
    const grid=$('#pos-product-grid'); if(!grid)return;
    const filter=$('#pos-stock-filter')?.value||'available';
    const normalized=query.toLowerCase().trim();
    const products=state.products.filter(p=>{
      const text=[p.name,p.generic,p.brand,p.barcode,p.sku,p.category].join(' ').toLowerCase();
      const inCategory=state.posCategory==='All'||p.category===state.posCategory;
      const stockOk=filter==='all'||(filter==='low'?p.stock<=p.minStock&&p.stock>0:p.stock>0);
      return inCategory&&stockOk&&(!normalized||text.includes(normalized));
    });
    grid.innerHTML=products.map(p=>`<button type="button" class="product-tile" data-pos-add="${esc(p.id)}" ${p.stock<=0?'disabled':''}><span class="product-symbol">${icon('pill',20)}</span><strong>${esc(p.name)}</strong><small>${esc(p.category)} · ${esc(p.strength||p.form||'')}</small><div class="product-tile-bottom"><b>${money(p.sellingPrice)}</b><em>${number(p.stock)} ${esc(p.unit)}</em></div></button>`).join('') || `<div class="empty-state" style="grid-column:1/-1">${icon('search',30)}<strong>No matching medicines</strong><p>Try a different search or category.</p></div>`;
  }
  function renderCart() {
    const container=$('#cart-items'); if(!container)return;
    const totalQty=state.cart.reduce((s,i)=>s+i.quantity,0);
    $('#cart-count').textContent=`${totalQty} item${totalQty===1?'':'s'}`;
    container.innerHTML=state.cart.length?state.cart.map(item=>{
      const p=state.products.find(x=>x.id===item.productId);if(!p)return '';
      return `<div class="cart-row"><div><strong>${esc(p.name)}</strong><small>${money(p.sellingPrice)} / ${esc(p.unit)} · Available ${number(p.stock)}</small><div class="qty-control"><button type="button" data-cart-action="dec" data-id="${esc(p.id)}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-cart-action="inc" data-id="${esc(p.id)}" aria-label="Increase quantity">+</button><button type="button" class="cart-remove" data-cart-action="remove" data-id="${esc(p.id)}" aria-label="Remove item">${icon('trash',13)}</button></div></div><div class="cart-row-right"><b>${money(item.quantity*p.sellingPrice)}</b></div></div>`;
    }).join(''):`<div class="cart-empty">Your cart is empty.<br/>Select a medicine to start a sale.</div>`;
    const subtotal=cartSubtotal();
    const discount=Math.min(subtotal,Math.max(0,Number($('#pos-discount')?.value||0)));
    const total=subtotal-discount;
    $('#cart-summary').innerHTML=`<div class="summary-line"><span>Subtotal</span><b>${money(subtotal)}</b></div><div class="summary-line"><span>Discount</span><b>− ${money(discount)}</b></div><div class="summary-line"><span>Tax</span><b>${money(0)}</b></div><div class="summary-line total"><span>Total Due</span><b>${money(total)}</b></div><div class="summary-line"><span>Change</span><b>${money(Math.max(0,Number($('#pos-tendered')?.value||0)-total))}</b></div><button class="btn btn-primary complete-sale" type="button" data-action="complete-sale" ${state.cart.length?'':'disabled'}>${icon('check',17)}Complete Sale · ${money(total)}</button>`;
  }
  function cartSubtotal() { return state.cart.reduce((sum,item)=>{const p=state.products.find(x=>x.id===item.productId);return sum+(p?Number(p.sellingPrice)*item.quantity:0)},0); }
  function addToCart(productId) {
    const product=state.products.find(p=>p.id===productId);if(!product||product.stock<=0)return toast('This medicine is currently out of stock.','error');
    const existing=state.cart.find(item=>item.productId===productId);
    if(existing){if(existing.quantity+1>product.stock)return toast('Cart quantity cannot exceed available stock.','error');existing.quantity++;}
    else state.cart.push({productId,quantity:1});
    persist();renderCart();toast(`${product.name} added to cart.`);
  }
  function changeCart(productId,action) {
    const item=state.cart.find(i=>i.productId===productId),product=state.products.find(p=>p.id===productId);if(!item||!product)return;
    if(action==='inc'){if(item.quantity+1>product.stock)return toast('You cannot sell more than available stock.','error');item.quantity++;}
    if(action==='dec'){item.quantity--;if(item.quantity<=0)state.cart=state.cart.filter(i=>i.productId!==productId);}
    if(action==='remove')state.cart=state.cart.filter(i=>i.productId!==productId);
    persist();renderCart();
  }
  async function completeSale() {
    if(!state.cart.length)return toast('Add at least one medicine to the cart.','error');
    for(const item of state.cart){const p=state.products.find(x=>x.id===item.productId);if(!p||item.quantity>p.stock)return toast(`Insufficient stock for ${p?.name||'a selected medicine'}.`,'error');}
    const subtotal=cartSubtotal();
    const discount=Math.min(subtotal,Math.max(0,Number($('#pos-discount')?.value||0)));
    const total=subtotal-discount;
    const tendered=Number($('#pos-tendered')?.value||0);
    const payment=$('#pos-payment')?.value||'Cash';
    if(payment==='Cash'&&tendered>0&&tendered<total)return toast('Amount tendered is less than the total due.','error');
    const yes=await confirmAction('Complete this sale?',`Record a sale for ${money(total)} covering ${state.cart.length} medicine line(s)? Inventory will be deducted and a sale record will be added to this browser. This is demo-only checkout.`,'Complete Sale',false);
    if(!yes)return;
    // Recheck available stock immediately before applying the demo sale.
    for(const item of state.cart){const p=state.products.find(x=>x.id===item.productId);if(!p||item.quantity>p.stock)return toast('Stock changed before checkout. Review the cart and try again.','error');}
    const customer=state.customers.find(c=>c.id===$('#pos-customer')?.value);
    const items=state.cart.map(item=>{const p=state.products.find(x=>x.id===item.productId);return {productId:p.id,name:p.name,quantity:item.quantity,unitPrice:p.sellingPrice,batch:p.batch,expiry:p.expiry,total:item.quantity*p.sellingPrice};});
    items.forEach(item=>{const p=state.products.find(x=>x.id===item.productId);p.stock-=item.quantity;state.inventoryValue-=item.quantity*Number(p.purchasePrice||0);state.stockMovements.unshift({id:uid('MOV'),date:new Date().toISOString(),medicine:p.name,type:'POS Sale',quantity:-item.quantity,reason:'Completed POS transaction',reference:'pending',user:state.user.name,batch:p.batch});});
    const sale={id:uid('SAL'),reference:String(100246+state.sales.length-42),date:new Date().toISOString(),customer:customer?.name||'Walk-in Customer',customerId:customer?.id||'',cashier:state.user.name,items:items.reduce((s,i)=>s+i.quantity,0),amount:total,subtotal,discount,paymentMethod:payment,status:'Completed',lineItems:items,demo:true};
    sale.reference=String(Number(state.sales[0]?.reference||100245)+1);
    sale.id=`SAL-${sale.reference}`;
    state.sales.unshift(sale);
    state.transactions.unshift({id:uid('TXN'),reference:sale.reference,date:sale.date,type:'Sale',customer:sale.customer,cashier:sale.cashier,amount:sale.amount,status:'Completed'});
    state.stockMovements.slice(0,items.length).forEach(m=>m.reference=sale.reference);
    state.cart=[];
    addAudit(`Completed demo sale ${sale.reference}`, 'POS', sale.reference);persist();
    renderCurrentPage();showReceipt(sale);toast('Sale recorded and inventory updated.');
  }
  function receiptMarkup(sale) {
    return `<div class="receipt" id="receipt-printable"><div class="receipt-head"><strong>${esc(state.settings.pharmacyName)}</strong><small>${esc(state.settings.address)}<br/>${esc(state.settings.phone)}</small><small>SALES RECEIPT</small></div><div class="receipt-line"><span>Receipt No.</span><b>${esc(sale.reference)}</b></div><div class="receipt-line"><span>Date</span><b>${dateTimeText(sale.date)}</b></div><div class="receipt-line"><span>Cashier</span><b>${esc(sale.cashier)}</b></div><div class="receipt-line"><span>Customer</span><b>${esc(sale.customer)}</b></div><hr style="border:0;border-top:1px dashed #9aa5b5"/>${(sale.lineItems||[]).map(item=>`<div class="receipt-line"><span>${esc(item.name)} × ${item.quantity}<br/>${money(item.unitPrice)} each</span><b>${money(item.total)}</b></div>`).join('')}<div class="receipt-line"><span>Subtotal</span><b>${money(sale.subtotal||sale.amount)}</b></div><div class="receipt-line"><span>Discount</span><b>− ${money(sale.discount||0)}</b></div><div class="receipt-line receipt-total"><span>TOTAL PAID</span><b>${money(sale.amount)}</b></div><div class="receipt-line"><span>Payment</span><b>${esc(sale.paymentMethod)}</b></div><p style="text-align:center;font-size:10px;margin-top:15px">${esc(state.settings.receiptFooter)}</p><p style="text-align:center;font-size:9px;color:#64748b">Demo receipt · Not a tax invoice</p></div>`;
  }
  function showReceipt(sale) {
    openModal('Sale completed','The transaction was saved in the local demo workspace.',receiptMarkup(sale),`<button class="btn btn-secondary" type="button" data-modal-close>Close</button><button class="btn btn-primary" type="button" data-action="print-receipt" data-sale-id="${esc(sale.id)}">${icon('printer',15)}Print Receipt</button>`,'modal-sm');
  }
  function printReceipt(sale) {
    const popup=window.open('','_blank','width=420,height=700');
    if(!popup)return toast('Your browser blocked the print window. Allow pop-ups and try again.','error');
    popup.document.write(`<!doctype html><html><head><title>Receipt ${esc(sale.reference)}</title><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;padding:18px;color:#111}.receipt{max-width:340px;margin:auto}.receipt-head{text-align:center;border-bottom:1px dashed #999;padding-bottom:12px}.receipt-head strong{font-size:17px}.receipt-head small{display:block;font-size:10px;line-height:1.5;margin-top:4px}.receipt-line{display:flex;justify-content:space-between;gap:12px;font-size:11px;padding:6px 0}.receipt-total{border-top:1px dashed #999;margin-top:7px;padding-top:9px;font-weight:bold}hr{border:0;border-top:1px dashed #999}</style></head><body>${receiptMarkup(sale)}<script>window.onload=()=>{window.print();};<\/script></body></html>`);
    popup.document.close();
  }

  function recordsForPeriod(records,period) {
    const now=new Date();
    const start=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    if(period==='Today') return records.filter(r=>new Date(r.date)>=start);
    if(period==='Last 7 Days'){const from=new Date(start);from.setDate(from.getDate()-6);return records.filter(r=>new Date(r.date)>=from);}
    if(period==='Last 30 Days'){const from=new Date(start);from.setDate(from.getDate()-29);return records.filter(r=>new Date(r.date)>=from);}
    if(period==='This Month'){const from=new Date(now.getFullYear(),now.getMonth(),1);return records.filter(r=>new Date(r.date)>=from);}
    if(period==='Last Month'){const from=new Date(now.getFullYear(),now.getMonth()-1,1),to=new Date(now.getFullYear(),now.getMonth(),1);return records.filter(r=>new Date(r.date)>=from&&new Date(r.date)<to);}
    return records;
  }
  function renderReports() {
    const reportSales=recordsForPeriod(state.sales,state.reportPeriod||'Last 30 Days');
    const totalSales=reportSales.reduce((sum,s)=>sum+Number(s.amount||0),0);
    const totalPurchases=state.purchases.reduce((sum,p)=>sum+Number(p.total||0),0);
    const returns=state.returns.reduce((sum,r)=>sum+Number(r.amount||0),0);
    const low=state.products.filter(p=>p.stock<=p.minStock).length;
    return `<div class="content-page"><div class="page-header"><div><h1>Reports & Analytics</h1><p>Review sales performance, inventory health and pharmacy activity.</p></div><div class="page-actions"><select id="report-period" class="filter-select"><option ${state.reportPeriod==='Today'?'selected':''}>Today</option><option ${state.reportPeriod==='Last 7 Days'?'selected':''}>Last 7 Days</option><option ${state.reportPeriod==='Last 30 Days'?'selected':''}>Last 30 Days</option><option ${state.reportPeriod==='This Month'?'selected':''}>This Month</option><option ${state.reportPeriod==='Last Month'?'selected':''}>Last Month</option></select><button class="btn btn-secondary" type="button" data-action="export-report">${icon('download',15)}Export CSV</button><button class="btn btn-primary" type="button" data-action="print-report">${icon('printer',15)}Print</button></div></div>
      <div class="report-grid"><article class="report-card"><h3>Gross Sales Recorded</h3><p>Sales transactions in the local demo workspace</p><strong>${money(totalSales)}</strong></article><article class="report-card"><h3>Purchasing Value</h3><p>Purchase order values (not all necessarily received)</p><strong>${money(totalPurchases)}</strong></article><article class="report-card"><h3>Returns & Refunds</h3><p>Value of return records in this demo</p><strong>${money(returns)}</strong></article><article class="report-card"><h3>Medicine Catalogue</h3><p>Registered medicine records</p><strong>${number(state.products.length)}</strong></article><article class="report-card"><h3>Low / Out of Stock</h3><p>Products at or below reorder levels</p><strong>${number(low)}</strong></article><article class="report-card"><h3>Active Customers</h3><p>Base demo total plus visible active profiles</p><strong>${number(state.customerBase+state.customers.filter(c=>c.status==='Active').length)}</strong></article></div>
      <section class="panel"><div class="panel-heading"><h2 class="panel-title">${icon('chart',22)}Recent Sales Transactions</h2><button class="panel-link" data-page="sales-history">Open Sales History ${icon('arrow',14)}</button></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Reference</th><th>Date & Time</th><th>Customer</th><th>Cashier</th><th>Payment</th><th>Amount</th><th>Status</th></tr></thead><tbody>${reportSales.slice(0,10).map(s=>`<tr><td class="table-primary">${esc(s.reference)}</td><td>${dateTimeText(s.date)}</td><td>${esc(s.customer)}</td><td>${esc(s.cashier)}</td><td>${esc(s.paymentMethod)}</td><td>${money(s.amount)}</td><td>${badge(s.status)}</td></tr>`).join('')}</tbody></table></div>${reportSales.length?'':`<div class="empty-state"><strong>No sales in this period</strong><p>Choose another date range to see transactions.</p></div>`}</section>
      <div class="demo-note">Financial figures are based on locally stored demo records. Cost of goods sold, tax liability and net profit are not represented as verified accounting reports.</div></div>`;
  }
  function renderSettings() {
    const tabs=[['pharmacy','Pharmacy Profile'],['financial','Financial'],['inventory','Inventory'],['operations','Operations'],['security','Security & Privacy']];
    let body='';
    if(settingsTab==='pharmacy') body=`<h3>Pharmacy Profile</h3><p>Business identity details used in the application and demo receipts.</p><form id="settings-form" data-form-kind="settings"><div class="form-grid"><div class="form-field"><label>Pharmacy Name</label><input class="field-input" name="pharmacyName" value="${esc(state.settings.pharmacyName)}" required></div><div class="form-field"><label>Telephone</label><input class="field-input" name="phone" value="${esc(state.settings.phone)}"></div><div class="form-field"><label>Email Address</label><input class="field-input" name="email" type="email" value="${esc(state.settings.email)}"></div><div class="form-field"><label>Business Address</label><input class="field-input" name="address" value="${esc(state.settings.address)}"></div><div class="form-field full"><label>Receipt Footer</label><textarea class="field-textarea" name="receiptFooter">${esc(state.settings.receiptFooter)}</textarea></div><div class="form-field full"><label><input type="checkbox" name="pharmacyOpen" ${state.settings.pharmacyOpen?'checked':''}> Pharmacy is currently open</label></div></div><div class="page-actions" style="margin-top:18px"><button class="btn btn-primary" type="submit">${icon('check',15)}Save Pharmacy Profile</button></div></form>`;
    if(settingsTab==='financial') body=`<h3>Financial Settings</h3><p>Configure how the demo displays money and calculates basic sales totals.</p><form id="settings-form" data-form-kind="settings"><div class="form-grid"><div class="form-field"><label>Currency</label><select class="field-input" name="currency"><option ${state.settings.currency==='KES'?'selected':''}>KES</option><option ${state.settings.currency==='UGX'?'selected':''}>UGX</option><option ${state.settings.currency==='USD'?'selected':''}>USD</option><option ${state.settings.currency==='TZS'?'selected':''}>TZS</option></select></div><div class="form-field"><label>Tax Rate (%)</label><input class="field-input" type="number" min="0" max="100" step="0.01" name="taxRate" value="${Number(state.settings.taxRate||0)}"></div><div class="form-field full"><small class="field-help">Changing currency changes formatting only. This demo does not calculate statutory tax or submit tax returns.</small></div></div><div class="page-actions" style="margin-top:18px"><button class="btn btn-primary" type="submit">${icon('check',15)}Save Financial Settings</button></div></form>`;
    if(settingsTab==='inventory') body=`<h3>Inventory Rules</h3><p>Set demo stock thresholds and expiry alert intervals.</p><form id="settings-form" data-form-kind="settings"><div class="form-grid"><div class="form-field"><label>Default Low Stock Threshold</label><input class="field-input" type="number" min="0" name="lowStockThreshold" value="${Number(state.settings.lowStockThreshold)}"></div><div class="form-field"><label>Expiry Alert (Days)</label><input class="field-input" type="number" min="1" name="expiryAlertDays" value="${Number(state.settings.expiryAlertDays)}"></div></div><div class="page-actions" style="margin-top:18px"><button class="btn btn-primary" type="submit">${icon('check',15)}Save Inventory Rules</button></div></form>`;
    if(settingsTab==='operations') body=`<h3>Operational Preferences</h3><p>Configure regional display and business operating settings.</p><form id="settings-form" data-form-kind="settings"><div class="form-grid"><div class="form-field"><label>Date Format</label><select class="field-input" name="dateFormat"><option ${state.settings.dateFormat==='DD MMM YYYY'?'selected':''}>DD MMM YYYY</option><option ${state.settings.dateFormat==='MM/DD/YYYY'?'selected':''}>MM/DD/YYYY</option><option ${state.settings.dateFormat==='YYYY-MM-DD'?'selected':''}>YYYY-MM-DD</option></select></div><div class="form-field"><label>Time Zone</label><select class="field-input" name="timeZone"><option>Africa/Nairobi</option><option ${state.settings.timeZone==='Africa/Kampala'?'selected':''}>Africa/Kampala</option><option>Africa/Dar_es_Salaam</option></select></div></div><div class="page-actions" style="margin-top:18px"><button class="btn btn-primary" type="submit">${icon('check',15)}Save Preferences</button></div></form>`;
    if(settingsTab==='security') body=`<h3>Security & Privacy</h3><p>This frontend demo is not an authentication or access-control system.</p><div class="detail-grid"><div class="detail-item"><small>Demo data storage</small><strong>Browser localStorage</strong></div><div class="detail-item"><small>Authentication</small><strong>Not connected to a server</strong></div><div class="detail-item"><small>Role enforcement</small><strong>Illustrative UI only</strong></div><div class="detail-item"><small>Patient information</small><strong>Use synthetic demo records only</strong></div></div><div class="demo-note">For production, use server-side sessions, password hashing, role enforcement, encrypted backups and audit logs on the backend.</div><div class="page-actions" style="margin-top:15px"><button class="btn btn-secondary" type="button" data-action="export-backup">${icon('download',15)}Export local data backup</button><button class="btn btn-danger" type="button" data-action="reset-demo">${icon('refresh',15)}Reset demo data</button></div>`;
    return `<div class="content-page"><div class="page-header"><div><h1>System Settings</h1><p>Configure the pharmacy profile and local demo preferences.</p></div><span class="badge info">Demo configuration</span></div><div class="settings-layout"><nav class="settings-tabs">${tabs.map(([id,label])=>`<button class="settings-tab ${settingsTab===id?'active':''}" type="button" data-settings-tab="${id}">${esc(label)}</button>`).join('')}</nav><section class="settings-panel">${body}</section></div></div>`;
  }
  function renderHelp() {
    const faqs=[['How do I add a medicine?','Open Medicines from the sidebar and select Add Medicine. Complete the required fields, then save.'],['How does POS checkout work?','Search or select a medicine, add it to the cart, confirm quantities and payment method, then select Complete Sale. Stock updates after confirmation.'],['Where is demo data saved?','Demo records are stored in localStorage in this browser. Clearing browser storage removes them. Use Export local data backup before resetting.'],['Are payments really processed?','No. Mobile Money, card and bank transfer options are demonstration labels only. No provider is connected and no money moves.'],['Can multiple users work at the same time?','No. This frontend-only demo stores data in one browser. Multi-user use needs a backend API, database and server-side access controls.'],['Can I use this for actual dispensing?','No. This is a UI/interaction demo and does not verify prescriptions, regulated products, pharmacist approvals or applicable pharmacy regulations.']];
    return `<div class="content-page"><div class="page-header"><div><h1>Help & Support</h1><p>Quick guidance for the PharmaPro demo workspace.</p></div><button class="btn btn-primary" data-action="contact-support">${icon('help',15)}Contact Support</button></div><section class="panel"><div class="panel-heading"><h2 class="panel-title">${icon('help',22)}Frequently Asked Questions</h2></div><div style="padding:8px 16px">${faqs.map(([q,a],i)=>`<details style="border-bottom:1px solid #edf1f6;padding:13px 3px" ${i===0?'open':''}><summary style="font-size:12px;font-weight:800;color:#1d3154;cursor:pointer">${esc(q)}</summary><p style="font-size:11px;color:#64748b;line-height:1.7;margin:9px 0 1px">${esc(a)}</p></details>`).join('')}</div></section><div class="report-grid" style="margin-top:14px"><article class="report-card"><h3>Application</h3><p>PharmaPro Smart Pharmacy Management</p><strong>v1.0.0</strong></article><article class="report-card"><h3>Developer Mode</h3><p>Frontend prototype with local persistence</p><strong>Enabled</strong></article><article class="report-card"><h3>Data Storage</h3><p>Records remain in this browser</p><strong>localStorage</strong></article></div></div>`;
  }
  function saveSettings(form) {
    const data=Object.fromEntries(new FormData(form).entries());
    for(const [k,v] of Object.entries(data)) {
      if(['taxRate','lowStockThreshold','expiryAlertDays'].includes(k)) state.settings[k]=Number(v||0);
      else state.settings[k]=v;
    }
    if(form.querySelector('[name="pharmacyOpen"]'))state.settings.pharmacyOpen=form.querySelector('[name="pharmacyOpen"]').checked;
    addAudit('Updated system settings','Settings','system');persist();renderCurrentPage();toast('Settings saved successfully.');
  }
  function exportCSV(records,filename) {
    if(!records?.length)return toast('There are no records to export.','error');
    const keys=[...new Set(records.flatMap(r=>Object.keys(r).filter(k=>typeof r[k]!=='object')) )];
    const csv=[keys.join(','),...records.map(r=>keys.map(k=>`"${String(r[k]??'').replace(/"/g,'""')}"`).join(','))].join('\r\n');
    const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);toast('CSV export created.');
  }
  function exportCurrentPage() {
    const config=entityConfigs[currentPage];if(!config)return;
    exportCSV(getEntityRecords(currentPage),`pharmapro-${currentPage}-${todayISO()}.csv`);
  }
  function exportBackup() {
    const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`pharmapro-demo-backup-${todayISO()}.json`;a.click();URL.revokeObjectURL(url);toast('Local demo backup exported.');
  }
  function openProfileForm() {
    const u=state.user;
    const body=`<form id="dialog-form" data-form-kind="profile"><div class="form-grid"><div class="form-field full"><label>Full Name</label><input class="field-input" name="name" value="${esc(u.name)}" required></div><div class="form-field"><label>Email Address</label><input class="field-input" name="email" type="email" value="${esc(u.email)}" required></div><div class="form-field"><label>Phone</label><input class="field-input" name="phone" value="${esc(u.phone||'')}"></div><div class="form-field full"><label>Role</label><input class="field-input" value="${esc(u.role)}" disabled><small class="field-help">Role changes are managed by an authorised administrator in a real backend.</small></div></div></form>`;
    openModal('My Profile','Update the profile displayed in the demo workspace.',body,`<button class="btn btn-secondary" type="button" data-modal-close>Cancel</button><button class="btn btn-primary" type="submit" form="dialog-form">Save Profile</button>`);
  }
  function syncProfile() {
    $('#top-user-name').textContent=state.user.name;$('#top-user-role').textContent=state.user.role;$('#menu-user-name').textContent=state.user.name;$('#menu-user-email').textContent=state.user.email;$('#user-avatar').textContent=state.user.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  }
  function renderNotifications() {
    const unread=state.notifications.filter(n=>!n.read).length;
    $('#notification-count').textContent=unread;$('#notification-count').style.display=unread?'grid':'none';
    $('#notification-menu').innerHTML=`<div class="notification-head"><strong>Notifications (${unread} unread)</strong><button type="button" data-action="mark-notifications-read">Mark all read</button></div>${state.notifications.length?state.notifications.map(n=>`<button type="button" class="notification-item" data-notification-page="${esc(n.page)}" data-notification-id="${esc(n.id)}"><i class="notification-dot" style="background:${n.type==='warning'?'#f59e0b':'#2563eb'};opacity:${n.read?.35:1}"></i><span><strong>${esc(n.title)}</strong><small>${esc(n.detail)} · ${esc(n.time)}</small></span></button>`).join(''):`<div class="notification-empty">You are all caught up.</div>`}`;
  }
  function closeDropdowns() { $('#notification-menu').classList.add('hidden');$('#profile-menu').classList.add('hidden');$('#global-search-results').classList.add('hidden'); }
  function closeMobileSidebar() { $('#sidebar').classList.remove('mobile-open');$('#mobile-overlay').classList.remove('visible'); }
  function setSearchResults(query) {
    const result=$('#global-search-results');
    if(!query.trim()){result.classList.add('hidden');return;}
    const q=query.toLowerCase();
    const matches=[];
    state.products.filter(p=>[p.name,p.generic,p.barcode,p.sku].join(' ').toLowerCase().includes(q)).slice(0,4).forEach(p=>matches.push({kind:'Medicine',label:p.name,sub:`${p.sku} · ${number(p.stock)} ${p.unit}`,page:'medicines',id:p.id,ico:'pill'}));
    state.customers.filter(c=>[c.name,c.phone,c.email].join(' ').toLowerCase().includes(q)).slice(0,3).forEach(c=>matches.push({kind:'Customer',label:c.name,sub:c.phone,page:'customers',id:c.id,ico:'users'}));
    state.suppliers.filter(s=>[s.name,s.contact,s.phone,s.email].join(' ').toLowerCase().includes(q)).slice(0,3).forEach(s=>matches.push({kind:'Supplier',label:s.name,sub:s.phone,page:'suppliers',id:s.id,ico:'truck'}));
    state.sales.filter(s=>[s.reference,s.customer].join(' ').toLowerCase().includes(q)).slice(0,3).forEach(s=>matches.push({kind:'Sale',label:`Sale ${s.reference}`,sub:`${s.customer} · ${money(s.amount)}`,page:'sales-history',id:s.id,ico:'receipt'}));
    result.innerHTML=matches.length?matches.map(m=>`<div class="search-result" role="button" tabindex="0" data-global-result="${esc(m.page)}" data-id="${esc(m.id)}"><span class="search-result-icon">${icon(m.ico,17)}</span><span><strong>${esc(m.label)}</strong><small>${esc(m.kind)} · ${esc(m.sub)}</small></span></div>`).join(''):`<div class="search-empty">No matches found for “${esc(query)}”.</div>`;
    result.classList.remove('hidden');
  }
  function openSupportModal() {
    const body=`<form id="dialog-form" data-form-kind="support"><div class="form-grid"><div class="form-field full"><label>Subject</label><input class="field-input" name="subject" required placeholder="How can we help?"></div><div class="form-field full"><label>Message</label><textarea class="field-textarea" name="message" required placeholder="Describe the issue or question"></textarea></div></div></form>`;
    openModal('Contact support','This demo will store your request locally; it will not send an email.',body,`<button type="button" class="btn btn-secondary" data-modal-close>Cancel</button><button type="submit" class="btn btn-primary" form="dialog-form">Submit Request</button>`);
  }

  document.addEventListener('click', async event => {
    const pageButton=event.target.closest('[data-page]');
    if(pageButton){navigate(pageButton.dataset.page);return;}

    const nav=event.target.closest('.nav-item[data-page]');
    if(nav){navigate(nav.dataset.page);return;}

    const result=event.target.closest('[data-global-result]');
    if(result){navigate(result.dataset.globalResult);const record=findRecord(result.dataset.globalResult,result.dataset.id);if(record)showRecordDetails(result.dataset.globalResult,record);return;}

    const notification=event.target.closest('[data-notification-page]');
    if(notification){const item=state.notifications.find(n=>n.id===notification.dataset.notificationId);if(item)item.read=true;persist();renderNotifications();navigate(notification.dataset.notificationPage);return;}

    const rowAction=event.target.closest('[data-row-action]');
    if(rowAction){handleRowAction(rowAction.dataset.rowAction,rowAction.dataset.id);return;}

    const sortButton=event.target.closest('[data-sort-column]');
    if(sortButton){const field=sortFieldFor(currentPage,Number(sortButton.dataset.sortColumn));if(tableState.sort===field)tableState.desc=!tableState.desc;else{tableState.sort=field;tableState.desc=false;}updateEntityTable();return;}

    const tablePage=event.target.closest('[data-table-page]');
    if(tablePage){const value=tablePage.dataset.tablePage;if(value==='prev')tableState.page=Math.max(1,tableState.page-1);else if(value==='next')tableState.page++;else tableState.page=Number(value);updateEntityTable();return;}

    const posAdd=event.target.closest('[data-pos-add]');
    if(posAdd){addToCart(posAdd.dataset.posAdd);return;}

    const cartAction=event.target.closest('[data-cart-action]');
    if(cartAction){changeCart(cartAction.dataset.id,cartAction.dataset.cartAction);return;}

    const category=event.target.closest('[data-pos-category]');
    if(category){state.posCategory=category.dataset.posCategory;$$('[data-pos-category]').forEach(b=>b.classList.toggle('active',b===category));renderPOSProducts($('#pos-search')?.value||'');return;}

    const settingsButton=event.target.closest('[data-settings-tab]');
    if(settingsButton){settingsTab=settingsButton.dataset.settingsTab;renderCurrentPage();return;}

    const profileAction=event.target.closest('[data-profile-action]');
    if(profileAction){
      closeDropdowns();
      const action=profileAction.dataset.profileAction;
      if(action==='profile')openProfileForm();
      if(action==='settings')navigate('settings');
      if(action==='help')navigate('help');
      if(action==='logout'){
        const yes=await confirmAction('Sign out of demo workspace?','You will leave this demo session. No server session or account will be changed.','Sign Out',true);
        if(yes)openModal('Demo session ended','This is a local interactive prototype. No real account authentication is connected.','<div class="profile-detail"><div class="mini-stat-icon">'+icon('shield',22)+'</div><div><strong>Signed out of the demo view</strong><div class="field-help">Continue to return to the sample workspace.</div></div></div>','<button class="btn btn-primary" type="button" data-action="demo-login">Continue Demo</button>','modal-sm');
      }
      return;
    }

    const actionButton=event.target.closest('[data-action]');
    if(actionButton){
      const action=actionButton.dataset.action;
      if(action==='toggle-more'){expandedMore=!expandedMore;renderSidebar();return;}
      if(action==='new-sale'){navigate('pos');return;}
      if(action==='add-medicine'){navigate('medicines');openEntityForm('medicines');return;}
      if(action==='purchase-stock'){navigate('purchasing');openEntityForm('purchasing');return;}
      if(action==='add-record'){openEntityForm(currentPage);return;}
      if(action==='export-current'){exportCurrentPage();return;}
      if(action==='export-report'){exportCSV(state.sales,'pharmapro-sales-report-'+todayISO()+'.csv');return;}
      if(action==='export-backup'){exportBackup();return;}
      if(action==='print-report'){window.print();return;}
      if(action==='complete-sale'){completeSale();return;}
      if(action==='clear-cart'){
        if(!state.cart.length)return toast('The cart is already empty.');
        const yes=await confirmAction('Clear the current cart?','All items in the current cart will be removed. No sale has been recorded yet.','Clear Cart',true);
        if(yes){state.cart=[];persist();renderCart();toast('Cart cleared.');}return;
      }
      if(action==='print-receipt'){
        const sale=state.sales.find(s=>s.id===actionButton.dataset.saleId);
        if(sale)printReceipt(sale);return;
      }
      if(action==='mark-notifications-read'){state.notifications.forEach(n=>n.read=true);persist();renderNotifications();toast('All notifications marked as read.');return;}
      if(action==='reset-demo'){
        const yes=await confirmAction('Reset all demo data?','This permanently replaces the current browser demo records with the original sample dataset. Export a backup first if you need to keep your changes.','Reset Demo Data',true);
        if(yes){state=seedData();persist();syncProfile();renderNotifications();navigate('dashboard');toast('Demo data has been reset.');}return;
      }
      if(action==='demo-login'){closeModal();toast('Demo workspace restored.');return;}
      if(action==='contact-support'){openSupportModal();return;}
    }

    if(event.target.closest('[data-modal-close]')){closeModal();return;}
    if(event.target.matches('[data-backdrop]')){closeModal();return;}
    if(event.target.closest('[data-confirm-choice]'))return;

    if(!event.target.closest('.dropdown-wrap'))closeDropdowns();
  });

  document.addEventListener('submit', event => {
    const form=event.target.closest('form[data-form-kind]');if(!form)return;
    event.preventDefault();
    const kind=form.dataset.formKind;
    if(kind==='entity'){saveEntityForm(form);return;}
    if(kind==='adjust-stock'){saveStockAdjustment(form);return;}
    if(kind==='receive-goods'){saveGoodsReceipt(form);return;}
    if(kind==='settings'){saveSettings(form);return;}
    if(kind==='profile'){
      const values=Object.fromEntries(new FormData(form).entries());
      state.user={...state.user,...values};
      const user=state.users.find(u=>u.id===state.user.id);if(user)Object.assign(user,values);
      addAudit('Updated user profile','Users',state.user.id);persist();syncProfile();closeModal();toast('Profile updated.');return;
    }
    if(kind==='support'){
      const values=Object.fromEntries(new FormData(form).entries());
      state.supportRequests=state.supportRequests||[];state.supportRequests.unshift({id:uid('SUPPORT'),date:new Date().toISOString(),...values,status:'Open'});
      addAudit('Submitted local support request','Help',state.supportRequests[0].id);persist();closeModal();toast('Support request saved locally. No email was sent.');return;
    }
  });

  document.addEventListener('input', event => {
    if(event.target.id==='table-search'){tableState.page=1;updateEntityTable();}
    if(event.target.id==='pos-search')renderPOSProducts(event.target.value);
    if(event.target.id==='pos-discount'||event.target.id==='pos-tendered')renderCart();
    if(event.target.id==='global-search')setSearchResults(event.target.value);
  });
  document.addEventListener('change', event => {
    if(event.target.id==='table-status-filter'||event.target.id==='table-category-filter'){tableState.page=1;updateEntityTable();}
    if(event.target.id==='pos-stock-filter')renderPOSProducts($('#pos-search')?.value||'');
    if(event.target.id==='dashboard-period'){
      state.salesPeriod=event.target.value;
      persist();
      const chart=$('.sales-chart');if(chart)chart.innerHTML=salesChartSvg(event.target.value);
      toast(`Sales chart period changed to ${event.target.value}.`);
    }
    if(event.target.id==='report-period'){state.reportPeriod=event.target.value;persist();renderCurrentPage();toast(`Report filtered to ${event.target.value}.`);}
  });
  document.addEventListener('keydown', event => {
    if(event.key==='Escape'){closeModal();closeDropdowns();closeMobileSidebar();}
    if(event.key==='Enter'&&event.target.id==='global-search'){
      const first=$('[data-global-result]');if(first)first.click();
    }
    if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-global-result]'))event.target.click();
    if(event.key==='Enter'&&event.target.id==='pos-search'){const value=event.target.value.trim();const product=state.products.find(p=>p.barcode===value||p.sku.toLowerCase()===value.toLowerCase());if(product){addToCart(product.id);event.target.value='';renderPOSProducts('');}}
  });

  $('#notification-trigger').addEventListener('click', event => {
    event.stopPropagation();$('#profile-menu').classList.add('hidden');$('#global-search-results').classList.add('hidden');$('#notification-menu').classList.toggle('hidden');
  });
  $('#profile-trigger').addEventListener('click', event => {
    event.stopPropagation();$('#notification-menu').classList.add('hidden');$('#global-search-results').classList.add('hidden');$('#profile-menu').classList.toggle('hidden');$('#profile-trigger').setAttribute('aria-expanded',String(!$('#profile-menu').classList.contains('hidden')));
  });
  $('#global-search').addEventListener('focus', event => { if(event.target.value)setSearchResults(event.target.value); });
  $('#mobile-menu').addEventListener('click',()=>{$('#sidebar').classList.add('mobile-open');$('#mobile-overlay').classList.add('visible');});
  $('#mobile-overlay').addEventListener('click',closeMobileSidebar);
  $('#sidebar-collapse').addEventListener('click',()=>{sidebarCollapsed=!sidebarCollapsed;$('#app-shell').classList.toggle('sidebar-collapsed',sidebarCollapsed);$('#sidebar-collapse').title=sidebarCollapsed?'Expand sidebar':'Collapse sidebar';$('#sidebar-collapse').setAttribute('aria-label',$('#sidebar-collapse').title);});
  $('#mobile-menu').innerHTML=icon('list',21);
  $('#sidebar-collapse').innerHTML=icon('chevron',17);
  $('#global-search-icon').innerHTML=icon('search',22);
  $('#bell-icon').innerHTML=icon('bell',23);
  $('#chevron-icon').innerHTML=icon('chevron',17);
  syncProfile();
  renderNotifications();
  renderSidebar();
  renderCurrentPage();
  if(currentPage==='pos')renderPOSProducts();
  window.setInterval(()=>{
    const time=$('#current-time');if(time)time.textContent=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    const date=$('#current-date');if(date)date.textContent=new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'2-digit',year:'numeric'});
  },30000);

})();
