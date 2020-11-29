import * as functions from 'firebase-functions';
import { FuncLogger } from '../logger';
import corsLib from 'cors';

const cors = corsLib();

export function getBearer(token: string | undefined) {
  if (!token || !token.startsWith('Bearer ')) return undefined;
  return token.split('Bearer ')[1];
}

/**
 * ユーザーのメタデータを更新
 */
export function updateUserMetadata(
  request: functions.Request,
  response: functions.Response
): void {
  const logger = new FuncLogger();
  logger.setExecutionId(request);

  console.log('-- 実行 --');
  const token = request.headers.authorization;
  const method = request.method;
  logger.debug({ headers: request.headers, method });

  console.log('-- token --', token);

  const bearer = getBearer(token);
  if (!bearer) {
    logger.error({ message: 'tokenが不正です', token });
    response.status(401).send();
    return;
  }
  console.log('-- bearer --', bearer);

  try {
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
