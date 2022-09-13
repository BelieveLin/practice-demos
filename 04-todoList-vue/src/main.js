import Vue from 'vue'
// import Vue from 'vue/dist/vue'
import App from './App'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // template: `
  //   <App></App>
  // `,
  // components: {
  //   App
  // }
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')