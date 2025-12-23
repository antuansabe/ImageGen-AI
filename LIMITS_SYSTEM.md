# Sistema de Límites - ImageGen.AI Demo Portfolio

## 📊 Implementación Actual

### Límite: 10 Generaciones por Navegador

**Funcionamiento:**
- Se almacena el contador en `localStorage` del navegador
- Cada generación exitosa reduce el contador en 1
- Cuando llega a 0, se bloquea el botón "Generar Imagen"
- El usuario ve un mensaje con tu LinkedIn para contacto

**UI/UX:**
- Badge "Demo Portfolio" en el header
- Contador visible: "X / 10 generaciones restantes"
- Advertencia cuando quedan ≤ 3 generaciones
- Mensaje de contacto cuando se agotan

---

## ⚠️ Limitaciones del Enfoque Actual

**Fácil de Bypass:**
- Un usuario puede borrar `localStorage` y obtener 10 generaciones más
- Abrir en modo incógnito resetea el contador
- Usar diferentes navegadores da 10 generaciones por navegador

**¿Por qué está bien para tu caso de uso (CV/Portfolio)?**
- Los reclutadores son profesionales, no van a intentar hacer bypass
- Es suficiente para demostrar tus habilidades sin gastar mucho
- El "Demo Portfolio" badge deja claro que es una demo limitada

---

## 🔒 Opciones para Mayor Seguridad (Futuras)

### Opción 1: Código de Acceso Simple
```javascript
// Requiere código para acceder (solo en tu CV impreso)
const ACCESS_CODE = "RECRUITER2025"
```
**Pros:** Simple, efectivo
**Contras:** Reduce el "wow factor", requiere step extra

### Opción 2: Límite por IP (Backend)
```python
# En Flask backend
from flask_limiter import Limiter
limiter = Limiter(app, key_func=lambda: request.remote_addr)

@app.route('/api/generate', methods=['POST'])
@limiter.limit("10 per day")
def generate():
    # ...
```
**Pros:** Más robusto
**Contras:** Requiere cambios en backend, deployment más complejo

### Opción 3: Sistema de Tokens/API Keys
```javascript
// Generas tokens únicos para cada reclutador
// Cada token tiene 10 usos
```
**Pros:** Control total, analytics por token
**Contras:** Más trabajo de setup, tracking necesario

### Opción 4: Simple Auth (Email Magic Link)
**Pros:** Professional, trackeable
**Contras:** Requiere backend auth, más complejo

---

## 💰 Análisis de Costos

**Escenario Actual (10 generaciones):**
- Promedio de 50% HD, 50% Standard
- Costo por usuario: ~$0.60 USD
- Si 100 reclutadores lo ven: $60 USD (manejable)

**Sin límites (worst case):**
- Usuario malicioso genera 100 imágenes HD
- Costo: $8 USD por usuario
- Si 10 usuarios maliciosos: $80 USD

**Recomendación:** El límite actual es suficiente para CV/portfolio.

---

## 🔧 Cómo Modificar el Límite

### Cambiar de 10 a 20 generaciones:

**1. En `/frontend/src/components/Generator.jsx`:**
```javascript
// Línea 62
const [imagesRemaining, setImagesRemaining] = useState(20) // Era 10

// Línea 77
} else {
  localStorage.setItem('imagegen-remaining', '20') // Era '10'
}
```

**2. En el UI (línea ~250):**
```javascript
{imagesRemaining} / 20 generaciones restantes  // Era / 10
```

### Resetear el contador manualmente:
1. Abre DevTools (F12)
2. Console: `localStorage.setItem('imagegen-remaining', '10')`
3. Refresca la página

### Deshabilitar el límite completamente:
```javascript
// Comentar esta línea en handleGenerate (línea ~142)
// const newRemaining = imagesRemaining - 1
// setImagesRemaining(newRemaining)
// localStorage.setItem('imagegen-remaining', newRemaining.toString())

// Y quitar disabled check del botón (línea ~367)
disabled={loading} // En vez de: disabled={loading || imagesRemaining === 0}
```

---

## 📈 Tracking de Uso (Opcional Futuro)

Si quieres analytics:
1. Usar Google Analytics Events
2. Backend endpoint para tracking
3. Tabla en base de datos con:
   - IP address (anonimizada)
   - Timestamp
   - Prompt usado
   - Parámetros

---

## ✅ Recomendación Final

**Para CV/Portfolio:** Mantén el límite actual de 10 generaciones.

**Si notas abuso:** Implementa Opción 2 (Límite por IP en backend).

**Para producción real:** Implementa auth + payment desde el inicio.
