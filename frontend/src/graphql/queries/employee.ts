import { gql } from "@apollo/client";

export const EMPLOYEE_QUERY = gql`
  query Employee($id: ID!) {
    employee(id: $id) {
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
