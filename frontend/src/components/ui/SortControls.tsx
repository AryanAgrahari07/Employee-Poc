import React from "react";

type SortField = "name" | "age" | "class" | "createdAt" | "attendance";
type SortDirection = "ASC" | "DESC";

interface SortControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

export default function SortControls({ sortField, sortDirection, onSortChange }: SortControlsProps) {
  const sortFields: { value: SortField; label: string }[] = [
    { value: "name", label: "Name" },
    { value: "age", label: "Age" },
    { value: "class", label: "Class" },
    { value: "attendance", label: "Attendance" },
    { value: "createdAt", label: "Date Created" }
  ];

  function handleFieldChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onSortChange(e.target.value as SortField, sortDirection);
  }

  function handleDirectionChange() {
    onSortChange(sortField, sortDirection === "ASC" ? "DESC" : "ASC");
  }

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      <select
        value={sortField}
        onChange={handleFieldChange}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {sortFields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>
      <button
        onClick={handleDirectionChange}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
        title={`Sort ${sortDirection === "ASC" ? "Ascending" : "Descending"}`}
      >
        {sortDirection === "ASC" ? (
          <>
            <span>↑</span>
            <span className="text-xs text-gray-500">Asc</span>
          </>
        ) : (
          <>
            <span>↓</span>
            <span className="text-xs text-gray-500">Desc</span>
          </>
        )}
      </button>
    </div>
  );
}

