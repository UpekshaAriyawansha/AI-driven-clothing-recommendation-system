from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

from recomandation import recommend, build_prompt_full, generate_images

app = Flask(__name__)
CORS(app)

# === Health check route ===
@app.route('/')
def index():
    return "FABRIQ Recommendation API is running. Use POST /api/recommendation/add to get recommendations."

# === Serve image files ===
@app.route('/fashion_previews/<filename>')
def serve_image(filename):
    return send_from_directory('fashion_previews', filename)

# === Recommendation + Image Generation API ===
@app.route('/api/recommendation/add', methods=['POST']) 
def get_recommendation():
    try:
        user_input = request.json

        if not user_input:
            return jsonify({'error': 'Missing JSON body'}), 400

        # Step 1: Get recommendations
        recommendations = recommend(user_input)

        # Step 2: Build prompt for AI image generation
        prompt = build_prompt_full(recommendations, user_input)

        # Step 3: Generate images
        image_paths = generate_images(prompt, num_images=3)

        # Step 4: Format image URLs for frontend
        image_urls = [f"/fashion_previews/{os.path.basename(path)}" for path in image_paths]

        # Final Response
        return jsonify({
            'recommendations': recommendations,
            'prompt': prompt,
            'generated_images': image_urls
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# === Run App ===
if __name__ == '__main__':
    os.makedirs('fashion_previews', exist_ok=True)
    app.run(debug=True)
