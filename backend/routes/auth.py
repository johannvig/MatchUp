from flask import Blueprint, request, jsonify
from models.utilisateur import db, Utilisateur

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "user")

    if Utilisateur.query.filter_by(username=username).first():
        return jsonify({"error": "Nom d'utilisateur déjà pris"}), 400

    user = Utilisateur(username=username, role=role)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Compte créé avec succès"}), 201


@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = Utilisateur.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Nom d'utilisateur ou mot de passe invalide"}), 401

    return jsonify({
        "message": "Connexion réussie",
        "user": {
            "id": user.idUser,
            "username": user.username,
            "role": user.role
        }
    }), 200
