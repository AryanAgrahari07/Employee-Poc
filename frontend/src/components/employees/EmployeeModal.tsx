import React from "react";
import Modal from "../ui/Modal";
import { formatDate, subjectsSummary } from "../../utils/format";

export default function EmployeeModal({ open, onClose, employee, user, onEdit, onDelete, deleting }: any) {
  if (!employee) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{employee.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Employee Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase mb-1">Age</div>
            <div className="text-lg font-semibold text-gray-800">{employee.age ?? "—"}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase mb-1">Class</div>
            <div className="text-lg font-semibold text-gray-800">{employee.class ?? "—"}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase mb-1">Attendance</div>
            <div className="text-lg font-semibold text-gray-800">
              {employee.attendance !== null && employee.attendance !== undefined ? `${employee.attendance}%` : "—"}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase mb-1">ID</div>
            <div className="text-sm font-mono text-gray-600 truncate">{employee.id}</div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-xs text-gray-500 uppercase mb-2">Subjects</div>
          <div className="flex flex-wrap gap-2">
            {employee.subjects && employee.subjects.length > 0 ? (
              employee.subjects.map((subject: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No subjects assigned</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t text-xs text-gray-500">
          <div>
            <span className="font-medium">Created:</span> {formatDate(employee.createdAt)}
          </div>
          {employee.updatedAt && (
            <div>
              <span className="font-medium">Updated:</span> {formatDate(employee.updatedAt)}
            </div>
          )}
        </div>

        {user?.role === "ADMIN" && (
          <div className="flex gap-2 pt-4 border-t">
            <button
              onClick={() => {
                onClose();
                onEdit?.(employee);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
                  onDelete?.(employee.id);
                }
              }}
              disabled={deleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
