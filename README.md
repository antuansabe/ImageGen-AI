# 🎨 ImageGen.AI

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-OpenAI-0078D4?logo=microsoft-azure&logoColor=white)
![DALL·E](https://img.shields.io/badge/DALL·E-3-412991?logo=openai&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-6.3-007FFF?logo=mui&logoColor=white)
![License](https://img.shields.io/badge/License-Portfolio-green)

> Generador profesional de imágenes con IA usando Azure OpenAI DALL-E 3

Un proyecto portfolio que demuestra la integración de servicios de Azure AI para crear una aplicación web completa y profesional de generación de imágenes.

---

## 🌟 ¿Qué hace especial a ImageGen.AI?

A diferencia de usar ChatGPT directamente, ImageGen.AI ofrece:

### 📱 **Presets Inteligentes para Redes Sociales**
8 plantillas optimizadas para Instagram, LinkedIn, Facebook y Twitter. Con un solo clic, los tamaños y estilos se configuran automáticamente para cada plataforma.

### 📚 **Biblioteca de Prompts Profesionales**
18 prompts pre-diseñados en 6 categorías: Redes Sociales, Marketing, E-commerce, Corporativo, Eventos y Blog. Resultados profesionales sin necesidad de ser experto en prompts.

### 💰 **Transparencia de Costos**
Ve el costo exacto antes de generar cada imagen. Rastrea tu gasto por sesión. Sin sorpresas.

### 🖼️ **Galería Inteligente**
Historial completo con todos los metadatos: prompt original, prompt revisado por DALL-E, parámetros usados y costo. Recrea imágenes exitosas con un clic.

### 🔒 **Demo Portfolio Protegido**
Sistema de límites de 10 generaciones para protección en portfolio público. Perfecto para mostrar a reclutadores sin riesgo financiero.

---

## 🎥 Demo

**🔗 Pruébalo en vivo:** *(Link a deployment cuando esté listo)*

**📸 Screenshots:**

*Coming soon - capturas del proyecto en acción*

---

## 🛠️ Tecnologías Utilizadas

**Frontend:**
- React 18 + Vite
- Material-UI (Google Material Design)
- Axios

**Backend:**
- Python 3.13 + Flask
- Azure OpenAI DALL-E 3
- Flask-CORS

**Deployment:**
- Frontend: Vercel
- Backend: Render

---

## ✨ Características Principales

✅ **Generación de Imágenes con DALL-E 3**
- 3 tamaños disponibles: Cuadrado, Horizontal, Vertical
- 2 niveles de calidad: Standard ($0.04) / HD ($0.08)
- 2 estilos: Vivid (dramático) / Natural (realista)

✅ **Presets de Redes Sociales**
- Instagram Post & Story
- LinkedIn Post & Banner
- Facebook Post & Ad
- Twitter/X Post & Header

✅ **Biblioteca de Prompts**
- 18 templates profesionales
- 6 categorías de uso
- Personalización fácil

✅ **Sistema de Límites**
- 10 generaciones por navegador (demo portfolio)
- Contador visible en tiempo real
- Protección de costos

✅ **Galería Persistente**
- Historial completo en localStorage
- Función "Recrear" para reproducibilidad
- Metadatos completos de cada generación

---

## 🚀 Instalación Local

### Requisitos Previos
- Python 3.13+
- Node.js 18+
- Cuenta de Azure OpenAI con deployment de DALL-E 3

### Backend

```bash
# 1. Navegar a la carpeta backend
cd backend

# 2. Crear entorno virtual
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Configurar variables de entorno
# Crea un archivo .env con:
AZURE_OPENAI_ENDPOINT=tu_endpoint
AZURE_OPENAI_API_KEY=tu_api_key
AZURE_OPENAI_DEPLOYMENT_NAME=dall-e-3
AZURE_OPENAI_API_VERSION=2024-02-01

# 5. Ejecutar servidor
python app.py
```

### Frontend

```bash
# 1. Navegar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar aplicación
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📚 Aprendizajes de Azure AI (AI-102)

Este proyecto demuestra competencia en:

**Azure OpenAI Service:**
- ✅ Integración de API con DALL-E 3
- ✅ Manejo de credenciales y autenticación
- ✅ Gestión de parámetros del modelo
- ✅ Procesamiento de respuestas

**Mejores Prácticas:**
- ✅ Manejo de errores y Content Safety filters
- ✅ Optimización de costos
- ✅ Estado persistente en cliente
- ✅ Arquitectura full-stack profesional

**Conceptos Clave de DALL-E 3:**
- Solo 3 tamaños válidos (vs DALL-E 2)
- Parámetro `n` siempre = 1
- Prompt revision automática (no se puede desactivar)
- Estructura de pricing por calidad

---

## 🎯 Casos de Uso

Este proyecto es ideal para:
- 📱 **Social Media Managers**: Contenido visual optimizado por plataforma
- 🎨 **Diseñadores**: Generación rápida de conceptos visuales
- 📊 **Marketers**: Imágenes para campañas y contenido
- 💼 **Empresas**: Material corporativo profesional
- 📝 **Creadores de Contenido**: Imágenes para blogs y artículos

---

## 📁 Estructura del Proyecto

```
ImageGen.AI/
├── backend/
│   ├── app.py              # API Flask con Azure OpenAI
│   ├── requirements.txt    # Dependencias Python
│   └── .env               # Configuración (no incluido)
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── data/          # Presets y biblioteca de prompts
│   │   └── App.jsx        # Aplicación principal
│   └── package.json       # Dependencias Node
└── README.md
```

---

## 👨‍💻 Sobre el Autor

**Antonio** - AI Solutions Engineer

🎓 **Certificaciones:**
- Azure AI-900: Fundamentals ✅
- Azure AI-102: AI Engineer (en preparación)

💼 **Expertise:**
- Integración de servicios Azure AI
- Desarrollo full-stack (Python + React)
- Arquitecturas RAG y aplicaciones de IA
- Deployment en producción

🔗 **Conecta conmigo:**
- [LinkedIn](https://www.linkedin.com/in/antonndromundo/)
- [GitHub](https://github.com/Antonndromundo)

---

## 🗂️ Más Proyectos

**Portfolio de Proyectos de IA:**
1. **PrimerosAuxilios.AI** - RAG chatbot con voz clonada para asistencia de primeros auxilios
2. **TicketScan.AI** - Análisis inteligente de recibos con Azure Document Intelligence
3. **VoiceNotes.AI** - Transformación de audio a documentos PDF profesionales
4. **ImageGen.AI** - Este proyecto

---

## 📝 Notas

**Sistema de Límites:**
- Este proyecto incluye un límite de 10 generaciones para demo portfolio
- Fácil de modificar o remover (ver `LIMITS_SYSTEM.md`)
- Recomendado para proyectos públicos en CV

**Costos:**
- Imágenes Standard: $0.04 USD
- Imágenes HD: $0.08 USD
- Con límite de 10: ~$0.60 USD por usuario

---

## 🙏 Agradecimientos

- Azure OpenAI por el acceso a DALL-E 3
- Material-UI por el sistema de diseño
- Comunidades de Flask y React por la documentación

---

**Construido con ❤️ usando Azure OpenAI y Material Design**

*Proyecto Portfolio - 2025*
