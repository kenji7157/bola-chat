<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="signup-title">Sign Up</div>
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
        <div class="signup-btn">
          <v-btn
            color="primary"
            width="300px"
            style="text-transform: none"
            x-large
            :disabled="!isValid"
            @click="clickSignUp()"
            >Sign Up for Bola chat</v-btn
          >
        </div>
        <div class="signin-btn">
          <v-btn
            color="success"
            text
            style="text-transform: none"
            x-large
            @click="moveSignIn()"
            >Click here to SignIn</v-btn
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
    ...SignInModule.mapActions(["signUp"]),
  },
});

@Component
export default class SignUp extends Super {
  userInfo: { email: string; password: string } = {
    email: "",
    password: "",
  };

  get isValid() {
    return this.userInfo.email && this.userInfo.password;
  }

  clickSignUp(): void {
    this.signUp(this.userInfo)
      .then(() => {
        this.$router.push("/");
      })
      .catch((err) => {
        //
      });
  }

  moveSignIn(): void {
    this.$router.push("/signIn");
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
.signup-btn {
  text-align: center;
}
.signin-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
