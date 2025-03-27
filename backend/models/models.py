from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from sqlalchemy.orm import relationship

db = SQLAlchemy()

# --- Tables d'association ---
associer = db.Table('associer',
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idReservation', ForeignKey('reservation.idReservation'), primary_key=True)
)

appartenir = db.Table('appartenir',
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idRole', ForeignKey('role.idRole'), primary_key=True)
)

lier = db.Table('lier',
    Column('idSport', ForeignKey('sport.idSport'), primary_key=True),
    Column('idTournoi', ForeignKey('tournoi.idTournoi'), primary_key=True)
)

relier = db.Table('relier',
    Column('idTerrain', ForeignKey('terrain.idTerrain'), primary_key=True),
    Column('idReservation', ForeignKey('reservation.idReservation'), primary_key=True)
)

utiliser = db.Table('utiliser',
    Column('idTerrain', ForeignKey('terrain.idTerrain'), primary_key=True),
    Column('idGame', ForeignKey('game.idGame'), primary_key=True)
)

contenir = db.Table('contenir',
    Column('idTournoi', ForeignKey('tournoi.idTournoi'), primary_key=True),
    Column('idGame', ForeignKey('game.idGame'), primary_key=True)
)

inscrire = db.Table('inscrire',
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idTournoi', ForeignKey('tournoi.idTournoi'), primary_key=True),
    Column('roleParticipant', String)
)

payer = db.Table('payer',
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idPaiement', ForeignKey('paiement.idPaiement'), primary_key=True)
)

# --- Entités principales ---
class Role(db.Model):
    __tablename__ = 'role'
    idRole = Column(Integer, primary_key=True)
    nom = Column(String)

class Utilisateur(db.Model):
    __tablename__ = 'utilisateur'
    idUser = Column(Integer, primary_key=True)
    prenom = Column(String)
    nom = Column(String)
    langue = Column(String)
    sexe = Column(String)
    email = Column(String, unique=True)
    nationalite = Column(String)
    mdp = Column(String)
    points = Column(Integer)
    classement = Column(Integer)
    roleParticipant = Column(String)

    reservations = relationship('Reservation', secondary=associer)
    tournois = relationship('Tournoi', secondary=inscrire)
    paiements = relationship('Paiement', secondary=payer)
    roles = relationship('Role', secondary=appartenir)

class Reservation(db.Model):
    __tablename__ = 'reservation'
    idReservation = Column(Integer, primary_key=True)
    heureDebut = Column(String)
    dateReservation = Column(String)
    heureFin = Column(String)
    statutReservation = Column(String)

class Terrain(db.Model):
    __tablename__ = 'terrain'
    idTerrain = Column(Integer, primary_key=True)
    capaciteMax = Column(Integer)
    nomTerrain = Column(String)

class Sport(db.Model):
    __tablename__ = 'sport'
    idSport = Column(Integer, primary_key=True)
    nomSport = Column(String)
    descriptionSport = Column(String)

class Game(db.Model):
    __tablename__ = 'game'
    idGame = Column(Integer, primary_key=True)
    scoreEquipe1 = Column(Integer)
    scoreEquipe2 = Column(Integer)
    statutGame = Column(String)
    sets = Column(String)

class Tournoi(db.Model):
    __tablename__ = 'tournoi'
    idTournoi = Column(Integer, primary_key=True)
    nomTournoi = Column(String)
    descriptionTournoi = Column(String)
    dateTournoi = Column(String)
    heureDebut = Column(String)
    heureFin = Column(String)

class Paiement(db.Model):
    __tablename__ = 'paiement'
    idPaiement = Column(Integer, primary_key=True)
    montant = Column(Float)
    statutPaiement = Column(String)
    datePaiement = Column(String)
