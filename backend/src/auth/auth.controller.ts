import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para registro de novos usuários
   * POST /auth/register
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`Tentativa de registro para email: ${registerDto.email}`);
    
    try {
      const result = await this.authService.register(registerDto);
      this.logger.log(`✅ Usuário registrado com sucesso: ${registerDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`❌ Erro no registro para ${registerDto.email}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Endpoint para login de usuários
   * POST /auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Tentativa de login para email: ${loginDto.email}`);
    
    try {
      const result = await this.authService.login(loginDto);
      this.logger.log(`✅ Login realizado com sucesso: ${loginDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`❌ Erro no login para ${loginDto.email}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Endpoint para logout
   * POST /auth/logout
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    this.logger.log('Requisição de logout recebida');
    
    try {
      const result = await this.authService.logout();
      this.logger.log('✅ Logout realizado com sucesso');
      return result;
    } catch (error) {
      this.logger.error(`❌ Erro no logout: ${error.message}`);
      throw error;
    }
  }

  /**
   * Endpoint para verificar autenticação
   * GET /auth/me
   */
  @Get('me')
  async me() {
    this.logger.log('Verificação de autenticação');
    
    try {
      // Por simplicidade no MVP, retornamos não autenticado
      // Em implementação completa, extrairia do JWT/session
      const result = await this.authService.me();
      return result;
    } catch (error) {
      this.logger.error(`❌ Erro na verificação de autenticação: ${error.message}`);
      return {
        authenticated: false,
        user: null,
      };
    }
  }

  /**
   * Health check do serviço de autenticação
   * GET /auth/health
   */
  @Get('health')
  async healthCheck() {
    this.logger.log('Health check do serviço de autenticação');
    return this.authService.healthCheck();
  }
} 