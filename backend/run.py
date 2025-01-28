from flask import Flask, jsonify, request
from flask_cors import CORS
from routes import base  # Importation correcte du blueprint

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(base)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
