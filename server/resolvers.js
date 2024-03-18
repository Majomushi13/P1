const { getTasks, getTaskById, addTask, updateTask, deleteTask } = require('./tasks');

const resolvers = {
  tasks: async () => {
    try {
      const tasks = await getTasks();
      return tasks;
    } catch (error) {
      throw new Error('No se pudieron obtener las tareas');
    }
  },
  task: async ({ id }) => {
    try {
      const task = await getTaskById(id);
      return task;
    } catch (error) {
      throw new Error('No se pudo obtener la tarea');
    }
  },
  addTask: async ({ title }) => {
    try {
      const newTask = await addTask(title);
      return newTask;
    } catch (error) {
      throw new Error('No se pudo agregar la tarea');
    }
  },
  updateTask: async ({ id, completed }) => {
    try {
      const updatedTask = await updateTask(id, completed);
      return updatedTask;
    } catch (error) {
      throw new Error('No se pudo actualizar la tarea');
    }
  },
  deleteTask: async ({ id }) => {
    try {
      const result = await deleteTask(id);
      return result;
    } catch (error) {
      throw new Error('No se pudo eliminar la tarea');
    }
  },
};

module.exports = resolvers;

