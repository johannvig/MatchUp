import {AnimatePresence, motion} from "framer-motion";

/**
 * Classe représentant un bouton dans une popup.
 * @param text Le texte du bouton.
 * @param onClick La fonction à exécuter lorsqu'on clique sur le bouton.
 * @param icon L'icône du bouton. Ne mettre que le nom de l'icone. (Optionnel)
 * @param color La couleur du bouton. La couleur doit absolument etre définit dans tailwind.config.ts. (Optionnel)
 */
export class PopupButton {
    text: string;
    onClick: () => void;
    icon?: string;
    color?: string;

    constructor(text: string, onClick: () => void, icon?: string, color?: string) {
        this.text = text;
        this.onClick = onClick;
        this.icon = icon;
        this.color = color;
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
                        className={"fixed z-10 p-6 bg-arriere-plan rounded-xl flex flex-col gap-4 justify-center items-center w-2/3"}
                    >
                        <button className={"h-8 absolute top-2 right-2 p-1 bg-invalid hover:bg-premier-plan rounded-3xl"}
                                onClick={onClose}>
                            <img src={"/ico/close.svg"} alt={"fermer"} className={"size-full invert"}/>
                        </button>
                        <h2>{titre}</h2>
                        <p className={"w-full text-center"}>{texte}</p>
                        {
                            buttons &&
                            <div className={"flex gap-4"}>
                                {
                                    buttons.map((button, index) => {
                                        return (
                                            <button
                                                key={index}
                                                onClick={button.onClick}
                                                className={`${button.color && `bg-${button.color} hover:bg-premier-plan`} h-10`}
                                            >
                                                {button.text}
                                                {
                                                    button.icon &&
                                                    <img src={"/ico/" + button.icon + ".svg"} alt={"icon"} className={"h-full invert"}/>
                                                }
                                            </button>
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