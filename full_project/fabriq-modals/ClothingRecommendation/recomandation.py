import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.model_selection import train_test_split
from diffusers import StableDiffusionPipeline
from PIL import Image
import torch

# === Load Dataset ===
csv_path = "data_set/fashion_rec.csv"
if not os.path.exists(csv_path):
    raise FileNotFoundError(f"CSV file not found at path: {csv_path}")

df = pd.read_csv(csv_path)

# === Input Features ===
input_features = ['body_shape', 'skin_tone', 'age_group', 'gender', 'height', 'weight', 'occasion']

# === Encode Inputs ===
label_encoders = {}
for col in input_features:
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

X = df[input_features].values

# === Train Classifiers ===
fabric_clf = RandomForestClassifier()
color_clf = RandomForestClassifier()
pattern_clf = RandomForestClassifier()
clothing_clf = RandomForestClassifier()

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
    for col in input_features:
        le = label_encoders[col]
        val = user_input_dict[col]
        if val not in le.classes_:
            raise ValueError(f"Invalid input '{val}' for '{col}'. Allowed values: {list(le.classes_)}")
        encoded_val = le.transform([val])[0]
        user_features.append(encoded_val)

    user_features = [user_features]

    fabric_pred = fabric_clf.predict(user_features)
    color_pred = color_clf.predict(user_features)
    pattern_pred = pattern_clf.predict(user_features)
    clothing_pred = clothing_clf.predict(user_features)

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
    f"Create a 2D image of a women's {clothing_item} with "
    f"{fabrics} fabric, {patterns} patterns and {colors} colors. "
    f"for a {occasion} occasion, on a white background, in 2D clothing item image"
    f"The person has a {body_shape} body shape, {skin_tone} skin tone, weighs {weight}, and is {height} height."
    )
    return prompt
    print(prompt)


# === Stable Diffusion Load ===
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
pipe = pipe.to(device)

# === Image Generator ===
# def generate_images(prompt, output_dir="fashion_previews", num_images=3):
#     os.makedirs(output_dir, exist_ok=True)
#     image_paths = []
#     for i in range(num_images):
#         result = pipe(prompt)
#         image = result.images[0]
#         image_path = os.path.join(output_dir, f"fashion_preview_{i + 1}.png")
#         image.save(image_path)
#         image_paths.append(image_path)
#     return image_paths

def generate_images(prompt, output_dir="fashion_previews", num_images=3):
    os.makedirs(output_dir, exist_ok=True)
    image_paths = []
    for i in range(num_images):
        result = pipe(prompt)
        image = result.images[0]
        filename = f"fashion_preview_{i + 1}.png"
        image_path = os.path.join(output_dir, filename)
        image.save(image_path)
        # Return URL instead of local path
        image_paths.append(f"/fashion_previews/{filename}")
    return image_paths

