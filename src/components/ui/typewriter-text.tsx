import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  animate?: boolean;
  className?: string;
}

export default function TypewriterText({ text, speed = 18, animate = true, className = "whitespace-pre-line" }: TypewriterTextProps) {
  const [display, setDisplay] = useState(animate ? "" : text);

  useEffect(() => {
    if (!animate) {
      setDisplay(text);
      return;
    }

    setDisplay("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, animate]);

  return <div className={className}>{display}</div>;
}
