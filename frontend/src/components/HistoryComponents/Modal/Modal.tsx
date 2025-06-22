import type { HistoryResult } from "../../../types/types";
import { ClearComponent } from "../../ClearComponent/ClearComponent";
import { Highlights } from "../../DownloadBody/Highlights/Highlights";
import { Portal } from "../Portal/Portal";
import classes from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    file: HistoryResult | null;
}

export const Modal = ({ isOpen, onClose, file }: ModalProps) => {
    if (!isOpen || !file) return null;

    return (
        <Portal>
            <div className={classes.overlay} onClick={onClose}>
                <div className={classes.modal}>
                    <div
                        className={`${
                            file.status === "error"
                                ? classes.closeButtonError
                                : classes.closeButtonSuccess
                        }`}
                    >
                        <ClearComponent onClick={onClose} />
                    </div>
                    <div
                        className={classes.info}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {file.status === "error" ? (
                            <div className={classes.text}>
                                В файле нет данных
                            </div>
                        ) : (
                            <div className={classes.content}>
                                <Highlights
                                    highlights={file}
                                    backgroundColor="#EACDFF"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
