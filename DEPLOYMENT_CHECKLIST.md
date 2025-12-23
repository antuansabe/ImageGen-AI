# 🚀 Quick Deployment Checklist

## ✅ Backend (Render)
- [ ] Subir código a GitHub
- [ ] Crear Web Service en Render
- [ ] Root Directory: `backend`
- [ ] Start Command: `gunicorn app:app`
- [ ] Configurar variables de entorno (Azure keys)
- [ ] Copiar URL del backend

## ✅ Frontend (Vercel)
- [ ] Importar proyecto en Vercel
- [ ] Root Directory: `frontend`
- [ ] Agregar variable `VITE_API_URL` con URL del backend
- [ ] Deploy
- [ ] Copiar URL del frontend

## ✅ Conectar ambos
- [ ] Actualizar `FRONTEND_URL` en Render con URL de Vercel
- [ ] Verificar que la app funciona en producción

## 📝 Variables de Entorno Requeridas

### Render (Backend)
```env
AZURE_OPENAI_ENDPOINT=https://...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_DEPLOYMENT_NAME=dall-e-3
AZURE_OPENAI_API_VERSION=2024-02-01
FRONTEND_URL=https://tu-app.vercel.app
```

### Vercel (Frontend)
```env
VITE_API_URL=https://tu-backend.onrender.com
```

---

**Ver guía completa:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
