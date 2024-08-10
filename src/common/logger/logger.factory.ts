import { Injectable } from "@nestjs/common";
import { PinoLoggerService } from "./pino.logger.service"

@Injectable()
export class LoggerFactory {
  constructor(
    private readonly pinologger: PinoLoggerService
  ) {}

  getLogger(type: 'pino') {
    // pino logger를 반환
    switch (type) {
      case 'pino':
      default:
        return this.pinologger;
    }
  }
}