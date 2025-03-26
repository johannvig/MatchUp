"use client";

import React, { useEffect, useState } from "react";
import Header from '../../../Composants/Header/page';

interface Reservation {
  id: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  statut: string;
}

export default function ReservationConfirmation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id"); // ou localStorage ou cookie
    if (!userId) return;

    fetch(`http://localhost:3000/api/reservations/${userId}`)
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error("Erreur de récupération :", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <Header />
      <main className="flex space-x-6 mt-20">
        <div className="flex-1 space-y-6">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{res.date}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${res.statut === "confirmé" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {res.statut}
                </span>
              </div>
              <p className="text-sm text-gray-500">Horaire: {res.heureDebut} à {res.heureFin}</p>
              <p className="text-sm text-gray-500">Réservation #{res.id}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
