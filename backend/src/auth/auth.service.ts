import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService, CreateUserData } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

// Tipo para usuário sem senha
export type UserWithoutPassword = {
  id: string;
  email: string;
  nome: string;
  role: string;
  isActive: boolean;
  telefone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Registra um novo usuário
   */
  async register(registerDto: RegisterDto): Promise<{ message: string; user: UserWithoutPassword }> {
    try {
      // Verifica se o email já existe
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        throw new ConflictException('Email já está em uso');
      }

      // Preparar dados do usuário
      const userData: CreateUserData = {
        email: registerDto.email,
        password: registerDto.password,
        nome: registerDto.nome,
        role: registerDto.role || 'cliente',
        telefone: registerDto.telefone,
      };

      const user = await this.usersService.create(userData);

      // Retornar dados sem a senha
      const userWithoutPassword: UserWithoutPassword = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        isActive: user.isActive,
        telefone: user.telefone,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return {
        message: 'Usuário registrado com sucesso',
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Erro ao registrar usuário');
    }
  }

  /**
   * Faz login do usuário
   */
  async login(loginDto: LoginDto): Promise<{ message: string; user: UserWithoutPassword }> {
    try {
      const { email, password } = loginDto;

      // Buscar usuário por email
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Verificar se o usuário está ativo
      if (!user.isActive) {
        throw new UnauthorizedException('Conta desativada');
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Retornar dados sem a senha
      const userWithoutPassword: UserWithoutPassword = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        isActive: user.isActive,
        telefone: user.telefone,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return {
        message: 'Login realizado com sucesso',
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('Erro ao fazer login');
    }
  }

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<{ message: string }> {
    return {
      message: 'Logout realizado com sucesso',
    };
  }

  /**
   * Verifica se o usuário está autenticado
   */
  async me(userId?: string): Promise<{ authenticated: boolean; user: UserWithoutPassword | null }> {
    if (!userId) {
      return {
        authenticated: false,
        user: null,
      };
    }

    try {
      const user = await this.usersService.findById(userId);
      if (!user || !user.isActive) {
        return {
          authenticated: false,
          user: null,
        };
      }

      const userWithoutPassword: UserWithoutPassword = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        isActive: user.isActive,
        telefone: user.telefone,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return {
        authenticated: true,
        user: userWithoutPassword,
      };
    } catch (error) {
      return {
        authenticated: false,
        user: null,
      };
    }
  }

  /**
   * Health check do serviço
   */
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    return {
      status: 'ok',
      message: 'Serviço de autenticação funcionando',
      timestamp: new Date().toISOString(),
    };
  }
} 