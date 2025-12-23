import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material'
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a2e',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Main Footer Content */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {/* Column 1: Brand */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                ImageGen.AI
              </Typography>
              <Typography variant="body2" color="grey.400" paragraph>
                Generación profesional de imágenes con IA, impulsado por Azure OpenAI DALL-E 3. Crea visuales impresionantes para redes sociales, marketing y proyectos de diseño.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Link
                  href="https://github.com/Antonndromundo"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                >
                  <GitHubIcon />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/antonndromundo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                >
                  <LinkedInIcon />
                </Link>
              </Stack>
            </Box>

            {/* Column 2: Product */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Producto
              </Typography>
              <Stack spacing={1}>
                <Link href="#features" color="grey.400" underline="hover">
                  Características
                </Link>
                <Link href="#how-it-works" color="grey.400" underline="hover">
                  Cómo Funciona
                </Link>
                <Link href="/app" color="grey.400" underline="hover">
                  Comenzar a Crear
                </Link>
              </Stack>
            </Box>

            {/* Column 3: Technology */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Tecnologías
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="grey.400">
                  ⚡ Azure OpenAI DALL-E 3
                </Typography>
                <Typography variant="body2" color="grey.400">
                  ⚛️ React 18 + Material-UI
                </Typography>
                <Typography variant="body2" color="grey.400">
                  🐍 Flask + Python 3.13
                </Typography>
                <Typography variant="body2" color="grey.400">
                  🚀 Render + Vercel
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: 'grey.800' }} />

          {/* Bottom Footer */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="grey.400">
              © 2025 ImageGen.AI. Construido con Azure OpenAI y Material Design.
            </Typography>
            <Typography variant="body2" color="grey.400">
              Desarrollado por{' '}
              <Link
                href="https://www.linkedin.com/in/antonndromundo/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#42a5f5',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Antonio
              </Link>
              {' • '}Ingeniero de Soluciones de IA
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
