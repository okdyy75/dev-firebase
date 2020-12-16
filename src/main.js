import Vue from "vue";
import App from "@/App.vue";
import router from "@/router/index";

Vue.config.productionTip = false

import firebase from 'firebase/app';
firebase.initializeApp(process.env.FIREBASE_CONFIG);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
