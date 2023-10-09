from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/')
def index():
    return render_template_string(open('index.html').read())

@app.route('/generate', methods=['GET'])
def generate_page():
    link_text = request.args.get('link_text', 'Default')
    page_content = f'<h1>You clicked: {link_text}</h1>'
    return page_content

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
