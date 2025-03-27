"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../Composants/SideBar/page";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function HistoriquePage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [stats, setStats] = useState<any>(null);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/utilisateur/${userId}/statistiques`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erreur chargement stats", err));
  }, [userId]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gradient-to-tr from-blue-100 to-yellow-50">
        {/* Statistiques */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <StatCard title="Votre classement" value={stats?.classement || "—"} />
          <StatCard title="Tendance" value="+40" color="green" />
          <StatCard title="Nombre de points" value={stats?.points || 0} />
          <StatCard title="Nombre de victoires" value={stats?.victoires || 0} />
          <StatCard title="Catégorie" value={stats?.categorie || "—"} />
        </div>

        {/* Liste des tournois */}
        <div className="space-y-4">
          {(stats?.games || []).map((tournoi: any, index: number) => (
            <div key={index} className="bg-white rounded-xl shadow">
              <button
                className="w-full px-4 py-4 flex justify-between items-center text-left"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-sm font-medium">
                  {tournoi.nom || "Tournoi"} - Organisateur
                </span>
                {activeAccordion === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {activeAccordion === index && (
                <div className="px-4 pb-4 space-y-2">
                  {(tournoi.matches || []).map((match: any, idx: number) => {
                    const setsEquipe1 = match.setsEquipe1 || [];
                    const setsEquipe2 = match.setsEquipe2 || [];

                    const score1 = setsEquipe1.filter((s: number, i: number) => s > setsEquipe2[i]).length;
                    const score2 = setsEquipe2.filter((s: number, i: number) => s > setsEquipe1[i]).length;
                    const victoire = score1 > score2;

                    return (
                      <div key={idx} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded font-bold text-white mr-4 ${
                            victoire ? "bg-[#7A874C]" : "bg-gray-400"
                          }`}
                        >
                          {victoire ? "V" : "D"}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Toi</p>
                          <p className="text-sm text-gray-600">Adversaire</p>
                        </div>
                        <div className="text-xs text-center mx-4">
                          <p className="font-bold">{setsEquipe1.join(" ")}</p>
                          <p className="text-gray-500">{setsEquipe2.join(" ")}</p>
                        </div>
                        <div
                          className={`text-sm font-semibold ${
                            victoire ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {victoire ? "+100" : "-50"} points
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color = "black" }: { title: string; value: any; color?: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
    </div>
  );
}
