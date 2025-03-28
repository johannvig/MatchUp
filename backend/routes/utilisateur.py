from flask import Blueprint, jsonify, request
from models.utilisateur import Utilisateur
from models import db

utilisateur_bp = Blueprint("utilisateur", __name__)

@utilisateur_bp.route("/api/utilisateur/<int:idUser>", methods=["GET"])
def get_utilisateur(idUser):
    user = Utilisateur.query.get(idUser)
    print("Requête reçue pour ID:", idUser)
    if user:
        return jsonify({
            "prenom": user.prenom,
            "nom": user.nom,
            "email": user.email,
            "sexe": user.sexe,
            "langue": user.langue,
            "nationalite": user.nationalite,
        })
    return jsonify({"error": "Utilisateur non trouvé"}), 404


# ✅ Cette fonction doit être ici et pas dans le modèle
@utilisateur_bp.route("/api/utilisateur/<int:idUser>", methods=["PUT"])
def update_utilisateur(idUser):
    user = Utilisateur.query.get(idUser)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    data = request.get_json()
    user.sexe = data.get("sexe", user.sexe)
    user.langue = data.get("langue", user.langue)
    user.nationalite = data.get("nationalite", user.nationalite)

    db.session.commit()
    return jsonify({"message": "Utilisateur mis à jour"}), 200

@utilisateur_bp.route("/api/utilisateur/<int:idUser>", methods=["DELETE"])
def delete_utilisateur(idUser):
    user = Utilisateur.query.get(idUser)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Utilisateur supprimé avec succès"}), 200

@utilisateur_bp.route("/api/utilisateur/<int:idUser>/statistiques", methods=["GET"])
def get_statistiques_utilisateur(idUser):
    sport = request.args.get("sport")  # ex: "Tennis"
    tableau = request.args.get("tableau")  # ex: "simple"

    user = Utilisateur.query.get(idUser)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    # Tous les matchs joués par l'utilisateur
    games = user.games

    # Filtrage par sport et tableau
    if sport:
        games = [g for g in games if any(t.sport.nomSport.lower() == sport.lower() for t in g.tournois)]
    if tableau:
        games = [g for g in games if any(t.tableau.lower() == tableau.lower() for t in g.tournois)]

    # Classement filtré (tu peux adapter selon logique réelle)
    classement = user.classement

    statistiques = {
        "classement": classement,
        "points": user.points or 0,
        "categorie": "Expert" if (user.points or 0) >= 800 else "Débutant",
        "victoires": len([g for g in games if g.scoreEquipe1 > g.scoreEquipe2]),
        "games": [
            {
                "nom": tournoi.nomTournoi,
                "sport": tournoi.sport.nomSport,
                "type": tournoi.tableau,
                "date": tournoi.dateTournoi,
                "organisateur": "Organisateur",
                "matches": [
                    {
                        "setsEquipe1": [int(s.split("-")[0]) for s in g.sets.split(";")],
                        "setsEquipe2": [int(s.split("-")[1]) for s in g.sets.split(";")]
                    }
                    for g in tournoi.games if user in g.joueurs
                ]
            }
            for tournoi in user.tournois
        ],

    }

    return jsonify(statistiques), 200
