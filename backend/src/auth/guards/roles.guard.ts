import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

// Interface para o usuário no request
interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}

// Interface para o request com user
interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Se não há roles requeridas, permite acesso
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      this.logger.warn('Tentativa de acesso sem usuário autenticado');
      throw new ForbiddenException('Usuário não autenticado');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      this.logger.warn(
        `Usuário ${user.email} tentou acessar recurso sem permissão. Role atual: ${user.role}, Roles requeridas: ${requiredRoles.join(', ')}`,
      );
      throw new ForbiddenException('Acesso negado: permissões insuficientes');
    }

    this.logger.log(`Usuário ${user.email} autorizado com role: ${user.role}`);
    return true;
  }
}

// Decorator para definir roles necessárias
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
