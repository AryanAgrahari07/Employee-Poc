import React from "react";

interface PaginationProps {
  onNext: () => void;
  hasNext: boolean;
  currentCount?: number;
  totalCount?: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
}

export default function Pagination({ 
  onNext, 
  hasNext, 
  currentCount = 0,
  totalCount = 0,
  pageSize = 10,
  onPageSizeChange
}: PaginationProps) {
  const pageSizes = [10, 20, 50];

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{currentCount}</span> of <span className="font-medium">{totalCount}</span> employees
        </div>
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Items per page:</label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {hasNext ? (
          <button
            onClick={onNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm font-medium transition-colors"
          >
            Load More
          </button>
        ) : (
          <span className="text-sm text-gray-500">All items loaded</span>
        )}
      </div>
    </div>
  );
}
