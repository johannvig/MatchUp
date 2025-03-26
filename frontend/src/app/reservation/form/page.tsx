"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../Composants/Header/page";

export default function ReservationForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as
    | "jouer_amis"
    | "rechercher_adversaire"
    | "inscription_tournoi";

  const [price, setPrice] = useState("Gratuit");
  const [players, setPlayers] = useState([{ id: 1, isMember: undefined }]);
  const [nextId, setNextId] = useState(2);
  const [showPopup, setShowPopup] = useState(false);
  const [totalPrice, setTotalPrice] = useState("Gratuit");
  const [sport, setSport] = useState<string | null>(null);
  const [reservationId, setReservationId] = useState<string | null>(null);

  useEffect(() => {
    const storedSport = sessionStorage.getItem("reservation_sport");
    const storedId = sessionStorage.getItem("reservation_id");
    setSport(storedSport);
    setReservationId(storedId);
  }, []);

  const handleMembershipChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPlayers = [...players];
    newPlayers[index].isMember = e.target.value === "oui";
    setPlayers(newPlayers);
    setPrice(newPlayers.every(p => p.isMember) ? "Gratuit" : "7$");
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
    setPrice(newPlayers.every(p => p.isMember) ? "Gratuit" : "7$");
  };

  const calculateTotalPrice = () => {
    const nonUqac = players.filter(p => p.isMember === false).length;
    return nonUqac === 0 ? "Gratuit" : `${nonUqac * 7}$`;
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

          <form id="reservationForm" className="space-y-4">
            {players.map((player, index) => (
              <div key={player.id}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Joueur {player.id}</h3>
                  {players.length > 1 && (
                    <button
                      type="button"
                      className="text-red-600 text-sm hover:underline"
                      onClick={() => removePlayer(index)}
                    >
                      Supprimer
                    </button>
                  )}
                </div>

                <label className="block mt-2">Étudiant(e)/employé UQAC ?</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name={`uqac_member_${player.id}`}
                      value="oui"
                      onChange={e => handleMembershipChange(e, index)}
                      required
                    />
                    Oui
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`uqac_member_${player.id}`}
                      value="non"
                      onChange={e => handleMembershipChange(e, index)}
                    />
                    Non
                  </label>
                </div>

                {player.isMember !== false && (
                  <>
                    <label className="block mt-4">Email UQAC</label>
                    <input
                      type="email"
                      className="w-full border p-2 rounded"
                      required
                    />
                    <label className="block mt-2">Numéro étudiant</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </>
                )}

                {player.isMember === false && (
                  <>
                    <label className="block mt-4">Prénom</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      required
                    />
                    <label className="block mt-2">Nom</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      required
                    />
                    <label className="block mt-2">Email personnel</label>
                    <input
                      type="email"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </>
                )}
              </div>
            ))}

            {mode === "creer_tournoi" && (
              <>
                <h3 className="text-xl font-bold mt-8">Le tournoi</h3>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Combien de joueurs souhaitez-vous avoir au minimum ? <span className="text-red-500">*</span>
                  </label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Et au maximum ? <span className="text-red-500">*</span>
                  </label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Est-ce qu’il y a un niveau requis ? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded">Aucun</button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Quel sera votre type de tournoi ? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded">Solo</button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Quel est le sexe des adversaires ? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded">Mixte</button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description du tournoi
                    </label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Entrez la description du tournoi ..." />
                  </div>
                </div>
              </>
            )}

            {mode === "rechercher_adversaire" && (
              <>
                <h3 className="text-xl font-bold mt-8">L’adversaire recherché</h3>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Combien de joueurs souhaitez-vous avoir au minimum ? <span className="text-red-500">*</span>
                  </label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Et au maximum ? <span className="text-red-500">*</span>
                  </label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Est-ce qu’il y a un niveau requis ? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded">Aucun</button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Quel sera votre type de match ? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded">Solo</button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Quel est le sexe des adversaires ? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-2">
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded">Mixte</button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Entrez la description ..." />
                  </div>
                </div>
              </>
            )}

          </form>

          {mode === "jouer_amis" && players.length < 4 && (
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
              onClick={addPlayer}
            >
              Ajouter un joueur
            </button>
          )}


        </div>

        <div className="w-80 mt-24 space-y-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-semibold">Résumé</h3>
            <p>Sport: {sport}</p>
            <p>Créneau: 18h à 19h (exemple)</p>
            <p>Prix: {price}</p>
            <button
              className="w-full bg-green-700 text-white py-2 mt-4 rounded"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Paiement</h2>
            <p className="text-lg mb-4">{totalPrice}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded"
                onClick={() => (window.location.href = "/reservation/form/confirmation")}
              >
                Cash
              </button>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded"
                onClick={() => (window.location.href = "/reservation/form/confirmation")}
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
