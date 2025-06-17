import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      // Verificar se há um token de autenticação no header
      const authorization = request.headers.authorization;

      if (!authorization) {
        throw new UnauthorizedException('Token de autenticação não fornecido');
      }

      // Extrair o token do header Authorization
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Token inválido');
      }

      // Por enquanto, apenas verificamos se o token existe
      // Em uma implementação completa, verificaríamos JWT aqui
      request['user'] = { id: token }; // Simplificado para MVP

      return true;
    } catch {
      throw new UnauthorizedException('Token de autenticação inválido');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
