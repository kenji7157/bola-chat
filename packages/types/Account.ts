import { DocumentBase } from './DocumentBase';

/** ユーザーアカウント */
export type Account = DocumentBase & {
  /** アカウントユニークID */
  accountUID: string;
  /** ユーザー名 */
  name: string;
  /** メールアドレス */
  emailAddress: string;
};
