import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { AutoAwesome as SparklesIcon } from '@mui/icons-material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <SparklesIcon
              sx={{
                fontSize: 32,
                mr: 1,
                color: '#1976d2',
                p: 0.5,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#1976d2',
              }}
            >
              ImageGen.AI
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {isHome ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Características
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Cómo Funciona
                </Button>
                <Button
                  component={RouterLink}
                  to="/app"
                  variant="contained"
                  startIcon={<SparklesIcon />}
                  sx={{
                    bgcolor: '#1976d2',
                    '&:hover': {
                      bgcolor: '#1565c0',
                    },
                  }}
                >
                  Comenzar Gratis
                </Button>
              </>
            ) : (
              <Button component={RouterLink} to="/" color="inherit">
                Inicio
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
