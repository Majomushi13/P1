const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');
const mysql = require('mysql2');
const cors = require('cors'); 

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'tasks',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

app.use(express.json());
app.use(cors()); 

app.post('/graphql', (req, res) => {
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: false,
  })(req, res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`);
});
