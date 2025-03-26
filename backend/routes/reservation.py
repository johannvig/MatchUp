from flask import Blueprint, request, jsonify
from models.utilisateur import db
from models.reservation import Reservation
# (et les autres à venir : terrain, tournoi, etc.)

from datetime import datetime

reservation_bp = Blueprint('reservation', __name__)

@reservation_bp.route("/reservation", methods=["POST"])
def create_reservation():
    data = request.json

    date_reservation = data.get("dateReservation")
    heure_debut = data.get("heureDebut")
    heure_fin = data.get("heureFin")
    statut = data.get("statutReservation", "en_attente")

    reservation = Reservation(
        dateReservation=date_reservation,
        heureDebut=heure_debut,
        heureFin=heure_fin,
        statutReservation=statut
    )

    db.session.add(reservation)
    db.session.commit()

    return jsonify({"message": "Réservation créée", "id": reservation.idReservation}), 201
