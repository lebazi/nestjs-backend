# 🧪 Guia de Teste - MVP Salão de Beleza

## 📋 Checklist de Testes

### ✅ 1. Teste do Backend
```bash
# Navegar para o backend
cd backend

# Iniciar o servidor
npm run dev
```

**Verificações:**
- [ ] Servidor inicia na porta 3001
- [ ] Conexão com banco PostgreSQL estabelecida
- [ ] Logs mostram "🚀 Servidor rodando na porta 3001"
- [ ] API disponível em http://localhost:3001/api

### ✅ 2. Teste da API de Autenticação
```bash
# Teste de health check
curl http://localhost:3001/api/auth/health

# Resposta esperada:
{
  "status": "ok",
  "message": "Serviço de autenticação funcionando",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### ✅ 3. Teste do Frontend
```bash
# Em um novo terminal, navegar para o frontend
cd frontend

# Iniciar o servidor
npm run dev
```

**Verificações:**
- [ ] Frontend inicia na porta 3000
- [ ] Página inicial carrega em http://localhost:3000
- [ ] AuthProvider está funcionando
- [ ] Navegação entre páginas funciona

### ✅ 4. Teste de Autenticação Completa

#### 4.1 Registro de Usuário
1. Acessar http://localhost:3000/register
2. Preencher o formulário:
   - Nome: "João Silva"
   - Email: "joao@teste.com"
   - Senha: "12345678"
   - Tipo: "Cliente"
3. Clicar em "Criar Conta"

**Resultado esperado:**
- [ ] Usuário é registrado no banco
- [ ] Login automático após registro
- [ ] Redirecionamento para /dashboard

#### 4.2 Login Manual
1. Fazer logout
2. Acessar http://localhost:3000/login
3. Usar as credenciais:
   - Email: "joao@teste.com"
   - Senha: "12345678"
4. Clicar em "Entrar"

**Resultado esperado:**
- [ ] Login realizado com sucesso
- [ ] Redirecionamento para /dashboard
- [ ] Dados do usuário exibidos no dashboard

#### 4.3 Proteção de Rotas
1. Fazer logout
2. Tentar acessar http://localhost:3000/dashboard

**Resultado esperado:**
- [ ] Redirecionamento automático para /login
- [ ] Middleware funcionando corretamente

#### 4.4 Persistência de Sessão
1. Fazer login
2. Recarregar a página
3. Fechar e abrir nova aba

**Resultado esperado:**
- [ ] Usuário continua logado
- [ ] Better-Auth mantém sessão ativa

### ✅ 5. Teste de Roles

#### 5.1 Administrador
1. Registrar usuário com role "admin"
2. Fazer login
3. Verificar dashboard

**Resultado esperado:**
- [ ] Card "Usuários" visível apenas para admins
- [ ] Acesso completo ao sistema

#### 5.2 Profissional
1. Registrar usuário com role "profissional"
2. Fazer login
3. Verificar dashboard

**Resultado esperado:**
- [ ] Acesso aos agendamentos
- [ ] Sem acesso ao gerenciamento de usuários

#### 5.3 Cliente
1. Registrar usuário com role "cliente"
2. Fazer login
3. Verificar dashboard

**Resultado esperado:**
- [ ] Acesso limitado aos próprios agendamentos
- [ ] Interface simplificada

### ✅ 6. Teste do Banco de Dados

#### 6.1 Verificar Conexão
```bash
# No backend, verificar logs de conexão
# Deve mostrar: "💾 Banco de dados: Neon PostgreSQL"
```

#### 6.2 Verificar Tabelas Criadas
- [ ] Tabela `users` existe
- [ ] Campos corretos (id, email, password, nome, role, etc.)
- [ ] Indexes aplicados

### ✅ 7. Teste de Segurança

#### 7.1 Validação de Dados
1. Tentar registrar com email inválido
2. Tentar registrar com senha curta
3. Tentar registrar com campos vazios

**Resultado esperado:**
- [ ] Mensagens de erro apropriadas
- [ ] Validação no frontend e backend

#### 7.2 Proteção CORS
1. Tentar fazer requisição de origem diferente
2. Verificar headers CORS

**Resultado esperado:**
- [ ] CORS configurado corretamente
- [ ] Apenas origens permitidas aceitas

### ✅ 8. Teste de Performance

#### 8.1 Tempo de Resposta
- [ ] Login < 2 segundos
- [ ] Registro < 3 segundos
- [ ] Carregamento de páginas < 1 segundo

#### 8.2 Logs e Monitoramento
- [ ] Logs estruturados no backend
- [ ] Informações de debug no frontend
- [ ] Tratamento adequado de erros

## 🚨 Problemas Conhecidos

### Backend
- [ ] Better-Auth pode precisar de configuração adicional
- [ ] TypeORM pode ter problemas de sincronização

### Frontend
- [ ] Middleware pode não detectar sessões corretamente
- [ ] Redirecionamentos podem ter delay

## 📊 Métricas de Sucesso

- [ ] **100%** das funcionalidades de autenticação funcionando
- [ ] **0** erros de conexão com banco
- [ ] **< 3s** tempo total de login
- [ ] **100%** das rotas protegidas funcionando
- [ ] **0** vazamentos de dados sensíveis

## 🔧 Próximos Passos

1. **Correções de Bugs**
   - Resolver problemas encontrados nos testes
   - Ajustar configurações se necessário

2. **Melhorias**
   - Adicionar testes automatizados
   - Implementar logs mais detalhados
   - Otimizar performance

3. **Funcionalidades Futuras**
   - Sistema de agendamentos
   - Gestão de serviços
   - Notificações por email

## 🔧 Comandos de Desenvolvimento

### Executar Backend e Frontend
```bash
# Opção 1: Executar tudo de uma vez (do diretório raiz)
npm run dev

# Opção 2: Executar separadamente
npm run dev:backend
npm run dev:frontend
```

### Testar API com curl
```bash
# Health check
curl http://localhost:3001/api/auth/health

# Verificar status da API
curl http://localhost:3001/api/auth/me
```

---

**Data do Teste:** ___________
**Testado por:** ___________
**Status:** [ ] ✅ Aprovado | [ ] ❌ Reprovado | [ ] ⚠️ Com Ressalvas 