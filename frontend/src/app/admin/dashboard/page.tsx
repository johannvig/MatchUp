"use client"; // Ajoute ceci en premier !

import "./page.css";
import Panel from "../../Composants/PanelAdmin/page";
import { getMonthDates } from "../../../../src/app/utils/date";
import { useState, useEffect } from "react";

// Définition de l'interface pour les dates du mois
interface MonthDate {
  date: Date;
  day: number; // 0 = Dimanche, 6 = Samedi
  formatted: string;
}

const listeMois = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function Clicker() {
  console.log("hello");
}

export default function Admin() {
  // Obtenir le mois et l'année actuels
  const [mois, setMois] = useState<number>(new Date().getMonth() + 1);
  const [annee, setAnnee] = useState<number>(2025);
  const [infoMois, setInfoMois] = useState<MonthDate[]>(getMonthDates(2025, mois));
  const [sport,setSport] = useState("Badminton")
  // Met à jour infoMois lorsque le mois ou l'année changent
  useEffect(() => {
    setInfoMois(getMonthDates(annee, mois));
  }, [mois, annee]);

  function updateMois(valeur: number) {
    let newMois = mois + valeur;
    let newAnnee = annee;

    if (newMois < 1) {
      newMois = 12;
      newAnnee -= 1;
    } else if (newMois > 12) {
      newMois = 1;
      newAnnee += 1;
    }

    setMois(newMois);
    setAnnee(newAnnee);
  }

  return (
    <div id="dashboard">
      <Panel />
      <div id="calendrier">
        <h1>{sport}</h1>
        <div id="containeurMois">
          <div>09 Feb 2025</div>
          <div id="containeurSelectMois">
            <button onClick={() => updateMois(-1)}>
              <img src="../PanelAdmin/retour.svg" alt="" />
            </button>
            <h2 className="text-black">{listeMois[mois - 1]} {annee}</h2>
            <button onClick={() => updateMois(1)}>
              <img src="../PanelAdmin/selection.svg" alt="" />
            </button>
          </div>
        </div>
        <table className="">
          <thead>
            <tr className="headerTableau">
              <th className="jourSemaine">Lundi</th>
              <th className="jourSemaine">Mardi</th>
              <th className="jourSemaine">Mercredi</th>
              <th className="jourSemaine">Jeudi</th>
              <th className="jourSemaine">Vendredi</th>
              <th className="jourSemaine">Samedi</th>
              <th className="jourSemaine">Dimanche</th>
            </tr>
          </thead>
          <tbody>
            {infoMois && (() => {
              const rows: (number | null)[][] = [];
              let currentWeek: (number | null)[] = new Array(7).fill(null);

              // Ajoute les cases vides en début de mois si nécessaire
              let firstDayIndex = infoMois[0].day === 0 ? 6 : infoMois[0].day - 1;
              for (let i = 0; i < firstDayIndex; i++) {
                currentWeek[i] = null;
              }

              // Remplissage des jours
              infoMois.forEach((dateInfo, index) => {
                const dayIndex = dateInfo.day === 0 ? 6 : dateInfo.day - 1;
                currentWeek[dayIndex] = dateInfo.date.getDate();

                // Ajoute une ligne quand on atteint la fin de la semaine ou la fin du mois
                if (dayIndex === 6 || index === infoMois.length - 1) {
                  rows.push([...currentWeek]);
                  currentWeek = new Array(7).fill(null);
                }
              });

              return rows.map((week: (number | null)[], i: number) => (
                <tr key={i}>
                  {week.map((day: number | null, j: number) => (
                    <td key={j}>
                      <button className="jour text-center" onClick={() => Clicker()}>{day ? day : ""}</button>
                    </td>
                  ))}
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
