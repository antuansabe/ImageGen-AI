// Social Media Presets Configuration
// Optimized sizes, quality, and style for each platform

export const socialMediaPresets = [
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    platform: 'Instagram',
    icon: '📷',
    description: 'Post cuadrado optimizado para feed de Instagram',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    color: '#E1306C',
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    platform: 'Instagram',
    icon: '📱',
    description: 'Story vertical para Instagram y Facebook',
    size: '1024x1792',
    quality: 'hd',
    style: 'vivid',
    color: '#C13584',
  },
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    platform: 'LinkedIn',
    icon: '💼',
    description: 'Post profesional para LinkedIn',
    size: '1024x1024',
    quality: 'hd',
    style: 'natural',
    color: '#0077B5',
  },
  {
    id: 'linkedin-banner',
    name: 'LinkedIn Banner',
    platform: 'LinkedIn',
    icon: '🖼️',
    description: 'Banner horizontal para perfil de LinkedIn',
    size: '1792x1024',
    quality: 'hd',
    style: 'natural',
    color: '#0A66C2',
  },
  {
    id: 'facebook-post',
    name: 'Facebook Post',
    platform: 'Facebook',
    icon: '👥',
    description: 'Post optimizado para Facebook',
    size: '1024x1024',
    quality: 'standard',
    style: 'vivid',
    color: '#1877F2',
  },
  {
    id: 'facebook-ad',
    name: 'Facebook Ad',
    platform: 'Facebook',
    icon: '📢',
    description: 'Anuncio horizontal para Facebook Ads',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    color: '#4267B2',
  },
  {
    id: 'twitter-post',
    name: 'Twitter/X Post',
    platform: 'Twitter',
    icon: '🐦',
    description: 'Post optimizado para Twitter/X',
    size: '1024x1024',
    quality: 'standard',
    style: 'vivid',
    color: '#1DA1F2',
  },
  {
    id: 'twitter-header',
    name: 'Twitter/X Header',
    platform: 'Twitter',
    icon: '🎨',
    description: 'Header horizontal para perfil de Twitter/X',
    size: '1792x1024',
    quality: 'hd',
    style: 'natural',
    color: '#14171A',
  },
]

export const getPresetById = (id) => {
  return socialMediaPresets.find((preset) => preset.id === id)
}

export const getPresetsByPlatform = (platform) => {
  return socialMediaPresets.filter((preset) => preset.platform === platform)
}
