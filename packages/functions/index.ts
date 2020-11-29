import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
import {
  runtimeOption512MB,
  runtimeOption1GB,
  FirestoreTriggerMethod,
} from 'bola-chat-types/FunctionsProperties';

admin.initializeApp(functions.config().firebase);

const func512MB = functions.runWith(runtimeOption512MB);
const func1GB = functions.runWith(runtimeOption1GB);

const isNeeded = (functionName: string): boolean => {
  return !process.env.K_SERVICE || process.env.K_SERVICE === functionName;
};
const exportFirestoreTriggerFuncIfNeeded = (
  builder: functions.FunctionBuilder,
  functionName: string,
  path: string,
  method: FirestoreTriggerMethod
) => {
  if (isNeeded(functionName)) {
    exports[functionName] = builder.firestore
      .document(path)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      [method](require(`./src/func/${functionName}`)[functionName]);
  }
};
const exportScheduleTriggerFuncIfNeeded = (
  builder: functions.FunctionBuilder,
  functionName: string,
  schedule: string,
  timezone: 'Asia/Tokyo'
) => {
  if (isNeeded(functionName)) {
    exports[functionName] = builder.pubsub
      .schedule(schedule)
      .timeZone(timezone)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .onRun(require(`./src/func/${functionName}`)[functionName]);
  }
};
const exportHttpsFuncIfNeeded = (
  builder: functions.FunctionBuilder,
  functionName: string
) => {
  if (isNeeded(functionName)) {
    exports[functionName] = builder.https.onCall(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`./src/func/${functionName}`).c.run
    );
  }
};
const exportHttpsOnRequestFuncIfNeeded = (
  builder: functions.FunctionBuilder,
  functionName: string
) => {
  if (isNeeded(functionName)) {
    exports[functionName] = builder.https.onRequest(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`./src/func/${functionName}`).onRequestFunc
    );
  }
};

/** Firestore更新トリガー */

/** スケジュールトリガー */

/** HTTPSトリガー */
exportHttpsOnRequestFuncIfNeeded(func512MB, 'updateUserMetadata');
