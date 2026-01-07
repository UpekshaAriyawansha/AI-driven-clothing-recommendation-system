from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

# Import your recommendation module
from recomandation import recommend, build_prompt_full, generate_images

app = Flask(__name__)
CORS(app)

# === Health check route ===
@app.route('/')
def index():
    return "FABRIQ Recommendation API is running."

# === Serve saved images for React frontend ===
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

        required_fields = [
            'body_shape', 'skin_tone', 'age_group', 'gender',
            'height', 'weight', 'occasion'
        ]
        for field in required_fields:
            if field not in user_input:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Step 1: ML recommendations
        recommendations = recommend(user_input)

        # Step 2: Build prompt
        prompt = build_prompt_full(recommendations, user_input)

        # Step 3: Generate & save 1 image
        image_urls = generate_images(prompt, output_dir='fashion_previews')

        # Step 4: Return response
        return jsonify({
            'recommendations': recommendations,
            'prompt': prompt,
            'generated_images': image_urls
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# === Run Flask App ===
if __name__ == '__main__':
    os.makedirs('fashion_previews', exist_ok=True)
    print("[Server] Starting FABRIQ API on http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=False)
