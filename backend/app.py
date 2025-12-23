from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import AzureOpenAI
from dotenv import load_dotenv
import os
import json
from datetime import datetime
from pathlib import Path

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, origins=[os.getenv('FRONTEND_URL', 'http://localhost:5173')])

# Initialize Azure OpenAI client
client = AzureOpenAI(
    api_version=os.getenv('AZURE_OPENAI_API_VERSION'),
    azure_endpoint=os.getenv('AZURE_OPENAI_ENDPOINT'),
    api_key=os.getenv('AZURE_OPENAI_API_KEY')
)

# DALL-E 3 Configuration
DEPLOYMENT_NAME = os.getenv('AZURE_OPENAI_DEPLOYMENT_NAME', 'dall-e-3')

# Pricing configuration (USD per image)
PRICING = {
    'standard': 0.04,
    'hd': 0.08
}

# Cost Protection Configuration
MONTHLY_LIMIT = 4.00  # USD - Maximum monthly spend
COST_TRACKER_FILE = Path(__file__).parent / 'cost_tracker.json'

# ============================================
# COST TRACKING FUNCTIONS
# ============================================

def get_monthly_cost():
    """
    Get the current month's total cost.
    Automatically resets to 0.0 if it's a new month.
    
    Returns:
        float: Total cost for current month
    """
    current_month = datetime.now().strftime('%Y-%m')
    
    try:
        if COST_TRACKER_FILE.exists():
            with open(COST_TRACKER_FILE, 'r') as f:
                data = json.load(f)
                
                # If it's a new month, return 0.0 (will be reset on next write)
                if data.get('month') != current_month:
                    return 0.0
                
                return data.get('total', 0.0)
        else:
            return 0.0
    except Exception as e:
        app.logger.error(f'Error reading cost tracker: {str(e)}')
        return 0.0

def add_cost(cost):
    """
    Add cost to the monthly tracker.
    Automatically resets tracker if it's a new month.
    
    Args:
        cost (float): Cost to add in USD
    """
    current_month = datetime.now().strftime('%Y-%m')
    
    try:
        # Read existing data or create new
        if COST_TRACKER_FILE.exists():
            with open(COST_TRACKER_FILE, 'r') as f:
                data = json.load(f)
        else:
            data = {'month': current_month, 'total': 0.0, 'generations': 0}
        
        # Reset if new month
        if data.get('month') != current_month:
            data = {'month': current_month, 'total': 0.0, 'generations': 0}
        
        # Add cost
        data['total'] = round(data['total'] + cost, 2)
        data['generations'] = data.get('generations', 0) + 1
        
        # Save
        with open(COST_TRACKER_FILE, 'w') as f:
            json.dump(data, f, indent=2)
        
        app.logger.info(f'Cost added: ${cost:.2f}. Monthly total: ${data["total"]:.2f}')
        
    except Exception as e:
        app.logger.error(f'Error saving cost: {str(e)}')

def get_cost_status():
    """
    Get detailed cost tracking status.
    
    Returns:
        dict: Cost tracking information
    """
    current_cost = get_monthly_cost()
    remaining = max(0, MONTHLY_LIMIT - current_cost)
    percentage = (current_cost / MONTHLY_LIMIT) * 100 if MONTHLY_LIMIT > 0 else 0
    
    return {
        'month': datetime.now().strftime('%Y-%m'),
        'limit': MONTHLY_LIMIT,
        'spent': round(current_cost, 2),
        'remaining': round(remaining, 2),
        'percentage': round(percentage, 1),
        'is_limited': current_cost >= MONTHLY_LIMIT
    }

# ============================================
# API ROUTES
# ============================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'ImageGen.AI Backend',
        'dall_e_deployment': DEPLOYMENT_NAME
    }), 200

@app.route('/api/cost-status', methods=['GET'])
def cost_status():
    """
    Get current monthly cost status.
    Useful for frontend to display remaining budget.
    """
    try:
        status = get_cost_status()
        return jsonify(status), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate', methods=['POST'])
