"use client";

import { ErrorNotificationProps } from "@/interfaces";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const ErrorNotification = ({
  message,
  onClose,
  addClass,
  duration = 1000,
}: ErrorNotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }  bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex items-start gap-3 z-50 animate-slide-in ${addClass}`}
    >
      <XCircle className="w-6 h-6 mt-1 text-red-500" />
      <div className="flex flex-col">
        <strong className="font-bold">Error:</strong>
        <span className="text-sm">{message}</span>
      </div>
      <button
        className="ml-4 text-red-500 hover:text-red-700"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};
