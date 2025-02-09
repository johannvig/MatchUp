"use client"; // Ajoute ceci en premier !

import Panel from '../../Composants/PanelAdmin/page'; 
import { getMonthDates } from '../../../../src/app/utils/date';
import { useState } from 'react';

export default function Admin() {
    // Obtenir le mois actuel
    const [mois, setMois] = useState(new Date().getMonth() + 1);
    const [infoMois, setInfoMois] = useState(getMonthDates(2024,mois))

    return (
      <div className='bg-green-100 flex text-black'>
        <Panel/>
        <div id="calendrier">
          Mois actuel : {
            infoMois.map((date,index)=>(
              <div>
                <li key={index}>{date.formatted}</li>
              </div>
            ))
          }
        </div>
      </div>
    );
}
