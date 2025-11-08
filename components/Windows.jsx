import { useState } from "react";

export default function Windows({ title, icon, children }) {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  function handleClose() {
    setVisible(false);
  }

  function handleMinimize() {
    setMinimized(true);
  }

  function handleMaximize() {
    setMaximized((prev) => !prev);
  }

  function startDrag(e) {
    if (maximized) return;
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  }
  function onDrag(e) {
    if (dragging) setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function stopDrag() {
    setDragging(false);
  }

  if (!visible) return null;

  let windowsStyle = {
    top: pos.y,
    left: pos.x,
    position: "absolute",
  };

  if (maximized) {
    windowsStyle = {
      ...windowsStyle,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    };
  }

  if (minimized) {
    windowsStyle.display = "none";
  }

  return (
    <div
      className={`window ${!visible ? "hidden" : ""} ${
        minimized ? "minimized" : ""
      } ${maximized ? "maximized" : ""}`}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      style={windowsStyle}
    >
      <div className="titleBar" onMouseDown={startDrag}>
        <div>
          {icon}
          {title}
        </div>
        <div>
          <button
            className="window-button"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg width="10" height="10">
              <line
                x1="1"
                y1="1"
                x2="9"
                y2="9"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="9"
                y1="1"
                x2="1"
                y2="9"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>
          <button
            className="window-button"
            onClick={handleMaximize}
            aria-label="Maximize"
          >
            <svg width="10" height="10">
              <rect
                x="1"
                y="1"
                width="8"
                height="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>
          <button
            className="window-button"
            onClick={handleMinimize}
            aria-label="Minimize"
          >
            <svg width="10" height="10">
              <rect y="9" width="10" height="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
