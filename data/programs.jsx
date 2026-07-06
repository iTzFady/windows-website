import { FaUser, FaFolder, FaTerminal } from "react-icons/fa";
import thisPCIcon from "../src/assets/thispc.webp";
import userIcon from "../src/assets/user.webp";
import folderIcon from "../src/assets/folder.webp";
import cmdIcon from "../src/assets/CMD.webp";

export const PROGRAMS = {
  about: {
    id: "about",
    title: "Fady Samy",
    icon: userIcon,
    defaultSize: { width: 420, height: 300 },
    content: (
      <div>
        <h2>About Me</h2>
        <p>Hello, I'm Fady — a Web Developer.</p>
      </div>
    ),
  },

  projects: {
    id: "projects",
    title: "Projects",
    icon: folderIcon,
    content: <div>My projects go here</div>,
  },

  terminal: {
    id: "terminal",
    title: "Command prompt",
    icon: cmdIcon,
    content: <div>Fake terminal coming soon</div>,
  },
  thispc: {
    id: "thispc",
    title: "This PC",
    icon: thisPCIcon,
    content: <div>My computer goes here</div>,
  },
};
