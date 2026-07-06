import { Fragment, useState, useMemo } from "react";
import {
  FaUserCircle,
  FaPowerOff,
  FaCog,
  FaFolder,
  FaImage,
} from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { PROGRAMS } from "../data/programs";

function groupByFirstLetter(items) {
  const programs = Object.values(items);
  const sorted = [...programs].sort((a, b) => a.title.localeCompare(b.title));
  return sorted.reduce((groups, item) => {
    const letter = item.title[0].toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(item);
    return groups;
  }, {});
}

export default function StartMenu({ onLaunch }) {
  const [collapsed, setCollapsed] = useState(true);
  const groupedPrograms = useMemo(() => groupByFirstLetter(PROGRAMS), []);

  return (
    <div className="start-menu">
      <div className={`start-left ${collapsed ? "" : "expanded"}`}>
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
                <div
                  key={program.id}
                  className="program-item"
                  onClick={() => onLaunch(program.id)}
                >
                  <img
                    src={program.icon}
                    alt={program.title}
                    width={25}
                    height={25}
                  />
                  <span>{program.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
