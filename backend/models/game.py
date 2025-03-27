from models import db

class Game(db.Model):
    __tablename__ = 'game'
    
    idGame = db.Column(db.Integer, primary_key=True)
    scoreEquipe1 = db.Column(db.Integer)
    scoreEquipe2 = db.Column(db.Integer)
    statutGame = db.Column(db.String(50))
    sets = db.Column(db.String)  # ex: "11-9,6-11,11-7"
