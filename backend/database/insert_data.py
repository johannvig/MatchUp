from faker import Faker
from .config import db
from .models import Utilisateur, Sport, Terrain, Reservation, Game, Role, Tournoi
from run import app  # Import de l'application Flask

fake = Faker()

def insert_roles():
    with app.app_context():
        roles = ["Admin", "Visiteur", "Étudiant"]
        role_objects = {}

        for role_name in roles:
            role = Role(nom=role_name)
            db.session.add(role)
            role_objects[role_name] = role

        # Insérer un utilisateur admin
        admin_user = Utilisateur(
            prenom="Admin",
            nom="User",
            langue="Français",
            sexe="Homme",
            email="admin@example.com",
            nationalite="France",
            mdp="admin123",  # Hasher en production !
            points=1000,
            classement=1,
            roleParticipant="Admin",
            idRole=1  # Vérifie que c'est bien l'ID du rôle "Admin"
        )
        db.session.add(admin_user)

        db.session.commit()
        print("✅ Rôles et utilisateur admin insérés avec succès !")

def insert_sports():
    with app.app_context():
        sports = ["Badminton", "Pickleball", "Tennis"]
        for sport_name in sports:
            sport = Sport(nomSport=sport_name, descriptionSport=f"Description de {sport_name}")
            db.session.add(sport)

        db.session.commit()
        print("✅ Sports insérés avec succès !")

def insert_terrains():
    with app.app_context():
        sports = ["Badminton", "Pickleball", "Tennis"]
        for sport_name in sports:
            num_terrains = 8 if sport_name != "Tennis" else 2
            for i in range(1, num_terrains + 1):
                terrain_name = f"{sport_name}_Terrain_{i}"
                terrain = Terrain(nomTerrain=terrain_name, capaciteMax=fake.random_int(min=2, max=10))
                db.session.add(terrain)

        db.session.commit()
        print("✅ Terrains insérés avec succès !")

def insert_users():
    with app.app_context():
        for _ in range(20):  # 20 utilisateurs aléatoires
            utilisateur = Utilisateur(
                prenom=fake.first_name(),
                nom=fake.last_name(),
                langue=fake.random_element(elements=["Français", "Anglais", "Espagnol"]),
                sexe=fake.random_element(elements=["Homme", "Femme"]),
                email=fake.email(),
                nationalite=fake.country(),
                mdp=fake.password(),
                points=fake.random_int(min=0, max=1000),
                classement=fake.random_int(min=1, max=100),
                roleParticipant=fake.random_element(elements=["Joueur", "Arbitre", "Coach"]),
                idRole=fake.random_int(min=2, max=3)  # Rôle Visiteur ou Étudiant
            )
            db.session.add(utilisateur)

        db.session.commit()
        print("✅ Utilisateurs insérés avec succès !")

def insert_reservations():
    with app.app_context():
        utilisateurs = Utilisateur.query.all()
        terrains = Terrain.query.all()

        for _ in range(10):  # 10 réservations aléatoires
            user = fake.random_element(utilisateurs)
            terrain = fake.random_element(terrains)

            reservation = Reservation(
                heureDebut=fake.date_time_this_month(),
                dateReservation=fake.date_time_this_month(),
                heureFin=fake.date_time_this_month(),
                statutReservation=fake.random_element(["Confirmée", "Annulée", "En attente"]),
                idTerrain=terrain.idTerrain,
                idUser=user.idUser
            )
            db.session.add(reservation)

        db.session.commit()
        print("✅ Réservations insérées avec succès !")

def insert_games():
    with app.app_context():
        utilisateurs = Utilisateur.query.all()
        tournois = Tournoi.query.all()
        terrains = Terrain.query.all()

        for _ in range(10):  # 10 matchs aléatoires
            tournoi = fake.random_element(tournois) if tournois else None
            terrain = fake.random_element(terrains)

            game = Game(
                scoreEquipe1=fake.random_int(min=0, max=30),
                scoreEquipe2=fake.random_int(min=0, max=30),
                statutGame=fake.random_element(["Terminé", "En cours", "Annulé"]),
                idTournoi=tournoi.idTournoi if tournoi else None,
                idTerrain=terrain.idTerrain
            )
            db.session.add(game)

        db.session.commit()
        print("✅ Matchs insérés avec succès !")

if __name__ == "__main__":
    insert_roles()
    insert_sports()
    insert_terrains()
    insert_users()
    insert_reservations()
    insert_games()
    print("🚀 Toutes les données ont été insérées avec succès !")
