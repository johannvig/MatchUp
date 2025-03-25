"use client";

import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import Header from '../../Composants/Header/page'; 

export default function ReservationForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as "jouer_amis" | "rechercher_adversaire" | "inscription_tournoi";
  const [price, setPrice] = useState("Gratuit");
  const [players, setPlayers] = useState([{ id: 1, isMember: undefined }]);
  const [nextId, setNextId] = useState(2);
  const [showPopup, setShowPopup] = useState(false);
  const [totalPrice, setTotalPrice] = useState("Gratuit");



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
      setPlayers([...players, { id: nextId, isMember: undefined }]);
      setNextId(nextId + 1);
    }
  };
  

  const removePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
  
    // Réajuster le prix si besoin
    if (!newPlayers.every(player => player.isMember)) {
      setPrice("7$");
    } else {
      setPrice("Gratuit");
    }
  };

  const calculateTotalPrice = () => {
    const nonUqacPlayers = players.filter(p => p.isMember === false).length;
    const total = nonUqacPlayers * 7;
  
    if (total === 0) return "Gratuit";
    return `${total}$`;
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
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Joueur {player.id}</h3>
                {players.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlayer(index)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Supprimer
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Est-ce que le joueur {player.id} est étudiant(e) / employé à l'UQAC ? <span className="text-red-500">*</span>
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

              {player.isMember !== false && (
                <>
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

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro étudiant(e) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name={`etudiant_numero_${player.id}`}
                      placeholder="Entrer le numéro étudiant"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </>
              )}

              {player.isMember === false && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={`prenom_${player.id}`}
                      placeholder="Entrer le prénom"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={`nom_${player.id}`}
                      placeholder="Entrer le nom"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email personnelle <span className="text-red-500">*</span>
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
              )}
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
            <button
                type="button"
                className="w-full bg-green-700 text-white py-2 rounded mt-4"
                onClick={() => {
                  const form = document.getElementById("reservationForm") as HTMLFormElement;
                  if (form && form.checkValidity()) {
                    setTotalPrice(calculateTotalPrice());
                    setShowPopup(true);
                  } else {
                    form.reportValidity();
                  }
                }}
              >
                Payer
              </button>

          </div>
        </div>
      </main>


      
      {showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center relative min-w-[300px]">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            onClick={() => setShowPopup(false)}
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Paiement de la partie</h2>
          <p className="text-lg mb-4">{totalPrice}</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => window.location.href = "/reservation/form/confirmation"}
            >
              Cash
            </button>
            <button
              className="bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => window.location.href = "/reservation/form/confirmation"}
            >
              En ligne
            </button>
          </div>
        </div>
      </div>
    )}



    </div>
  );
} 