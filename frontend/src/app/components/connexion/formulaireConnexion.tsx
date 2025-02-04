"use client"

import {useState} from "react";

export default function FormulaireConnexion({connecter} : {connecter: (email: string, motDePasse: string) => Promise<void>}) {

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");

    const [loading, setLoading] = useState(false);

    /**
     * Fonction appelée lors de la soumission du formulaire
     * Elle annule le comportement par défaut du formulaire et appelle la fonction de connexion
     * @param e l'événement de soumission
     */
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!verifierDonnees()) {
            setLoading(true);
            connecter(email, motDePasse).then(() => {
                setLoading(false);
            });
        }
    }

    /**
     * Verifie que les données entrées par l'utilisateur sont valides
     * @returns null si les données sont valides, un message d'erreur sinon
     */
    function verifierDonnees() {

        if (email === "" || motDePasse === "") {
            return "Merci de remplir tous les champs du formulaire.";
        }
        //verification email
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            return "L'email est invalide";
        }

        return null;
    }

    return (
        <form className={"flex flex-col gap-3 w-full items-center"} onSubmit={onSubmit}>
            <input className={"w-full"} type={"email"} placeholder={"Adresse email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className={"w-full"} type={"password"} placeholder={"Mot de passe"} value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)}/>
            {
                verifierDonnees() &&
                <p className={"text-invalid"}>{verifierDonnees()}</p>
            }
            <button disabled={verifierDonnees() !== null} className={"w-full h-10"} type={"submit"}>
                {
                    loading ?
                        <img src={"/ico/loader.gif"} alt={"chargement"} className={"invert h-full"}/> :
                        "Se connecter"
                }
            </button>
        </form>
    )
}