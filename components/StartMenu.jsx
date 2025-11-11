import { Fragment, useState } from "react";
import {
  FaUserCircle,
  FaPowerOff,
  FaCog,
  FaFolder,
  FaImage,
} from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

const programs = [
  { name: "Zoom", icon: <FaFolder /> },
  { name: "Excel", icon: <FaFolder /> },
  { name: "Word", icon: <FaFolder /> },
  { name: "Photoshop", icon: <FaFolder /> },
  { name: "Illustrator", icon: <FaFolder /> },
  { name: "Chrome", icon: <FaFolder /> },
  { name: "After Effects", icon: <FaFolder /> },
  { name: "Premiere Pro", icon: <FaFolder /> },
  { name: "Notepad", icon: <FaFolder /> },
  { name: "Access", icon: <FaFolder /> },
];

function groupByFirstLetter(items) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  console.log(items);
  return sorted.reduce((groups, item) => {
    const letter = item.name[0].toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(item);
    return groups;
  }, {});
}

export default function StartMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const groupedPrograms = groupByFirstLetter(programs);

  return (
    <div className="start-menu">
      <div className={`start-left ${collapsed ? "collapsed" : ""}`}>
        <div className="top-start">
          <button
            className="top-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            <CiMenuBurger className="top-icon" />
          </button>
          {!collapsed && <span>Start</span>}
        </div>

        <ul className="quick-links">
          <div className="user-profile">
            <FaUserCircle className="user-icon" />
            {!collapsed && <div className="user-name">Administrator</div>}
          </div>
          <li>
            <FaCog />
            {!collapsed && <span>Settings</span>}
          </li>
          <li>
            <FaPowerOff />
            {!collapsed && <span>Power</span>}
          </li>
        </ul>
      </div>
      <div className="start-right">
        {Object.keys(groupedPrograms).map((letter) => (
          <div key={letter}>
            <span>{letter}</span>
            <div className="program-list">
              {groupedPrograms[letter].map((program) => (
                <div key={program.name} className="program-item">
                  {program.icon && program.icon}
                  <span>{program.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
