import { Module } from 'vuex-smart-module';
import { Store } from 'vuex';
import firebase from 'firebase/app';
import {
  FirestoreCollectionState,
  FirestoreCollectionGetters,
  FirestoreCollectionMutations,
  FirestoreCollectionActions,
} from '@/store/FirestoreCollectionBase';
import { Comment } from 'bola-chat-types';

class CommentCollectionState extends FirestoreCollectionState<Comment> {}

export class CommentCollectionGetters extends FirestoreCollectionGetters<
  Comment,
  CommentCollectionState
> {
  get sortedList() {
    const slice = this.state.data.slice();
    return slice.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
      }
      return 0;
    });
  }
}

class CommentCollectionMutations extends FirestoreCollectionMutations<
  Comment,
  CommentCollectionState
> {}

export class CommentCollectionActions extends FirestoreCollectionActions<
  Comment,
  CommentCollectionState,
  CommentCollectionGetters,
  CommentCollectionMutations
> {
  async add(payload: Partial<Comment>) {
    if (this.state.ref) {
      const commentUID = this.state.ref.doc().id;
      payload.commentUID = commentUID;
      payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await this.state.ref.doc(commentUID).set(payload);
    }
  }
  async delete(commentUID: string) {
    if (this.state.ref) {
      await this.state.ref.doc(commentUID).delete();
    }
  }
}

export const CommentCollectionModule = new Module({
  state: CommentCollectionState,
  getters: CommentCollectionGetters,
  mutations: CommentCollectionMutations,
  actions: CommentCollectionActions,
});
