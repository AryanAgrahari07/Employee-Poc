import React from "react";

export default function EmptyState({ title = "No items", description = "" }: any) {
  return (
    <div className="p-12 text-center">
      <div className="text-6xl mb-4">📭</div>
      <div className="text-2xl font-bold text-gray-800 mb-2">{title}</div>
      {description && <div className="text-gray-600">{description}</div>}
    </div>
  );
}
