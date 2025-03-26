from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Importer ici les modèles pour qu'ils soient bien pris en compte
from models.models import (
    Utilisateur,
    Reservation,
    Terrain,
    Sport,
    Tournoi,
    Game,
    Paiement,
    Role
)
