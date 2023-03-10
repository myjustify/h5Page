import Vue from "vue";
import App from "./App.vue";
import router from './router'
// import "element-ui/lib/theme-chalk/index.css";
import { Form, FormItem } from "element-ui";
Vue.config.productionTip = false;
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
