import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Divider,
} from '@mui/material'
import {
  AutoAwesome as SparklesIcon,
  Download as DownloadIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material'
import axios from 'axios'

function Generator() {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('1024x1024')
  const [quality, setQuality] = useState('standard')
  const [style, setStyle] = useState('vivid')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [cost, setCost] = useState(0.04)

  // Calculate cost when quality changes
  const handleQualityChange = (newQuality) => {
    setQuality(newQuality)
    setCost(newQuality === 'hd' ? 0.08 : 0.04)
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Por favor ingresa un prompt')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/generate', {
        prompt,
        size,
        quality,
        style,
      })

      setGeneratedImage(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al generar la imagen')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage?.url) {
      const link = document.createElement('a')
      link.href = generatedImage.url
      link.download = `imagegen-${Date.now()}.png`
      link.click()
    }
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              mb: 2,
            }}
          >
            Crea Tu Imagen
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Generador Profesional de Imágenes con IA usando DALL-E 3
          </Typography>
        </Box>

        {/* Main Content */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          {/* Prompt Input */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Describe tu imagen"
            placeholder="Una ciudad futurista al atardecer con autos voladores y luces de neón..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Parameters Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
            {/* Size Selector */}
            <FormControl fullWidth>
              <InputLabel>Tamaño</InputLabel>
              <Select value={size} label="Tamaño" onChange={(e) => setSize(e.target.value)}>
                <MenuItem value="1024x1024">Cuadrado (1024x1024)</MenuItem>
                <MenuItem value="1792x1024">Horizontal (1792x1024)</MenuItem>
                <MenuItem value="1024x1792">Vertical (1024x1792)</MenuItem>
              </Select>
            </FormControl>

            {/* Quality Selector */}
            <FormControl fullWidth>
              <InputLabel>Calidad</InputLabel>
              <Select value={quality} label="Calidad" onChange={(e) => handleQualityChange(e.target.value)}>
                <MenuItem value="standard">Estándar ($0.04)</MenuItem>
                <MenuItem value="hd">HD ($0.08)</MenuItem>
              </Select>
            </FormControl>

            {/* Style Selector */}
            <FormControl fullWidth>
              <InputLabel>Estilo</InputLabel>
              <Select value={style} label="Estilo" onChange={(e) => setStyle(e.target.value)}>
                <MenuItem value="vivid">Vivid (Dramático)</MenuItem>
                <MenuItem value="natural">Natural (Realista)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Cost Display */}
          <Alert
            icon={<MoneyIcon />}
            severity="info"
            sx={{ mb: 3 }}
          >
            Costo estimado: <strong>${cost.toFixed(2)} USD</strong> por imagen
          </Alert>

          {/* Generate Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SparklesIcon />}
            onClick={handleGenerate}
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? 'Generando...' : 'Generar Imagen'}
          </Button>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </Paper>

        {/* Generated Image Display */}
        {generatedImage && (
          <Card elevation={3}>
            <CardMedia
              component="img"
              image={generatedImage.url}
              alt={generatedImage.original_prompt}
              sx={{ maxHeight: 600, objectFit: 'contain', bgcolor: 'black' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detalles de Generación
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Tu Prompt:</strong> {generatedImage.original_prompt}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Prompt Revisado por DALL-E:</strong> {generatedImage.revised_prompt}
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                <Chip label={`Tamaño: ${generatedImage.parameters.size}`} size="small" />
                <Chip label={`Calidad: ${generatedImage.parameters.quality}`} size="small" />
                <Chip label={`Estilo: ${generatedImage.parameters.style}`} size="small" />
                <Chip label={`Costo: $${generatedImage.cost}`} size="small" color="success" />
              </Stack>

              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                fullWidth
              >
                Descargar Imagen
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  )
}

export default Generator
