import WindowsLogo from "../src/assets/microsoft-windows.svg";

export default function Taskbar({ childern }) {
  return (
    <div className="taskbar">
      <button className="start-button">
        <img className="win-logo" src={WindowsLogo} />
      </button>
      {childern}
    </div>
  );
}
