import { useState } from "react";
import { useHistoryStore } from "../../../hooks/useHistoryStore";
import type { HistoryResult } from "../../../types/types";
import { ClearHistoryButton } from "../ClearHistoryButton/ClearHistoryButton";
import { DeleteFile } from "../DeleteFile/DeleteFile";
import { File } from "../File/File";
import { GegerateMoreButton } from "../GenerateMoreButton/GenerateMoreButton";
import { Modal } from "../Modal/Modal";
import classes from "./History.module.css";

export const History = () => {
    const { history, deleteFile, clearHistory } = useHistoryStore();
    console.log(history);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<HistoryResult | null>(
        null
    );

    const openModal = (file: HistoryResult) => {
        setSelectedFile(file);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };
    return (
        <>
            {history.length === 0 && (
                <p className={classes.title}>История пустая</p>
            )}

            <div className={classes.container}>
                {history.map((file) => (
                    <div key={file.id} className={classes.file}>
                        <File
                            status={file.status}
                            fileName={file.fileName}
                            date={file.date}
                            onClick={() => openModal(file)}
                        />
                        <DeleteFile deleteFile={() => deleteFile(file.id)} />
                    </div>
                ))}
            </div>

            <div className={classes.buttons}>
                <GegerateMoreButton />
                <ClearHistoryButton clearHistory={clearHistory} />
            </div>

            <Modal isOpen={isOpen} onClose={onClose} file={selectedFile} />
        </>
    );
};
