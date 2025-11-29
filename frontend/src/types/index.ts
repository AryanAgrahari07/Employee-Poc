export type Employee = {
  id: string;
  name: string;
  age?: number | null;
  class?: string | null;
  subjects: string[];
  attendance?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type EmployeeEdge = {
  cursor: string;
  node: Employee;
};

export type User = {
  id: string;
  username: string;
  role: "ADMIN" | "EMPLOYEE";
};

