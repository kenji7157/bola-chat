<template>
  <div>
    <h3>Bola chat</h3>
    <div>
      <div v-for="(comment, index) in commentList" :key="index">
        <p>{{ comment }}</p>
      </div>
    </div>
    <div>
      <textarea></textarea>
    </div>
    <button>送信</button>
  </div>
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
