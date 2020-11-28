<template>
  <v-container>
    <v-card
      v-for="(comment, index) in commentList"
      :key="index"
      class="d-flex justify-space-between"
    >
      <v-card-text>{{ comment.text }}</v-card-text>
      <v-btn v-if="isSignIn" icon @click="deleteComment(comment.commentUID)"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
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
import { SignInModule } from "@/store/SignInModule";

const Super = Vue.extend({
  computed: {
    ...CommentCollectionModule.mapGetters({
      commentList: "getData",
    }),
    ...SignInModule.mapGetters(["isSignIn"]),
  },
  methods: {
    ...CommentCollectionModule.mapActions({
      addComment: "add",
      deleteComment: "delete",
    }),
  },
});

@Component
export default class Home extends Super {
  comment: string = "";

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
