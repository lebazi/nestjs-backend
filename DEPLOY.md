# 🚀 Guia de Deploy - Railway (ATUALIZADO)

## ✅ **Correções Aplicadas**
- ✅ **Node.js atualizado** para versão 20
- ✅ **Dockerfile corrigido** para usar Node 20
- ✅ **Railway.json configurado** para usar Docker
- ✅ **Engines especificados** em todos os package.json
- ✅ **.nvmrc criado** para versão do Node

## 🔧 **Problemas Corrigidos**

### **1. ❌ Versão Node.js Incompatível**
**Erro anterior:** Railway usava Node 18, mas dependências requeriam Node >= 20

**✅ Solução aplicada:**
- Dockerfile atualizado: `FROM node:20-alpine`
- package.json engines: `"node": ">=20.0.0"`
- .nvmrc criado com versão 20

### **2. ❌ Railway usando Nixpacks em vez de Docker**
**Erro anterior:** `cd frontend && npm ci` falhou porque Railway ignorava o Dockerfile

**✅ Solução aplicada:**
```json
// railway.json
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  }
}
```

### **3. ❌ Comandos npm deprecated**
**Erro anterior:** `npm ci --only=production` está deprecated

**✅ Solução aplicada:**
```dockerfile
# Dockerfile - comandos atualizados
RUN npm ci --omit=dev
```

## 🛠️ **Passos para Re-Deploy**

### **Passo 1: Verificar Arquivos Atualizados**
```bash
# Verificar se todas as correções estão aplicadas
cat .nvmrc                    # Deve mostrar: 20
cat railway.json             # Deve usar DOCKERFILE
grep "node.*20" */package.json # Deve mostrar engines >= 20.0.0
```

### **Passo 2: Commit e Push**
```bash
git add .
git commit -m "🔧 Fix: Atualizar Node.js para v20 e corrigir Railway config"
git push origin main
```

### **Passo 3: Re-Deploy no Railway**
1. **Acessar Railway Dashboard**
2. **Ir para o projeto**
3. **Clicar em "Redeploy"** ou aguardar auto-deploy
4. **Verificar logs** - não deve mais ter warnings de versão

## 📋 **Checklist Pré-Deploy Atualizado**

### **1. ✅ Versões Verificadas**
- Node.js: ✅ v20 (via .nvmrc e engines)
- NestJS: ✅ v11 compatível com Node 20
- Next.js: ✅ v15 compatível com Node 20

### **2. ✅ Configurações Docker**
- Base image: ✅ `node:20-alpine`
- Multi-stage build: ✅ Otimizado
- Dependencies: ✅ `--omit=dev` (atualizado)
- Railway builder: ✅ DOCKERFILE

### **3. ✅ Scripts de Build**
- Backend build: ✅ `nest build`
- Frontend build: ✅ `next build`
- Combined build: ✅ `npm run build`
- Health check: ✅ `/api/auth/health`

## 🚀 **Deploy Automático**

### **Railway agora executará:**
```bash
# 1. Build stage (Node 20)
npm ci                    # Install all deps
cd backend && npm ci      # Backend deps
cd frontend && npm ci     # Frontend deps
npm run build            # Build both apps

# 2. Production stage (Node 20)
npm ci --omit=dev        # Production deps only
cd backend && npm ci --omit=dev
cd frontend && npm ci --omit=dev

# 3. Start application
npm run start            # Start both services
```

## 🌐 **Variáveis de Ambiente (Inalteradas)**

```env
# No Railway Dashboard
DATABASE_URL=postgresql://neondb_owner:npg_QnbKA2r3yE5W@ep-green-boat-a5bj1b0z.us-east-2.aws.neon.tech/neondb?sslmode=require
NODE_ENV=production
JWT_SECRET=sua-chave-super-secreta-aqui
PORT=3001
NEXT_PUBLIC_API_URL=${{RAILWAY_STATIC_URL}}
```

## 🧪 **Testes Pós-Correção**

### **1. Verificar Build Local (Opcional)**
```bash
# Testar Docker build localmente
docker build -t salao-beleza-v20 .
docker run -p 3000:3000 -p 3001:3001 salao-beleza-v20

# Verificar versão Node
docker run salao-beleza-v20 node --version
# Deve retornar: v20.x.x
```

### **2. Verificar Deploy Railway**
1. **Logs sem warnings** de versão
2. **Build successful** 
3. **Health check** respondendo
4. **Aplicação funcionando**

## 📊 **Logs Esperados (Corretos)**

### **✅ Build logs deve mostrar:**
```
[production 6/12] RUN npm ci --omit=dev  ✔ 
[production 7/12] RUN cd backend && npm ci --omit=dev  ✔ 
[production 8/12] RUN cd frontend && npm ci --omit=dev  ✔ 
```

### **❌ NÃO deve mais aparecer:**
```
npm warn EBADENGINE Unsupported engine
npm warn deprecated
can't cd to frontend: No such file or directory
```

## 🔄 **Próximos Passos**

1. **Push das correções** para o repositório
2. **Aguardar auto-deploy** no Railway
3. **Verificar logs** sem erros
4. **Testar aplicação** funcionando
5. **Configurar domínio** (se necessário)

---

## 📝 **Resumo das Correções**

| Problema | Solução | Arquivo |
|----------|---------|---------|
| Node.js v18 incompatível | Atualizar para v20 | `Dockerfile`, `.nvmrc` |
| Railway usando Nixpacks | Forçar uso de Docker | `railway.json` |
| npm deprecated warnings | Usar `--omit=dev` | `Dockerfile` |
| Engines não especificados | Adicionar engines | `package.json` (todos) |

**Resultado esperado:** Deploy sem warnings e aplicação funcionando corretamente! 🎉

## 🚀 Guia de Deploy - Railway

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