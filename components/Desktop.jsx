export default function Desktop({ children, onContextMenu }) {
  return (
    <div className="desktop" onContextMenu={onContextMenu}>
      {children}
    </div>
  );
}
