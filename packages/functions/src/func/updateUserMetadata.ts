import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { FuncLogger } from '../logger';
import corsLib from 'cors';
import { accountDocumentPath } from 'bola-chat-types/FirestorePath';
import {
  SamlProfile,
  convertProfile,
  Profile,
} from 'bola-chat-types/Authentication';
import { Account } from 'bola-chat-types';

const cors = corsLib();

export function getBearer(token: string | undefined) {
  if (!token || !token.startsWith('Bearer ')) return undefined;
  return token.split('Bearer ')[1];
}

async function createAccount(userUID: string, account: Account) {
  return await admin.firestore().doc(accountDocumentPath(userUID)).set(account);
}

async function setUserData(user: admin.auth.UserRecord, profile: Profile) {
  if (!profile.email) return;

  await admin.auth().updateUser(user.uid, {
    displayName: profile.nickname,
  });

  await createAccount(user.uid, {
    accountUID: user.uid ?? '',
    name: profile.nickname ?? '',
    emailAddress: user.email ?? '',
  } as Account);
}

/**
 * ユーザーのメタデータを更新
 */
export async function updateUserMetadata(
  request: functions.Request,
  response: functions.Response
): Promise<void> {
  const logger = new FuncLogger();
  logger.setExecutionId(request);

  console.log('-- 実行 --');
  // トークンの取得
  const token = request.headers.authorization;
  const method = request.method;
  logger.debug({ headers: request.headers, method });

  console.log('-- token --', token);

  // トークンからbearerに変換
  const bearer = getBearer(token);
  if (!bearer) {
    logger.error({ message: 'tokenが不正です', token });
    response.status(401).send();
    return;
  }
  console.log('-- bearer --', bearer);

  try {
    const idToken = await admin.auth().verifyIdToken(bearer);
    const profile = convertProfile(
      idToken.firebase.sign_in_attributes as SamlProfile
    );
    logger.info({ idToken: idToken, profile: profile });
    console.log('-- idToken --', idToken);
    console.log('-- profile --', profile);

    const user = await admin.auth().getUser(idToken.uid);
    logger.info({ user: user });
    console.log('-- user --', user);
    // アカウントデータの作成
    await setUserData(user, profile);
    response.status(200).send({ result: 'success' });
  } catch (e) {
    logger.error(e);
    response.status(500).send();
  }
}

// APIキーを検証するために onRequest を使っている
export const onRequestFunc = (
  request: functions.Request,
  response: functions.Response
) => {
  return cors(request, response, async () => {
    await updateUserMetadata(request, response);
  });
};
