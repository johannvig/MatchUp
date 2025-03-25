"use client";

import { useRouter, useParams } from "next/navigation";

export default function ChoixModeJeuParSport() {
  const router = useRouter();
  const params = useParams();
  const sport = params?.sport;

  const modes = [
    {
      id: "jouer_amis",
      title: "Jouer entre amis",
      icon: "🎮",
      description: "Réserve un terrain pour toi et tes potes !",
    },
    {
      id: "rechercher_adversaire",
      title: "Trouver un adversaire",
      icon: "🔍",
      description: "Laisse-nous te trouver un match équitable.",
    },
    {
      id: "inscription_tournoi",
      title: "Participer à un tournoi",
      icon: "🏆",
      description: "Inscris-toi pour la compétition !",
    },
    {
      id: "creer_tournoi",
      title: "Créer un tournoi",
      icon: "🛠️",
      description: "Organise ton propre tournoi entre joueurs.",
    },
  ];

  const handleClick = (mode: string) => {
    router.push(`/reservation/${sport}?mode=${mode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-20 px-6 text-center">
      <h1 className="text-4xl font-extrabold text-[#6F803F] mb-4">
        Choisis ton mode de jeu pour le <span className="capitalize">{sport}</span>
      </h1>
      <p className="text-gray-600 mb-10">
        Comment veux-tu t'amuser aujourd'hui ? Clique sur un mode ci-dessous :
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => handleClick(mode.id)}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition-all p-6 text-center border border-gray-100 hover:border-[#6F803F]"
          >
            <div className="text-5xl mb-3">{mode.icon}</div>
            <h3 className="text-lg font-bold text-[#6F803F]">{mode.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{mode.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <p className="text-sm text-gray-400 italic">
          Une fois le mode sélectionné, tu pourras choisir ton créneau horaire et les participants.
        </p>
      </div>
    </div>
  );
}
