import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLoggerService } from 'src/modules/logger/winston-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: WinstonLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, baseUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
        const { statusCode } = res;
        const contentLength = res.get('content-length');
  
        this.logger.log(
          `Method: ${method}, To: ${baseUrl}, ResponseCode: ${statusCode}, Content Length: ${contentLength}, UserAgent: - ${userAgent}, IP: ${ip}`,
        );
      });
  
    
    next();
  }
}