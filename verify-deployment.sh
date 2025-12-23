#!/bin/bash

# Script de verificación pre-deployment
# Ejecutar antes de hacer deploy a producción

echo "🔍 Verificando configuración de deployment..."
echo ""

# Verificar backend
echo "📦 Backend:"
if [ -f "backend/requirements.txt" ]; then
    echo "  ✅ requirements.txt existe"
    if grep -q "gunicorn" backend/requirements.txt; then
        echo "  ✅ gunicorn está en requirements.txt"
    else
        echo "  ❌ gunicorn NO está en requirements.txt"
        exit 1
    fi
else
    echo "  ❌ requirements.txt no encontrado"
    exit 1
fi

if [ -f "backend/.env.example" ]; then
    echo "  ✅ .env.example existe"
else
    echo "  ❌ .env.example no encontrado"
fi

if [ -f "backend/app.py" ]; then
    echo "  ✅ app.py existe"
else
    echo "  ❌ app.py no encontrado"
    exit 1
fi

echo ""

# Verificar frontend
echo "🎨 Frontend:"
if [ -f "frontend/package.json" ]; then
    echo "  ✅ package.json existe"
else
    echo "  ❌ package.json no encontrado"
    exit 1
fi

if [ -f "frontend/.env.example" ]; then
    echo "  ✅ .env.example existe"
else
    echo "  ❌ .env.example no encontrado"
fi

if [ -f "frontend/vercel.json" ]; then
    echo "  ✅ vercel.json existe"
else
    echo "  ❌ vercel.json no encontrado"
fi

if [ -f "frontend/src/api/axios.js" ]; then
    echo "  ✅ axios.js configurado"
else
    echo "  ❌ axios.js no encontrado"
fi

echo ""
echo "✅ Verificación completada!"
echo ""
echo "📝 Próximos pasos:"
echo "  1. git add ."
echo "  2. git commit -m 'build: Configuración para deployment'"
echo "  3. git push origin main"
echo "  4. Seguir DEPLOYMENT_GUIDE.md"
echo ""
