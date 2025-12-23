# 🔒 Sistema de Protección de Costos - ImageGen.AI

## 📊 Sistema de Doble Capa Implementado

ImageGen.AI cuenta con **2 niveles de protección** contra gastos excesivos:

### **Capa 1: Límite Demo Portfolio (Frontend - localStorage)**
- 10 generaciones por navegador
- Protección básica para demo público
- Fácil de bypass (borrar localStorage)
- Suficiente para reclutadores profesionales

### **Capa 2: Límite Mensual Azure (Backend - Kill Switch)** ✅
- **$4.00 USD** límite mensual servidor-side
- Protección automática real contra abuso
- **Imposible de bypass** desde cliente
- Se resetea automáticamente cada mes

---

## 🎯 Capa 2: Kill Switch Backend (IMPLEMENTADO)

### Funcionamiento

#### 1. **Tracking de Costos**
```python
# Archivo: backend/cost_tracker.json (auto-generado)
{
  "month": "2025-12",
  "total": 1.24,
  "generations": 31
}
```

- Se crea automáticamente en la primera generación
- Rastrea: mes actual, total gastado, número de generaciones
- Se resetea automáticamente cuando cambia el mes

#### 2. **Verificación Pre-Generación**
```python
# En cada request a /api/generate:
monthly_cost = get_monthly_cost()

if monthly_cost >= MONTHLY_LIMIT:
    return ERROR 429 (Too Many Requests)
```

- ANTES de llamar a Azure OpenAI
- Bloquea la petición si alcanza $4.00
- Devuelve error claro al frontend

#### 3. **Registro Post-Generación**
```python
# Después de generar exitosamente:
cost = 0.08 if quality == 'hd' else 0.04
add_cost(cost)
```

- Solo suma costo si la generación fue exitosa
- Actualiza archivo JSON automáticamente
- Incrementa contador de generaciones

---

## 📡 Endpoint Nuevo: `/api/cost-status`

### Request
```http
GET /api/cost-status
```

### Response
```json
{
  "month": "2025-12",
  "limit": 4.00,
  "spent": 1.24,
  "remaining": 2.76,
  "percentage": 31.0,
  "is_limited": false
}
```

### Uso en Frontend
- Se llama al cargar la página
- Se actualiza después de cada generación
- Muestra estado en tiempo real en UI

---

## 🎨 UI del Sistema de Protección

### Contadores en Header

```
┌─────────────────────────────────────────────────────────┐
│  [Gasto: $0.20]  [8/10 Demo]  [Azure: $2.76 / $4.00]  │
└─────────────────────────────────────────────────────────┘
```

**Colores dinámicos:**
- Verde: < 75% del límite
- Naranja: 75-99% del límite
- Rojo: 100% del límite (bloqueado)

### Alertas Progresivas

**>75% del límite:**
```
⚠️ El límite mensual de Azure está al 85%. 
Quedan $0.60 USD disponibles este mes.
```

**100% del límite:**
```
🚫 Límite Mensual de Azure Alcanzado

El servicio ha alcanzado el límite de protección de $4.00 USD 
para este mes.

El servicio se restablecerá automáticamente el próximo mes. 
Esta protección evita gastos inesperados.
```

### Botón de Generación

**Estados:**
- ✅ Normal: "Generar Imagen"
- 🔄 Generando: "Generando..."
- 🚫 Demo agotado: "Límite Alcanzado"
- 🚫 Azure agotado: "Límite Azure Alcanzado"

---

## 💰 Análisis de Protección

### Escenarios de Costo

| Escenario | Sin Protección | Con Límite $4 |
|-----------|---------------|---------------|
| Usuario normal | $0.60 | $0.60 |
| Usuario entusiasta | $2.00 | $2.00 |
| Usuario malicioso | $80.00 | **$4.00** ✅ |

### Cálculo de Generaciones

**Con límite de $4.00 mensuales:**
- Standard ($0.04): 100 generaciones máximo
- HD ($0.08): 50 generaciones máximo
- Promedio (50/50): ~67 generaciones

**Protección real contra:**
- Bots automáticos
- Scripts de scraping
- Usuarios maliciosos
- Errores en loops infinitos

---

## 🔧 Configuración del Límite

