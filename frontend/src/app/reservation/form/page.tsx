"use client";

import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import Header from '../../Composants/Header/page'; 

export default function ReservationForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as "jouer_amis" | "rechercher_adversaire" | "inscription_tournoi";
  const [price, setPrice] = useState("Gratuit");
  const [players, setPlayers] = useState([{ id: 1 }]);

  const handleMembershipChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPlayers = [...players];
    newPlayers[index].isMember = event.target.value === "oui";
    setPlayers(newPlayers);

    if (!newPlayers.every(player => player.isMember)) {
      setPrice("7$");
    } else {
      setPrice("Gratuit");
    }
  };

  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers([...players, { id: players.length + 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <Header />

      <main className="flex space-x-6 mt-24">
        <div className="flex-1 bg-white rounded-lg p-4 shadow">
          <h2 className="text-2xl font-semibold mb-4">
            {mode === "jouer_amis" && "Ajouter le nombre de joueurs"}
            {mode === "rechercher_adversaire" && "Trouver un adversaire"}
            {mode === "inscription_tournoi" && "Inscription au tournoi"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Page d'accueil &gt; {
              mode === "jouer_amis" ? "Jouer entre amis" :
              mode === "rechercher_adversaire" ? "Rechercher un adversaire" :
              "S'inscrire à un tournoi"
            }
          </p>

          <form id="reservationForm" className="space-y-4">
            {players.map((player, index) => (
              <div key={player.id} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Joueur {player.id}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etes-ce que le joueur {player.id} est étudiant(e) / employé à l'UQAC ? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name={`uqac_member_${player.id}`} value="oui" className="mr-2" required onChange={(e) => handleMembershipChange(e, index)} /> Oui
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name={`uqac_member_${player.id}`} value="non" className="mr-2" onChange={(e) => handleMembershipChange(e, index)} /> Non
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email étudiante / employé <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name={`email_${player.id}`}
                    placeholder="Entrer l'adresse email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            ))}

            {mode === "jouer_amis" && players.length < 4 && (
              <button type="button" onClick={addPlayer} className="mt-4 px-4 py-2 bg-green-700 text-white rounded">Ajouter un joueur</button>
            )}
          </form>
        </div>

        <div className="w-80 space-y-4 mt-24">
          <div className="rounded-lg shadow p-4 bg-white">
            <img src="/tennis_image.jpg" alt="Tennis" className="h-20 w-full object-cover rounded-lg mb-4" />
            <div>
              <h3 className="font-semibold">Tennis</h3>
              <p className="text-sm text-gray-500">UQAC, Chicoutimi</p>
              <p className="text-sm text-gray-500 mt-2">1 terrain</p>
              <p className="text-sm text-gray-500">Dimanche 16 juillet, 18h à 19h</p>
              <p className="text-sm text-gray-500 mt-2">Prix: {price}</p>
            </div>
            <button type="button" id="payButton" className="w-full bg-green-700 text-white py-2 rounded mt-4">Payer</button>
          </div>
        </div>
      </main>

      <div id="paymentPopup" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
          <button className="absolute top-2 right-2 text-gray-500 close-button">
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Paiement</h2>
          <p className="text-lg mb-4">{price}</p>
          <div className="flex justify-center space-x-4">
            <button id="cashButton" className="bg-green-700 text-white px-4 py-2 rounded">Cash</button>
            <button id="onlineButton" className="bg-green-700 text-white px-4 py-2 rounded">En ligne</button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('payButton').addEventListener('click', function () {
            const form = document.getElementById('reservationForm');
            if (form.checkValidity()) {
              document.getElementById('paymentPopup').classList.remove('hidden');
            } else {
              form.reportValidity();
            }
          });

          document.querySelectorAll('.close-button').forEach(button => {
            button.addEventListener('click', function () {
              document.getElementById('paymentPopup').classList.add('hidden');
            });
          });

          document.getElementById('cashButton').addEventListener('click', function () {
            window.location.href = '/reservation/form/confirmation';
          });

          document.getElementById('onlineButton').addEventListener('click', function () {
            window.location.href = '/reservation/form/confirmation';
          });
        `
      }} />
    </div>
  );
} 