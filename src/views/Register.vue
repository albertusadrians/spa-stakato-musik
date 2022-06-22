<template>
  <v-app>
    <div v-if="error" class="error">{{ error.message }}</div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-row>
              <v-col cols="12" sm="6" style="background-color: #1d1a56">
                <div style="text-align: center; padding: 180px 0">
                  <v-card-text class="white--text">
                    <h3 class="text-center">Sudah pernah daftar?</h3>
                    <h6 class="text-center">
                      Silakan login untuk mulai belanja
                      <br />
                      alat musik favorit kamu.
                    </h6>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn tile outlined dark v-on:click="redirectToLogin()"
                      >Login</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <v-form v-model="isValid">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Register untuk membuat akun</h4>
                    <h6 class="text-center grey--text">
                      Daftar terlebih dahulu agar kamu bisa mulai berbelanja
                      <br />
                      alat musik favorit kamu
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          outlined
                          dense
                          color="blue"
                          class="mt-4"
                          v-model="user.name"
                          label="Nama"
                          :rules="nameRules"
                          required
                        />
                        <v-select
                          v-model="user.gender"
                          :items="genders"
                          label="Jenis Kelamin"
                          :rules="genderRules"
                          required
                          outlined
                          dense
                          color="blue"
                        ></v-select>
                        <v-text-field
                          v-model="user.email"
                          type="email"
                          label="Email"
                          :rules="emailRules"
                          required
                          outlined
                          dense
                          color="blue"
                        />
                        <v-text-field
                          v-model="user.phoneNum"
                          :counter="12"
                          label="No. Telepon"
                          :rules="phoneNumRules"
                          required
                          outlined
                          dense
                          color="blue"
                        />
                        <v-text-field
                          v-model="user.username"
                          label="Username"
                          :rules="usernameRules"
                          required
                          outlined
                          dense
                          color="blue"
                        />
                        <v-text-field
                          v-model="user.password"
                          :append-icon="
                            passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          v-on:click:append="showPassword"
                          :type="passwordVisibility ? 'text' : 'password'"
                          label="Password"
                          :rules="passwordRules"
                          required
                          outlined
                          dense
                          color="blue"
                        />
                        <v-card-actions>
                          <v-btn
                            dark
                            block
                            tile
                            color="info"
                            v-on:click="registerFunc"
                            :disabled="!isValid"
                            >Register</v-btn
                          >
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import { db } from "../db";
export default {
  name: "Register",
  data() {
    return {
      passwordVisibility: false,
      user: {
        name: "",
        phoneNum: "",
        email: "",
        username: "",
        password: "",
        gender: null,
      },
      error: "",
      nameRules: [(value) => value != "" || "Name masih kosong."],
      emailRules: [(value) => value != "" || "Email masih kosong."],
      phoneNumRules: [(value) => value != "" || "Phone number masih kosong."],
      usernameRules: [(value) => value != "" || "Username masih kosong."],
      genderRules: [(v) => !!v || "Gender masih kosong."],
      passwordRules: [
        (value) => value != "" || "Password masih kosong.",
        (value) =>
          (value.length >= 8 && value.length <= 12) ||
          "Password must be at least 8-12 characters",
      ],
      isValid: false,
      genders: ["Pria", "Wanita"],
    };
  },
  methods: {
    showPassword() {
      this.passwordVisibility = !this.passwordVisibility;
    },
    async registerFunc() {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then((cred) => {
            return db.collection("user").doc(cred.user.uid).set({
              name: this.user.name,
              phoneNum: this.user.phoneNum,
              gender: this.user.gender,
              username: this.user.username,
            });
          })
          .then(() => {
            this.user = {
              name: "",
              phoneNum: "",
              gender: "",
              email: "",
              username: "",
              password: "",
            };
            this.$router.replace({ name: "Home" });
          });
      } catch (err) {
        alert(err.message);
      }
    },
    redirectToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
