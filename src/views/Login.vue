<template>
  <v-app>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-row>
              <v-col cols="12" sm="6">
                <v-form v-model="isValid">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Masuk dalam akun kamu!</h4>
                    <h6 class="text-center grey--text">
                      Selamat datang di Stakato Musik!
                      <br />
                      Silakan login.
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          v-model="user.email"
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          class="mt-16"
                          :rules="emailRules"
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
                          outlined
                          dense
                          color="blue"
                        />
                        <v-btn
                          dark
                          block
                          tile
                          color="blue"
                          v-on:click="loginFunc"
                          :disabled="!isValid"
                        >
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-form>
                <div class="error" v-if="error">{{ error.message }}</div>
              </v-col>

              <v-col cols="12" sm="6" style="background-color: #1d1a56">
                <div style="text-align: center; padding: 180px 0">
                  <v-card-text class="white--text">
                    <h3 class="text-center">Belum punya akun?</h3>
                    <h6 class="text-center">
                      Yuk daftar dulu supaya bisa mulai belanja <br />
                      alat musik favorit kamu
                    </h6>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn v-on:click="redirectToRegister()" tile outlined dark
                      >Register</v-btn
                    >
                  </div>
                </div>
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

export default {
  name: "Login",
  data() {
    return {
      passwordVisibility: false,
      user: {
        email: "",
        password: "",
      },
      emailRules: [(value) => value != "" || "Email masih kosong."],
      passwordRules: [(value) => value != "" || "Password masih kosong."],
      isValid: false,
      error: "",
    };
  },
  methods: {
    showPassword() {
      this.passwordVisibility = !this.passwordVisibility;
    },
    async loginFunc() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password);
        this.user = {
          email: "",
          password: "",
        };
        this.$router.replace({ name: "Home" });
      } catch (err) {
        alert(err.message);
      }
    },
    redirectToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
</style>
