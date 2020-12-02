import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { readFileSync } from 'fs';
import { FuncLogger } from './logger';

interface IFuncBase {
  requirement: string[];
  requireAuth: boolean;
  do: (data: any, context: CallableContext) => any;
}

function readCommitHash() {
  try {
    return readFileSync('.gitinfo', { encoding: 'utf-8' });
  } catch {
    return '';
  }
}

export class FuncBase implements IFuncBase {
  requirement: string[] = [];
  requireAuth = true;
  gitCommitHash: string = readCommitHash();
  logger = new FuncLogger();

  run = async (data: any, context: CallableContext): Promise<any> => {
    this.logger.setExecutionId(context.rawRequest);
    this.logger.debug({ commitHash: this.gitCommitHash });
    console.debug(`Git hash: ${this.gitCommitHash}`);
    if (this.requireAuth && !context.auth) {
      throw new functions.https.HttpsError('unauthenticated', '認証が必要です');
    }
    if (
      this.requirement.length !== 0 &&
      !this.requirement.every((req) =>
        Object.prototype.hasOwnProperty.call(data, req)
      )
    ) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        '必須項目を確認してください'
      );
    }
    return await this.do(data, context)
      .then((result) => {
        this.logger.info({ text: 'finish' });
        return result;
      })
      .catch((e) => {
        this.logger.error({ e, data });
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  do(data: any, context: CallableContext): Promise<void> {
    return new Promise((resolve) => {
      console.log('do something...');
      resolve();
    });
  }
}
