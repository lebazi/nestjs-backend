# 🚀 Guia de Deploy - Railway

## ✅ **Status Atual**
- ✅ **Builds concluídas** com sucesso
- ✅ **Arquivos de deploy** criados
- ✅ **Banco de dados** configurado (Neon PostgreSQL)
- ✅ **Health checks** implementados

## 📋 **Checklist Pré-Deploy**

### **1. ✅ Builds Verificadas**
- Backend NestJS: ✅ Build concluída
- Frontend Next.js: ✅ 5 páginas geradas
- TypeScript: ✅ Sem erros de tipagem
- Linting: ✅ Aprovado

### **2. ✅ Arquivos Criados**
- `railway.json` - Configuração Railway
- `Dockerfile` - Container multi-stage otimizado
- `.dockerignore` - Exclusões para build
- `README.md` - Documentação atualizada

## 🛠️ **Passos para Deploy**

### **Passo 1: Configurar GitHub**
```bash
# Inicializar Git (se não estiver)
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "🚀 MVP Salão de Beleza - Pronto para deploy"

# Adicionar remote do GitHub
git remote add origin https://github.com/SEU_USERNAME/NOME_REPO.git

# Push para GitHub
git push -u origin main
```

### **Passo 2: Configurar Railway**
1. **Acessar**: https://railway.app
2. **Conectar GitHub**: Autorizar acesso ao repositório
3. **Importar projeto**: Selecionar o repositório criado
4. **Deploy automático**: Railway detectará `railway.json`

### **Passo 3: Configurar Variáveis de Ambiente**

#### **No Railway Dashboard:**
```env
# Banco de Dados
DATABASE_URL=postgresql://neondb_owner:npg_QnbKA2r3yE5W@ep-green-boat-a5bj1b0z.us-east-2.aws.neon.tech/neondb?sslmode=require

# Aplicação
NODE_ENV=production
JWT_SECRET=sua-chave-super-secreta-aqui
PORT=3001

# Frontend (Railway detecta automaticamente)
NEXT_PUBLIC_API_URL=${{RAILWAY_STATIC_URL}}
```

### **Passo 4: Deploy Automático**
- Railway executará: `npm run build`
- Iniciará com: `npm run start`
- Health check: `/api/auth/health`

## 🔧 **Configurações Railway**

### **Build Settings:**
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "healthcheckPath": "/api/auth/health"
  }
}
```

### **Environment Variables:**
- ✅ `DATABASE_URL` - String conexão Neon
- ✅ `NODE_ENV=production`
- ✅ `JWT_SECRET` - Chave JWT
- ✅ `PORT=3001` - Porta do backend

## 🌐 **URLs Após Deploy**

### **Railway fornecerá:**
- **App URL**: `https://seu-projeto.railway.app`
- **API URL**: `https://seu-projeto.railway.app/api`
- **Health Check**: `https://seu-projeto.railway.app/api/auth/health`

## 🧪 **Testes Pós-Deploy**

### **1. Health Check**
```bash
curl https://seu-projeto.railway.app/api/auth/health
```

### **2. Registro de Usuário**
1. Acessar `https://seu-projeto.railway.app/register`
2. Criar conta teste
3. Verificar redirecionamento para dashboard

### **3. Login**
1. Fazer logout
2. Acessar `/login`
3. Entrar com credenciais criadas

### **4. Proteção de Rotas**
1. Tentar acessar `/dashboard` sem login
2. Verificar redirecionamento para `/login`

## 📊 **Monitoramento**

### **Railway Dashboard:**
- **Logs**: Visualizar em tempo real
- **Métricas**: CPU, RAM, Network
- **Deployments**: Histórico de deploys
- **Domains**: Configurar domínio customizado

### **Health Checks:**
- **Endpoint**: `/api/auth/health`
- **Intervalo**: 30 segundos
- **Timeout**: 3 segundos
- **Retries**: 3 tentativas

## ⚡ **Performance**

### **Otimizações Implementadas:**
- ✅ **Multi-stage Docker**: Build otimizado
- ✅ **Static Generation**: Páginas pré-renderizadas
- ✅ **Code Splitting**: Chunks otimizados
- ✅ **Compression**: Gzip habilitado
- ✅ **Caching**: Headers apropriados

### **Métricas Esperadas:**
- **Build time**: ~2-3 minutos
- **Cold start**: <5 segundos
- **Response time**: <200ms
- **Bundle size**: ~130kB gzipped

## 🚨 **Troubleshooting**

### **Build Failures:**
```bash
# Verificar logs localmente
npm run build

# Testar Docker localmente
docker build -t salao-test .
docker run -p 3000:3000 -p 3001:3001 salao-test
```

### **Runtime Errors:**
- **Database**: Verificar `DATABASE_URL`
- **CORS**: Verificar origens permitidas
- **Environment**: Confirmar todas as variáveis

### **Common Issues:**
1. **Port binding**: Railway usa `PORT` env var
2. **Database SSL**: Neon requer `sslmode=require`
3. **Static files**: Next.js assets path

## 🔄 **CI/CD Workflow**

### **Auto-Deploy Setup:**
1. **Trigger**: Push para `main`
2. **Build**: Automático no Railway
3. **Tests**: Health checks
4. **Deploy**: Se build passar
5. **Rollback**: Automático se falhar

### **Manual Deploy:**
```bash
# Redeploy manual no Railway dashboard
railway up --detach
```

## 📈 **Próximos Passos**

### **Pós-Deploy:**
1. **Domínio customizado** (opcional)
2. **SSL Certificate** (automático)
3. **CDN Setup** para assets
4. **Backup strategy** banco de dados

### **Monitoramento:**
1. **Error tracking** (Sentry)
2. **Performance monitoring** (Railway metrics)
3. **Uptime monitoring** (status page)

---

**🎯 Status**: ✅ **Pronto para Deploy**  
**⏱️ Tempo estimado**: 5-10 minutos  
**🔗 Próximo**: Push GitHub → Import Railway → Configure ENV → Deploy! 