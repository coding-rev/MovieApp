import pino from 'pino';
import pinoHttp, { Options as PinoHttpOptions, ReqId } from 'pino-http';
import { randomUUID } from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';
import { env } from '@/config/env';

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: { colorize: true },
        }
      : undefined,
});

const options: PinoHttpOptions = {
  logger,
  genReqId: (req: IncomingMessage & { id?: ReqId }, res: ServerResponse): ReqId => {
    const existing = req.id ?? (req.headers['x-request-id'] as string | undefined);
    const id: ReqId = existing || randomUUID();
    res.setHeader('x-request-id', String(id));
    return id;
  },
  serializers: {
    req(req: IncomingMessage & { id?: ReqId }) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
      };
    },
  },
};

export const loggerMiddleware = pinoHttp(options);
