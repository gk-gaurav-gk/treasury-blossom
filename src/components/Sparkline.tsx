export const Sparkline = () => {
  return (
    <div className="w-full h-12 flex items-end gap-1">
      {/* Simple CSS-based sparkline */}
      <div className="flex-1 bg-primary/20 rounded-sm" style={{ height: '20%' }}></div>
      <div className="flex-1 bg-primary/30 rounded-sm" style={{ height: '35%' }}></div>
      <div className="flex-1 bg-primary/40 rounded-sm" style={{ height: '45%' }}></div>
      <div className="flex-1 bg-primary/50 rounded-sm" style={{ height: '60%' }}></div>
      <div className="flex-1 bg-primary/60 rounded-sm" style={{ height: '40%' }}></div>
      <div className="flex-1 bg-primary/70 rounded-sm" style={{ height: '80%' }}></div>
      <div className="flex-1 bg-primary/80 rounded-sm" style={{ height: '95%' }}></div>
      <div className="flex-1 bg-primary rounded-sm" style={{ height: '100%' }}></div>
      <div className="flex-1 bg-primary/90 rounded-sm" style={{ height: '85%' }}></div>
      <div className="flex-1 bg-primary/80 rounded-sm" style={{ height: '75%' }}></div>
    </div>
  );
};