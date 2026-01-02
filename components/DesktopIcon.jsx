export default function DesktopIcon({
  icon,
  title,
  x,
  y,
  selected,
  onSelect,
  onDoubleClick,
}) {
  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""}`}
      style={{ left: x, top: y }}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      tabIndex={0}
    >
      <div className="desktop-icon-image">{icon}</div>
      <div className="desktop-icon-title">{title}</div>
    </div>
  );
}
