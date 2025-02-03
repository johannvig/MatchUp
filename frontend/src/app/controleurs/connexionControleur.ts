import {deleteItem, getItem, hasItem, setItem} from "@/app/utils/cookiesUtils";

const cleCookieToken : string = 'token';

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
    const res = await fetch(`${process.env}/connexion`, {
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


