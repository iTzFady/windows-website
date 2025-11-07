import { useState } from "react";

export default function Windows({ title, children }) {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function startDrag(e) {
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  }
  function onDrag(e) {
    if (dragging) setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function stopDrag() {
    setDragging(false);
  }

  return (
    <div
      className="window"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      style={{ top: pos.y, left: pos.x }}
    >
      <div className="titleBar" onMouseDown={startDrag}>
        {title}
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
