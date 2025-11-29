const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  enum SortDirection {
    ASC
    DESC
  }

  input EmployeeFilter {
    nameContains: String
    minAge: Int
    maxAge: Int
    class: String
  }

  input EmployeeSort {
    field: String!
    direction: SortDirection!
  }

  input AddEmployeeInput {
    name: String!
    age: Int
    class: String
    subjects: [String!]
    attendance: Float
  }

  type Employee {
    id: ID!
    name: String!
    age: Int
    class: String
    subjects: [String!]!
    attendance: Float
    createdAt: DateTime
    updatedAt: DateTime
  }

  type EmployeeEdge {
    cursor: String!
    node: Employee!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  type EmployeeConnection {
    edges: [EmployeeEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type User {
    id: ID!
    username: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    employees(first: Int, after: String, filter: EmployeeFilter, sort: EmployeeSort): EmployeeConnection!
    employee(id: ID!): Employee
    me: User
  }

  type Mutation {
    addEmployee(input: AddEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: AddEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Boolean!
    login(username: String!, password: String!): AuthPayload!
  }
`;
