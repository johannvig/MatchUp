import {AnimatePresence, motion} from "framer-motion";

export class PopupButton {
    text: string;
    onClick: () => void;

    constructor(text: string, onClick: () => void) {
        this.text = text;
        this.onClick = onClick;
    }
}

interface PopupProps {
    show: boolean;
    onClose: () => void;
    titre: string;
    texte: string;
    buttons?: PopupButton[] | undefined; // Le paramètre est optionnel
}

export default function Popup({show, onClose, titre, texte, buttons}: PopupProps) {
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
                        className={"fixed z-10 p-6 bg-arriere-plan rounded-xl flex flex-col gap-4"}
                    >
                        <button className={"h-8 absolute top-2 right-2 p-1 bg-invalid hover:bg-premier-plan rounded-3xl"}
                                onClick={onClose}>
                            <img src={"/ico/close.svg"} alt={"fermer"} className={"size-full invert"}/>
                        </button>
                        <h2>{titre}</h2>
                        <p>{texte}</p>
                        {
                            buttons &&
                            <div className={"flex gap-4"}>
                                {
                                    buttons.map((button, index) => {
                                        return (
                                            <button key={index} onClick={button.onClick}>{button.text}</button>
                                        )
                                    })
                                }
                            </div>
                        }
                    </motion.div>
                </div>
            }

        </AnimatePresence>

    )
}