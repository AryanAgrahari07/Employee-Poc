import { gql } from "@apollo/client";

export const EMPLOYEES_QUERY = gql`
  query Employees($first: Int, $after: String, $filter: EmployeeFilter, $sort: EmployeeSort) {
    employees(first: $first, after: $after, filter: $filter, sort: $sort) {
      edges {
        cursor
        node {
          id
          name
          age
          class
          subjects
          attendance
          createdAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;
