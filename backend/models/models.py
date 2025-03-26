from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

# --- Tables d'association ---

associer = Table('associer', Base.metadata,
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idReservation', ForeignKey('reservation.idReservation'), primary_key=True)
)

appartenir = Table('appartenir', Base.metadata,
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idRole', ForeignKey('role.idRole'), primary_key=True)
)

lier = Table('lier', Base.metadata,
    Column('idSport', ForeignKey('sport.idSport'), primary_key=True),
    Column('idTournoi', ForeignKey('tournoi.idTournoi'), primary_key=True)
)

relier = Table('relier', Base.metadata,
    Column('idTerrain', ForeignKey('terrain.idTerrain'), primary_key=True),
    Column('idReservation', ForeignKey('reservation.idReservation'), primary_key=True)
)

utiliser = Table('utiliser', Base.metadata,
    Column('idTerrain', ForeignKey('terrain.idTerrain'), primary_key=True),
    Column('idGame', ForeignKey('game.idGame'), primary_key=True)
)

contenir = Table('contenir', Base.metadata,
    Column('idTournoi', ForeignKey('tournoi.idTournoi'), primary_key=True),
    Column('idGame', ForeignKey('game.idGame'), primary_key=True)
)

inscrire = Table('inscrire', Base.metadata,
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idTournoi', ForeignKey('tournoi.idTournoi'), primary_key=True),
    Column('roleParticipant', String)
)

payer = Table('payer', Base.metadata,
    Column('idUser', ForeignKey('utilisateur.idUser'), primary_key=True),
    Column('idPaiement', ForeignKey('paiement.idPaiement'), primary_key=True)
)

# --- Entités principales ---

class Role(Base):
    __tablename__ = 'role'
    idRole = Column(Integer, primary_key=True)
    nom = Column(String)


class Utilisateur(Base):
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


class Reservation(Base):
    __tablename__ = 'reservation'
    idReservation = Column(Integer, primary_key=True)
    heureDebut = Column(String)
    dateReservation = Column(String)
    heureFin = Column(String)
    statutReservation = Column(String)


class Terrain(Base):
    __tablename__ = 'terrain'
    idTerrain = Column(Integer, primary_key=True)
    capaciteMax = Column(Integer)
    nomTerrain = Column(String)


class Sport(Base):
    __tablename__ = 'sport'
    idSport = Column(Integer, primary_key=True)
    nomSport = Column(String)
    descriptionSport = Column(String)


class Game(Base):
    __tablename__ = 'game'
    idGame = Column(Integer, primary_key=True)
    scoreEquipe1 = Column(Integer)
    scoreEquipe2 = Column(Integer)
    statutGame = Column(String)


class Tournoi(Base):
    __tablename__ = 'tournoi'
    idTournoi = Column(Integer, primary_key=True)
    nomTournoi = Column(String)
    descriptionTournoi = Column(String)
    dateTournoi = Column(String)
    heureDebut = Column(String)
    heureFin = Column(String)


class Paiement(Base):
    __tablename__ = 'paiement'
    idPaiement = Column(Integer, primary_key=True)
    montant = Column(Float)
    statutPaiement = Column(String)
    datePaiement = Column(String)
