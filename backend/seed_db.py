from flask import Flask
from models import db
from models.utilisateur import Utilisateur
from models.sport import Sport
from models.reservation import Reservation
from models.terrain import Terrain
from models.tournoi import Tournoi
from models.game import Game
from werkzeug.security import generate_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///matchup.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()

    # 🔐 Utilisateurs
    alice = Utilisateur(
        prenom="Alice",
        nom="Martin",
        email="alice@uqac.ca",
        mdp=generate_password_hash("test123"),
        roleParticipant="user",
        points=857,
        classement=13,
        sexe="F",
        langue="français",
        nationalite="Canadienne"
    )

    bob = Utilisateur(
        prenom="Bob",
        nom="Dupont",
        email="bob@uqac.ca",
        mdp=generate_password_hash("test123"),
        roleParticipant="user",
        points=900,
        classement=10,
        sexe="M",
        langue="anglais",
        nationalite="Française"
    )

    charlie = Utilisateur(
        prenom="Charlie",
        nom="Tremblay",
        email="charlie@uqac.ca",
        mdp=generate_password_hash("test123"),
        roleParticipant="user",
        points=700,
        classement=22,
        sexe="M",
        langue="français",
        nationalite="Canadienne"
    )

    admin = Utilisateur(
        prenom="Admin",
        nom="Root",
        email="admin@uqac.ca",
        mdp=generate_password_hash("admin123"),
        roleParticipant="admin",
        sexe="",
        langue="",
        nationalite=""
    )

    # 🏓 Sports
    tennis = Sport(nomSport="Tennis", descriptionSport="Sport de raquette")
    badminton = Sport(nomSport="Badminton", descriptionSport="Sport en salle avec volant")

    # 🏟️ Terrain
    terrain1 = Terrain(nomTerrain="Tennis #1", capaciteMax=2)

    # 🏆 Tournois pour chaque sport et chaque tableau
    tournois = []
    tableaux = ["simple", "double", "mixte"]
    sports = [tennis, badminton]

    for i, sport in enumerate(sports):
        for j, tableau in enumerate(tableaux):
            tournois.append(Tournoi(
                nomTournoi=f"{sport.nomSport} - {tableau}",
                descriptionTournoi=f"Tournoi de {sport.nomSport.lower()} en {tableau}",
                dateTournoi=f"2025-03-{15 + i*3 + j:02d}",
                heureDebut="13:00",
                heureFin="17:00",
                sport=sport,
                tableau=tableau
            ))

    # 🎾 Jeux supplémentaires pour Alice dans différents sports/tableaux
    extra_games = [
        Game(scoreEquipe1=2, scoreEquipe2=1, statutGame="Terminé", sets="11-3;8-11;11-7"),
        Game(scoreEquipe1=1, scoreEquipe2=2, statutGame="Terminé", sets="10-12;11-9;9-11"),
        Game(scoreEquipe1=2, scoreEquipe2=0, statutGame="Terminé", sets="11-7;11-4"),
        Game(scoreEquipe1=0, scoreEquipe2=2, statutGame="Terminé", sets="9-11;8-11"),
        Game(scoreEquipe1=2, scoreEquipe2=1, statutGame="Terminé", sets="11-6;9-11;11-8")
    ]

    # 🎯 Matchs de base
    game1 = Game(scoreEquipe1=11, scoreEquipe2=9, statutGame="Terminé", sets="11-9;11-8")
    game2 = Game(scoreEquipe1=10, scoreEquipe2=12, statutGame="Terminé", sets="10-12;11-9;9-11")
    game3 = Game(scoreEquipe1=11, scoreEquipe2=8, statutGame="Terminé", sets="11-9;11-8")
    game4 = Game(scoreEquipe1=7, scoreEquipe2=11, statutGame="Terminé", sets="7-11;6-11")
    game5 = Game(scoreEquipe1=11, scoreEquipe2=6, statutGame="Terminé", sets="11-6;11-4")

    # 🧍 Association utilisateurs ↔ tournois (Alice dans tous les tournois)
    for tournoi in tournois:
        alice.tournois.append(tournoi)

    bob.tournois.append(tournois[0])
    charlie.tournois.append(tournois[0])

    # 📊 Lier les entités
    alice.games = [game1, game3, game5] + extra_games
    bob.games = [game1, game2, game4]
    charlie.games = [game2]

    # Associer des matchs à différents tournois
    tournois[0].games = [game1, game2, game3]
    tournois[1].games = [game4, game5]
    tournois[2].games = extra_games[:2]
    tournois[3].games = extra_games[2:]

    terrain1.games = [game1, game2] + extra_games

    # 🕒 Réservation
    reservation = Reservation(dateReservation="2025-03-01", heureDebut="14:00", heureFin="15:00", statutReservation="Confirmée")
    reservation.games = [game1]

    db.session.add_all([
        alice, bob, charlie, admin,
        tennis, badminton,
        terrain1,
        *tournois,
        reservation,
        game1, game2, game3, game4, game5,
        *extra_games
    ])
    db.session.commit()
    print("✅ Utilisateurs, tournois et matchs ajoutés avec succès !")
