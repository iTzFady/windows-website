import {
  FaUserCircle,
  FaPowerOff,
  FaCog,
  FaFolder,
  FaImage,
} from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

export default function StartMenu() {
  return (
    <div className="start-menu">
      <div className="start-left">
        <div className="top-start">
          <button className="top-button">
            <CiMenuBurger className="top-icon" />
          </button>
          <div className="top-label">Start</div>
        </div>

        <ul className="quick-links">
          <div className="user-profile">
            <FaUserCircle className="user-icon" />
            <div className="user-name">Adminstrator</div>
          </div>
          <li>
            <FaCog /> Settings
          </li>
          <li>
            <FaPowerOff /> Power
          </li>
        </ul>
      </div>

      <div className="start-right">
        <div className="tile-grid">
          <div className="tile blue large">Mail</div>
          <div className="tile gray">Microsoft Edge</div>
          <div className="tile green">Calendar</div>
          <div className="tile red">Store</div>
          <div className="tile blue">Weather</div>
          <div className="tile gray">Photos</div>
        </div>
      </div>
    </div>
  );
}
