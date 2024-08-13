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

  input Pagination {
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

  input AccountUniqueArgs {
    id: ID
    email: String
  }

  input AccountFilters {
    status: [Status]
    email: String
    familyId: [String]
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

  input FamilyUniqueArgs {
    id: ID
    ownerId: String
  }

  input FamilyFilters {
    name: String
    ownerId: [String]
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

  input GuestUniqueArgs {
    id: ID
  }

  input GuestFilters {
    first_name: String
    last_name: String
    side: [Side]
    type: [Type]
    age: [Age]
    sex: [Sex]
    table: [Int]
    transfer: Boolean
    accommodation: Boolean
    familyId: [Int]
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

  input EventUniqueArgs {
    id: ID
    index: Int
    alias: String
  }

  input EventFilters {
    alias: String
    name: String
    description: String
    address: String
    url: String
  }

  type Query {
    accounts(params: Pagination!, filters: AccountFilters): [Account]!
    families(params: Pagination!, filters: FamilyFilters): [Family]!
    guests(params: Pagination!, filters: GuestFilters): [Guest]!
    events(params: Pagination!, filters: EventFilters): [Event]!
    account(params: AccountUniqueArgs!): Account
    family(params: FamilyUniqueArgs!): Family
    guest(params: GuestUniqueArgs!): Guest
    event(params: EventUniqueArgs!): Event
  }
`
