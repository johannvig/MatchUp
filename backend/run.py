from flask import Flask
from database.config import db
from database.models import *
from routes import base  

app = Flask(__name__)
app.register_blueprint(base)

# Configuration SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialisation de la base de données avec l'application Flask
db.init_app(app)

# Création des tables
with app.app_context():
    db.create_all()
    print("📦 Base de données initialisée !")

if __name__ == '__main__':
    app.run(debug=True)
