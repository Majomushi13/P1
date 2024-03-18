const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    addTask(title: String!): Task
    updateTask(id: ID!, completed: Boolean!): Task
    deleteTask(id: ID!): Boolean
  }
`);

module.exports = schema;
