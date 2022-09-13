<template>
  <div class="container">
    <Mysearch></Mysearch>
    <MyList></MyList>
  </div>
</template>

<script>
// import "../public/css/bootstrap.css";
import Mysearch from "./components/MySearch";
import MyList from "./components/MyList";

export default {
  name: "App",
  components: {
    Mysearch,
    MyList,
  },
};
</script>

<style>
</style>
