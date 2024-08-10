import { Injectable, Logger } from '@nestjs/common';
import { PinoLoggerService } from './common/logger/pino.logger.service';

@Injectable()
export class AppService {
  // nestjs 기본 logger 선언
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.debug('getHello() logger called');
    return 'Hello World!';
  }
}
