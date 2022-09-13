<template>
  <div class="row">
    <!-- <div class="card">
      <a href="https://github.com/xxxxxx" target="_blank">
        <img src="https://cn.vuejs.org/images/logo.svg" style="width: 100px" />
      </a>
      <p class="card-text">xxxxxx</p>
    </div> -->
    <div
      class="card"
      v-for="user in info.users"
      :key="user.login"
      v-show="info.users.length"
    >
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ user.login }}</p>
    </div>
    <h1 v-show="info.isFirst">Welcome to use</h1>
    <h1 v-show="info.isLoading">Loading...</h1>
    <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
  </div>
</template>

<script>
export default {
  name: "MyList",
  data() {
    return {
      info: {
        isFirst: true,
        isLoading: false,
        errMsg: "",
        users: [],
      },
    };
  },
  methods: {
    updateListData(dataObj) {
      this.info = { ...this.info, ...dataObj };
      // this.isFirst = isFirst;
      // this.isLoading = isLoading;
      // this.errMsg = errMsg;
      // this.users = users;
    },
  },
  mounted() {
    this.$bus.$on("updateListData", this.updateListData);
  },
  beforeDestroy() {
    this.$bus.$off("getUsers");
  },
};
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>