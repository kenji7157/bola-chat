import { Module } from 'vuex-smart-module';
import { Store } from 'vuex';
import {
  FirestoreCollectionState,
  FirestoreCollectionGetters,
  FirestoreCollectionMutations,
  FirestoreCollectionActions,
} from '@/store/FirestoreCollectionBase';
import { Comment } from 'bola-chat-types/Comment';

class CommentCollectionState extends FirestoreCollectionState<Comment> {}

export class CommentCollectionGetters extends FirestoreCollectionGetters<
  Comment,
  CommentCollectionState
> {
  store!: Store<any>;
  $init(store: Store<any>): void {
    this.store = store;
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
  async add(payload: Comment) {
    if (this.state.ref) {
      const commentUID = this.state.ref.doc().id;
      payload.commentUID = commentUID;
      await this.state.ref.doc(commentUID).set(payload);
    }
  }
}

export const CommentCollectionModule = new Module({
  state: CommentCollectionState,
  getters: CommentCollectionGetters,
  mutations: CommentCollectionMutations,
  actions: CommentCollectionActions,
});
