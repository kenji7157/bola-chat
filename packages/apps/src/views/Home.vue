<template>
  <v-container>
    <v-card v-for="(comment, index) in commentList" :key="index">
      <v-card-text>{{ comment }}</v-card-text>
    </v-card>
    <v-row>
      <v-footer app elevation="5">
        <div class="footer-div">
          <v-textarea
            v-model="comment"
            :auto-grow="true"
            :rows="1"
            maxlength="300"
            counter
            outlined
          ></v-textarea>
          <div class="text-center">
            <v-btn class="comment-btn" color="primary" @click="update"
              >comment</v-btn
            >
          </div>
        </div>
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
.footer-div {
  width: 100%;
  height: 100%;
}
.comment-btn {
  width: 100%;
}
</style>
