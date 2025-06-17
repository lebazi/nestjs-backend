# 💇‍♀️ MVP Salão de Beleza - Sistema de Autenticação

Sistema completo de autenticação para salão de beleza com backend NestJS e frontend Next.js.

## 🚀 **Funcionalidades**

- ✅ **Autenticação completa** (registro, login, logout)
- ✅ **Sistema de roles** (Admin, Profissional, Cliente)
- ✅ **Dashboard personalizado** por tipo de usuário
- ✅ **Banco PostgreSQL** (Neon)
- ✅ **Interface moderna** com Tailwind CSS
- ✅ **TypeScript** em todo o projeto
- ✅ **Responsivo** e acessível

## 🛠️ **Tecnologias**

### **Backend:**
- **NestJS** - Framework Node.js
- **TypeORM** - ORM para PostgreSQL
- **bcrypt** - Hash de senhas
- **class-validator** - Validação de dados

### **Frontend:**
- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

### **Banco de Dados:**
- **PostgreSQL** (Neon Cloud)

## 🎯 **Estrutura do Projeto**

```
template-intranet/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── auth/     # Módulo de autenticação
│   │   ├── users/    # Módulo de usuários
│   │   └── config/   # Configurações
│   └── dist/         # Build de produção
├── frontend/         # App Next.js
│   ├── src/
│   │   ├── app/      # Páginas do app
│   │   ├── components/ # Componentes reutilizáveis
│   │   └── contexts/ # Context API
│   └── .next/        # Build de produção
└── railway.json     # Configuração Railway
```

## 🚀 **Deploy no Railway**

### **1. Preparação:**
```bash
# Fazer build do projeto
npm run build

# Verificar se passou nos testes
npm test
```

### **2. Deploy:**
1. Conectar repositório GitHub ao Railway
2. Configurar variáveis de ambiente:
   - `DATABASE_URL` - String de conexão PostgreSQL
   - `NODE_ENV=production`
   - `JWT_SECRET` - Chave secreta JWT

### **3. Configuração Automática:**
- ✅ `railway.json` configurado
- ✅ `Dockerfile` multi-stage otimizado
- ✅ Health checks habilitados
- ✅ Auto-restart configurado

## ⚙️ **Variáveis de Ambiente**

### **Backend (.env):**
```env
DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require
NODE_ENV=production
JWT_SECRET=sua-chave-super-secreta
PORT=3001
```

### **Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://sua-api.railway.app
```

## 📊 **Status do Build**

- ✅ **Backend build**: Concluído sem erros
- ✅ **Frontend build**: 5 páginas geradas estaticamente
- ✅ **Bundle size**: ~130kB first load (otimizado)
- ✅ **TypeScript**: Sem erros de tipagem
- ✅ **Linting**: Aprovado

## 🔒 **Segurança**

- ✅ **Senhas hasheadas** com bcrypt (salt rounds: 12)
- ✅ **Validação de entrada** com class-validator
- ✅ **CORS configurado** adequadamente
- ✅ **Headers de segurança** habilitados

## 👥 **Tipos de Usuário**

### **👑 Admin:**
- Gerenciar usuários
- Visualizar todos os agendamentos
- Configurações do sistema

### **💼 Profissional:**
- Gerenciar próprios agendamentos
- Atender clientes

### **👤 Cliente:**
- Visualizar próprios agendamentos
- Fazer reservas

## 🎨 **Interface**

- **Design moderno** com gradientes e sombras
- **Contraste otimizado** para acessibilidade
- **Animações suaves** e transições
- **Responsivo** para mobile e desktop
- **Feedback visual** em todas as interações

## 📈 **Performance**

- **SSG**: Páginas geradas estaticamente
- **Code splitting**: Carregamento otimizado
- **Image optimization**: Automática no Next.js
- **Bundle analysis**: Chunks otimizados

## 🔧 **Desenvolvimento Local**

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Fazer build
npm run build

# Executar build local
npm run start
```

## 📝 **Notas de Deploy**

1. **Banco configurado** e tabelas criadas
2. **Builds testadas** e funcionando
3. **Health checks** implementados
4. **Dockerfile otimizado** para produção
5. **Railway.json** configurado para deploy automático

---

**🎯 Status**: ✅ **Pronto para Deploy**
**🚀 Próximo passo**: Push para GitHub → Deploy Railway 