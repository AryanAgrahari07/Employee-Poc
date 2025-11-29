import React from "react";
import { subjectsSummary } from "../../utils/format";
import MenuButton from "./MenuButton";

export default function EmployeeCard({ node, onClick, user, onEdit, onDelete }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-200 cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            {node.name}
          </h3>
          {node.class && (
            <div className="mt-1">
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {node.class}
              </span>
            </div>
          )}
        </div>
        {node.attendance !== null && node.attendance !== undefined && (
          <div className="flex-shrink-0 ml-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
              {node.attendance}%
            </div>
          </div>
        )}
      </div>

      {node.age && (
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Age:</span> {node.age}
        </div>
      )}

      <div className="mt-3 mb-4">
        <div className="text-xs text-gray-500 uppercase mb-1">Subjects</div>
        <div className="text-sm text-gray-700 line-clamp-2">
          {subjectsSummary(node.subjects) || "No subjects"}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {new Date(node.createdAt).toLocaleDateString()}
        </div>
        {user?.role === "ADMIN" && (
          <div onClick={(e) => e.stopPropagation()}>
            <MenuButton
              onEdit={() => onEdit?.(node)}
              onFlag={() => alert("Flag functionality")}
              onDelete={() => {
                if (confirm(`Are you sure you want to delete ${node.name}?`)) {
                  onDelete?.(node.id);
                }
              }}
            />
          </div>
        )}
      </div>

      <button
        onClick={onClick}
        className="mt-3 w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
      >
        View Details →
      </button>
    </div>
  );
}
