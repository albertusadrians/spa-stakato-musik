import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user=>{
  console.log(user);
  if(!app){ app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})




