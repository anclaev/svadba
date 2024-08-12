export const typeDefs = `
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

  type Account {
    id: ID
    status: Status!
    password: String
    email: String!
  }
`
