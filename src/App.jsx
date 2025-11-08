import Desktop from "../components/Desktop";
import Taskbar from "../components/Taskbar";
import Windows from "../components/Windows";
import "./App.css";

function App() {
  return (
    <Desktop>
      <Windows
        title="About Me"
        icon={<i className="fa-solid fa-address-card"></i>}
      >
        <p>Hello, I’m Fady — a Web Developer.</p>
      </Windows>
      <Taskbar />
    </Desktop>
  );
}

export default App;
