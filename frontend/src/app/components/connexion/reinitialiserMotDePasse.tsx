import {AnimatePresence, motion} from "framer-motion";

export default function ReinitialiserMotDePasse({show, onClose}: {show: boolean, onClose: () => void}) {
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
                        <button className={"h-10 absolute top-1 right-1 p-2 bg-invalid hover:bg-premier-plan"}
                                onClick={onClose}>
                            <img src={"/ico/close.svg"} alt={"fermer"} className={"size-full invert"}/>
                        </button>
                        <h2>Réinitialiser le mot de passe</h2>
                        <p>Merci de renseigner votre email ci-dessous :</p>
                        <input type={"email"} placeholder={"Email"}/>
                        <button>Valider</button>
                    </motion.div>
                </div>
            }

        </AnimatePresence>

    )
}