import { gql } from '@apollo/client'

export const typeDefs = gql`
  scalar Date

  enum Sex {
    MALE
    FEMALE
  }

  enum Age {
    ADULT
    CHILD
  }

  enum Status {
    PENDING
    APPROVED
    ADMIN
  }

  enum Side {
    GROOM
    BRIDE
  }

  enum Type {
    COLLEAGUE
    FRIEND
    BEST_FRIEND
    RELATIVE
    CLOSE_RELATIVE
    PARENT
  }

  type Pagination {
    page: Int!
    size: Int!
  }

  type Account {
    id: ID
    status: Status!
    password: String
    email: String!
    family: Family
    createdAt: Date!
    updatedAt: Date!
  }

  type Family {
    id: ID
    name: String!
    owner: Account!
    ownerId: String!
    members: [Guest]
    createdAt: Date!
    updatedAt: Date!
  }

  type Guest {
    id: ID
    first_name: String!
    last_name: String
    side: Side!
    type: Type!
    age: Age!
    sex: Sex!
    table: Int
    transfer: Boolean!
    accommodation: Boolean!
    events: [Event]
    family: Family!
    familyId: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Event {
    id: ID
    index: Int!
    alias: String!
    name: String!
    time: Date!
    description: String!
    address: String
    url: String
    guests: [Guest]
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    accounts: [Account]!
    families: [Family]!
    guests: [Guest]!
    events: [Event]!
    account(id: ID!): Account
    family(id: ID!): Family
    guest(id: ID!): Guest
    event(id: ID!): Event
  }
`
