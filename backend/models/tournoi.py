from sqlalchemy import Column, Integer, String
from models import db  # Assure-toi que l'instance SQLAlchemy est bien initialisée

class Tournoi(db.Model):
    __tablename__ = 'tournoi'
    idTournoi = db.Column(db.Integer, primary_key=True)
    nomTournoi = db.Column(db.String(100))
    descriptionTournoi = db.Column(db.String(255))
    dateTournoi = db.Column(db.String(50))
    heureDebut = db.Column(db.String(20))
    heureFin = db.Column(db.String(20))
