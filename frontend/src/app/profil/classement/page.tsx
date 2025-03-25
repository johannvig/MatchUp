"use client";

import React, { useState } from "react";
import Sidebar from "../../Composants/SideBar/page";

export default function ClassementPage() {
  const [search, setSearch] = useState("");

  const joueurs = [
    { rang: 8, pseudo: "tomgouin", xp: 620 },
    { rang: 9, pseudo: "Erwanf", xp: 620 },
    { rang: 10, pseudo: "Ewen (Le Président)", xp: 600 },
    { rang: 13, pseudo: "Poisiche", xp: 460 },
    { rang: 14, pseudo: "timtig", xp: 440 },
    { rang: 15, pseudo: "Porte En Acajou", xp: 420 },
    { rang: 17, pseudo: "JD", xp: 400 },
    { rang: 19, pseudo: "gquemere", xp: 360 },
  ];

  const xpMax = Math.max(...joueurs.map(j => j.xp));

  const joueursFiltres = joueurs.filter(j =>
    j.pseudo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gradient-to-tr from-blue-100 to-yellow-50">
        {/* Statistiques */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Votre classement</p>
            <p className="text-3xl font-bold text-green-900">13</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Tendance</p>
            <p className="text-xl font-bold text-green-700">40 ▲</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Nombre de points</p>
            <p className="text-3xl font-bold">857 <span className="text-green-600">?</span></p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Nombre de victoires</p>
            <p className="text-2xl font-bold">13</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Catégorie</p>
            <p className="text-xl font-bold">Expert</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          <span className="text-sm font-medium">Sport</span>
          <button className="px-3 py-1 rounded bg-gray-100">Tennis</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-500">Tableau</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-500">Simple</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-500">Catégorie N2</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-500">Sexe Femme</button>
        </div>

        {/* Recherche */}
        <div className="mb-2">
          <input
            type="text"
            placeholder="Chercher un pseudo"
            className="px-3 py-1 border border-gray-300 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-2">N°</th>
                <th className="py-2">Pseudo</th>
                <th className="py-2 text-right">XP</th>
              </tr>
            </thead>
            <tbody>
              {joueursFiltres.map((j, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{j.rang}</td>
                  <td className="py-2 flex items-center gap-2">
                    <img src="/avatar-placeholder.png" alt="avatar" className="w-5 h-5 rounded-full" />
                    {j.pseudo}
                  </td>
                  <td className="py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span>{j.xp}</span>
                      <div className="w-40 h-2 bg-gray-200 rounded">
                        <div
                          className="h-full bg-green-400 rounded"
                          style={{ width: `${(j.xp / xpMax) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {joueursFiltres.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">
                    Aucun joueur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
