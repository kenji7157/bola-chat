import { Module } from 'vuex-smart-module';
import { Store } from 'vuex';
import {
  FirestoreCollectionState,
  FirestoreCollectionGetters,
  FirestoreCollectionMutations,
  FirestoreCollectionActions,
} from '@/store/FirestoreCollectionBase';
import { TComment } from './../../../types/TComment';

class CommentCollectionState extends FirestoreCollectionState<TComment> {}

export class CommentCollectionGetters extends FirestoreCollectionGetters<
  TComment,
  CommentCollectionState
> {
  store!: Store<any>;
  $init(store: Store<any>): void {
    this.store = store;
  }
}

class CommentCollectionMutations extends FirestoreCollectionMutations<
  TComment,
  CommentCollectionState
> {}

export class CommentCollectionActions extends FirestoreCollectionActions<
  TComment,
  CommentCollectionState,
  CommentCollectionGetters,
  CommentCollectionMutations
> {}

export const CommentCollectionModule = new Module({
  state: CommentCollectionState,
  getters: CommentCollectionGetters,
  mutations: CommentCollectionMutations,
  actions: CommentCollectionActions,
});
