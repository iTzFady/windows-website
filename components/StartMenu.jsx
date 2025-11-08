export default function StartMenu() {
  return (
    <div className="start-menu">
      <div className="start-left">
        <ul>
          <li>Documents</li>
          <li>Pictures</li>
          <li>Settings</li>
          <li>Power</li>
        </ul>
      </div>
      <div className="start-right">
        <div className="tile-grid">
          <div className="tile blue">Mail</div>
          <div className="tile red">Store</div>
          <div className="tile green">Calendar</div>
          <div className="tile gray">Edge</div>
        </div>
      </div>
    </div>
  );
}
