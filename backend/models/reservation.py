from flask_sqlalchemy import SQLAlchemy

from .utilisateur import db  # <- on réutilise le db initialisé dans utilisateur.py

class Reservation(db.Model):
    __tablename__ = 'reservation'

    idReservation = db.Column(db.Integer, primary_key=True)
    heureDebut = db.Column(db.String(10), nullable=False)
    dateReservation = db.Column(db.String(20), nullable=False)
    heureFin = db.Column(db.String(10), nullable=False)
    statutReservation = db.Column(db.String(50), nullable=False)
