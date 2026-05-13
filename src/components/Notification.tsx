import { useState, useEffect } from "react";
import "../styles/Notification.css";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export const Notification = ({
  message,
  type,
  duration = 5000,
  onClose,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification notification-${type}`}>
      <p>{message}</p>
      <button
        className="notification-close"
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
      >
        ✕
      </button>
    </div>
  );
};
