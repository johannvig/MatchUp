"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../Composants/Header/page'; 

const sports = ["Tennis", "Badminton", "Pickleball"];
const dates = ["Sam. 16", "Lun. 17", "Mar. 18", "Mer. 19", "Jeu. 20", "Ven. 21", "Sam. 22", "Dim. 23", "Lun. 24"];
const hours = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

export default function SportSelection() {
  const today = dates[0];
  const [selectedSport, setSelectedSport] = useState<string>("Tennis");
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "jouer_amis";

  const handleContinue = () => {
    router.push(`/reservation/form?mode=${mode}`);
  };

  const toggleHourSelection = (hour: string) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter(h => h !== hour));
    } else if (selectedHours.length < 2) {
      setSelectedHours([...selectedHours, hour].sort());
    }
  };

  const getFormattedHours = () => {
    if (selectedHours.length === 2) {
      const firstHour = parseInt(selectedHours[0]);
      const secondHour = parseInt(selectedHours[1]);
      if (secondHour === firstHour + 1) {
        return `${selectedHours[0]} à ${secondHour + 1}:00`;
      } else {
        return selectedHours.map(hour => `${hour} à ${parseInt(hour) + 1}:00`).join(' | ');
      }
    }
    return selectedHours.length === 1 ? `${selectedHours[0]} à ${parseInt(selectedHours[0]) + 1}:00` : 'Veuillez sélectionner une heure';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />
      <main className="flex space-x-6 mt-32">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Sélectionner un sport</h2>
          <p className="text-sm text-gray-500 mb-6">
            <a href="/" className="text-blue-500 hover:underline">Page d'accueil</a> &gt; Jouer entre amis
          </p>

          <form method="GET" className="space-y-6">
            <div className="flex space-x-4 mb-4">
              {sports.map((sport) => (
                <label
                  key={sport}
                  className={`px-4 py-2 rounded-full cursor-pointer border border-gray-300 ${selectedSport === sport ? 'bg-green-700 text-white' : ''}`}
                  onClick={() => setSelectedSport(sport)}
                >
                  {sport}
                </label>
              ))}
            </div>

            <div className="flex space-x-2 overflow-auto mb-4">
              {dates.map((date) => (
                <label
                  key={date}
                  className={`flex flex-col items-center px-4 py-2 rounded-lg cursor-pointer border border-gray-300 ${selectedDate === date ? 'bg-gray-300' : ''}`}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedHours([]);
                  }}
                >
                  {date}
                </label>
              ))}
            </div>

            <div className="space-y-2">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`w-full flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer border border-gray-300 ${selectedHours.includes(hour) ? 'bg-gray-300' : ''}`}
                  onClick={() => toggleHourSelection(hour)}
                >
                  {hour}
                  <span>&#x276F;</span>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="w-80 space-y-4 mt-16">
          <div className="rounded-lg shadow p-4 bg-white">
            <div className="flex space-x-4 items-center">
              <img src={`/${selectedSport.toLowerCase()}_image.jpg`} alt={selectedSport} className="h-16 w-16 rounded-lg" />
              <div>
                <h3 className="font-semibold">{selectedSport}</h3>
                <p className="text-sm text-gray-500">UQAC, Chicoutimi</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">1 terrain</p>
              <p className="text-sm text-gray-500">
                {selectedDate} {getFormattedHours()}
              </p>
            </div>
            <button type="button" onClick={handleContinue} className="mt-4 w-full bg-green-700 text-white py-2 rounded">
              Continuer
            </button>
          </div>

          <div className="rounded-lg shadow p-4 bg-white">
            <p className="text-sm text-gray-700">
              Attention : Vous ne pouvez pas être plus de 4 personnes par terrain
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
