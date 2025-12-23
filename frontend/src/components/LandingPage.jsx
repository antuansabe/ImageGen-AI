import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
} from '@mui/material'
import {
  AutoAwesome as SparklesIcon,
  Speed as SpeedIcon,
  Palette as PaletteIcon,
  AttachMoney as MoneyIcon,
  PhotoLibrary as GalleryIcon,
  MenuBook as LibraryIcon,
  Check as CheckIcon,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

function LandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#1976d2',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Chip
                  label="Impulsado por Azure OpenAI DALL-E 3"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    width: 'fit-content',
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                  Generación Profesional de Imágenes con IA
                </Typography>
                <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 400 }}>
                  Crea visuales impresionantes para redes sociales, marketing y proyectos de diseño con presets inteligentes y transparencia de costos.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    component={RouterLink}
                    to="/app"
                    variant="contained"
                    size="large"
                    startIcon={<SparklesIcon />}
                    sx={{
                      bgcolor: 'white',
                      color: '#1976d2',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                  >
                    Comenzar Gratis
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Ver Cómo Funciona
                  </Button>
                </Stack>
                <Stack direction="row" spacing={3} sx={{ pt: 2 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      5+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Características
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      $0.04
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Por Imagen
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      100%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Azure OpenAI
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  ✨ Lo que nos hace diferentes:
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckIcon />
                    <Typography>Presets inteligentes para Instagram, LinkedIn, Twitter</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckIcon />
                    <Typography>Calculadora de costos en tiempo real</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckIcon />
                    <Typography>Biblioteca profesional con 20+ plantillas de prompts</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckIcon />
                    <Typography>Galería inteligente con seguimiento completo de metadatos</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckIcon />
                    <Typography>Generación por lotes para pruebas A/B</Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" id="features" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            ¿Por Qué Elegir ImageGen.AI?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Características profesionales que van más allá de la generación básica de imágenes con IA
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#42a5f5',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <PaletteIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Presets para Redes Sociales
                </Typography>
                <Typography color="text.secondary">
                  Plantillas de un clic para Posts de Instagram, Stories, banners de LinkedIn, Anuncios de Facebook y headers de Twitter. Tamaños y estilos auto-optimizados para cada plataforma.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#66bb6a',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <MoneyIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Transparencia de Costos
                </Typography>
                <Typography color="text.secondary">
                  Ve el costo exacto antes de generar. Rastrea tu gasto por sesión. Sin sorpresas. Perfecto para agencias que facturan a clientes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#ef5350',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <SpeedIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Generación por Lotes
                </Typography>
                <Typography color="text.secondary">
                  Genera múltiples variaciones a la vez. Compara estilos Vivid vs Natural lado a lado. Prueba todos los tamaños simultáneamente para pruebas A/B.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 4 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#ffa726',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <LibraryIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Biblioteca de Prompts
                </Typography>
                <Typography color="text.secondary">
                  20+ prompts profesionales para marketing, e-commerce, corporativo, eventos y blogs. Obtén resultados profesionales en un clic.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 5 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#29b6f6',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <GalleryIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Galería Inteligente
                </Typography>
                <Typography color="text.secondary">
                  Nunca pierdas el rastro de generaciones exitosas. Metadatos completos, prompts revisados, parámetros y recreación con un clic. Reproducibilidad perfecta.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 6 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#ab47bc',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <SparklesIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Potenciado por DALL-E 3
                </Typography>
                <Typography color="text.secondary">
                  Último modelo Azure OpenAI DALL-E 3 con mejora automática de prompts. Confiabilidad de nivel empresarial y filtros de seguridad de contenido.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ bgcolor: 'grey.50', py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Cómo Funciona
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Tres simples pasos para crear imágenes profesionales con IA
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 4, height: '100%' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: '#1976d2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  1
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Elige un Preset o Describe
                </Typography>
                <Typography color="text.secondary">
                  Selecciona entre presets de redes sociales o describe tu imagen. Nuestros presets inteligentes auto-configuran tamaño, calidad y estilo.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 4, height: '100%' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: '#d32f2f',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  2
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Revisa Costo y Genera
                </Typography>
                <Typography color="text.secondary">
                  Ve el costo exacto antes de hacer clic en generar. Imágenes estándar cuestan $0.04, imágenes HD cuestan $0.08. Sin tarifas ocultas.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 4, height: '100%' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: '#388e3c',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  3
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Descarga y Recrea
                </Typography>
                <Typography color="text.secondary">
                  Descarga tu imagen al instante. Guarda en galería con metadatos completos. Recrea imágenes exitosas con un clic.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: '#1976d2',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            ¿Listo para Crear Imágenes Profesionales con IA?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
            Únete a miles de marketers, diseñadores y creadores de contenido usando ImageGen.AI
          </Typography>
          <Button
            component={RouterLink}
            to="/app"
            variant="contained"
            size="large"
            startIcon={<SparklesIcon />}
            sx={{
              bgcolor: 'white',
              color: '#1976d2',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              mt: 3,
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Comenzar a Crear Gratis
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage
