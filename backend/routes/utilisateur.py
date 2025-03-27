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
    user = Utilisateur.query.get(idUser)
    
    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    # Simule des données pour l'exemple (tu peux les remplacer par des vraies requêtes)
    statistiques = {
        "classement": user.classement or 0,
        "points": user.points or 0,
        "categorie": "Expert" if (user.points or 0) >= 800 else "Débutant",
        "victoires": 13,  # TODO : calculer dynamiquement si tu as les Games
        "games": [
            {
                "nom": "Tournoi de printemps",
                "matches": [
                    { "scoreEquipe1": 11, "scoreEquipe2": 9 },
                    { "scoreEquipe1": 10, "scoreEquipe2": 12 },
                    { "scoreEquipe1": 11, "scoreEquipe2": 8 },
                ]
            },
            {
                "nom": "Tournoi du 20 mars",
                "matches": [
                    { "scoreEquipe1": 7, "scoreEquipe2": 11 },
                    { "scoreEquipe1": 11, "scoreEquipe2": 6 },
                ]
            }
        ]
    }

    return jsonify(statistiques), 200