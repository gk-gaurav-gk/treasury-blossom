/* utils/auth.ts – tiny demo auth helpers */

export type Session = {
  userId: string;
  email: string;
  role: 'Owner' | 'Approver' | 'Preparer' | 'Auditor' | string;
  entityId: string;
  onboarded?: boolean;
};

const SSN_KEY = 'auth_session_v1';
const LCL_KEY = 'auth_session_v1_persist';

export function getSession(): Session | null {
  try {
    const p = localStorage.getItem(LCL_KEY);
    if (p) return JSON.parse(p);
    const s = sessionStorage.getItem(SSN_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session, opts?: { persist?: boolean }) {
  const persist = !!opts?.persist;
  if (persist) {
    localStorage.setItem(LCL_KEY, JSON.stringify(s));
  } else {
    sessionStorage.setItem(SSN_KEY, JSON.stringify(s));
  }
}

export function clearSession() {
  sessionStorage.removeItem(SSN_KEY);
  localStorage.removeItem(LCL_KEY);
}

export function seedUsersIfMissing() {
  const key = 'users_v1';
  const users = JSON.parse(localStorage.getItem(key) || '[]');
  if (!users.length) {
    const seeded = [
      { id: 'u1', email: 'cfo@demo.in', name: 'CFO Demo', role: 'Owner' },
      { id: 'u2', email: 'ops@demo.in', name: 'Ops Demo', role: 'Preparer' },
    ];
    localStorage.setItem(key, JSON.stringify(seeded));
  }
}

export function seedEntityIfMissing() {
  const eid = 'entity-001';
  const entsKey = 'entities_v1';
  const ents = JSON.parse(localStorage.getItem(entsKey) || '{}');
  if (!ents[eid]) {
    ents[eid] = { id: eid, name: 'Urban Threads Pvt Ltd' };
    localStorage.setItem(entsKey, JSON.stringify(ents));
  }
  // seed stubs
  const ensure = (k: string, v: any) => {
    if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify(v));
  };
  ensure('kyc_v1', {});
  ensure('policies_v1', { [eid]: { minRating: 'AA+', maxTenorDays: 365, concentrationCapPct: 40, makerCheckerThreshold: 2500000 } });
  ensure('ledger_v1', []);
  ensure('orders_v1', []);
  ensure('portfolio_v1', []);
  ensure('audit_v1', []);
  ensure('clock_v1', { today: new Date().toISOString().slice(0,10) });
}

/* Optional: call once on first dashboard load to make it feel alive */
export function seedDemoIfFirstRun(entityId: string) {
  const FLAG = 'demoSeeded_v1';
  if (localStorage.getItem(FLAG)) return;

  const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
  ledger.push({
    id: 'ldr1',
    entityId,
    type: 'CREDIT',
    method: 'RTGS',
    amount: 2500000,
    utr: 'UTR' + Math.floor(100000 + Math.random()*900000),
    ts: Date.now(),
    status: 'Credited'
  });
  localStorage.setItem('ledger_v1', JSON.stringify(ledger));

  const orders = JSON.parse(localStorage.getItem('orders_v1') || '[]');
  orders.push({
    id: 'ord1',
    entityId,
    instrumentSlug: 't-bill-91d',
    amount: 900000,
    expectedYield: 7.0,
    tenorDays: 91,
    status: 'Submitted',
    createdBy: 'u2',
    approvals: [],
    settlementDate: new Date(Date.now() + 24*3600*1000).toISOString().slice(0,10),
    events: [{ ts: Date.now(), type: 'CREATED' }]
  });
  orders.push({
    id: 'ord2',
    entityId,
    instrumentSlug: 'g-sec-5y',
    amount: 1800000,
    expectedYield: 7.2,
    tenorDays: 364,
    status: 'Pending Approval',
    createdBy: 'u2',
    approvals: [],
    settlementDate: new Date(Date.now() + 24*3600*1000).toISOString().slice(0,10),
    events: [{ ts: Date.now(), type: 'CREATED' }]
  });
  localStorage.setItem('orders_v1', JSON.stringify(orders));

  localStorage.setItem(FLAG, '1');
}