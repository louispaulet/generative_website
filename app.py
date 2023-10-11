from flask import Flask, request, render_template_string
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import re
from slugify import slugify
import os
import time
from bs4 import BeautifulSoup

app = Flask(__name__, static_folder='static', static_url_path='/static')

def save_html_to_file(link_text, page_content):
    # Create a filename using a timestamp and a slug of the link_text
    filename = f"{int(time.time())}_{slugify(link_text[:150])}.html"
    
    # Ensure the 'saved_html' directory exists
    os.makedirs('saved_html', exist_ok=True)
    
    # Save the file
    with open(f'saved_html/{filename}', 'w', encoding='utf-8') as f:
        f.write(page_content)

def extract_content_between_backticks(input_string):
    # Define the regular expression pattern
    pattern = r'```(.*?)```'

    # Use re.findall to find all matches of the pattern in the input string
    matches = re.findall(pattern, input_string, re.DOTALL)
    
    #perform early return if extraction didn't work
    if not matches:
        #return input string without EOL char
        return input_string.replace(r"\n", '')
    
    # get the first match
    first_match = matches[0]
    
    #remove EOL for html display in chatGPT web interface
    first_match = first_match.replace(r"\n", '')
    
    # do not return "html" (skip first 4 chars)
    return first_match[4:]
    
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
    return render_template('index.html')

@app.route('/generate', methods=['GET'])
def generate_page():
    link_text = request.args.get('link_text', 'Default')
    
    # Create a HumanMessage object with the link_text
    messages = [HumanMessage(content=link_text)]
    
    # Generate response using ChatOpenAI
    response = chat_model.predict_messages(messages)
    
    page_content = extract_content_between_backticks(response.content)
    save_html_to_file(link_text, page_content)
    
    return page_content
    
    # Create page content using the generated response    
    #page_content = extract_content_between_backticks(response.content)
    
    #if not page_content:
    #    return f"""
    #    <p>You clicked: {link_text}</p>
    #    <p>Sadly we couldnt properly extract the response</p>
    #    <p>Generated response: {response.content}</p>
    #    """
    
    #save_html_to_file(link_text, page_content)
    
    #return page_content

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
