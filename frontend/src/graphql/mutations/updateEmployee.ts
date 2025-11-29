import { gql } from "@apollo/client";

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: AddEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      age
      class
      subjects
      attendance
      createdAt
      updatedAt
    }
  }
`;
