// Professional Prompt Library
// Curated prompts for different use cases

export const promptLibrary = {
  'social-media': {
    name: 'Redes Sociales',
    icon: '📱',
    color: '#E1306C',
    prompts: [
      {
        id: 'product-showcase',
        title: 'Exhibición de Producto',
        prompt: 'A professional product photography of [YOUR PRODUCT] on a minimalist white background, studio lighting, commercial photography style, high detail',
        description: 'Perfecto para mostrar productos en redes sociales',
      },
      {
        id: 'lifestyle-image',
        title: 'Imagen de Estilo de Vida',
        prompt: 'A lifestyle photo of people using [YOUR PRODUCT/SERVICE] in a modern, bright environment, natural lighting, candid photography style, authentic and relatable',
        description: 'Contenido aspiracional para engagement',
      },
      {
        id: 'quote-background',
        title: 'Fondo para Citas',
        prompt: 'An abstract gradient background with soft pastel colors, minimalist design, perfect for overlaying inspirational quotes, calm and professional aesthetic',
        description: 'Fondo elegante para frases motivacionales',
      },
    ],
  },
  'marketing': {
    name: 'Marketing',
    icon: '📊',
    color: '#4267B2',
    prompts: [
      {
        id: 'hero-banner',
        title: 'Banner Hero',
        prompt: 'A modern hero banner for [YOUR BUSINESS], featuring clean design, professional aesthetic, bold typography space, vibrant but professional colors, suitable for website header',
        description: 'Banner principal para sitios web',
      },
      {
        id: 'email-header',
        title: 'Header de Email',
        prompt: 'An email newsletter header design for [YOUR TOPIC], professional and eye-catching, modern layout, brand-friendly colors, high contrast for readability',
        description: 'Cabecera atractiva para newsletters',
      },
      {
        id: 'ad-creative',
        title: 'Creativo para Anuncio',
        prompt: 'A compelling advertisement visual for [YOUR OFFER], attention-grabbing design, clear focal point, professional marketing photography, persuasive and engaging',
        description: 'Visual para campañas publicitarias',
      },
    ],
  },
  'ecommerce': {
    name: 'E-commerce',
    icon: '🛍️',
    color: '#FF9900',
    prompts: [
      {
        id: 'product-flat-lay',
        title: 'Flat Lay de Producto',
        prompt: 'A flat lay photography of [YOUR PRODUCTS] arranged aesthetically on a marble surface, top-down view, natural lighting, e-commerce style, clean and organized composition',
        description: 'Composición desde arriba para productos',
      },
      {
        id: 'unboxing-scene',
        title: 'Escena de Unboxing',
        prompt: 'An unboxing scene of [YOUR PRODUCT] with premium packaging, hands opening the box, excitement and anticipation, professional product photography, luxury feel',
        description: 'Momento de apertura de producto',
      },
      {
        id: 'product-lifestyle',
        title: 'Producto en Uso',
        prompt: 'A realistic scene showing [YOUR PRODUCT] being used in everyday life, natural setting, relatable scenario, lifestyle photography, authentic and trustworthy',
        description: 'Producto en contexto real',
      },
    ],
  },
  'corporate': {
    name: 'Corporativo',
    icon: '💼',
    color: '#0077B5',
    prompts: [
      {
        id: 'office-modern',
        title: 'Oficina Moderna',
        prompt: 'A modern corporate office environment, professional team collaboration, glass walls, natural light, contemporary furniture, business professional atmosphere, clean and organized',
        description: 'Ambiente corporativo profesional',
      },
      {
        id: 'business-meeting',
        title: 'Reunión de Negocios',
        prompt: 'A professional business meeting in a conference room, diverse team of professionals, modern office setting, collaborative discussion, confident body language, corporate photography',
        description: 'Reunión empresarial profesional',
      },
      {
        id: 'leadership',
        title: 'Liderazgo',
        prompt: 'A confident business leader in a modern office, professional attire, inspiring pose, natural window lighting, corporate headshot style, trustworthy and approachable',
        description: 'Retrato de liderazgo ejecutivo',
      },
    ],
  },
  'events': {
    name: 'Eventos',
    icon: '🎉',
    color: '#8B5CF6',
    prompts: [
      {
        id: 'event-promotion',
        title: 'Promoción de Evento',
        prompt: 'An exciting event promotion image for [YOUR EVENT], vibrant atmosphere, crowd of engaged people, professional event photography, energetic and inviting, celebration mood',
        description: 'Promocionar eventos y conferencias',
      },
      {
        id: 'webinar-background',
        title: 'Fondo para Webinar',
        prompt: 'A professional webinar background, modern tech aesthetic, subtle gradients, clean design, appropriate for virtual presentations, professional yet engaging',
        description: 'Fondo profesional para presentaciones',
      },
      {
        id: 'celebration',
        title: 'Celebración',
        prompt: 'A festive celebration scene for [OCCASION], joyful atmosphere, confetti and decorations, vibrant colors, professional event photography, happiness and excitement',
        description: 'Celebraciones y logros',
      },
    ],
  },
  'blog': {
    name: 'Blog y Contenido',
    icon: '✍️',
    color: '#10B981',
    prompts: [
      {
        id: 'blog-header',
        title: 'Header de Blog',
        prompt: 'A blog header image about [YOUR TOPIC], visually engaging, relevant imagery, professional photography, suitable for article featured image, informative and attractive',
        description: 'Imagen destacada para artículos',
      },
      {
        id: 'infographic-bg',
        title: 'Fondo para Infografía',
        prompt: 'A clean background suitable for infographics about [YOUR TOPIC], subtle patterns, professional colors, space for text and data visualization, modern design aesthetic',
        description: 'Base para crear infografías',
      },
      {
        id: 'tutorial-visual',
        title: 'Visual de Tutorial',
        prompt: 'An educational visual for a tutorial about [YOUR TOPIC], clear and easy to understand, instructional photography style, step-by-step friendly, professional and helpful',
        description: 'Imágenes para guías y tutoriales',
      },
    ],
  },
}

export const getAllPrompts = () => {
  const allPrompts = []
  Object.keys(promptLibrary).forEach((categoryKey) => {
    const category = promptLibrary[categoryKey]
    category.prompts.forEach((prompt) => {
      allPrompts.push({
        ...prompt,
        category: categoryKey,
        categoryName: category.name,
        categoryIcon: category.icon,
        categoryColor: category.color,
      })
    })
  })
  return allPrompts
}

export const getPromptsByCategory = (categoryKey) => {
  return promptLibrary[categoryKey]?.prompts || []
}
