import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

export interface CreateUserData {
  email: string;
  password: string;
  nome: string;
  role?: 'admin' | 'profissional' | 'cliente';
  telefone?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Busca usuário por email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  /**
   * Busca usuário por ID
   */
  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  /**
   * Busca todos os usuários (sem senha)
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: [
        'id',
        'email',
        'nome',
        'role',
        'isActive',
        'telefone',
        'avatar',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  /**
   * Converte string role para UserRole enum
   */
  private convertRole(role?: string): UserRole {
    switch (role) {
      case 'admin':
        return UserRole.ADMIN;
      case 'profissional':
        return UserRole.PROFISSIONAL;
      case 'cliente':
      default:
        return UserRole.CLIENTE;
    }
  }

  /**
   * Cria um novo usuário
   */
  async create(userData: CreateUserData): Promise<User> {
    // Verifica se o email já existe
    if (!userData.email || !userData.password) {
      throw new ConflictException('Email e senha são obrigatórios');
    }

    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Cria o usuário
    const user = this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      nome: userData.nome,
      role: this.convertRole(userData.role),
      telefone: userData.telefone,
      isActive: true,
    });

    return await this.userRepository.save(user);
  }

  /**
   * Atualiza um usuário
   */
  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Se está atualizando a senha, fazer hash
    if (updateData.password) {
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    await this.userRepository.update(id, updateData);
    const updatedUser = await this.findById(id);

    if (!updatedUser) {
      throw new NotFoundException('Erro ao atualizar usuário');
    }

    return updatedUser;
  }

  /**
   * Remove um usuário (soft delete)
   */
  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.update(id, { isActive: false });
  }

  /**
   * Valida senha do usuário
   */
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
