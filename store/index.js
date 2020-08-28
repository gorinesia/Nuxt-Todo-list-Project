import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: []
    }),
    mutations: {
      addTodo(state, obj) {
        state.todos.push({
          id: state.todos.length,
          comment: obj.comment,
          status: '作業中'
        })
      },
      deleteTodo(state, obj) {
        for (let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i];
          if(ob.comment == obj.comment && ob.id == obj.id) {
            state.todos.splice(i, 1);
            state.todos.forEach((obj, index) => {
              state.todos[index].id = index;
            });
            return;
          }
        }
      },
      changeStatus(state, obj) {
        if (obj.status === '作業中') {
          obj.status = '完了';
        } else {
          obj.status = '作業中';
        }
        return;
      }
    }
  })
}

export default createStore;