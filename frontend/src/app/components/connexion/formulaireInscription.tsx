"use client";

import {useState} from "react";

const sexe = ["Homme", "Femme", "Autre"];

const nationalites = ["Canada", "France", "Autre"];

export default function FormulaireInscription({inscription}: {
    inscription: (prenom: string, nom: string, sexe: string, nationalite: string, email: string, dateNaiss: Date, motDePasse: string) => Promise<void>
}) {

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [confMotDePasse, setConfMotDePasse] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [selectedSexe, setSelectedSexe] = useState(""); // Utiliser pour le select
    const [precisionSexe, setPrecisionSexe] = useState("");
    const [selectedNationalite, setSelectedNationalite] = useState(""); // Utiliser pour le select
    const [precisionNationalite, setPrecisionNationalite] = useState("");
    const [dateNaissance, setDateNaissance] = useState(new Date()); // Initialiser avec une date

    const [loading, setLoading] = useState(false);

    /**
     * Fonction appelée lors de la soumission du formulaire
     */
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!verifierDonnees()) {
            setLoading(true);
            inscription(prenom, nom, selectedSexe, selectedNationalite, email, dateNaissance, motDePasse).then(() => {
                setLoading(false);
            });
        }
    }

    /**
     * Fonction permettant de vérifier les données du formulaire
     * @returns null si les données sont correctes, un message d'erreur sinon
     */
    function verifierDonnees() {

        //cas ou un des champs est vide
        if (prenom === "" || nom === "" || email === "" || !sexe.includes(selectedSexe) || !nationalites.includes(selectedNationalite) || motDePasse === "" || confMotDePasse === "") {
            return "Merci de remplir tous les champs du formulaire.";
        }

        //cas ou le sexe est autre et la précision n'est pas renseignée
        if (selectedSexe === "Autre" && precisionSexe === "") {
            return "Merci de préciser le sexe.";
        }

        //cas ou la nationalité est autre et la précision n'est pas renseignée
        if (selectedNationalite === "Autre" && precisionNationalite === "") {
            return "Merci de préciser la nationalité.";
        }

        //cas ou l'email n'est pas correct
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            return "L'email est invalide.";
        }

        //cas ou le mot de passe n'est pas correct
        if (motDePasse.length < 6 || !motDePasse.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)) {
            return "Le mot de passe doit faire au moins 6 caractères, contenir au moins une lettre majuscule, au moins une lettre minuscule et au moins un chiffre.";
        }

        //cas ou les mots de passe ne correspondent pas
        if (motDePasse !== confMotDePasse) {
            return "Les mots de passe ne correspondent pas.";
        }

        return null;
    }

    return (
        <form className={"flex flex-col gap-3 w-full items-center"} onSubmit={onSubmit}>
            <input className={"w-full"} type={"text"} placeholder={"Prénom"} value={prenom}
                   onChange={(e) => setPrenom(e.target.value)} required/>
            <input className={"w-full"} type={"text"} placeholder={"Nom"} value={nom}
                   onChange={(e) => setNom(e.target.value)} required/>

            <select className={"w-full"} value={selectedSexe} onChange={(e) => setSelectedSexe(e.target.value)}
                    required>
                <option value="">Sexe</option>
                {/* Option par défaut */}
                {sexe.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            {
                selectedSexe === "Autre" &&
                <input className={"w-full"} type={"text"} placeholder={"Précision du sexe"} value={precisionSexe}
                       onChange={(e) => setPrecisionSexe(e.target.value)} required/>
            }

            <select className={"w-full"} value={selectedNationalite}
                    onChange={(e) => setSelectedNationalite(e.target.value)} required>
                <option value="">Nationalité</option>
                {/* Option par défaut */}
                {nationalites.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            {
                selectedNationalite === "Autre" &&
                <input className={"w-full"} type={"text"} placeholder={"Précision de la nationalité"}
                       value={precisionNationalite} onChange={(e) => setPrecisionNationalite(e.target.value)} required/>
            }

            <input className={"w-full"} type={"email"} placeholder={"Adresse email"} value={email}
                   onChange={(e) => setEmail(e.target.value)} required/>

            <input className={"w-full"} type={"date"} value={dateNaissance.toISOString().split('T')[0]}
                   onChange={(e) => setDateNaissance(new Date(e.target.value))} required/> {/* Format AAAA-MM-JJ */}

            <input className={"w-full"} type={"password"} placeholder={"Mot de passe"} value={motDePasse}
                   onChange={(e) => setMotDePasse(e.target.value)} required minLength={6}/>
            <input className={"w-full"} type={"password"} placeholder={"Confirmer le mot de passe"}
                   value={confMotDePasse} onChange={(e) => setConfMotDePasse(e.target.value)} required/>

            {
                verifierDonnees() &&
                <p className={"text-invalid"}>{verifierDonnees()}</p>
            }
            <button disabled={verifierDonnees() !== null} className={"w-full h-10"} type={"submit"}>
                {
                    loading ?
                        <img src={"/ico/loader.gif"} alt={"chargement"} className={"invert h-full"}/> :
                        "S'inscrire"
                }
            </button>
        </form>
    );
}