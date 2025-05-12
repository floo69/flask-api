from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

# API route that reads data from data.json and returns it
@app.route('/api', methods=['GET'])
def get_data():
    # Define the path to data.json
    data_file = os.path.join(os.path.dirname(__file__), 'data.json')
    
    # Read the data file
    with open(data_file, 'r') as f:
        data = json.load(f)
    
    # Return the data as JSON
    return jsonify(data)

# Serve the frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend')
    
    if path == "":
        return send_from_directory(frontend_dir, 'index.html')
    
    return send_from_directory(frontend_dir, path)

if __name__ == '__main__':
    app.run(debug=True)