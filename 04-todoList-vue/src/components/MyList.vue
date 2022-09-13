<template>
  <ul class="todo-main">
    <!-- <MyItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :checkTodo="checkTodo"
      :deleteTodo="deleteTodo"
    ></MyItem> -->
    <transition-group name="todo" appear>
      <MyItem
        v-for="todoObj in todos"
        :key="todoObj.id"
        :todo="todoObj"
      ></MyItem>
    </transition-group>
  </ul>
</template>

<script>
import MyItem from "./MyItem";

export default {
  components: { MyItem },
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos", "checkTodo", "deleteTodo"],
};
</script>

<style scoped>
.todo-enter-active {
  animation: todoAnimation 1s;
}
.todo-leave-active {
  animation: todoAnimation 1s reverse;
}
@keyframes todoAnimation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>