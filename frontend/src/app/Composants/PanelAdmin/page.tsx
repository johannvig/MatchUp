"use client"; // Indique que ce fichier doit être exécuté côté client

import { usePathname } from "next/navigation";
import "./style.css";

export default function Header() {
    const pathname = usePathname(); // Récupère l'URL actuelle

    return (
        <div id="panel">
            <button id='btnRetour'>
                <img src="../PanelAdmin/retour.svg" alt="" />
            </button>
            <img id="logo" src="../PanelAdmin/logoUqac.png" alt="" />
            <div id="containeurRedirection">
                <a className={pathname === "/admin/dashboard" ? "redirectionEnCours" : "redirection"} href="/admin/dashboard">
                    <img src="../PanelAdmin/dashboard.svg" alt="" />
                    <p>Dashboard</p>
                    <img src="../PanelAdmin/selection.svg" alt="" />
                </a>
                <a className={pathname === "/admin/utilisateur" ? "redirectionEnCours" : "redirection"} href="/admin/utilisateur">
                    <img src="../PanelAdmin/compte.svg" alt="" />
                    <p>Utilisateur</p>
                    <img src="../PanelAdmin/selection.svg" alt="" />
                </a>
                <a className={pathname === "/admin/agenda" ? "redirectionEnCours" : "redirection"} href="/admin/agenda">
                    <img src="../PanelAdmin/agenda.svg" alt="" />
                    <p>Agenda</p>
                    <img src="../PanelAdmin/selection.svg" alt="" />
                </a>
                <a className={pathname === "/admin/comptabilite" ? "redirectionEnCours" : "redirection"} href="/admin/comptabilite">
                    <img src="../PanelAdmin/comptabilite.svg" alt="" />
                    <p>Comptabilité</p>
                    <img src="../PanelAdmin/selection.svg" alt="" />
                </a>
            </div>
            <div id="footer">
                <div id="containeurInfoAdmin">
                    <img id="photoDeProfil" src="../PanelAdmin/compte.svg" alt="" />
                    <div id="nomFonction">
                        <p className="nom">Jean-eude</p>
                        <p>Admin</p>
                    </div>
                </div>
                <div className="actionFooter">
                    <img src="../PanelAdmin/deconnexion.svg" alt="" />
                    <h2>Deconnexion</h2>
                </div>
                <div id="suppression">
                    <img src="../PanelAdmin/croix.svg" alt="" />
                    <h2>Supprimer le compte</h2>
                </div>
            </div>
        </div>
    );
}