def generate_image():
    """
    Generate image using DALL-E 3 with cost protection.
    
    Request body:
    {
        "prompt": str,
        "size": str (1024x1024, 1792x1024, 1024x1792),
        "quality": str (standard, hd),
        "style": str (vivid, natural),
        "n": int (always 1 for DALL-E 3)
    }
    """
    try:
        # ===== STEP 1: CHECK MONTHLY LIMIT =====
        monthly_cost = get_monthly_cost()
        
        if monthly_cost >= MONTHLY_LIMIT:
            return jsonify({
                'success': False,
                'error': f'Límite mensual de ${MONTHLY_LIMIT:.2f} USD alcanzado. El servicio se ha deshabilitado automáticamente por protección de costos. Se restablecerá el próximo mes.',
                'cost_status': get_cost_status()
            }), 429  # 429 Too Many Requests
        
        # ===== STEP 2: VALIDATE REQUEST =====
        data = request.get_json()
        
        if not data or 'prompt' not in data:
            return jsonify({'error': 'Prompt es requerido'}), 400
        
        prompt = data['prompt']
        size = data.get('size', '1024x1024')
        quality = data.get('quality', 'standard')
        style = data.get('style', 'vivid')
        
        # Validate parameters
        valid_sizes = ['1024x1024', '1792x1024', '1024x1792']
        valid_qualities = ['standard', 'hd']
        valid_styles = ['vivid', 'natural']
        
        if size not in valid_sizes:
            return jsonify({'error': f'Tamaño inválido. Debe ser uno de: {valid_sizes}'}), 400
        
        if quality not in valid_qualities:
            return jsonify({'error': f'Calidad inválida. Debe ser una de: {valid_qualities}'}), 400
        
        if style not in valid_styles:
            return jsonify({'error': f'Estilo inválido. Debe ser uno de: {valid_styles}'}), 400
        
        # Calculate cost
        cost = PRICING[quality]
        
        # Check if this generation would exceed limit
        if monthly_cost + cost > MONTHLY_LIMIT:
            return jsonify({
                'success': False,
                'error': f'Esta generación excedería el límite mensual (${monthly_cost + cost:.2f} > ${MONTHLY_LIMIT:.2f}). Servicio protegido.',
                'cost_status': get_cost_status()
            }), 429
        
        # ===== STEP 3: GENERATE IMAGE =====
        response = client.images.generate(
            model=DEPLOYMENT_NAME,
            prompt=prompt,
            size=size,
            quality=quality,
            style=style,
            n=1  # DALL-E 3 only supports n=1
        )
        
        # Extract response data
        image_url = response.data[0].url
        revised_prompt = response.data[0].revised_prompt
        
        # ===== STEP 4: TRACK COST =====
        add_cost(cost)
        
        # ===== STEP 5: RETURN RESPONSE =====
        return jsonify({
            'success': True,
            'data': {
                'url': image_url,
                'revised_prompt': revised_prompt,
                'original_prompt': prompt,
                'parameters': {
                    'size': size,
                    'quality': quality,
                    'style': style,
                    'n': 1
                },
                'cost': cost,
                'timestamp': response.created
            },
            'cost_status': get_cost_status()
        }), 200
        
    except Exception as e:
        app.logger.error(f'Error generando imagen: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Error al generar imagen: {str(e)}'
        }), 500

@app.route('/api/calculate-cost', methods=['POST'])
def calculate_cost():
    """
    Calculate cost before generation
    
    Request body:
    {
        "quality": str (standard, hd)
    }
    """
    try:
        data = request.get_json()
        quality = data.get('quality', 'standard')
        
        if quality not in PRICING:
            return jsonify({'error': 'Parámetro de calidad inválido'}), 400
        
        return jsonify({
            'quality': quality,
            'cost': PRICING[quality],
            'currency': 'USD'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, port=port)
