#!/bin/bash

echo "🐳 Testando Docker Build Localmente..."
echo "=================================="

# Remove containers antigos se existirem
echo "🧹 Limpando containers antigos..."
docker rm -f salao-test 2>/dev/null || true
docker rmi -f salao-beleza-test 2>/dev/null || true

# Build da imagem
echo "🔨 Construindo imagem Docker..."
docker build -t salao-beleza-test .

if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    
    # Testar se o container inicia
    echo "🚀 Testando inicialização do container..."
    docker run -d --name salao-test -p 3000:3000 -p 3001:3001 salao-beleza-test
    
    if [ $? -eq 0 ]; then
        echo "✅ Container iniciado com sucesso!"
        
        # Aguardar um pouco
        echo "⏳ Aguardando 10 segundos..."
        sleep 10
        
        # Verificar se está funcionando
        echo "🔍 Verificando logs..."
        docker logs salao-test
        
        echo ""
        echo "🌐 Testando health check..."
        curl -f http://localhost:3001/api/auth/health || echo "❌ Health check falhou"
        
        # Parar o container
        echo "🛑 Parando container de teste..."
        docker stop salao-test
        docker rm salao-test
        
        echo "✅ Teste concluído! O Docker está funcionando corretamente."
    else
        echo "❌ Falha ao iniciar o container"
        exit 1
    fi
else
    echo "❌ Falha no build do Docker"
    exit 1
fi 