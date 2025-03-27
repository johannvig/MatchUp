from flask import Flask
from models import db
from models.utilisateur import Utilisateur
from models.models import Game, Sport, Tournoi, Reservation, Terrain
from werkzeug.security import generate_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///matchup.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()

    # 🔐 Utilisateurs
    alice = Utilisateur(prenom="Alice", nom="Martin", email="alice@uqac.ca", mdp=generate_password_hash("test123"), roleParticipant="user", points=857, classement=13)
    bob = Utilisateur(prenom="Bob", nom="Dupont", email="bob@uqac.ca", mdp=generate_password_hash("test123"), roleParticipant="user", points=900, classement=10)
    charlie = Utilisateur(prenom="Charlie", nom="Tremblay", email="charlie@uqac.ca", mdp=generate_password_hash("test123"), roleParticipant="user", points=700, classement=22)
    admin = Utilisateur(prenom="Admin", nom="Root", email="admin@uqac.ca", mdp=generate_password_hash("admin123"), roleParticipant="admin")

    # 🏓 Sports
    tennis = Sport(nomSport="Tennis", descriptionSport="Sport de raquette")
    badminton = Sport(nomSport="Badminton", descriptionSport="Sport en salle avec volant")

    # 🏟️ Terrain
    terrain1 = Terrain(nomTerrain="Tennis #1", capaciteMax=2)

    # 🏆 Tournoi
    tournoi = Tournoi(
        nomTournoi="Tournoi Printemps",
        descriptionTournoi="Tournoi en simple",
        dateTournoi="2025-03-01",
        heureDebut="14:00",
        heureFin="17:00"
    )

    # 🕒 Réservation
    reservation = Reservation(dateReservation="2025-03-01", heureDebut="14:00", heureFin="15:00", statutReservation="Confirmée")

    # 🥎 Matchs (Games)
    game1 = Game(scoreEquipe1=11, scoreEquipe2=6, statutGame="Terminé")
    game2 = Game(scoreEquipe1=8, scoreEquipe2=11, statutGame="Terminé")
    game3 = Game(scoreEquipe1=12, scoreEquipe2=10, statutGame="Terminé")
    game4 = Game(scoreEquipe1=6, scoreEquipe2=11, statutGame="Terminé")  # défaite

    # 📊 Lier les entités
    alice.games = [game1, game3]
    bob.games = [game1, game4]
    charlie.games = [game2]

    tournoi.games = [game1, game2, game3, game4]
    terrain1.games = [game1, game2]
    reservation.games = [game1]

    db.session.add_all([alice, bob, charlie, admin, tennis, badminton, terrain1, tournoi, reservation])
    db.session.commit()
    print("✅ Utilisateurs et matchs ajoutés avec succès !")
