<template>
  <section>
    <div>
      <h1>ToDoリスト</h1>
    </div>
    <div>
      <form id="radio-form">
        <label>
          <input
            type="radio"
            name="radio1"
            @click="filterTodoReset"
            checked
          />すべて
        </label>
        <label>
          <input
            type="radio"
            name="radio1"
            @click="filterTodo('作業中')"
          />作業中
        </label>
        <label>
          <input
            type="radio"
            name="radio1"
            @click="filterTodo('完了')"
          />完了
        </label>
      </form>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>コメント</th>
            <th>状態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in display_todos" :key="todo.id">
            <td>{{ todo.id }}</td>
            <td>{{ todo.comment }}</td>
            <td>
              <button @click="changeStatus(todo)">{{ todo.status }}</button>
            </td>
            <td>
              <button @click="deleteTodo(todo)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>新規タスクの追加</h2>
    </div>
    <div>
      <label for="inputTodoBox">ToDoリスト</label>
      <input id="inputTodoBox" type="text" name=":addTodo" v-model="comment" />
      <button id="addButton" @click="addTodo">追加</button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      comment: '',
      todoStatus: '',
      radioButtonStatus: false,
    };
  },
  computed: {
    ...mapState(["todos"]),
    display_todos() {
      if (this.radioButtonStatus) {
        const newTodos = [];
        const newTodo = this.todos;
        newTodo.forEach((todo) => {
          if (todo.status === this.todoStatus) {
            newTodos.push(todo);
          }
        });
        return newTodos;
      } else {
        return this.todos;
      }
    },
  },
  methods: {
    addTodo() {
      if (this.comment !== '') {
        this.$store.commit("addTodo", {
          id: this.todos.length,
          comment: this.comment,
        });
        this.comment = '';
        inputTodoBox.focus();
      } else {
        return;
      }
    },
    deleteTodo(todo) {
      this.$store.commit("deleteTodo", todo);
    },
    changeStatus(todo) {
      this.$store.commit("changeStatus", todo);
    },
    filterTodo(status) {
      this.todoStatus = status;
      this.radioButtonStatus = true;
    },
    filterTodoReset() {
      this.radioButtonStatus = false;
    },
  },
};
</script>
