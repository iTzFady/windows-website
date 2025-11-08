import { useState } from "react";
import Desktop from "../components/Desktop";
import Taskbar from "../components/Taskbar";
import Windows from "../components/Windows";
import "./App.css";
import StartMenu from "../components/StartMenu";

function App() {
  const [startOpen, setStartOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState({
    about: {
      visible: true,
      minimized: false,
      icon: <i className="fa-solid fa-address-card"></i>,
      title: "About Me",
      content: <p>Hello, I'm Fady — a Web Developer.</p>,
    },
  });
  function toggleStart() {
    setStartOpen(!startOpen);
  }
  function toggleMinimize(appName) {
    setOpenWindows((prev) => ({
      ...prev,
      [appName]: {
        ...prev[appName],
        minimized: !prev[appName].minimized,
      },
    }));
  }
  function handleClose(appName) {
    setOpenWindows((prev) => {
      const updated = { ...prev };
      delete updated[appName];
      return updated;
    });
  }

  return (
    <Desktop>
      {Object.entries(openWindows).map(([name, win]) => (
        <Windows
          key={name}
          title={win.title}
          icon={win.icon}
          minimized={win.minimized}
          visible={win.visible}
          onMinimize={() => toggleMinimize(name)}
          onClose={() => handleClose(name)}
        >
          {win.content}
        </Windows>
      ))}
      <Taskbar
        startOpen={startOpen}
        onStartClick={toggleStart}
        windows={openWindows}
        onWindowClick={toggleMinimize}
      />
      {startOpen && <StartMenu />}
    </Desktop>
  );
}

export default App;
