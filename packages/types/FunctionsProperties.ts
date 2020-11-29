interface FunctionRuntimeOption {
  timeoutSeconds?: number;
  memory?: '128MB' | '256MB' | '512MB' | '1GB' | '2GB';
}

export const runtimeOption512MB: FunctionRuntimeOption = {
  timeoutSeconds: 540,
  memory: '512MB',
};

export const runtimeOption1GB: FunctionRuntimeOption = {
  timeoutSeconds: 540,
  memory: '1GB',
};

export type FirestoreTriggerMethod =
  | 'onCreate'
  | 'onDelete'
  | 'onUpdate'
  | 'onWrite';
