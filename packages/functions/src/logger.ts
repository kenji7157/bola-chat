import { Log, Logging } from '@google-cloud/logging';
import { Request } from 'express';

enum Severity {
  DEFAULT = 'DEFAULT',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  NOTICE = 'NOTICE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
  ALERT = 'ALERT',
  EMERGENCY = 'EMERGENCY',
}

class Logger {
  logMetadata = {
    resource: {
      type: 'cloud_function',
      labels: {
        function_name: process.env.K_SERVICE,
      },
    },
    severity: Severity.DEFAULT,
    labels: {
      execution_id: '',
    },
  };
  logOption = {
    resource: {
      type: 'cloud_function',
      labels: {
        function_name: process.env.K_SERVICE,
      },
    },
  };

  protected log: Log;

  constructor(name: string) {
    this.log = new Logging().log(name);
  }

  info(jsonPayload: Record<string, any>) {
    this.logMetadata.severity = Severity.INFO;
    return this.write(jsonPayload);
  }
  warn(jsonPayload: Record<string, any>) {
    this.logMetadata.severity = Severity.WARNING;
    return this.write(jsonPayload);
  }
  debug(jsonPayload: Record<string, any>) {
    this.logMetadata.severity = Severity.DEBUG;
    return this.write(jsonPayload);
  }
  error(jsonPayload: Record<string, any>) {
    this.logMetadata.severity = Severity.ERROR;
    return this.write(jsonPayload);
  }

  private write(jsonPayload: Record<string, any>) {
    return (
      this.log
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .write(this.log.entry(this.logMetadata, jsonPayload), this.logOption)
        .catch((err: any) => console.log('log write failure', err))
    );
  }
}

export class FuncLogger extends Logger {
  constructor() {
    super('functionLogger');
  }

  setExecutionId(cxt: Request<any>) {
    const executionId = cxt.header('Function-Execution-Id') || '';
    if (!executionId) {
      this.error({ text: 'has not ctx.header.Function-Execution-Id', cxt });
      return;
    }
    this.logMetadata.labels['execution_id'] = executionId;
  }
  setExecutionIdByEventId(eventId: string | undefined) {
    if (!eventId) {
      this.error({ text: 'has not eventId', eventId });
      return;
    }
    this.logMetadata.labels['execution_id'] = eventId;
  }
}
