import React from "react";

export default function Button({ children, onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded bg-primary text-white hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
}