### Cambiar el Límite Mensual

**Backend: `/backend/app.py`**
```python
# Línea ~25
MONTHLY_LIMIT = 4.00  # USD

# Cambiar a otro valor:
MONTHLY_LIMIT = 10.00  # Para $10 mensuales
MONTHLY_LIMIT = 2.00   # Para $2 mensuales
```

### Resetear el Contador Manualmente

```bash
# Opción 1: Borrar archivo
rm backend/cost_tracker.json

# Opción 2: Editar archivo
nano backend/cost_tracker.json
# Cambiar "total": X a "total": 0.0
```

### Deshabilitar Temporalmente

```python
# En app.py, comentar el check:
# if monthly_cost >= MONTHLY_LIMIT:
#     return jsonify({...}), 429
```

---

## 📊 Monitoreo del Sistema

### Ver Estado Actual

```bash
# Ver archivo de tracking
cat backend/cost_tracker.json

# O desde el frontend:
# Ir a la página y ver el contador "Azure Límite Mensual"
```

### Logs del Sistema

```python
# En app.py se loggea cada costo:
app.logger.info(f'Cost added: ${cost:.2f}. Monthly total: ${data["total"]:.2f}')
```

**Ver logs:**
```bash
# Si backend está corriendo
# Los logs aparecen en la terminal donde ejecutaste `python app.py`
```

---

## 🔄 Reseteo Automático Mensual

### ¿Cómo Funciona?

```python
current_month = datetime.now().strftime('%Y-%m')  # "2025-12"

if data.get('month') != current_month:
    # Nuevo mes detectado → Resetear a 0
    data = {'month': current_month, 'total': 0.0, 'generations': 0}
```

**Ejemplo:**
- 31 de Diciembre 2025: `{'month': '2025-12', 'total': 3.80}`
- 1 de Enero 2026: `{'month': '2026-01', 'total': 0.00}` ← Auto-reset

**No requiere intervención manual** ✅

---

## ⚠️ Notas Importantes

### cost_tracker.json

- ✅ **Incluido en .gitignore** (no se sube a GitHub)
- ✅ Se crea automáticamente en primera ejecución
- ✅ Es seguro borrarlo (se recrea automáticamente)
- ⚠️ NO compartir (contiene info de uso)

### Deployment

**En Render:**
- El archivo persiste entre deployments ✅
- Se resetea si reinicias el servicio ⚠️
- Considera usar variable de entorno o base de datos para producción

**Mejora futura (opcional):**
```python
# Usar base de datos en vez de JSON
# SQLite, PostgreSQL, o Redis
# Para persistencia 100% confiable
```

---

## 🎯 Combinación de Límites

### Protección Total

| Límite | Tipo | Propósito | Bypass |
|--------|------|-----------|--------|
| **10 generaciones** | Frontend | Demo portfolio | Fácil (localStorage) |
| **$4 mensuales** | Backend | Protección real | **Imposible** |
| **Budget Alert Azure** | Azure Portal | Notificaciones | N/A |

### Flujo de Protección

```
Usuario intenta generar imagen
         ↓
¿Frontend permite? (10 generaciones)
         ↓ NO → Bloqueado
         ↓ SÍ
¿Backend permite? ($4 límite)
         ↓ NO → Bloqueado (429 error)
         ↓ SÍ
Generar imagen en Azure
         ↓
Actualizar tracking
```

---

## ✅ Checklist de Seguridad

- [x] Límite frontend (10 generaciones)
- [x] Límite backend ($4 mensuales)
- [x] Budget alert en Azure
- [x] Tracking de costos en archivo
- [x] Reseteo automático mensual
- [x] UI con alertas visuales
- [x] Endpoint de monitoreo
- [x] cost_tracker.json en .gitignore
- [x] Logs de operaciones
- [x] Documentación completa

---

## 🚀 Resultado Final

**Protección robusta contra:**
✅ Usuarios maliciosos
✅ Bots automáticos
✅ Errores de programación
✅ Gastos inesperados

**Costo máximo garantizado:**
- $4 por mes (backend)
- + emails de alerta en $2, $3, $3.60, $4 (Azure Budget)
- = Control total de gastos

**¡Sistema completamente funcional y protegido!** 🎉
