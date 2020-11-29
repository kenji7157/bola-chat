import { Module } from 'vuex-smart-module';
import 'firebase/firestore';
import {
  FirestoreDocumentActions,
  FirestoreDocumentGetters,
  FirestoreDocumentMutations,
  FirestoreDocumentState,
} from '@/store/FirestoreDocumentBase';
import { Comment } from 'bola-chat-types';

class CommentDocumentState extends FirestoreDocumentState<Comment> {}

export class CommentDocumentGetters extends FirestoreDocumentGetters<
  Comment,
  CommentDocumentState
> {}

class CommentDocumentMutations extends FirestoreDocumentMutations<
  Comment,
  CommentDocumentState
> {}

export class CommentDocumentActions extends FirestoreDocumentActions<
  Comment,
  CommentDocumentState,
  CommentDocumentGetters,
  CommentDocumentMutations
> {}

export function commentDocumentActionType(
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
