<template>
  <v-app-bar app color="white" flat>
    <v-badge color="#1d1a56" dot>
      <v-img src="logo-toko.png" contain width="30"></v-img>
    </v-badge>
    <v-toolbar-title class="ml-4" v-on:click="redirectToHome()">
      <span>Stakato </span><strong>Musik</strong>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-badge
      color="#1d1a56"
      overlap
      :content="String(totalQty)"
      class="mr-2 mt-1"
    >
      <v-avatar v-on:click="redirectToCheckout()" color="#e3e5f5" size="40">
        <v-icon x-small color="#1d1a56">fas fa-shopping-cart</v-icon>
      </v-avatar>
    </v-badge>
    <span>
      Halo, <strong>{{ user.data.name.split(" ")[0] }}</strong>
    </span>
    <v-avatar size="30" class="ml-2">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/ecommercespa-e35c7.appspot.com/o/user%2Fuser.png?alt=media&token=99e1ddd3-6a7c-4420-a692-edebb1280f98"
      ></v-img>
    </v-avatar>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon dark class="">
          <v-icon x-small color="#1d1a56">fas fa-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link>
          <v-list-item-title v-on:click="redirectToHistory()"
            ><v-icon x-small left color="#1d1a56">fa fa-history</v-icon>
            Riwayat Transaksi
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-title v-on:click="logoutFunc()"
            ><v-icon x-small left color="#1d1a56">fas fa-sign-out-alt</v-icon>
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["lstCart", "user"]),
    totalQty() {
      let x = 0;
      if (this.lstCart.length !== 0) {
        x = this.lstCart.reduce((a, b) => a + b.qty, 0);
      }
      return x;
    },
  },
  methods: {
    async logoutFunc() {
      try {
        await firebase.auth().signOut();
        this.$router.push("/login");
      } catch (err) {
        alert(err.message);
      }
    },
    redirectToCheckout() {
      this.$router.push("/checkout");
    },
    redirectToHome() {
      this.$router.push("/");
    },
    redirectToHistory() {
      this.$router.push("/history");
    },
  },
};
</script>
