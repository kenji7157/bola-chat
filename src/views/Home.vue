<template>
  <v-container>
    <v-card v-for="(comment, index) in commentList" :key="index">
      <v-card-text>{{ comment }}</v-card-text>
    </v-card>
    <v-textarea outlined></v-textarea>
    <v-btn>送信</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  commentList: string[] = [];

  created(): void {
    console.log("created");
    // テストデータ
    this.commentList = ["コメント１", "コメント２", "コメント３"];
  }
}
</script>
