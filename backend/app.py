from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import AzureOpenAI
from dotenv import load_dotenv
import os

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

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'ImageGen.AI Backend',
        'dall_e_deployment': DEPLOYMENT_NAME
    }), 200

@app.route('/api/generate', methods=['POST'])
def generate_image():
    """
    Generate image using DALL-E 3
    
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
        data = request.get_json()
        
        # Validate required fields
        if not data or 'prompt' not in data:
            return jsonify({'error': 'Prompt is required'}), 400
        
        prompt = data['prompt']
        size = data.get('size', '1024x1024')
        quality = data.get('quality', 'standard')
        style = data.get('style', 'vivid')
        
        # Validate parameters
        valid_sizes = ['1024x1024', '1792x1024', '1024x1792']
        valid_qualities = ['standard', 'hd']
        valid_styles = ['vivid', 'natural']
        
        if size not in valid_sizes:
            return jsonify({'error': f'Invalid size. Must be one of: {valid_sizes}'}), 400
        
        if quality not in valid_qualities:
            return jsonify({'error': f'Invalid quality. Must be one of: {valid_qualities}'}), 400
        
        if style not in valid_styles:
            return jsonify({'error': f'Invalid style. Must be one of: {valid_styles}'}), 400
        
        # Calculate cost
        cost = PRICING[quality]
        
        # Generate image using Azure OpenAI DALL-E 3
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
        
        # Return response
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
            }
        }), 200
        
    except Exception as e:
        app.logger.error(f'Error generating image: {str(e)}')
        return jsonify({
            'success': False,
            'error': str(e)
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
            return jsonify({'error': 'Invalid quality parameter'}), 400
        
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
