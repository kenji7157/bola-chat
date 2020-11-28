<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="signin-title">Sign In</div>
        <v-text-field
          v-model="userInfo.email"
          type="text"
          label="Email"
          filled
        />
        <v-text-field
          v-model="userInfo.password"
          type="password"
          label="Password"
          filled
        />
        <div class="signin-btn">
          <v-btn
            color="success"
            width="300px"
            style="text-transform: none"
            x-large
            :disabled="!isValid"
            @click="callSignIn()"
            >Sign In</v-btn
          >
        </div>
        <div class="signup-btn">
          <v-btn
            color="primary"
            text
            style="text-transform: none"
            x-large
            @click="moveSignUp()"
            >Click here to SignUp</v-btn
          >
        </div>
      </v-container>
      <v-footer app elevation="8">
        <v-layout justify-space-around> 2020 - Bola chat </v-layout>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SignInModule } from "@/store/SignInModule";

const Super = Vue.extend({
  methods: {
    ...SignInModule.mapActions(["signIn", "signInAuth"]),
  },
});

@Component
export default class SignIn extends Super {
  userInfo: { email: string; password: string } = {
    email: "",
    password: "",
  };

  get isValid() {
    return this.userInfo.email && this.userInfo.password;
  }

  callSignIn(): void {
    this.signIn(this.userInfo)
      .then((usr) => {
        this.$router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  moveSignUp(): void {
    this.$router.push("/signUp");
  }

  created() {
    // auth0のログイン処理を呼び出す
    this.signInAuth();
  }
}
</script>
<style scoped>
.footer-div {
  width: 100%;
  height: 100%;
}
.comment-btn {
  width: 100%;
}
.signin-btn {
  text-align: center;
}
.signup-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
