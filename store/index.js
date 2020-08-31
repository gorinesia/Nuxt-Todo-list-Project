import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: []
    }),
    mutations: {
      addTodo(state, todo) {
        state.todos.push({
          id: state.todos.length,
          comment: todo.comment,
          status: '作業中'
        })
      },
      deleteTodo(state, todo) {
        state.todos.forEach((value, index) => {
          const ob = state.todos[index];
          if(ob.comment === todo.comment && ob.id === todo.id) {
            state.todos.splice(index, 1);
            state.todos.forEach((value, i) => {
              state.todos[i].id = i;
            });
            return;
          }
        });
      },
      changeStatus(state, todo) {
        if (todo.status === '作業中') {
          todo.status = '完了';
        } else {
          todo.status = '作業中';
        }
        return;
      }
    }
  })
}

export default createStore;