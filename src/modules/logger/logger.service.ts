import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { anrIntegration } from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import { Configs, SentryConfig } from '../../configs/configs.type';

@Injectable()
export class LoggerService {
  private isLocal: boolean;

  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService<Configs>) {
    const sentryConfig = this.configService.get<SentryConfig>('sentry');
    this.isLocal = sentryConfig.environment === 'local';
    console.log(this.isLocal);
    Sentry.init({
      dsn: sentryConfig.dsn,
      debug: true,
      environment: sentryConfig.environment,
      integrations: [
        nodeProfilingIntegration(),
        anrIntegration({ captureStackTrace: true }),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
  }
  public log(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'log');
    }
  }
  public error(error: any): void {
    if (this.isLocal) {
      this.logger.error(error, error.stack);
    } else {
      Sentry.captureException(error, { level: 'error' });
    }
  }
}
