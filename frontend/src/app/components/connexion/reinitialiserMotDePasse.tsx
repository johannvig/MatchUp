import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

export default function ReinitialiserMotDePasse({show, onClose, reinitialiserMotDePasseFonction}: {show: boolean, onClose: () => void, reinitialiserMotDePasseFonction: (email: string) => Promise<boolean>}) {

    const [email, setEmail] = useState<string>("");

    const [requeteEnvoyee, setRequeteEnvoyee] = useState<boolean>(false);
    const [emailBienEnvoye, setEmailBienEnvoye] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        setLoading(true);
        e.preventDefault();
        reinitialiserMotDePasseFonction(email).then(
            (result : boolean) => {
                setRequeteEnvoyee(true);
                if (result) {
                    setEmailBienEnvoye(true);
                } else {
                    setEmailBienEnvoye(false);
                }
            }
        ).finally(() => {
            setLoading(false);
        });
    }

    return (
        <AnimatePresence>
            {
                show &&
                <div className={"z-10 fixed h-[100vh] flex justify-center items-center w-full"}

                >
                    <motion.div
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={"w-full h-full bg-arriere-plan-popup backdrop-blur"}/>

                    <motion.div
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0, opacity: 0}}
                        className={"fixed z-10 p-6 pt-12 bg-arriere-plan rounded-xl flex flex-col gap-4"}
                    >
                        <button
                            className={"h-8 absolute top-2 right-2 p-1 bg-invalid hover:bg-premier-plan rounded-3xl"}
                            onClick={onClose}>
                            <img src={"/ico/close.svg"} alt={"fermer"} className={"size-full invert"}/>
                        </button>
                        <h2>Réinitialiser le mot de passe</h2>
                        <p>Merci de renseigner votre email ci-dessous :</p>
                        <form onSubmit={onSubmit} className={"flex flex-col justify-center items-center gap-3 w-full p-6"}>
                            <input className={"w-full"} type={"email"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <button type={"submit"} className={"h-10"}>
                                {
                                    loading ?
                                        <img src={"/ico/loader.gif"} alt={"loading"} className={"h-full"}/>
                                        : "Valider"
                                }
                            </button>
                        </form>

                        {
                            requeteEnvoyee &&
                            <motion.div
                                className={"flex gap-3 p-6 justify-center items-center bg-clair rounded"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <img src={`/ico/${emailBienEnvoye ? "check" : "x-circle"}.svg`} alt={"check"}
                                     className={"h-6"}/>
                                <p>
                                    {
                                        emailBienEnvoye ? "Un email vous a été envoyé pour réinitialiser votre mot de passe" :
                                            "Un problème est survenu lors de l'envoi de l'email"
                                    }
                                </p>

                            </motion.div>
                        }
                    </motion.div>
                </div>
            }

        </AnimatePresence>

    )
}