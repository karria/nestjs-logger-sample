import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import pino from 'pino';
import { multistream } from 'pino-multi-stream';
import { ILoggerService } from './interface/logger.service.interface';
import rfs from 'rotating-file-stream';
import * as fs from 'fs';
import * as path from 'path';

// 로그 파일이 저장될 디렉토리
const logDirectory = path.join(__dirname, 'logs');

// 로그 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// 날짜별 Pino 로그 파일 생성
const rotateStream = rfs.createStream('logfile.log', {
  interval: '1d', // 하루마다 로그 파일 회전
  path: logDirectory, // 로그 파일이 저장될 디렉토리
  compress: 'gzip', // 로그 파일 압축
  maxFiles: 7, // 최대 7개의 로그 파일 유지
  maxSize: '10M', // 로그 파일의 최대 크기
});

@Injectable()
export class MyLoggerService implements ILoggerService {
  private readonly logger = pino(
    {
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    multistream([
      { stream: process.stdout },
      { stream: rotateStream },
    ])
  );
  
  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error({ message, trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.trace(message);
  }
  
  
}

