import { FaUser, FaFolder, FaTerminal } from "react-icons/fa";

export const PROGRAMS = {
  about: {
    id: "about",
    title: "About Me",
    icon: <FaUser />,
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
    icon: <FaFolder />,
    content: <div>My projects go here</div>,
  },

  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: <FaTerminal />,
    content: <div>Fake terminal coming soon</div>,
  },
};
