import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: AddEmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      age
      class
      subjects
      attendance
      createdAt
    }
  }
`;
