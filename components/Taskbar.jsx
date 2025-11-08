import { useState, useEffect } from "react";
import WindowsLogo from "../src/assets/microsoft-windows.svg";

export default function Taskbar({
  startOpen,
  onStartClick,
  windows,
  onWindowClick,
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <button
          className={`start-button ${startOpen ? "active" : ""}`}
          onClick={onStartClick}
        >
          <img className="win-logo" src={WindowsLogo} alt="Start" />
        </button>

        <div className="taskbar-apps">
          {Object.entries(windows).map(([name, win]) => (
            <button
              key={name}
              className={`taskbar-app ${!win.minimized ? "active" : ""}`}
              onClick={() => onWindowClick(name)}
            >
              {win.icon}
              {win.active && <div className="taskbar-indicator" />}
            </button>
          ))}
        </div>
      </div>

      <div className="taskbar-right">
        <div className="system-tray">
          <i className="fa-solid fa-volume-high"></i>
          <i className="fa-solid fa-wifi"></i>
          <i className="fa-regular fa-battery-three-quarters"></i>
        </div>
        <div className="taskbar-clock">{time}</div>
      </div>
    </div>
  );
}
