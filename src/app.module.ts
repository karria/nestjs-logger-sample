import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinoLoggerService } from './common/logger/pino.logger.service';
import { LoggerFactory } from './common/logger/logger.factory';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PinoLoggerService,
    LoggerFactory,
    {
      provide: Logger,
      useFactory: (loggerFactory: LoggerFactory) => loggerFactory.getLogger('pino'),
      inject: [LoggerFactory],
    },
  ],
})
export class AppModule {
  constructor(LoggerFactory: LoggerFactory) {
    Logger.overrideLogger(LoggerFactory.getLogger('pino'));
  }
}
