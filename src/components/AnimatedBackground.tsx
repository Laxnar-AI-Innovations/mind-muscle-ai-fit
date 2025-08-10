import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="blob-animate absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" style={{ animationDelay: "0s" }} />
      <div className="blob-animate absolute top-40 -right-16 w-80 h-80 rounded-full bg-neon-blue/20 blur-3xl" style={{ animationDelay: "4s" }} />
      <div className="blob-animate absolute -bottom-16 left-1/3 w-96 h-96 rounded-full bg-primary/10 blur-3xl" style={{ animationDelay: "8s" }} />
    </div>
  );
};

export default AnimatedBackground;
