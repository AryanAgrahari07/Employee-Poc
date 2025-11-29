import React, { useState } from "react";

export default function EmployeeForm({ initial, onSave, onCancel, loading }: any) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    age: initial?.age || undefined,
    class: initial?.class || "",
    subjects: (initial?.subjects || []).join(", "),
    attendance: initial?.attendance || undefined
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: form.name,
      ...(form.age && { age: form.age }),
      ...(form.class && { class: form.class }),
      subjects: form.subjects ? form.subjects.split(",").map((s) => s.trim()).filter(Boolean) : [],
      ...(form.attendance !== undefined && { attendance: form.attendance })
    };
    onSave(payload);
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter employee name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            min="1"
            value={form.age || ""}
            onChange={(e) => setForm({ ...form, age: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Age"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <input
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Class"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subjects (comma separated)</label>
        <input
          value={form.subjects}
          onChange={(e) => setForm({ ...form, subjects: e.target.value })}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Math, Science, English"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={form.attendance || ""}
          onChange={(e) => setForm({ ...form, attendance: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0-100"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
