import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <div className="lock-login-container">
      <AnimatePresence mode="wait">
        {phase === "lock" && (
          <motion.div
            key="lock"
            className="lock-screen"
            onClick={() => setPhase("login")}
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
          >
            <div className="dateTime">
              <div className="lock-time">{time}</div>
              <div className="lock-date">{date}</div>
            </div>
          </motion.div>
        )}
        {phase === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="login-screen"
          >
            <div className="login-card">
              <div className="avatar" />
              <h2 className="username">Fady Samy</h2>
              <button className="hint" onClick={onLogin}>
                Sign in
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
