// BATCH GENERATION UI COMPONENT
// Este código se integra en el tab Manual del Generator.jsx

// AGREGAR DESPUÉS DEL PROMPT INPUT Y ANTES DE LOS PARÁMETROS:

{/* Batch Mode Toggle */}
<FormControlLabel
  control={
    <Checkbox
      checked={batchMode}
      onChange={(e) => setBatchMode(e.target.checked)}
      icon={<BatchIcon />}
      checkedIcon={<BatchIcon />}
    />
  }
  label={
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        🎭 Modo Batch Generation
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Genera múltiples variaciones para comparar
      </Typography>
    </Box>
  }
  sx={{ mb: 2 }}
/>

{/* Batch Options (only show when batch mode is enabled) */}
{batchMode && (
  <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: '#f5f5f5' }}>
    <FormControl component="fieldset">
      <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
        Tipo de Batch
      </FormLabel>
      <RadioGroup
        value={batchType}
        onChange={(e) => setBatchType(e.target.value)}
      >
        <FormControlLabel
          value="styles"
          control={<Radio />}
          label={
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Comparar Estilos (2 imágenes)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Genera con Vivid + Natural para A/B testing
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="sizes"
          control={<Radio />}
          label={
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Probar Tamaños (3 imágenes)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Cuadrado + Horizontal + Vertical
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="matrix"
          control={<Radio />}
          label={
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Matriz Completa (6 imágenes)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 estilos × 3 tamaños = Todas las combinaciones
              </Typography>
            </Box>
          }
        />
      </RadioGroup>
    </FormControl>
    
    {/* Batch Cost Calculation */}
    {(() => {
      const batchCost = calculateBatchCost()
      return (
        <Alert severity="info" icon={<MoneyIcon />} sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Batch generará {batchCost.count} imágenes</strong>
          </Typography>
          <Typography variant="body2">
            Costo total: <strong>${batchCost.total.toFixed(2)} USD</strong> 
            ({batchCost.count} × ${batchCost.perImage.toFixed(2)})
          </Typography>
        </Alert>
      )
    })()}
  </Paper>
)}

// REEMPLAZAR EL BOTÓN "GENERAR IMAGEN" CON ESTO:

{/* Generate Button (Single or Batch) */}
{batchMode ? (
  <>
    <Button
      fullWidth
      variant="contained"
      size="large"
      startIcon={batchLoading ? <CircularProgress size={20} color="inherit" /> : <BatchIcon />}
      onClick={handleBatchGenerate}
      disabled={batchLoading || imagesRemaining === 0 || (azureCostStatus && azureCostStatus.is_limited)}
      sx={{ py: 1.5 }}
    >
      {batchLoading 
        ? `Generando ${batchProgress.current}/${batchProgress.total}...`
        : (azureCostStatus && azureCostStatus.is_limited) 
          ? 'Límite Azure Alcanzado'
          : imagesRemaining === 0 
            ? 'Límite Alcanzado'
            : 'Generar Batch'}
    </Button>
    
    {/* Batch Progress Bar */}
    {batchLoading && (
      <Box sx={{ mt: 2 }}>
        <LinearProgress 
          variant="determinate" 
          value={(batchProgress.current / batchProgress.total) * 100} 
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Generando imagen {batchProgress.current} de {batchProgress.total}
        </Typography>
      </Box>
    )}
  </>
) : (
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
)}

// AGREGAR AL FINAL, DESPUÉS DE GALLERY SECTION:

{/* Batch Results Grid */}
{batchResults.length > 0 && (
  <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <BatchIcon />
      Resultados de Batch Generation ({batchResults.length})
    </Typography>
    <Typography variant="body2" color="text.secondary" paragraph>
      Compara las variaciones generadas lado a lado
    </Typography>

    <Grid container spacing={2}>
      {batchResults.map((result, index) => (
        <Grid item xs={12} md={batchType === 'styles' ? 6 : 4} key={index}>
          <Card>
            {!result.error ? (
              <>
                <CardMedia
                  component="img"
                  image={result.url}
                  alt={result.label}
                  sx={{ height: 300, objectFit: 'cover' }}
                />
                <CardContent>
                  <Chip 
                    label={result.label} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" display="block" color="text.secondary" noWrap>
                    {result.original_prompt}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                    <Chip label={result.parameters.size} size="small" />
                    <Chip label={result.parameters.quality} size="small" color="success" />
                    <Chip label={`$${result.cost}`} size="small" color="info" />
                  </Stack>
                </CardContent>
              </>
            ) : (
              <CardContent>
                <Chip label={result.label} color="error" size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" color="error">
                  {result.error}
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
    
    <Button 
      variant="outlined" 
      fullWidth 
      sx={{ mt: 3 }}
      onClick={() => setBatchResults([])}
    >
      Limpiar Resultados
    </Button>
  </Paper>
)}
