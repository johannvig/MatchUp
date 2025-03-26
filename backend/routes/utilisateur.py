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

