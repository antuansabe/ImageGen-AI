import { useState, useEffect } from 'react'
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
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import {
  AutoAwesome as SparklesIcon,
  Download as DownloadIcon,
  AttachMoney as MoneyIcon,
  Close as CloseIcon,
  History as HistoryIcon,
} from '@mui/icons-material'
import axios from 'axios'
import { socialMediaPresets } from '../data/socialMediaPresets'
import { promptLibrary, getAllPrompts } from '../data/promptLibrary'

function Generator() {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('1024x1024')
  const [quality, setQuality] = useState('standard')
  const [style, setStyle] = useState('vivid')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [cost, setCost] = useState(0.04)
  
  // New state for smart features
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [promptLibraryOpen, setPromptLibraryOpen] = useState(false)
  const [gallery, setGallery] = useState([])
  const [sessionCost, setSessionCost] = useState(0)
  
  // Demo Portfolio Limit: 10 images per browser
  // Note: This is a localStorage-based limit, easily bypassed by clearing browser data.
  // However, it's sufficient for CV/portfolio use case where visitors are recruiters/professionals.
  // For production with payment, implement server-side rate limiting with IP/user tracking.
  const [imagesRemaining, setImagesRemaining] = useState(10)
  
  // Azure Monthly Limit: Server-side protection
  const [azureCostStatus, setAzureCostStatus] = useState(null)

  // Load gallery from localStorage on mount
  useEffect(() => {
    const savedGallery = localStorage.getItem('imagegen-gallery')
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery))
    }
    
    const savedSessionCost = localStorage.getItem('imagegen-session-cost')
    if (savedSessionCost) {
      setSessionCost(parseFloat(savedSessionCost))
    }

    // Load remaining images count
    const savedRemaining = localStorage.getItem('imagegen-remaining')
    if (savedRemaining) {
      setImagesRemaining(parseInt(savedRemaining))
    } else {
      localStorage.setItem('imagegen-remaining', '10')
    }
    
    // Load Azure cost status
    fetchAzureCostStatus()
  }, [])
  
  // Fetch Azure monthly cost status from backend
  const fetchAzureCostStatus = async () => {
    try {
      const response = await axios.get('/api/cost-status')
      setAzureCostStatus(response.data)
    } catch (error) {
      console.error('Error fetching Azure cost status:', error)
    }
  }

  // Calculate cost when quality changes
  const handleQualityChange = (newQuality) => {
    setQuality(newQuality)
    setCost(newQuality === 'hd' ? 0.08 : 0.04)
  }

  // Apply social media preset
  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset)
    setSize(preset.size)
    setQuality(preset.quality)
    setStyle(preset.style)
    setCost(preset.quality === 'hd' ? 0.08 : 0.04)
    setActiveTab(0) // Switch to manual tab after selecting preset
  }

  // Apply prompt from library
  const handlePromptSelect = (promptTemplate) => {
    setPrompt(promptTemplate.prompt)
    setActiveTab(0) // Cambiar automáticamente a la pestaña Manual
    setPromptLibraryOpen(false)
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

      const imageData = response.data.data
      setGeneratedImage(imageData)
      
      // Update Azure cost status if provided
      if (response.data.cost_status) {
        setAzureCostStatus(response.data.cost_status)
      }

      // Add to gallery
      const newGalleryItem = {
        id: Date.now(),
        ...imageData,
        timestamp: new Date().toISOString(),
      }
      const updatedGallery = [newGalleryItem, ...gallery]
      setGallery(updatedGallery)
      localStorage.setItem('imagegen-gallery', JSON.stringify(updatedGallery))

      // Update session cost
      const newSessionCost = sessionCost + imageData.cost
      setSessionCost(newSessionCost)
      localStorage.setItem('imagegen-session-cost', newSessionCost.toString())

      // Decrease remaining images
      const newRemaining = imagesRemaining - 1
      setImagesRemaining(newRemaining)
      localStorage.setItem('imagegen-remaining', newRemaining.toString())

    } catch (err) {
      setError(err.response?.data?.error || 'Error al generar la imagen')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (generatedImage?.url) {
      try {
        // Fetch the image as blob to avoid CORS issues
        const response = await fetch(generatedImage.url)
        const blob = await response.blob()
        
        // Create object URL
        const blobUrl = window.URL.createObjectURL(blob)
        
        // Create download link
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `imagegen-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Clean up blob URL
        window.URL.revokeObjectURL(blobUrl)
      } catch (error) {
        console.error('Error descargando imagen:', error)
        // Fallback to opening in new tab
        window.open(generatedImage.url, '_blank')
      }
    }
  }

  const handleRecreate = (galleryItem) => {
    setPrompt(galleryItem.original_prompt)
    setSize(galleryItem.parameters.size)
    setQuality(galleryItem.parameters.quality)
    setStyle(galleryItem.parameters.style)
    setCost(galleryItem.cost)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleResetSession = () => {
    setSessionCost(0)
    localStorage.setItem('imagegen-session-cost', '0')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: '#1976d2',
              }}
            >
              Crea Tu Imagen
            </Typography>
            <Chip 
              label="Demo Portfolio" 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Stack>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Generador Profesional de Imágenes con IA usando DALL-E 3
          </Typography>
          
          {/* Session Stats */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            {/* Session Cost Tracker */}
            <Card sx={{ bgcolor: '#f5f5f5' }}>
              <CardContent sx={{ py: 1, px: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Gasto de sesión:
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                    ${sessionCost.toFixed(2)} USD
                  </Typography>
                  {sessionCost > 0 && (
                    <Button size="small" onClick={handleResetSession}>
                      Reiniciar
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Images Remaining Counter */}
            <Card sx={{ bgcolor: imagesRemaining === 0 ? '#ffebee' : '#e3f2fd' }}>
              <CardContent sx={{ py: 1, px: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Demo Portfolio:
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      color: imagesRemaining === 0 ? 'error.main' : 'success.main'
                    }}
                  >
                    {imagesRemaining} / 10 generaciones restantes
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            
            {/* Azure Monthly Limit Status */}
            {azureCostStatus && (
              <Card sx={{ 
                bgcolor: azureCostStatus.is_limited ? '#ffebee' : azureCostStatus.percentage > 75 ? '#fff3e0' : '#e8f5e9' 
              }}>
                <CardContent sx={{ py: 1, px: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Azure Límite Mensual:
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        color: azureCostStatus.is_limited ? 'error.main' : azureCostStatus.percentage > 75 ? 'warning.main' : 'success.main'
                      }}
                    >
                      ${azureCostStatus.remaining.toFixed(2)} / ${azureCostStatus.limit.toFixed(2)} USD
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>

          {/* Limit Reached Warning */}
          {imagesRemaining === 0 && (
            <Alert severity="warning" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
                Has alcanzado el límite de generaciones demo
              </Typography>
              <Typography variant="body2" paragraph>
                Este es un proyecto portfolio con límite de 10 generaciones gratuitas.
              </Typography>
              <Typography variant="body2">
                ¿Interesado en mis habilidades de AI Engineering? Contáctame:
              </Typography>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ mt: 1 }}
                href="https://www.linkedin.com/in/antonndromundo/"
                target="_blank"
              >
                Ver LinkedIn
              </Button>
            </Alert>
          )}
          
          {/* Azure Monthly Limit Reached Warning */}
          {azureCostStatus && azureCostStatus.is_limited && (
            <Alert severity="error" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
                🚫 Límite Mensual de Azure Alcanzado
              </Typography>
              <Typography variant="body2" paragraph>
                El servicio ha alcanzado el límite de protección de ${azureCostStatus.limit.toFixed(2)} USD para este mes.
              </Typography>
              <Typography variant="body2">
                El servicio se restablecerá automáticamente el próximo mes. Esta protección evita gastos inesperados.
              </Typography>
            </Alert>
          )}
          
          {/* Azure Monthly Limit Warning (>75%) */}
          {azureCostStatus && !azureCostStatus.is_limited && azureCostStatus.percentage > 75 && (
            <Alert severity="warning" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
              <Typography variant="body2">
                ⚠️ El límite mensual de Azure está al {azureCostStatus.percentage.toFixed(0)}%. Quedan ${azureCostStatus.remaining.toFixed(2)} USD disponibles este mes.
              </Typography>
            </Alert>
          )}
        </Box>

        {/* Main Content */}
        <Paper elevation={3} sx={{ mb: 4 }}>
          {/* Tabs for Presets vs Manual */}
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Manual" />
            <Tab label="🎨 Presets de Redes Sociales" />
            <Tab label="📚 Biblioteca de Prompts" />
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ p: 4 }}>
            {/* Manual Tab */}
            {activeTab === 0 && (
              <Box>
                {selectedPreset && (
                  <Alert
                    severity="success"
                    sx={{ mb: 3 }}
                    onClose={() => setSelectedPreset(null)}
                  >
                    <strong>Preset aplicado:</strong> {selectedPreset.name} - {selectedPreset.description}
                  </Alert>
                )}

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
                  <FormControl fullWidth>
                    <InputLabel>Tamaño</InputLabel>
                    <Select value={size} label="Tamaño" onChange={(e) => setSize(e.target.value)}>
                      <MenuItem value="1024x1024">Cuadrado (1024x1024)</MenuItem>
                      <MenuItem value="1792x1024">Horizontal (1792x1024)</MenuItem>
                      <MenuItem value="1024x1792">Vertical (1024x1792)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Calidad</InputLabel>
                    <Select value={quality} label="Calidad" onChange={(e) => handleQualityChange(e.target.value)}>
                      <MenuItem value="standard">Estándar ($0.04)</MenuItem>
                      <MenuItem value="hd">HD ($0.08)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Estilo</InputLabel>
                    <Select value={style} label="Estilo" onChange={(e) => setStyle(e.target.value)}>
                      <MenuItem value="vivid">Vivid (Dramático)</MenuItem>
                      <MenuItem value="natural">Natural (Realista)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Cost Display */}
                <Alert icon={<MoneyIcon />} severity="info" sx={{ mb: 3 }}>
                  Costo estimado: <strong>${cost.toFixed(2)} USD</strong> por imagen
                </Alert>

                {/* Low Generations Warning */}
                {imagesRemaining > 0 && imagesRemaining <= 3 && (
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    <strong>¡Atención!</strong> Solo te quedan <strong>{imagesRemaining}</strong> generaciones en este demo portfolio.
                  </Alert>
                )}

                {/* Generate Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SparklesIcon />}
                  onClick={handleGenerate}
                  disabled={loading || imagesRemaining === 0 || (azureCostStatus && azureCostStatus.is_limited)}
                  sx={{ py: 1.5 }}
                >
                  {loading ? 'Generando...' : 
                   (azureCostStatus && azureCostStatus.is_limited) ? 'Límite Azure Alcanzado' :
                   imagesRemaining === 0 ? 'Límite Alcanzado' : 
                   'Generar Imagen'}
                </Button>
                
                {imagesRemaining === 0 && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Has usado todas las generaciones demo disponibles. <strong>¿Interesado en contratar?</strong> Contáctame en{' '}
                    <a href="https://www.linkedin.com/in/antonndromundo/" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </Alert>
                )}
              </Box>
            )}

            {/* Social Media Presets Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Selecciona un preset optimizado para redes sociales
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Cada preset está configurado con el tamaño, calidad y estilo óptimos para la plataforma.
                </Typography>

                <Grid container spacing={2}>
                  {socialMediaPresets.map((preset) => (
                    <Grid item xs={12} sm={6} md={4} key={preset.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4,
                          },
                        }}
                        onClick={() => handlePresetSelect(preset)}
                      >
                        <CardContent>
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h4">{preset.icon}</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {preset.name}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {preset.description}
                            </Typography>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                              <Chip label={preset.size} size="small" />
                              <Chip label={preset.quality.toUpperCase()} size="small" color="primary" />
                              <Chip label={preset.style} size="small" color="secondary" />
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Prompt Library Tab */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Biblioteca de Prompts Profesionales
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Selecciona un prompt pre-diseñado y personalízalo para tu caso de uso.
                </Typography>

                {Object.keys(promptLibrary).map((categoryKey) => {
                  const category = promptLibrary[categoryKey]
                  return (
                    <Box key={categoryKey} sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{category.icon}</span>
                        {category.name}
                      </Typography>
                      <Grid container spacing={2}>
                        {category.prompts.map((promptItem) => (
                          <Grid item xs={12} md={6} key={promptItem.id}>
                            <Card
                              sx={{
                                cursor: 'pointer',
                                height: '100%',
                                '&:hover': {
                                  boxShadow: 3,
                                },
                              }}
                              onClick={() => handlePromptSelect(promptItem)}
                            >
                              <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
                                  {promptItem.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                  {promptItem.description}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    display: 'block',
                                    bgcolor: 'grey.100',
                                    p: 1,
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  {promptItem.prompt.substring(0, 100)}...
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
                })}
              </Box>
            )}

            {/* Error Display */}
            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}
          </Box>
        </Paper>

        {/* Generated Image Display */}
        {generatedImage && (
          <Card elevation={3} sx={{ mb: 4 }}>
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

        {/* Gallery Section */}
        {gallery.length > 0 && (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HistoryIcon />
              Galería de Imágenes ({gallery.length})
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Tus imágenes generadas con todos los metadatos y opción de recrear.
            </Typography>

            <Grid container spacing={2}>
              {gallery.slice(0, 6).map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.url}
                      alt={item.original_prompt}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="body2" noWrap gutterBottom>
                        {item.original_prompt}
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                        <Chip label={item.parameters.size} size="small" />
                        <Chip label={`$${item.cost}`} size="small" color="success" />
                      </Stack>
                      <Button
                        size="small"
                        variant="outlined"
                        fullWidth
                        onClick={() => handleRecreate(item)}
                      >
                        Recrear
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default Generator
