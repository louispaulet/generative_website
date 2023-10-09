from flask import Flask, request, render_template_string
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import re

app = Flask(__name__)

def extract_content_between_backticks(input_string):
    # Define the regular expression pattern
    pattern = r'```(.*?)```'

    # Use re.findall to find all matches of the pattern in the input string
    matches = re.findall(pattern, input_string, re.DOTALL)

    # get the first match
    first_match = matches[0]
    
    #remove EOL for html display in chatGPT web interface
    first_match = first_match.replace(r"\n", '')
    
    # do not return "html" (skip first 4 chars)
    return first_match[4:]


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
    print(page_content)
    return extract_content_between_backticks(page_content)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
