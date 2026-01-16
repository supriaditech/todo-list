import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const userId = req.headers['x-user-id'];
    if (!userId) {
      throw new UnauthorizedException(
        'Akses ditolak: Header x-user-id wajib diisi',
      );
    }
    next();
  }
}
