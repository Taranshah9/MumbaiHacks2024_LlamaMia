from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from groq import Groq
import os
import base64

app = Flask(__name__)

# Enable CORS
CORS(app)

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client with API key
client = Groq(api_key=GROQ_API_KEY)
languages = {
    'en': 'English',
    'hi': 'Hindi',
    'gu': 'Gujarati',
    'ma': 'Marathi'
}

llm = ChatGroq(
    model="llama-3.1-70b-versatile",
    temperature=0.7
)

# Updated system prompt with language instruction
def get_system_prompt(lang='en'):
    base_prompt = """You are an expert in Indian agriculture with deep knowledge of:
- Traditional and modern farming practices across different regions
- Major crops and their cultivation patterns
- Agricultural policies and government initiatives
- Challenges faced by Indian farmers
- Sustainable farming practices in the Indian context
- Agricultural seasons (Kharif, Rabi, Zaid)
- Irrigation systems and water management
- Soil types and crop suitability

Only provide information related to Indian agriculture. If a question is outside this domain, 
politely redirect the conversation to Indian agriculture topics.

Example exchanges:
Q: What crops are grown in Punjab?
A: Punjab is known as India's breadbasket, primarily growing:
- Wheat (during Rabi season)
- Rice (during Kharif season)
- Cotton
- Sugarcane
The state's well-developed irrigation system and fertile soil support these crops.

Q: How is cryptocurrency doing?
A: I specialize in Indian agriculture topics. Instead, I can tell you about how digital 
payment systems are transforming Indian agriculture through initiatives like e-NAM 
(Electronic National Agriculture Market) or discuss agricultural commodities trading.
"""
    lang_instruction = f"\nPlease provide all responses in {languages.get(lang, 'English')}."
    return base_prompt + lang_instruction

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_query = data.get('query')
    lang = data.get('language', 'en')  # Default to English if no language specified
    
    if not user_query:
        return jsonify({"error": "Query is required"}), 400
    
    if lang not in languages:
        return jsonify({"error": f"Unsupported language code. Supported codes are: {', '.join(languages.keys())}"}), 400
    
    # Combine system prompt with user query
    messages = [
        {"role": "system", "content": get_system_prompt(lang)},
        {"role": "user", "content": user_query}
    ]
    
    try:
        # Get response from LLM
        response = llm.invoke(messages)
        return jsonify({
            "response": response.content,
            "language": languages[lang],
            "status": "success"
        })
    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

@app.route('/classify_plant_disease', methods=['POST'])
def classify_plant_disease():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    lang = request.form.get('language', 'en')  # Get language from form data
    
    if lang not in languages:
        return jsonify({"error": f"Unsupported language code. Supported codes are: {', '.join(languages.keys())}"}), 400
    
    image_file = request.files['image']
    image_data_url = f"data:image/jpeg;base64,{base64.b64encode(image_file.read()).decode()}"
    
    prompt = f"What plant disease is shown and what is its cure? (Please respond in {languages[lang]})"
    
    completion = client.chat.completions.create(
        model="llama-3.2-90b-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_data_url
                        }
                    }
                ]
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None
    )

    # Get the result and return it as JSON
    result = completion.choices[0].message
    return jsonify({
        "diagnosis": result.content,
        "language": languages[lang],
        "status": "success"
    }), 200


if __name__ == '__main__':
    app.run(debug=True)