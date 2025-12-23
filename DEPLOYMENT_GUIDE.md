# 🚀 Guía de Deployment - ImageGen.AI

## 📋 Pre-requisitos
- [x] Código configurado para producción
- [ ] Cuenta en Render.com
- [ ] Cuenta en Vercel.com
- [ ] Credenciales de Azure OpenAI

---

## 🔧 PASO 1: Deploy Backend en Render (20 minutos)

### 1.1 Crear cuenta en Render
1. Ve a https://render.com/
2. Sign up con GitHub
3. Autoriza acceso a tus repositorios

### 1.2 Crear Web Service
1. Click en "New +" → "Web Service"
2. Conectar repositorio: `ImageGen.AI`
3. Configurar:
   ```
   Name: imagegen-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: (dejar vacío - usa raíz del proyecto)
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: bash start.sh
   Instance Type: Free
   ```

### 1.3 Variables de Entorno
En la sección "Environment":

```env
AZURE_OPENAI_ENDPOINT=https://TU-RECURSO.openai.azure.com/
AZURE_OPENAI_API_KEY=tu_api_key_de_azure
AZURE_OPENAI_DEPLOYMENT_NAME=dall-e-3
AZURE_OPENAI_API_VERSION=2024-02-01
FRONTEND_URL=https://imagegen-ai.vercel.app
PYTHON_VERSION=3.13.0
```

**⚠️ IMPORTANTE:** 
- Copia tu `AZURE_OPENAI_ENDPOINT` desde Azure Portal
- Copia tu `AZURE_OPENAI_API_KEY` desde Azure Portal
- Deja `FRONTEND_URL` por ahora, lo actualizaremos después

### 1.4 Deploy
1. Click "Create Web Service"
2. Espera ~5 minutos mientras se construye
3. ✅ Tu backend estará en: `https://imagegen-backend-XXXX.onrender.com`
4. **COPIA ESTA URL** - la necesitarás para el frontend

### 1.5 Verificar
```bash
# En tu terminal, prueba el backend:
curl https://imagegen-backend-XXXX.onrender.com/api/health

# Deberías ver:
{"status":"healthy","service":"ImageGen.AI Backend","dall_e_deployment":"dall-e-3"}
```

---

## 🎨 PASO 2: Deploy Frontend en Vercel (15 minutos)

### 2.1 Crear cuenta en Vercel
1. Ve a https://vercel.com/
2. Sign up con GitHub
3. Autoriza acceso a tus repositorios

### 2.2 Importar Proyecto
1. Click "Add New..." → "Project"
2. Buscar y seleccionar: `ImageGen.AI`
3. Click "Import"

### 2.3 Configurar Proyecto
En "Configure Project":

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2.4 Variables de Entorno
En "Environment Variables", agregar:

```
Name: VITE_API_URL
Value: https://imagegen-backend-XXXX.onrender.com
```

**⚠️ Usa la URL de tu backend de Render del paso 1.4**

### 2.5 Deploy
1. Click "Deploy"
2. Espera ~3 minutos
3. ✅ Tu app estará en: `https://imagegen-ai.vercel.app`
4. **COPIA ESTA URL**

### 2.6 Actualizar Backend CORS
1. Regresa a Render Dashboard
2. Ve a tu servicio "imagegen-backend"
3. Ve a "Environment"
4. Actualiza `FRONTEND_URL` con tu URL de Vercel:
   ```
   FRONTEND_URL=https://imagegen-ai.vercel.app
   ```
5. Click "Save Changes"
6. El servicio se reiniciará automáticamente

---

## ✅ PASO 3: Verificar Todo Funciona

### 3.1 Prueba la App
1. Ve a tu URL de Vercel: `https://imagegen-ai.vercel.app`
2. Navega a `/app`
3. Genera una imagen de prueba
4. ✅ Debería funcionar perfectamente

### 3.2 Verificar Límites
1. Los contadores de demo (10 imgs) funcionan en localStorage
2. El límite de Azure ($4) funciona en el backend
3. Los costos se rastrean correctamente

---

## 🔍 Troubleshooting

### Error: "Network Error" o "CORS Error"
**Problema:** El frontend no puede conectarse al backend

**Solución:**
1. Verifica que `VITE_API_URL` en Vercel apunte a tu backend de Render
2. Verifica que `FRONTEND_URL` en Render apunte a tu frontend de Vercel
3. Asegúrate que las URLs no tengan "/" al final

### Error: "API Key Invalid"
**Problema:** Credenciales de Azure incorrectas

**Solución:**
1. Ve a Azure Portal
2. Verifica tu endpoint y API key
3. Actualiza las variables en Render
4. Redeploy el servicio

### Backend tarda en responder
**Problema:** Render Free Tier se "duerme" después de inactividad

**Solución:**
- Es normal en el tier gratuito
- La primera request puede tardar ~30 segundos
- Requests subsecuentes son rápidas

---

## 📊 Monitoreo

### Render Dashboard
- Ve logs en tiempo real: "Logs" tab
- Ve métricas: "Metrics" tab
- Ve costos: Siempre $0 en Free tier

### Vercel Dashboard
- Ve analytics: "Analytics" tab
- Ve deployments: "Deployments" tab
- Ve logs: Click en cualquier deployment

---

## 🎯 URLs Finales

Después del deployment completo:

```
Frontend: https://imagegen-ai.vercel.app
Backend:  https://imagegen-backend-XXXX.onrender.com

Landing:   https://imagegen-ai.vercel.app/
Generator: https://imagegen-ai.vercel.app/app
```

---

## 📝 Notas Importantes

### Costos
- **Render Free Tier:** $0/mes (750 horas/mes gratis)
- **Vercel Hobby:** $0/mes (100GB bandwidth gratis)
- **Azure OpenAI:** Límite de $4/mes configurado

### Limitaciones Free Tier
- **Render:** Backend se duerme después de 15 min de inactividad
- **Vercel:** 100GB bandwidth/mes (más que suficiente)
- **Cold starts:** Primera request puede tardar ~30 segundos

### Recomendaciones
- ✅ Monitorea tu gasto de Azure regularmente
- ✅ Los límites de $4 y 10 imágenes protegen tu wallet
- ✅ Usa este proyecto en tu CV/portfolio sin preocupación

---

## 🔄 Re-deployment

### Cuando hagas cambios al código:

```bash
git add .
git commit -m "descripción de cambios"
git push origin main
```

**Auto-deployment:**
- Vercel detecta el push y redeploy automáticamente
- Render detecta el push y redeploy automáticamente
- ¡Cero configuración adicional necesaria!

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

Tu app está ahora:
- ✅ Deployada en Render (backend)
- ✅ Deployada en Vercel (frontend)
- ✅ Protegida con límites de costo
- ✅ Lista para mostrar en CV/LinkedIn
- ✅ Auto-deployment configurado

**¡Felicitaciones! 🚀**
