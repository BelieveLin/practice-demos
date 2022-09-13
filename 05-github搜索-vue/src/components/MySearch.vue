<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
        @keyup.enter="searchUsers"
      />&nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "MySearch",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchUsers() {
      this.$bus.$emit("updateListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      });
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        (res) => {
          console.log("请求成功了", res.data);
          this.$bus.$emit("updateListData", {
            isLoading: false,
            users: res.data.items,
          });
        },
        (err) => {
          console.log("请求失败了", err.message);
          this.$bus.$emit("updateListData", {
            isLoading: false,
            errMsg: err.message,
          });
        }
      );
    },
  },
};
</script>

<style>
</style>