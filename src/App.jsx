import { useState, useEffect } from "react";
import Desktop from "../components/Desktop";
import Taskbar from "../components/Taskbar";
import Windows from "../components/Windows";
import "./App.css";
import StartMenu from "../components/StartMenu";
import DesktopIcon from "../components/DesktopIcon";
import { DESKTOP_ICONS } from "../data/desktopIcons";
import { PROGRAMS } from "../data/programs";
import ContextMenu from "../components/ContextMenu";
import BootScreen from "../components/BootScreen";
import LoginScreen from "../components/LoginPage";
import { AnimatePresence, motion } from "framer-motion";
const SYSTEM_STATES = {
  BOOT: "boot",
  LOGIN: "login",
  DESKTOP: "desktop",
};
function App() {
  const [zCounter, setZCounter] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [systemState, setSystemState] = useState(SYSTEM_STATES.BOOT);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const [openWindows, setOpenWindows] = useState({
    about: {
      visible: true,
      minimized: false,
      active: true,
      zindex: 10,
      icon: <i className="fa-solid fa-address-card"></i>,
      title: "About Me",
      content: <p>Hello, I'm Fady — a Web Developer.</p>,
    },
  });
  useEffect(() => {
    const close = () => setContextMenu((prev) => ({ ...prev, visible: false }));
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.altKey && e.key === "Tab") {
        e.preventDefault();

        const list = getFocusableWindows();
        if (list.length === 0) return;

        const currentIndex = list.findIndex((name) => openWindows[name].active);

        const nextIndex =
          currentIndex === -1 || currentIndex === list.length - 1
            ? 0
            : currentIndex + 1;

        focusWindow(list[nextIndex]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openWindows]);

  function toggleStart() {
    setStartOpen(!startOpen);
  }
  function focusWindow(appName) {
    setOpenWindows((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((name) => {
        updated[name] = {
          ...updated[name],
          active: name === appName,
        };
      });
      updated[appName].zindex = zCounter;
      updated[appName].minimized = false;
      return updated;
    });
    setZCounter((z) => z + 1);
  }
  function toggleMinimize(appName) {
    setOpenWindows((prev) => ({
      ...prev,
      [appName]: {
        ...prev[appName],
        minimized: true,
        active: false,
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
  function handleTaskbarClick(appName) {
    const win = openWindows[appName];
    if (!win) return;

    if (win.minimized) {
      focusWindow(appName);
    } else if (!win.active) {
      focusWindow(appName);
    } else {
      toggleMinimize(appName);
    }
  }
  function getFocusableWindows() {
    return Object.entries(openWindows)
      .filter(([win]) => win.visible && !win.minimized)
      .map(([name]) => name);
  }

  function openProgram(programId) {
    const program = PROGRAMS[programId];
    if (!program) return;

    setOpenWindows((prev) => ({
      ...prev,
      [programId]: {
        visible: true,
        minimized: false,
        ...program,
      },
    }));
  }
  function handleContextAction(action) {
    setContextMenu({ visible: false, x: 0, y: 0 });

    if (action === "display") openProgram("display");
    if (action === "personalize") openProgram("personalize");
    if (action === "refresh") {
      console.log("Refreshed");
    }
  }
  const renderDesktop = () => {
    return (
      <Desktop
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        {Object.entries(openWindows).map(([name, win]) => (
          <Windows
            key={name}
            title={win.title}
            minimized={win.minimized}
            visible={win.visible}
            active={win.active}
            zindex={win.zindex}
            onFocus={() => focusWindow(name)}
            icon={win.icon}
            onMinimize={() => toggleMinimize(name)}
            onClose={() => handleClose(name)}
          >
            {win.content}
          </Windows>
        ))}
        {contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onAction={handleContextAction}
          />
        )}
        {DESKTOP_ICONS.map((icon) => {
          const program = PROGRAMS[icon.programId];

          return (
            <DesktopIcon
              key={icon.programId}
              icon={program.icon}
              title={program.title}
              x={icon.x}
              y={icon.y}
              selected={selectedIcon === icon.programId}
              onSelect={() => setSelectedIcon(icon.programId)}
              onOpen={() => openProgram(icon.programId)}
              onDoubleClick={() => openProgram(icon.programId)}
            />
          );
        })}

        <Taskbar
          startOpen={startOpen}
          onStartClick={toggleStart}
          windows={openWindows}
          onWindowClick={handleTaskbarClick}
        />
        {startOpen && (
          <StartMenu
            onLaunch={(programId) => {
              openProgram(programId);
              setStartOpen(false);
            }}
          />
        )}
      </Desktop>
    );
  };
  return (
    <AnimatePresence mode="wait">
      {systemState === SYSTEM_STATES.BOOT && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BootScreen onComplete={() => setSystemState(SYSTEM_STATES.LOGIN)} />
        </motion.div>
      )}

      {systemState === SYSTEM_STATES.LOGIN && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LoginScreen onLogin={() => setSystemState(SYSTEM_STATES.DESKTOP)} />
        </motion.div>
      )}

      {systemState === SYSTEM_STATES.DESKTOP && (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {renderDesktop()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
