import { Module } from 'vuex-smart-module';
import 'firebase/firestore';
import {
  FirestoreDocumentActions,
  FirestoreDocumentGetters,
  FirestoreDocumentMutations,
  FirestoreDocumentState,
} from '@/store/FirestoreDocumentBase';
import { TComment } from './../../../types/TComment';

class CommentDocumentState extends FirestoreDocumentState<TComment> {}

export class CommentDocumentGetters extends FirestoreDocumentGetters<
  TComment,
  CommentDocumentState
> {}

class CommentDocumentMutations extends FirestoreDocumentMutations<
  TComment,
  CommentDocumentState
> {}

// NOTE: 家賃保証会社・IPアドレスのupdate時に削除対象とする
export const deleteStr = 'delete';

export class CommentDocumentActions extends FirestoreDocumentActions<
  TComment,
  CommentDocumentState,
  CommentDocumentGetters,
  CommentDocumentMutations
> {}

export function domainDocumentActionType(
  type: keyof CommentDocumentActions
): string {
  return `CommentDocumentModule/${type}`;
}

export const CommentDocumentModule = new Module({
  state: CommentDocumentState,
  getters: CommentDocumentGetters,
  mutations: CommentDocumentMutations,
  actions: CommentDocumentActions,
});
