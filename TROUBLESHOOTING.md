# 🔧 Troubleshooting - Deploy Railway

## 🚨 **Problemas Identificados e Soluções**

### **Problema Principal: "can't cd to frontend"**

**Erro:**
```
/bin/sh: cd: line 0: can't cd to frontend: No such file or directory
```

**Causa:** O Dockerfile multi-stage não estava copiando corretamente a estrutura de workspaces npm.

**✅ Solução Aplicada:**
- Substituído multi-stage por single-stage mais simples
- Agora instala dependencies, faz build, e remove dev deps em sequência
- Mantém toda a estrutura de diretórios intacta

---

## 📋 **Plano de Debug Detalhado**

### **Fase 1: Teste Local (RECOMENDADO)**

**1.1 Testar Docker Build Localmente:**
```bash
# Executar script de teste
chmod +x test-docker-build.sh
./test-docker-build.sh
```

**1.2 Se falhar localmente:**
```bash
# Build manual para debug
docker build -t debug-salao .

# Se build falhar, verificar logs step by step
docker build --no-cache -t debug-salao .

# Se build passar, testar execução
docker run -it debug-salao /bin/sh
```

**1.3 Verificar estrutura interna:**
```bash
# Dentro do container
ls -la /app/
ls -la /app/backend/
ls -la /app/frontend/
npm list --depth=0
```

### **Fase 2: Testes de Abordagens Alternativas**

**2.1 Se Dockerfile principal falhar, testar multi-stage corrigido:**
```bash
# Renomear arquivos
mv Dockerfile Dockerfile.single
mv Dockerfile.multistage Dockerfile

# Testar build
docker build -t debug-multistage .
```

**2.2 Se ambos falharem, abordagem minimal:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000 3001
CMD ["npm", "start"]
```

### **Fase 3: Verificação Railway**

**3.1 Variáveis de Ambiente necessárias:**
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=sua_connection_string_neon
JWT_SECRET=sua_chave_jwt
NEXT_PUBLIC_API_URL=${{RAILWAY_STATIC_URL}}
```

**3.2 Configuração Railway.json:**
- ✅ Builder: DOCKERFILE
- ✅ Start command: npm run start
- ✅ Health check: /api/auth/health

---

## 🔍 **Checklist de Verificação**

### **Estrutura do Projeto:**
- [ ] Diretório `backend/` existe
- [ ] Diretório `frontend/` existe  
- [ ] `package.json` na raiz com workspaces
- [ ] `backend/package.json` existe
- [ ] `frontend/package.json` existe

### **Scripts package.json:**
- [ ] `npm run build` funciona localmente
- [ ] `npm run start` funciona localmente
- [ ] Scripts chamam `cd backend` e `cd frontend` corretamente

### **Docker:**
- [ ] `.dockerignore` não exclui arquivos essenciais
- [ ] `Dockerfile` copia todas as fontes
- [ ] Build local funciona sem erros
- [ ] Container inicia sem erros

### **Railway:**
- [ ] `railway.json` usa DOCKERFILE builder
- [ ] Variáveis de ambiente configuradas
- [ ] Health check path correto

---

## 🚀 **Comandos de Teste**

### **Teste 1: Build Local**
```bash
# Teste básico
npm run build

# Se falhar, testar individualmente
cd backend && npm run build
cd ../frontend && npm run build
```

### **Teste 2: Docker Local**
```bash
# Build
docker build -t test .

# Run
docker run -p 3000:3000 -p 3001:3001 test

# Debug interno
docker run -it test /bin/sh
```

### **Teste 3: Workspace npm**
```bash
# Verificar workspaces
npm ls --workspaces

# Instalar dependências por workspace
npm ci --workspaces
```

---

## 📊 **Logs Esperados (Corretos)**

### **✅ Build bem-sucedido deve mostrar:**
```
✔ [1/8] FROM node:20-alpine
✔ [2/8] RUN apk add --no-cache curl
✔ [3/8] WORKDIR /app
✔ [4/8] COPY package*.json ./
✔ [5/8] RUN npm ci
✔ [6/8] COPY . .
✔ [7/8] RUN npm run build
✔ [8/8] RUN npm ci --omit=dev
```

### **❌ NÃO deve aparecer:**
```
can't cd to frontend: No such file or directory
process did not complete successfully: exit code: 2
EBADENGINE Unsupported engine
```

---

## 🛠️ **Estratégias de Fallback**

### **Opção 1: Dockerfile Simplificado**
Se problemas persistirem, usar:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN npm ci --omit=dev
EXPOSE 3000 3001
CMD ["npm", "start"]
```

### **Opção 2: Deploy Separado**
Considerar deploy de backend e frontend separadamente:
- Backend: Railway com Dockerfile específico
- Frontend: Vercel ou Netlify

### **Opção 3: Plataforma Alternativa**
Se Railway continuar problemático:
- Render.com
- DigitalOcean App Platform
- Heroku

---

## 📞 **Próximos Passos**

1. **Execute o teste local primeiro**
2. **Se local funcionar, commit e push**
3. **Monitore logs Railway detalhadamente**
4. **Se falhar, testar Dockerfile alternativo**
5. **Documentar logs específicos para debug adicional** 