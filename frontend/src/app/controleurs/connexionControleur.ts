import {deleteItem, getItem, hasItem, setItem} from "@/app/utils/cookiesUtils";

const cleCookieToken : string = 'token';

const API_URL = "example.com";

/**
 * Sauve le token de connexion dans les cookies de manière sécurisé.
 * Si le token existe déjà, celui-ci est écrasé.
 * @param token le token à sauvegarder
 */
export async function sauverToken(token: string) {
    await setItem(cleCookieToken, token);
}

/**
 * Récupère le token de connexion stocké dans les cookies
 * @returns le token de connexion, ou null vide si aucun token n'est stocké
 */
export async function recupererToken() : Promise<string | null> {
    return await hasItem(cleCookieToken) ? await getItem(cleCookieToken) : null;
}

/**
 * Supprime l'item token des cookies
 */
export async function supprimerToken() {
    const tokenExist : boolean = await hasItem(cleCookieToken);
    if(tokenExist) {
        await deleteItem(cleCookieToken);
    }
}

/**
 * Fonction permettant de connecter un utilisateur a partir de son email et de son mot de passe
 * Le token de connexion est automatiquement enregistré dans les cookies.
 * @param email l'email de l'utilisateur
 * @param motDePasse le mot de passe de l'utilisateur
 * @returns true si la connexion a réussi, false sinon
 */
export async function connexion(email: string, motDePasse: string) : Promise<boolean> {

    //Envoi de la requête de connexion à l'API
    const res = await fetch(`${API_URL}/connexion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, motDePasse}),
    });

    //Traitement de la réponse
    if (res.status === 200) {
        const data = await res.json();
        const token : string = data.token;
        await sauverToken(token)
        //TODO: Récuperer aussi les données du compte de l'utilisateur pour les récuperer
        return true;
    } else {
        //TODO: Retourner un code d'erreur, si possible avec une enumeration (plus simple)
        return false;
    }
}

/**
 * Fonction permettant d'enregistrer un nouvel utilisateur dans la base de données
 * le token de l'utilisateur est automatiquement enregistré dans les cookies.
 * @param prenom
 * @param nom
 * @param sexe
 * @param email
 * @param nationalite
 * @param dateNaissance
 * @param motDePasse
 * @returns true si l'enregistrement a réussi, false sinon
 */
export async function enregistrer(
    prenom : string,
    nom : string,
    sexe : string,
    email: string,
    nationalite: string,
    dateNaissance: string,
    motDePasse: string
) {

    //envoi de la requete
    const res = await fetch(`${API_URL}/enregistrer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({prenom, nom, sexe, email, nationalite, dateNaissance, motDePasse}),
    });

    //Traitement de la réponse
    if (res.status === 200) {
        const data = await res.json();
        const token : string = data.token;
        await sauverToken(token)
        //TODO: Récuperer aussi les données du compte de l'utilisateur pour les récuperer
        return true;
    } else {
        //TODO: Retourner un code d'erreur, si possible avec une enumeration (plus simple)
        return false;
    }
}

/**
 * Fonction permettant de vérifier si le token de connexion enregistré dans les cookies est valide
 * Pas besoin de passer le token en paramètre, il est automatiquement récupéré dans les cookies
 * @return true si le token est valide, false sinon
 */
export async function verifierToken() {

    //récuperation du token
    const token = await recupererToken();
    //si le token est null, on retourne false directement
    if(token == null) {
        return false;
    }

    //Envoi de la requête de connexion à l'API
    const res = await fetch(`${API_URL}/verifierToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
    });

    //Traitement de la réponse
    if (res.status === 200) {
        const data = await res.json();
        const token : string = data.token;
        //On sauve le nouveau token retourné par l'API
        await sauverToken(token)
        //TODO: Récuperer aussi les données du compte de l'utilisateur pour les récuperer
        return true;
    } else {
        //TODO: Retourner un code d'erreur, si possible avec une enumeration (plus simple)
        return false;
    }
}

/**
 * Envoi un email de récupération de mot de passe à l'adresse email spécifiée
 * Si l'email existe dans la base de données, un email de récupération est envoyé
 * @param email
 */
export async function envoyerEmailRecuperationMotDePasse(email: string) {
    //Envoi de la requête de connexion à l'API
    const res = await fetch(`${API_URL}/emailRecuperation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    });

    //Traitement de la réponse
    if (res.status === 200) {
        return true;
    } else {
        return false;
    }
}