# 🚀 Guia Rápido - Salão de Beleza MVP

## ⚡ Execução em 3 Passos

### 1. Instalar Dependências
```bash
# Instalar tudo de uma vez
npm install
```

### 2. Executar Aplicação
```bash
# Executar backend + frontend
npm run dev
```

### 3. Testar no Navegador
- Acesse: http://localhost:3000
- Registre um novo usuário
- Faça login e acesse o dashboard

## 🔗 URLs Importantes

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/auth/health

## 🧪 Teste Básico

### Registrar Usuário
1. Acesse http://localhost:3000
2. Clique em "Registrar"
3. Preencha:
   - Nome: "João Silva"
   - Email: "joao@teste.com"
   - Senha: "12345678"
   - Tipo: "Cliente"

### Verificar Funcionalidades
- ✅ Dashboard carrega após registro
- ✅ Logout funciona
- ✅ Login funciona
- ✅ Proteção de rotas (tente acessar /dashboard sem estar logado)

## 🛠️ Tecnologias

- **Backend**: NestJS + TypeORM + PostgreSQL (Neon)
- **Frontend**: Next.js 14 + TypeScript + Tailwind
- **Autenticação**: Sistema customizado com bcrypt

## 📊 Status

✅ **IMPLEMENTADO E FUNCIONANDO**

- [x] Registro de usuários
- [x] Login/Logout
- [x] Dashboard protegido
- [x] Diferentes roles (Admin, Profissional, Cliente)
- [x] Interface responsiva
- [x] Banco de dados em nuvem

## 🔧 Comandos Úteis

```bash
# Apenas backend
npm run dev:backend

# Apenas frontend  
npm run dev:frontend

# Verificar saúde da API
curl http://localhost:3001/api/auth/health
```

---

🎯 **Pronto para demonstração!** 