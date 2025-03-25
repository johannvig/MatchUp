import React from "react";
import Sidebar from "../../Composants/SideBar/page";

export default function ProfilPage() {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10 bg-gradient-to-tr from-blue-100 to-yellow-50">
          <div className="bg-white p-10 rounded-3xl shadow max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div className="text-lg font-medium text-gray-700">
                <p className="text-sm">Alexa</p>
                <h2 className="text-2xl font-bold">Rawles</h2>
              </div>
              <button className="bg-[#7A874C] text-white px-6 py-2 rounded-lg shadow">Modifier</button>
            </div>
  
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Prénom</label>
                <input type="text" className="w-full bg-gray-100 p-3 rounded-lg" placeholder="Prénom" disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Nom de famille</label>
                <input type="text" className="w-full bg-gray-100 p-3 rounded-lg" placeholder="Nom de famille" disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Adresse email</label>
                <input type="email" className="w-full bg-gray-100 p-3 rounded-lg" placeholder="Adresse email" disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Sexe</label>
                <select className="w-full bg-gray-100 p-3 rounded-lg" disabled>
                  <option>Femme</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Langue</label>
                <select className="w-full bg-gray-100 p-3 rounded-lg" disabled>
                  <option>Français</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Nationalité</label>
                <select className="w-full bg-gray-100 p-3 rounded-lg" disabled>
                  <option>Canadienne</option>
                </select>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  