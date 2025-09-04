// Balance computation utilities
export const computeBalances = (entityId: string) => {
  const ledger = JSON.parse(localStorage.getItem("ledger_v1") || "[]").filter((l: any) => l.entityId === entityId);
  const credits = ledger.filter((l: any) => l.type === "CREDIT" && l.status === "Credited").reduce((s: number, l: any) => s + l.amount, 0);
  const inSettle = ledger.filter((l: any) => l.type === "DEBIT" && l.status === "In-Settlement").reduce((s: number, l: any) => s + l.amount, 0);
  const invested = (JSON.parse(localStorage.getItem("portfolio_v1") || "[]") as any[])
    .filter((h) => h.entityId === entityId)
    .reduce((s, h) => s + h.principal, 0);
  return {
    available: Math.max(0, credits - inSettle),
    inSettlement: inSettle,
    invested,
  };
};