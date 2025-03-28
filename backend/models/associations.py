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
    db.Column('idTournoi', db.Integer, db.ForeignKey('tournoi.idTournoi'), primary_key=True),
    db.Column('idGame', db.Integer, db.ForeignKey('game.idGame'), primary_key=True)
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








