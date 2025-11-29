import React from "react";
import { formatDate, subjectsSummary } from "../../utils/format";
import type { EmployeeEdge } from "../../types/index";
import MenuButton from "./MenuButton";

interface GridViewProps {
  edges: any[];
  onRowClick: (id: string) => void;
  user: any;
  onEdit: (employee: any) => void;
  onDelete: (id: string) => void;
  sortField?: string;
  sortDirection?: "ASC" | "DESC";
  onSort?: (field: string) => void;
}

export default function GridView({ edges, onRowClick, user, onEdit, onDelete, sortField, sortDirection, onSort }: GridViewProps) {
  const SortableHeader = ({ field, label }: { field: string; label: string }) => {
    const isSorted = sortField === field;
    return (
      <th 
        className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${onSort ? 'cursor-pointer hover:bg-blue-100' : ''}`}
        onClick={() => onSort?.(field)}
      >
        <div className="flex items-center gap-1">
          {label}
          {isSorted && (
            <span className="text-blue-600">
              {sortDirection === "ASC" ? "↑" : "↓"}
            </span>
          )}
        </div>
      </th>
    );
  };
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <tr>
            <SortableHeader field="name" label="Name" />
            <SortableHeader field="age" label="Age" />
            <SortableHeader field="class" label="Class" />
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subjects</th>
            <SortableHeader field="attendance" label="Attendance" />
            <SortableHeader field="createdAt" label="Created" />
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {edges.map((e: EmployeeEdge) => {
            const n = e.node;
            return (
              <tr
                key={n.id}
                className="hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => onRowClick(n.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{n.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{n.age ?? "—"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {n.class ? (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {n.class}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {subjectsSummary(n.subjects)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {n.attendance !== null && n.attendance !== undefined ? (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {n.attendance}%
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(n.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  {user?.role === "ADMIN" && (
                    <MenuButton
                      onEdit={() => {
                        const found = edges.find((e: any) => e.node.id === n.id);
                        onEdit?.(found?.node);
                      }}
                      onFlag={() => alert("Flag functionality")}
                      onDelete={() => {
                        if (confirm(`Are you sure you want to delete ${n.name}?`)) {
                          onDelete?.(n.id);
                        }
                      }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
