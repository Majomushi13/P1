<template>
  <div>
    <h1>Lista de Tareas</h1>
    <div class="profile-pic">
        <img src="@/assets/doodle.jpg" alt="imagen" />
      </div>
    <table class="task-table">
      <thead>
        <tr>
          <th>Tarea</th>
          <th>Completada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>
            <input type="checkbox" :id="'task-' + task.id" v-model="task.completed" @change="updateTask(task)" />
           
          </td>
          <td>
            <button class="btn-delete" @click="deleteTask(task.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="add-task">
      <input v-model="newTaskTitle" placeholder="Nueva tarea" />
      <button class="btn-add" @click="addTask">Agregar Tarea</button>
    </div>
  </div>
</template>

<script>
import { request } from 'graphql-request';

export default {
  data() {
    return {
      tasks: [],
      newTaskTitle: '',
    };
  },
  methods: {
    async fetchTasks() {
      const query = `
        {
          tasks {
            id
            title
            completed
          }
        }
      `;

      try {
        const data = await request('http://localhost:4000/graphql', query);
        this.tasks = data.tasks;
      } catch (error) {
        console.error(error);
      }
    },
    async addTask() {
      if (!this.newTaskTitle.trim()) return;

      const mutation = `
        mutation($title: String!) {
          addTask(title: $title) {
            id
            title
            completed
          }
        }
      `;

      const variables = { title: this.newTaskTitle.trim() };

      try {
        const data = await request('http://localhost:4000/graphql', mutation, variables);
        this.tasks.push(data.addTask);
        this.newTaskTitle = '';
      } catch (error) {
        console.error(error);
      }
    },
    async updateTask(task) {
      const mutation = `
        mutation($id: ID!, $completed: Boolean!) {
          updateTask(id: $id, completed: $completed) {
            id
            title
            completed
          }
        }
      `;

      const variables = {
        id: task.id,
        completed: task.completed,
      };

      try {
        await request('http://localhost:4000/graphql', mutation, variables);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(taskId) {
      const mutation = `
        mutation($id: ID!) {
          deleteTask(id: $id)
        }
      `;

      const variables = {
        id: taskId,
      };

      try {
        await request('http://localhost:4000/graphql', mutation, variables);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style>
.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.task-table th,
.task-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

.check-label {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  position: relative;
}

.check-label::after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: #007bff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.check-label input:checked + .check-label::after {
  opacity: 1;
}

.btn-delete {
  background-color: #dc3596;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #f7447f;
}

.btn-add {
  background-color: #8dcbf0;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #63aef3;
}

.add-task {
  display: flex;
  align-items: center;
}

.add-task input {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.add-task button {
  border: none;
}

.profile-pic {
  position: absolute;
  top: 10px; 
  right: 10px; 
  z-index: 1; 
}

.profile-pic img {
  width: 50px;
  height: 50px;
  
}
</style>
