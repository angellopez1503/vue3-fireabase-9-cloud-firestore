<template>
  <div class="badass-todo">
    <div class="title has-text-centered">Badass Todo</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newTodoContent"
            class="input"
            type="text"
            placeholder="Add a todo"
          />
        </p>
        <p class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>

    <div
      v-for="todo in todos"
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, onSnapshot, addDoc, deleteDoc,
       doc, updateDoc,query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

const todosCollectionRef = collection(db, "todos")
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"))

const todos = ref([
  // {
  //   id:'id1',
  //   content:'shave my butt',
  //   done:false
  // },
  // {
  //   id:'id2',
  //   content:'Wash my butt',
  //   done:true
  // }
]);

onMounted( () => {
  // const querySnapshot = await getDocs(collection(db, "todos"));
  // let fbTodos = [];
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data())
  //   const todo = {
  //     id:doc.id,
  //     content:doc.data().content,
  //     done:doc.data().doen
  //   }
  //   fbTodos.push(todo)
  // });

  // todos.value=fbTodos

  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      };
      fbTodos.push(todo);
    })
    todos.value = fbTodos
  })
})

const newTodoContent = ref("");

const addTodo =  () => {

  // const newTodo = {
  //   id: uuidv4(),
  //   content: newTodoContent.value,
  //   done: false,
  // };
  // todos.value.unshift(newTodo);

  addDoc(todosCollectionRef, {
  content:newTodoContent.value,
  done:false,
  date:Date.now()
})

  newTodoContent.value = "";

};

const deleteTodo = (id) => {
  // todos.value = todos.value.filter((res) => {
  //   console.log(res);
  //   if (res.id != id) {
  //     return res;
  //   }
  // });

  deleteDoc(doc(todosCollectionRef, id))
};

const toggleDone = (id) => {
  const index = todos.value.findIndex((res) => {
    if (res.id == id) {
      return res;
    }
  });
  // todos.value[index].done = !todos.value[index].done;

  

// Set the "capital" field of the city 'DC'
 updateDoc(doc(todosCollectionRef,id), {
   done:!todos.value[index].done
});
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";
.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>
