import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { EMPLOYEES_QUERY } from "../graphql/queries/employees";
import useUIStore from "../store/uiStore";
import GridView from "../components/employees/GridView";
import TileView from "../components/employees/TileView";
import Spinner from "../components/ui/Spinner";
import Pagination from "../components/ui/Pagination";
import SortControls from "../components/ui/SortControls";
import EmployeeModal from "../components/employees/EmployeeModal";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmptyState from "../components/common/EmptyState";
import { PAGE_SIZE } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../graphql/mutations/addEmployee";
import { UPDATE_EMPLOYEE } from "../graphql/mutations/updateEmployee";
import { DELETE_EMPLOYEE } from "../graphql/mutations/deleteEmployee";

export default function EmployeesPage() {
  const view = useUIStore((s) => s.view);
  const setView = useUIStore((s) => s.setView);
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [employeeDetail, setEmployeeDetail] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [sortField, setSortField] = useState<"name" | "age" | "class" | "createdAt" | "attendance">("createdAt");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const sort = useMemo(() => ({
    field: sortField,
    direction: sortDirection
  }), [sortField, sortDirection]);

  const { data, loading, fetchMore, refetch } = useQuery(EMPLOYEES_QUERY, {
    variables: { 
      first: pageSize,
      after: undefined, // Reset cursor when sort/pageSize changes
      sort
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  });

  const [addEmployee, { loading: adding }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      setShowAddForm(false);
      refetch();
    },
    onError: (err) => {
      alert(`Error: ${err.message}`);
    }
  });

  const [updateEmployee, { loading: updating }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      setEditingEmployee(null);
      setSelectedId(null);
      setEmployeeDetail(null);
      refetch();
    },
    onError: (err) => {
      alert(`Error: ${err.message}`);
    }
  });

  const [deleteEmployee, { loading: deleting }] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      setSelectedId(null);
      setEmployeeDetail(null);
      refetch();
    },
    onError: (err) => {
      alert(`Error: ${err.message}`);
    }
  });

  const edges = data?.employees?.edges ?? [];
  const pageInfo = data?.employees?.pageInfo ?? { hasNextPage: false, endCursor: null };

  function openDetails(id: string) {
    const found = edges.find((e: any) => e.node.id === id);
    setSelectedId(id);
    setEmployeeDetail(found?.node ?? null);
  }

  function closeDetails() {
    setSelectedId(null);
    setEmployeeDetail(null);
  }

  function onNext() {
    if (!pageInfo?.endCursor) return;
    fetchMore({
      variables: { 
        first: pageSize, 
        after: pageInfo.endCursor,
        sort
      }
    });
  }

  function handleSortChange(field: "name" | "age" | "class" | "createdAt" | "attendance", direction: "ASC" | "DESC") {
    setSortField(field);
    setSortDirection(direction);
    // Reset pagination when sorting changes
    refetch({ 
      first: pageSize,
      after: undefined,
      sort: { field, direction }
    });
  }

  function handlePageSizeChange(newSize: number) {
    setPageSize(newSize);
    refetch({ 
      first: newSize,
      after: undefined,
      sort
    });
  }

  function handleAddEmployee(formData: any) {
    addEmployee({ variables: { input: formData } });
  }

  function handleUpdateEmployee(id: string, formData: any) {
    updateEmployee({ variables: { id, input: formData } });
  }

  function handleDeleteEmployee(id: string) {
    if (confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
      deleteEmployee({ variables: { id } });
    }
  }

  function handleEdit(employee: any) {
    setEditingEmployee(employee);
    setSelectedId(null);
    setEmployeeDetail(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {data?.employees?.totalCount ?? "—"} total
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SortControls
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView("grid")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("tile")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === "tile"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tile
            </button>
          </div>
          {user?.role === "ADMIN" && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              + Add Employee
            </button>
          )}
        </div>
      </div>

      {loading && <Spinner />}

      {!loading && edges.length === 0 && (
        <EmptyState title="No employees found" description="Try adding some employees or re-seeding the database." />
      )}

      {!loading && edges.length > 0 && (
        <>
          {view === "grid" ? (
            <GridView 
              edges={edges} 
              onRowClick={openDetails} 
              user={user}
              onEdit={handleEdit}
              onDelete={handleDeleteEmployee}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={(field) => {
                const newDirection = sortField === field && sortDirection === "ASC" ? "DESC" : "ASC";
                handleSortChange(field as any, newDirection);
              }}
            />
          ) : (
            <TileView 
              edges={edges} 
              onCardClick={openDetails} 
              user={user}
              onEdit={handleEdit}
              onDelete={handleDeleteEmployee}
            />
          )}

          <Pagination 
            onNext={onNext} 
            hasNext={pageInfo.hasNextPage}
            currentCount={edges.length}
            totalCount={data?.employees?.totalCount ?? 0}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}

      <EmployeeModal 
        open={!!selectedId} 
        onClose={closeDetails} 
        employee={employeeDetail} 
        user={user} 
        onEdit={handleEdit}
        onDelete={handleDeleteEmployee}
        deleting={deleting}
      />

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Employee</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <EmployeeForm
              onSave={handleAddEmployee}
              onCancel={() => setShowAddForm(false)}
              loading={adding}
            />
          </div>
        </div>
      )}

      {editingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Employee</h2>
              <button
                onClick={() => setEditingEmployee(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <EmployeeForm
              initial={editingEmployee}
              onSave={(formData) => handleUpdateEmployee(editingEmployee.id, formData)}
              onCancel={() => setEditingEmployee(null)}
              loading={updating}
            />
          </div>
        </div>
      )}
    </div>
  );
}
