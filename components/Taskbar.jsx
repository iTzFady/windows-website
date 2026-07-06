import { useState, useEffect } from "react";
import WindowsLogo from "../src/assets/microsoft-windows.svg?react";
import Network from "../src/assets/network.webp";
import Volume from "../src/assets/volume.webp";
import SearchInput from "./SearchInput";

export default function Taskbar({
  startOpen,
  onStartClick,
  windows,
  onWindowClick,
}) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
      setDate(now.toLocaleDateString());
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
          <WindowsLogo className="win-logo" />
        </button>
        <SearchInput />
        <div className="taskbar-apps">
          {Object.entries(windows).map(([name, win]) => (
            <button
              key={name}
              className={`taskbar-app ${!win.minimized ? "active" : ""}`}
              onClick={() => onWindowClick(name)}
            >
              <img src={win.icon} alt={win.title} width={16} height={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="taskbar-right">
        <div className="system-tray">
          <img src={Volume} alt="Volume" width={20} height={20} />
          <img src={Network} alt="Network" width={20} height={20} />
          <span className="taskbar-language">eng</span>
        </div>
        <div>
          <div className="taskbar-clock">{time}</div>
          <div className="taskbar-clock">{date}</div>
        </div>
      </div>
    </div>
  );
}
