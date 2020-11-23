<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Bola chat 👋</v-toolbar-title>
    </v-app-bar>
    <side-navi :drawer="drawer" @close-navi="closeNavi()"></side-navi>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideNavi from "@/components/SideNavi.vue";

@Component({
  components: {
    SideNavi,
  },
})
export default class App extends Vue {
  drawer: boolean = false;

  closeNavi(): void {
    this.drawer = false;
  }
}
</script>
