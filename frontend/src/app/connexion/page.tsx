"use client"

import FormulaireConnexion from "@/app/components/connexion/formulaireConnexion";
import FormulaireInscription from "@/app/components/connexion/formulaireInscription";
import {useState} from "react";
import {connexion, enregistrer} from "@/app/controleurs/connexionControleur";
import ReinitialiserMotDePasse from "@/app/components/connexion/reinitialiserMotDePasse";
import Popup, {PopupButton} from "@/app/components/UI/popup";

export default function Connexion() {

    const [afficherFormulaireInscription, setAfficherFormulaireInscription] = useState(false);
    const [reinitialiserMotDePasse, setReinitialiserMotDePasse] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitre, setPopupTitre] = useState("");
    const [popupTexte, setPopupTexte] = useState("");
    const [popupButtons, setPopupButtons] = useState<PopupButton[]>([]);

    async function connecter(email: string, motDePasse: string) {
        await connexion(email, motDePasse);
    }

    async function inscrire(prenom: string, nom: string, sexe: string, nationalite: string, email: string, dateNaiss: Date, motDePasse: string) {
        await enregistrer(prenom, nom, sexe, email, nationalite, dateNaiss.toString(), motDePasse);
    }

    function showAide() {
        setPopupTitre("Aide");
        setPopupTexte("Si vous éprouvez des difficultés à vous connecter, veuillez contacter le support technique. ");
        setPopupButtons([
            {
                text: "Page de contact",
                onClick: () => window.open('https://www.uqac.ca/soutientechnique/', '_blank', 'noopener noreferrer'),
                icon: "fleche-dans-carre"
            },
        ]);
        setShowPopup(true);
    }

    return (
        <div className={"flex w-full justify-end h-[100vh]"}>
            <img src={"/img/piste-athletisme.jpg"} alt={"piste athletisme"}
                 className={"object-cover w-2/3"}/>
            <div className={"p-3 bg-arriere-plan overflow-auto"}>
                <img src={"/img/logo-pavillon-sportif.png"} alt={"logo pavillon sportif"} className={"w-full p-4"}/>
                <h2>{afficherFormulaireInscription ? "Inscription" : "Connexion"}</h2>
                <p>Portail de connexion du pavillon sportif.</p>

                <p className={"pb-6"}>{afficherFormulaireInscription ? "Vous avez déjà un compte ?" : "Vous n'avez pas de compte ?"} <a
                    onClick={() => setAfficherFormulaireInscription(!afficherFormulaireInscription)}>{afficherFormulaireInscription ? "Se connecter" : "Enregistrez-vous"}</a>
                </p>

                {
                    afficherFormulaireInscription ?
                        <FormulaireInscription inscription={inscrire}/> :
                        <FormulaireConnexion connecter={connecter}/>
                }

                <div className={"flex flex-col mt-10"}>
                    <a onClick={() => setReinitialiserMotDePasse(true)}>Mot de passe oublié</a>
                    <a onClick={showAide}>Aide</a>
                </div>
            </div>

            <ReinitialiserMotDePasse show={reinitialiserMotDePasse} onClose={() => setReinitialiserMotDePasse(false)}/>
            <Popup
                show={showPopup}
                onClose={() => setShowPopup(false)}
                titre={popupTitre}
                texte={popupTexte}
                buttons={popupButtons}
            />
        </div>
    )
}