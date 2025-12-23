# 🎨 ImageGen.AI

**Professional AI Image Generator with Azure OpenAI DALL-E 3**

A production-ready web application that goes beyond basic AI image generation by providing smart presets, cost transparency, and professional workflow tools designed for marketers, content creators, and businesses.

---

## 🌟 Key Differentiators vs. ChatGPT

### 1. 📱 Smart Social Media Presets
- Pre-configured templates for Instagram, LinkedIn, Facebook, Twitter
- Auto-optimized sizes, quality, and style for each platform
- One-click generation with professional settings

### 2. 💰 Cost Calculator & Transparency
- Real-time cost estimation before generation
- Session spending tracker
- Clear breakdown: Standard ($0.04) vs HD ($0.08)

### 3. 🎨 Batch Generation & Variations
- Generate multiple variations simultaneously
- Compare Vivid vs Natural styles side-by-side
- Test all sizes at once for optimal results

### 4. 📚 Professional Prompt Library
- 20+ curated prompts for marketing use cases
- Categorized by: Social Media, Products, Corporate, Events
- One-click templates with optimized parameters

### 5. 🖼️ Smart Gallery with Metadata
- Persistent history with full generation details
- Re-create button for reproducibility
- Download prompt templates for reuse
- Track revised prompts from DALL-E 3

---

## 🛠️ Tech Stack

### Backend
- **Python 3.13** - Modern Python runtime
- **Flask 3.1** - Lightweight web framework
- **Azure OpenAI** - DALL-E 3 integration
- **python-dotenv** - Environment management

### Frontend
- **React 18.3** - Modern UI framework
- **Vite 6.0** - Lightning-fast build tool
- **Material-UI 6.3** - Google Material Design
- **Axios** - HTTP client

### Deployment
- **Backend**: Render
- **Frontend**: Vercel
- **Version Control**: GitHub

---

## 🚀 Features

### Core Generation
- ✅ Full DALL-E 3 API parameter control
- ✅ Size options: 1024x1024, 1792x1024, 1024x1792
- ✅ Quality: Standard / HD
- ✅ Style: Vivid / Natural
- ✅ Display both original and revised prompts

### Smart Tools (Coming Soon)
- 🔄 Social media presets
- 📊 Batch generation
- 📚 Prompt library
- 🖼️ Smart gallery
- 💾 LocalStorage persistence

---

## 📦 Installation & Setup

### Prerequisites
- Python 3.13+
- Node.js 18+
- Azure OpenAI account with DALL-E 3 deployment

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ImageGen.AI/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Azure OpenAI credentials
   ```

5. **Run the server**
   ```bash
   python app.py
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

---

## 🎓 AI-102 Certification Learning

This project demonstrates mastery of:

### DALL-E 3 API Concepts
- ✅ Size limitations (only 3 sizes available)
- ✅ Quality parameter (standard vs hd)
- ✅ Style parameter (vivid vs natural)
- ✅ n parameter (always 1 for DALL-E 3)
- ✅ Revised prompt handling
- ✅ Pricing structure

### Azure OpenAI Integration
- ✅ API authentication
- ✅ Deployment configuration
- ✅ Error handling
- ✅ Content policy compliance

### Best Practices
- ✅ Cost optimization strategies
- ✅ Parameter validation
- ✅ Response handling
- ✅ Production-ready architecture

---

## 📊 API Endpoints

### Health Check
```http
GET /api/health
```

### Generate Image
```http
POST /api/generate
Content-Type: application/json

{
  "prompt": "A futuristic city at sunset",
  "size": "1024x1024",
  "quality": "standard",
  "style": "vivid"
}
```

### Calculate Cost
```http
POST /api/calculate-cost
Content-Type: application/json

{
  "quality": "hd"
}
```

---

## 🎯 Roadmap

- [x] **Phase 1**: Foundation Setup
- [x] **Phase 2**: Core Generation
- [ ] **Phase 3**: Smart Features (Social Media Presets)
- [ ] **Phase 4**: Prompt Library
- [ ] **Phase 5**: Smart Gallery
- [ ] **Phase 6**: Deploy & Documentation

---

## 📝 License

This project is built as a portfolio piece for AI-102 certification preparation.

---

## 👤 Author

**Antonio** - AI Engineer in Training
- 🎓 Azure AI-900 Certified
- 📚 Preparing for AI-102 Certification
- 💼 Building production-ready AI applications
- 🔗 [GitHub Portfolio](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Azure OpenAI DALL-E 3 for image generation capabilities
- Material-UI for professional design system
- Flask & React communities for excellent documentation

---

**Built with ❤️ using Azure OpenAI and Material Design**
