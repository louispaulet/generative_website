from flask import Flask, request, render_template_string
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage

app = Flask(__name__)

# Load OpenAI API key from file
with open('api_key.txt', 'r') as file:
    openai_api_key = file.read().strip()

# Initialize ChatOpenAI object with the loaded API key
chat_model = ChatOpenAI(openai_api_key=openai_api_key)

@app.route('/')
def index():
    return render_template_string(open('index.html').read())

@app.route('/generate', methods=['GET'])
def generate_page():
    link_text = request.args.get('link_text', 'Default')
    
    # Create a HumanMessage object with the link_text
    messages = [HumanMessage(content=link_text)]
    
    # Generate response using ChatOpenAI
    response = chat_model.predict_messages(messages)
    
    # Create page content using the generated response
    page_content = f"""
    <h1>You clicked: {link_text}</h1>
    <p>Generated response: {response}</p>
    """
    
    return page_content

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
