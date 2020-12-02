import { DocumentBase } from './DocumentBase';

export type Comment = DocumentBase & {
  commentUID: string;
  text: string;
};
