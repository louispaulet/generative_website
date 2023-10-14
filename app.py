from flask import Flask, request, render_template_string
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import re
from slugify import slugify
import os
import time
from bs4 import BeautifulSoup

app = Flask(__name__)

def save_html_to_file(link_text, page_content):
    # Create a filename using a timestamp and a slug of the link_text
    filename = f"{int(time.time())}_{slugify(link_text[:150])}.html"
    
    # Ensure the 'saved_html' directory exists
    os.makedirs('saved_html', exist_ok=True)
    
    # Save the file
    with open(f'saved_html/{filename}', 'w', encoding='utf-8') as f:
        f.write(page_content)
   
def extract_html_from_string(html_string):
# Parse the HTML using BeautifulSoup
    soup = BeautifulSoup(html_string, 'html.parser')

    # Find the outermost HTML tag
    outermost_tag = soup.find()

    # Get all the content of the outermost HTML tag as a string
    outermost_content = str(outermost_tag)

    # Print or use the outermost content as needed
    return outermost_content


# Load OpenAI API key from file
with open('api_key.txt', 'r') as file:
    openai_api_key = file.read().strip()

# Initialize ChatOpenAI object with the loaded API key
chat_model = ChatOpenAI(openai_api_key=openai_api_key)

@app.route('/')
def index():
    return render_template_string(open('index.html').read())
    
@app.route('/alt_index')
def alt_index():
    return render_template_string(open('alt_index.html').read())

@app.route('/generate', methods=['GET'])
def generate_page():
    link_text = request.args.get('link_text', 'Default')
    
    # Create a HumanMessage object with the link_text
    messages = [HumanMessage(content=link_text)]
    
    # Generate response using ChatOpenAI
    response = chat_model.predict_messages(messages)
    
    page_content = extract_html_from_string(response.content)
    save_html_to_file(link_text, page_content)
    
    return page_content

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
