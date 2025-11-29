import React, { useEffect } from "react";

export default function Modal({ open, onClose, children }: any) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-white rounded-lg shadow-2xl p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
