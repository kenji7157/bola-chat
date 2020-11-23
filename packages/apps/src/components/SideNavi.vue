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
          <v-list-item-title @click="signIn()">SIGN IN</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SideNavi extends Vue {
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

  signIn(): void {
    // TODO signIn処理の実装
  }
}
</script>

<style scoped>
.fixed_nav {
  position: fixed;
}
</style>
