<template>
  <v-app>
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
// @ is an alias to /src

import Navbar from "@/components/Navbar.vue";
import * as firebase from "firebase/app";
import "firebase/auth";
import { db } from "../db";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      checkLogin: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.checkLogin = true;
        db.collection("user")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.setUser({ id: user.uid, data: doc.data() });
          });
      } else {
        this.checkLogin = false;
      }
    });
  },
  methods: {
    ...mapActions(["setUser"]),
  },
};
</script>
