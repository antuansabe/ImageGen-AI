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

function App() {
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
      setError('Please enter a prompt')
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
      setError(err.response?.data?.error || 'Failed to generate image')
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
              background: 'linear-gradient(45deg, #1976d2 30%, #f50057 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            ImageGen.AI
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Professional AI Image Generator with DALL-E 3
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
            <Chip label="Azure OpenAI" color="primary" size="small" />
            <Chip label="Smart Presets" color="secondary" size="small" />
            <Chip label="Cost Calculator" color="success" size="small" />
          </Stack>
        </Box>

        {/* Main Content */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          {/* Prompt Input */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Describe your image"
            placeholder="A futuristic city at sunset with flying cars and neon lights..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Parameters Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
            {/* Size Selector */}
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select value={size} label="Size" onChange={(e) => setSize(e.target.value)}>
                <MenuItem value="1024x1024">Square (1024x1024)</MenuItem>
                <MenuItem value="1792x1024">Landscape (1792x1024)</MenuItem>
                <MenuItem value="1024x1792">Portrait (1024x1792)</MenuItem>
              </Select>
            </FormControl>

            {/* Quality Selector */}
            <FormControl fullWidth>
              <InputLabel>Quality</InputLabel>
              <Select value={quality} label="Quality" onChange={(e) => handleQualityChange(e.target.value)}>
                <MenuItem value="standard">Standard ($0.04)</MenuItem>
                <MenuItem value="hd">HD ($0.08)</MenuItem>
              </Select>
            </FormControl>

            {/* Style Selector */}
            <FormControl fullWidth>
              <InputLabel>Style</InputLabel>
              <Select value={style} label="Style" onChange={(e) => setStyle(e.target.value)}>
                <MenuItem value="vivid">Vivid (Dramatic)</MenuItem>
                <MenuItem value="natural">Natural (Realistic)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Cost Display */}
          <Alert
            icon={<MoneyIcon />}
            severity="info"
            sx={{ mb: 3 }}
          >
            Estimated cost: <strong>${cost.toFixed(2)} USD</strong> per image
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
            {loading ? 'Generating...' : 'Generate Image'}
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
                Generation Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Your Prompt:</strong> {generatedImage.original_prompt}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>DALL-E Revised Prompt:</strong> {generatedImage.revised_prompt}
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={`Size: ${generatedImage.parameters.size}`} size="small" />
                <Chip label={`Quality: ${generatedImage.parameters.quality}`} size="small" />
                <Chip label={`Style: ${generatedImage.parameters.style}`} size="small" />
                <Chip label={`Cost: $${generatedImage.cost}`} size="small" color="success" />
              </Stack>

              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                fullWidth
              >
                Download Image
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 6, color: 'text.secondary' }}>
          <Typography variant="body2">
            Built with Azure OpenAI DALL-E 3 | Material-UI Design
          </Typography>
          <Typography variant="caption">
            Portfolio Project by Antonio - AI Engineer in Training
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default App
