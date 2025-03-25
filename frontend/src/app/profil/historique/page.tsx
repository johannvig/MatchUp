"use client";

import React, { useState } from "react";
import Sidebar from "../../Composants/SideBar/page";
import { ChevronDown, ChevronUp } from "lucide-react";

import Link from "next/link";

export default function HistoriquePage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gradient-to-tr from-blue-100 to-yellow-50">
        {/* Statistiques */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Votre classement</p>
            <p className="text-3xl font-bold">13</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Tendance</p>
            <p className="text-xl font-bold text-green-700">40 ▲</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">Nombre de points</p>
            <p className="text-3xl font-bold">
              857 <span className="text-green-600">?</span>
            </p>
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
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-sm font-medium">Sport</span>
          <button className="px-3 py-1 rounded bg-gray-100">Tennis</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-500">Tableau</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-500">Simple</button>
          <input
            type="date"
            className="px-3 py-1 rounded bg-gray-100 text-sm text-gray-700 border border-gray-200"
          />
        </div>

        {/* Liste des tournois */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow">
              <button
                className="w-full px-4 py-4 flex justify-between items-center text-left"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-sm font-medium">Tournoi récent - Organisateur</span>
                {activeAccordion === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {activeAccordion === index && (
                <div className="px-4 pb-4 space-y-2">
                  {[0, 1, 2, 3].map((matchIndex) => (
                    <div
                      key={matchIndex}
                      className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                    >
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded font-bold text-white mr-4 ${
                          matchIndex === 3 ? "bg-gray-400" : "bg-[#7A874C]"
                        }`}
                      >
                        {matchIndex === 3 ? "D" : "V"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">Johanne Vigouroux</p>
                        <p className="text-sm text-gray-600">Ewen Buhot</p>
                      </div>
                      <div className="text-xs text-center mx-4">
                        <p className="font-bold">11 8 11</p>
                        <p className="text-gray-500">8 11 6</p>
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          matchIndex === 3 ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {matchIndex === 3 ? "-50" : "+100"} points
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}