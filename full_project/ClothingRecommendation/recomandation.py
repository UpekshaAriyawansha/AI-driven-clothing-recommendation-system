import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from diffusers import StableDiffusionPipeline
import torch

# === Load Dataset ===
csv_path = "data_set/fashion_rec.csv"
if not os.path.exists(csv_path):
    raise FileNotFoundError(f"CSV file not found at path: {csv_path}")

df = pd.read_csv(csv_path)

# === Input Features ===
input_features = ['body_shape', 'skin_tone', 'age_group', 'gender', 'height', 'weight', 'occasion']

# All features are now categorical
categorical_features = ['body_shape', 'skin_tone', 'age_group', 'gender', 'occasion', 'height', 'weight']

# === Encode Categorical Inputs ===
label_encoders = {}
for col in categorical_features:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# === Process Output Labels ===
df['fabric'] = df['fabric'].apply(lambda x: x.split(','))
df['color'] = df['color'].apply(lambda x: x.split(','))
df['pattern'] = df['pattern'].apply(lambda x: x.split(','))

clothing_le = LabelEncoder()
df['clothing_item'] = clothing_le.fit_transform(df['clothing_item'])

mlb_fabric = MultiLabelBinarizer()
mlb_color = MultiLabelBinarizer()
mlb_pattern = MultiLabelBinarizer()

Y_fabric = mlb_fabric.fit_transform(df['fabric'])
Y_color = mlb_color.fit_transform(df['color'])
Y_pattern = mlb_pattern.fit_transform(df['pattern'])
Y_clothing = df['clothing_item']

X = df[categorical_features].values  # Only categorical features

# === Train Classifiers ===
fabric_clf = RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42, n_jobs=-1)
color_clf = RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42, n_jobs=-1)
pattern_clf = RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42, n_jobs=-1)
clothing_clf = RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42, n_jobs=-1)

fabric_clf.fit(X, Y_fabric)
color_clf.fit(X, Y_color)
pattern_clf.fit(X, Y_pattern)
clothing_clf.fit(X, Y_clothing)

# === Recommendation Function ===
def recommend(user_input_dict):
    for feature in input_features:
        if feature not in user_input_dict:
            raise ValueError(f"Missing input: '{feature}'")

    user_features = []

    # Encode all categorical features
    for col in categorical_features:
        le = label_encoders[col]
        val = user_input_dict[col]
        if val not in le.classes_:
            raise ValueError(f"Invalid input '{val}' for '{col}'. Allowed: {list(le.classes_)}")
        encoded_val = le.transform([val])[0]
        user_features.append(encoded_val)

    user_features = [user_features]

    # Predict
    fabric_pred = fabric_clf.predict(user_features)
    color_pred = color_clf.predict(user_features)
    pattern_pred = pattern_clf.predict(user_features)
    clothing_pred = clothing_clf.predict(user_features)

    # Inverse transform
    fabrics = mlb_fabric.inverse_transform(fabric_pred)[0]
    colors = mlb_color.inverse_transform(color_pred)[0]
    patterns = mlb_pattern.inverse_transform(pattern_pred)[0]
    clothing_item = clothing_le.inverse_transform(clothing_pred)[0]

    return {
        'fabric': list(fabrics)[:5],
        'color': list(colors)[:5],
        'pattern': list(patterns)[:5],
        'clothing_item': clothing_item
    }

# === Prompt Builder ===
def build_prompt_full(recommendations, user_input):
    fabrics = ', '.join(recommendations['fabric'][:2])
    colors = ', '.join(recommendations['color'][:2])
    patterns = ', '.join(recommendations['pattern'][:2])
    clothing_item = recommendations['clothing_item']
    occasion = user_input['occasion']
    body_shape = user_input['body_shape']
    skin_tone = user_input['skin_tone']
    height = user_input['height']
    weight = user_input['weight']

    prompt = (
        f"Create a high-quality flat 2D digital fashion illustration of a women's {clothing_item} "
        f"designed with {fabrics} fabric, featuring {patterns} patterns and {colors} colors. "
        f"Front view for a {occasion} occasion, on a white background, in fashion illustration style. "
        f"The model has a {body_shape} body shape, {skin_tone} skin tone, {weight} weight size, and {height} height size"
    )
    print(f"[Prompt Generated]: {prompt}")
    return prompt

# === Stable Diffusion Setup ===
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"[Device] Using {device}")

pipe = None  # Lazy load

def load_pipeline():
    global pipe
    if pipe is None:
        print("[INFO] Loading Stable Diffusion model...")
        pipe = StableDiffusionPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5",
            torch_dtype=torch.float16 if device=="cuda" else torch.float32,
            safety_checker=None
        )
        pipe = pipe.to(device)
    return pipe

# === Image Generator (1 image only) ===
def generate_images(prompt, output_dir="fashion_previews"):
    os.makedirs(output_dir, exist_ok=True)
    pipe = load_pipeline()

    with torch.no_grad():
        result = pipe(prompt, num_inference_steps=25)
        image = result.images[0]

        filename = "fashion_preview_1.png"
        image_path = os.path.join(output_dir, filename)
        image.save(image_path)
        print(f"[Image Saved]: {image_path}")

    return [f"/fashion_previews/{filename}"]

# === Example Usage ===
if __name__ == "__main__":
    # Example user input
    user_input = {
        "body_shape": "pear",
        "skin_tone": "olive",
        "age_group": "adult",
        "gender": "female",
        "height": "short",
        "weight": "slim",
        "occasion": "office"
    }

    rec = recommend(user_input)
    prompt = build_prompt_full(rec, user_input)
    images = generate_images(prompt)
    print(f"Generated image URLs: {images}")