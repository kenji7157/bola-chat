<template>
  <v-container>
    <v-card v-for="(comment, index) in commentList" :key="index">
      <v-card-text>{{ comment }}</v-card-text>
    </v-card>
    <v-row>
      <v-footer elevation="5">
        <v-textarea v-model="comment" outlined></v-textarea>
        <v-btn color="primary" @click="update">comment</v-btn>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CommentCollectionModule } from "@/store/CommentCollectionModule";

const Super = Vue.extend({
  computed: {
    ...CommentCollectionModule.mapGetters({
      getCommentCollection: "getData",
    }),
  },
  methods: {
    ...CommentCollectionModule.mapActions({
      addComment: "add",
    }),
  },
});

@Component
export default class Home extends Super {
  comment: string = "";

  get commentList(): string[] {
    return this.getCommentCollection.map((x) => x.text);
  }

  update() {
    this.addComment({ text: this.comment }).then(() => {
      this.comment = "";
    });
  }
}
</script>
<style scoped>
.comment-btn {
  text-align: center;
}

.v-btn {
  min-width: 200px !important;
}
</style>
>
