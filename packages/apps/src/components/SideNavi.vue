<template>
  <v-navigation-drawer
    v-model="isOpednDrawer"
    absolute
    left
    width="85%"
    temporary
    class="fixed_nav"
  >
    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item>
          <v-list-item-title @click="moveSignIn()">SIGN IN</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title @click="callSignOut()">SIGN OUT</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { SignInModule } from "@/store/SignInModule";

const Super = Vue.extend({
  methods: {
    ...SignInModule.mapActions(["signOut"]),
  },
});

@Component
export default class SideNavi extends Super {
  @Prop({ type: Boolean, required: true }) drawer!: boolean;
  childDrawer: boolean = false;

  get isOpednDrawer(): boolean {
    return this.drawer;
  }

  set isOpednDrawer(val: boolean) {
    // TODO: 親子でdraweのフラグ管理はしたくない
    this.childDrawer = !this.childDrawer;
    if (!this.childDrawer) {
      this.$emit("close-navi");
    }
  }

  moveSignIn(): void {
    this.$router.push("/signIn");
  }

  callSignOut(): void {
    this.signOut().then(() => {
      this.$router.push("/signIn");
    });
  }
}
</script>

<style scoped>
.fixed_nav {
  position: fixed;
}
</style>
