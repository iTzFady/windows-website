import { useEffect } from "react";
import WindowsLogo from "../src/assets/microsoft-windows-blue.svg";
import LoadingSpinner from "../src/assets/Windows-loading-cargando.gif";
export default function BootScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="boot-screen">
      <img src={WindowsLogo} className="boot-logo" />
      <img className="spinner" src={LoadingSpinner} />
    </div>
  );
}
