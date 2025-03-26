from flask import Flask
from models.utilisateur import Utilisateur
from models import db
from werkzeug.security import generate_password_hash

# Crée l'app Flask pour initialiser le contexte
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///matchup.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()

    utilisateurs = [
        Utilisateur(prenom="Alice", nom="Martin", email="alice@uqac.ca", mdp=generate_password_hash("test123"), roleParticipant="user"),
        Utilisateur(prenom="Bob", nom="Dupont", email="bob@uqac.ca", mdp=generate_password_hash("test123"), roleParticipant="user"),
        Utilisateur(prenom="Charlie", nom="Tremblay", email="charlie@uqac.ca", mdp=generate_password_hash("test123"), roleParticipant="user"),
        Utilisateur(prenom="Admin", nom="Root", email="admin@uqac.ca", mdp=generate_password_hash("admin123"), roleParticipant="admin")
    ]

    db.session.add_all(utilisateurs)
    db.session.commit()
    print("✔️ Base de données initialisée avec 3 utilisateurs + 1 admin.")
