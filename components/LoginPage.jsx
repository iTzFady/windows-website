import { useEffect, useState } from "react";
export default function LoginScreen({ onLogin }) {
  const [phase, setPhase] = useState("lock");
  const [unlocking, setUnlocking] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = dateTime.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  function handleUnlock() {
    setUnlocking(true);
    setTimeout(() => setPhase("login"), 500);
    setTimeout(() => setUnlocking(false), 600);
  }
  const loginScreen = () => {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="avatar" />
          <h2 className="username">Fady Samy</h2>
          <button className="hint" onClick={onLogin}>
            Sign in
          </button>
        </div>
      </div>
    );
  };
  const lockScreen = () => {
    return (
      <div
        className={`lock-screen ${phase === "login" ? "hidden" : ""} ${
          unlocking ? "unlocking" : ""
        }`}
        onClick={handleUnlock}
      >
        <div className="dateTime">
          <div className="lock-time">{time}</div>
          <div className="lock-date">{date}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="lock-login-container">
      {lockScreen()}
      {phase === "login" && loginScreen()}
    </div>
  );
}
