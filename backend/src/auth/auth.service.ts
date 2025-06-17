import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

/**
 * Serviço de autenticação responsável por login, registro e validação de usuários
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Realiza o login do usuário
   * @param loginDto Dados de login (email e senha)
   * @returns Token JWT e dados do usuário
   */
  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      // Buscar usuário por email
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Verificar se usuário está ativo
      if (!user.isActive) {
        throw new UnauthorizedException('Usuário inativo');
      }

      // Gerar token JWT
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      this.logger.log(`Login realizado com sucesso para: ${email}`);

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          role: user.role,
          isActive: user.isActive,
          telefone: user.telefone,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      this.logger.error(
        `Erro no login: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
      throw error;
    }
  }

  /**
   * Registra um novo usuário
   * @param registerDto Dados de registro
   * @returns Token JWT e dados do usuário criado
   */
  async register(registerDto: RegisterDto) {
    try {
      const { email, password, nome, telefone, role } = registerDto;

      // Verificar se email já existe
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email já está em uso');
      }

      // Hash da senha
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Criar usuário
      const userData = {
        email,
        password: hashedPassword,
        nome,
        telefone,
        role,
      };

      const user = await this.usersService.create(userData);

      // Gerar token JWT
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      this.logger.log(`Usuário registrado com sucesso: ${email}`);

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          role: user.role,
          isActive: user.isActive,
          telefone: user.telefone,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      this.logger.error(
        `Erro no registro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
      throw error;
    }
  }

  /**
   * Valida token JWT
   * @param token Token JWT
   * @returns Dados do usuário se válido
   */
  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findById(payload.sub as string);

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Token inválido');
      }

      return user;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  /**
   * Realiza logout (placeholder - em implementação stateless não há ação específica)
   */
  logout() {
    // Em uma implementação stateless com JWT, não há ação específica de logout
    // Em uma implementação futura, poderíamos adicionar blacklist de tokens
    this.logger.log('Logout realizado');
    return { message: 'Logout realizado com sucesso' };
  }

  /**
   * Verifica se o usuário tem a role necessária
   * @param userRole Role do usuário
   * @param requiredRoles Roles necessárias
   * @returns True se autorizado
   */
  hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRole);
  }

  /**
   * Busca usuário por ID
   * @param userId ID do usuário
   * @returns Dados do usuário
   */
  async findUserById(userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }
      return user;
    } catch {
      this.logger.error(`Erro ao buscar usuário: ${userId}`);
      throw new UnauthorizedException('Usuário não encontrado');
    }
  }

  /**
   * Health check do serviço de autenticação
   * @returns Status do serviço
   */
  healthCheck() {
    return {
      status: 'ok',
      service: 'AuthService',
      timestamp: new Date().toISOString(),
    };
  }
}
