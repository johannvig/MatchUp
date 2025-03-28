from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# ⚠️ IMPORTANT : importer les tables d’association en premier
from models.associations import *

# Ensuite les modèles
from models.utilisateur import Utilisateur
from models.reservation import Reservation
from models.terrain import Terrain
from models.sport import Sport
from models.tournoi import Tournoi
from models.game import Game
from models.paiement import Paiement
from models.role import Role
