from database.config import db

class Terrain(db.Model):
    idTerrain = db.Column(db.Integer, primary_key=True)
    capaciteMax = db.Column(db.Integer, nullable=False)
    nomTerrain = db.Column(db.String(50), unique=True, nullable=False)

class Sport(db.Model):
    idSport = db.Column(db.Integer, primary_key=True)
    nomSport = db.Column(db.String(50), unique=True, nullable=False)
    descriptionSport = db.Column(db.Text)

class Role(db.Model):
    idRole = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)

class Utilisateur(db.Model):
    idUser = db.Column(db.Integer, primary_key=True)
    prenom = db.Column(db.String(50), nullable=False)
    nom = db.Column(db.String(50), nullable=False)
    langue = db.Column(db.String(50), nullable=False)
    sexe = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    nationalite = db.Column(db.String(50))
    mdp = db.Column(db.String(50), nullable=False)
    points = db.Column(db.Integer)
    classement = db.Column(db.Integer)
    roleParticipant = db.Column(db.String(50), nullable=False)
    idRole = db.Column(db.Integer, db.ForeignKey('role.idRole'), nullable=False)

class Tournoi(db.Model):
    idTournoi = db.Column(db.Integer, primary_key=True)
    nomTournoi = db.Column(db.String(50), nullable=False)
    descriptionTournoi = db.Column(db.Text)
    dateTournoi = db.Column(db.Date, nullable=False)
    heureDebut = db.Column(db.Time, nullable=False)
    heureFin = db.Column(db.Time, nullable=False)
    idSport = db.Column(db.Integer, db.ForeignKey('sport.idSport'), nullable=False)

class Game(db.Model):
    idGame = db.Column(db.Integer, primary_key=True)
    scoreEquipe1 = db.Column(db.Integer, nullable=False)
    scoreEquipe2 = db.Column(db.Integer, nullable=False)
    statutGame = db.Column(db.String(50), nullable=False)
    idTournoi = db.Column(db.Integer, db.ForeignKey('tournoi.idTournoi'))
    idTerrain = db.Column(db.Integer, db.ForeignKey('terrain.idTerrain'), nullable=False)

class Reservation(db.Model):
    idReservation = db.Column(db.Integer, primary_key=True)
    heureDebut = db.Column(db.DateTime, nullable=False)
    dateReservation = db.Column(db.DateTime, nullable=False)
    heureFin = db.Column(db.DateTime, nullable=False)
    statutReservation = db.Column(db.String(50), nullable=False)
    idTerrain = db.Column(db.Integer, db.ForeignKey('terrain.idTerrain'), nullable=False)
    idUser = db.Column(db.Integer, db.ForeignKey('utilisateur.idUser'), nullable=False)

class Paiement(db.Model):
    idPaiement = db.Column(db.Integer, primary_key=True)
    montant = db.Column(db.Integer, nullable=False)
    statutPaiement = db.Column(db.String(50), nullable=False)
    datePaiement = db.Column(db.DateTime, nullable=False)
    idTournoi = db.Column(db.Integer, db.ForeignKey('tournoi.idTournoi'))
    idUser = db.Column(db.Integer, db.ForeignKey('utilisateur.idUser'), nullable=False)

class Accueillir(db.Model):
    idTerrain = db.Column(db.Integer, db.ForeignKey('terrain.idTerrain'), primary_key=True)
    idSport = db.Column(db.Integer, db.ForeignKey('sport.idSport'), primary_key=True)

class Inscrire(db.Model):
    idUser = db.Column(db.Integer, db.ForeignKey('utilisateur.idUser'), primary_key=True)
    idTournoi = db.Column(db.Integer, db.ForeignKey('tournoi.idTournoi'), primary_key=True)
    roleParticipant = db.Column(db.String(50), nullable=False)

class Associer(db.Model):
    idReservation = db.Column(db.Integer, db.ForeignKey('reservation.idReservation'), primary_key=True)
    idPaiement = db.Column(db.Integer, db.ForeignKey('paiement.idPaiement'), primary_key=True)

class Jouer(db.Model):
    idUser = db.Column(db.Integer, db.ForeignKey('utilisateur.idUser'), primary_key=True)
    idGame = db.Column(db.Integer, db.ForeignKey('game.idGame'), primary_key=True)
