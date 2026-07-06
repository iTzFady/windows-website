export default function DesktopContextMenu({ x, y, onAction }) {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div className="menu-item">View ▸</div>
      <div className="menu-item" onClick={() => onAction("refresh")}>
        Refresh
      </div>
      <div className="menu-separator" />
      <div className="menu-item" onClick={() => onAction("display")}>
        Display settings
      </div>
      <div className="menu-item" onClick={() => onAction("personalize")}>
        Personalize
      </div>
    </div>
  );
}
