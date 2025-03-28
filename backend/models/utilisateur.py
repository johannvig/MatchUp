from werkzeug.security import generate_password_hash, check_password_hash
from models import db
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from models.associations import associer, inscrire, payer, appartenir

class Utilisateur(db.Model):
    __tablename__ = 'utilisateur'
    
    idUser = db.Column(db.Integer, primary_key=True)
    prenom = db.Column(db.String(50))
    nom = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True, nullable=False)
    mdp = db.Column(db.String(128), nullable=False)
    roleParticipant = db.Column(db.String(20), default="user")
    
    sexe = db.Column(db.String(50))
    langue = db.Column(db.String(50))
    nationalite = db.Column(db.String(50))

    points = db.Column(db.Integer)
    classement = db.Column(db.Integer)

    reservations = relationship('Reservation', secondary=associer)
    tournois = relationship('Tournoi', secondary=inscrire)
    paiements = relationship('Paiement', secondary=payer)
    roles = relationship('Role', secondary=appartenir)
    games = db.relationship("Game", secondary="jouer", backref="joueurs")
    tournois = db.relationship('Tournoi', secondary='inscrire', backref='participants')


    def set_password(self, password):
        self.mdp = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.mdp, password)
