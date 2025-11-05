from diffusers import StableDiffusionPipeline
import torch

# Load Stable Diffusion model (e.g., v1.5)
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

def build_prompt_full(recommendations, user_input):
    occasion = user_input['occasion']
    gender = user_input['gender']
    age_group = user_input['age_group']
    height = user_input['height']
    weight = user_input['weight']
    body_shape = user_input['body_shape']
    skin_tone = user_input['skin_tone']

    fabrics = ', '.join(recommendations['fabric'][:2])
    colors = ', '.join(recommendations['color'][:2])
    patterns = ', '.join(recommendations['pattern'][:2])
    clothing_item = recommendations['clothing_item']

    prompt = (
      f"2D digital fashion image of a women's {colors} {fabrics} {clothing_item} with {patterns} pattern,"
      f"front view for {occasion} occasion, white background, fashion illustration style"
    )

    return prompt

    print("Prompt:", prompt)

    from PIL import Image
    import os
    from diffusers import StableDiffusionPipeline
    import torch

    # Load Stable Diffusion
    pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
    pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

    def generate_images(prompt, output_dir="fashion_previews", num_images=5):
        os.makedirs(output_dir, exist_ok=True)
        for i in range(num_images):
            image = pipe(prompt).images[0]
            image_path = os.path.join(output_dir, f"fashion_preview_{i + 1}.png")
            image.save(image_path)
            print(f"Saved: {image_path}")

    if __name__ == "__main__":
        try:
            user_input = get_user_input()
            recommendations = recommend(user_input)

            print("\n🎨 Top 5 Recommendations:")
            print("Fabrics:", recommendations['fabric'])
            print("Colors:", recommendations['color'])
            print("Patterns:", recommendations['pattern'])
            print("Recommended Clothing Item:", recommendations['clothing_item'])

            # Build prompt with full context
            prompt = build_prompt_full(recommendations, user_input)
            print("\n📸 Generating 2D fashion previews with Stable Diffusion...")
            print("Prompt:", prompt)

            generate_images(prompt)

        except Exception as e:
            print("❌ Error:", e)

