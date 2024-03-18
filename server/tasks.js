const mysql = require('mysql2');

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

const getTasks = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM tasks', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getTaskById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM tasks WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const addTask = (title) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO tasks (title, completed) VALUES (?, false)', [title], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const newTaskId = results.insertId;
        connection.query('SELECT * FROM tasks WHERE id = ?', [newTaskId], (error, task) => {
          if (error) {
            reject(error);
          } else {
            resolve(task[0]);
          }
        });
      }
    });
  });
};

const updateTask = (id, completed) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        connection.query('SELECT * FROM tasks WHERE id = ?', [id], (error, task) => {
          if (error) {
            reject(error);
          } else {
            resolve(task[0]);
          }
        });
      }
    });
  });
};

const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = { getTasks, getTaskById, addTask, updateTask, deleteTask };

