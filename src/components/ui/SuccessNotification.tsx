"use client";

import { useEffect, useState } from "react";

export const SuccessNotification = ({
  message,
  onClose,
  addClass = "",
}: {
  message: string;
  onClose: () => void;
  addClass?: string;
}) => {
  const [fade, setFade] = useState(false);

  const displayDuration = 3000;
  const fadeDuration = 1000;

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), displayDuration);
    const remove = setTimeout(() => onClose(), displayDuration + fadeDuration);
    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, [onClose, displayDuration, fadeDuration]);

  return (
    <div
      className={`transition-opacity duration-[${fadeDuration}ms] ease-in-out ${
        fade ? "opacity-0" : "opacity-100"
      } bg-green-200 border border-green-500 text-green-900 px-4 py-2 rounded shadow ${addClass}`}
    >
      {message}
    </div>
  );
};
