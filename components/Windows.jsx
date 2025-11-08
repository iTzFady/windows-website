import { useState, useRef } from "react";

export default function Windows({
  title,
  icon,
  children,
  onMinimize,
  onRestore,
  onClose,
  minimized,
  visible,
}) {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [maximized, setMaximized] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const windowRef = useRef(null);
  const originalPos = useRef(pos);
  const originalSize = useRef(size);

  function handleMaximize() {
    if (maximized) {
      handleRestore();
    } else {
      originalPos.current = pos;
      originalSize.current = size;
      setMaximized(true);
      setRestoring(false);
    }
  }

  function handleRestore() {
    if (minimized || maximized) {
      setRestoring(true);

      setTimeout(() => {
        setMaximized(false);
        setPos(originalPos.current);
        setSize(originalSize.current);

        setTimeout(() => setRestoring(false), 300);
      }, 10);

      if (onRestore) onRestore();
    }
  }

  function startDrag(e) {
    if (maximized || minimized) return;
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  }

  function onDrag(e) {
    if (dragging && !maximized && !minimized) {
      setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  }

  function stopDrag() {
    setDragging(false);
  }

  function handleTitleBarDoubleClick() {
    if (maximized) {
      handleRestore();
    } else {
      handleMaximize();
    }
  }

  if (!visible) return null;

  const windowStyle = {
    top: pos.y,
    left: pos.x,
    width: maximized ? "100vw" : `${size.width}px`,
    height: maximized ? "calc(100vh - 40px)" : `${size.height}px`,
    position: "absolute",
    zIndex: minimized ? -1 : 10,
  };

  const windowClasses = [
    "window",
    !visible && "hidden",
    minimized && "minimized",
    maximized && "maximized",
    restoring && "restoring",
  ]
    .filter(Boolean)
    .join(" ");

  if (!visible) return null;

  return (
    <div
      ref={windowRef}
      className={windowClasses}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      style={windowStyle}
    >
      <div
        className="titleBar"
        onMouseDown={startDrag}
        onDoubleClick={handleTitleBarDoubleClick}
      >
        <div>
          {icon}
          {title}
        </div>
        <div>
          <button
            className="window-button"
            onClick={onClose}
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
            aria-label={maximized ? "Restore" : "Maximize"}
          >
            <svg width="10" height="10">
              {maximized ? (
                <path
                  d="M2,2 L8,2 L8,8 L2,8 Z M3,3 L7,3 L7,7 L3,7 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ) : (
                <rect
                  x="1"
                  y="1"
                  width="8"
                  height="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              )}
            </svg>
          </button>
          <button
            className="window-button"
            onClick={onMinimize}
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
