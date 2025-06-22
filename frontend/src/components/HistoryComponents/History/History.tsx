import { useEffect, useState } from "react";
import type { HistoryResult } from "../../../types/types";
import { ClearHistoryButton } from "../ClearHistoryButton/ClearHistoryButton";
import { DeleteFile } from "../DeleteFile/DeleteFile";
import { File } from "../File/File";
import { GegerateMoreButton } from "../GenerateMoreButton/GenerateMoreButton";
import { Modal } from "../Modal/Modal";
import classes from "./History.module.css";

export const History = () => {
    const [isHistoryClear, setIsHistoryClear] = useState<boolean>(true);
    const [history, setHistory] = useState<HistoryResult[]>([]);
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

    const deleteFile = (fileId: number) => {
        const data = localStorage.getItem("files");
        let history: HistoryResult[] = [];
        if (data) {
            const parsed = JSON.parse(data);
            console.log(parsed);
            if (Array.isArray(parsed)) {
                history = parsed;
            }
        }
        const newHistory = history.filter((file) => file.id !== fileId);

        localStorage.setItem("files", JSON.stringify(newHistory));
        setHistory(newHistory);
        if (!newHistory.length) {
            setIsHistoryClear(true);
        }
    };

    // Чтение из localStorage происходит только при монтировании
    useEffect(() => {
        try {
            const lastHistory = localStorage.getItem("files");
            if (lastHistory) {
                const parsed = JSON.parse(lastHistory);
                if (Array.isArray(parsed)) {
                    setHistory(parsed);
                    setIsHistoryClear(parsed.length === 0);
                } else {
                    setHistory([]);
                    setIsHistoryClear(true);
                }
            } else {
                setHistory([]);
                setIsHistoryClear(true);
            }
        } catch (e) {
            console.error("Ошибка чтения истории", e);
            setHistory([]);
            setIsHistoryClear(true);
        }
    }, []);

    return (
        <>
            {isHistoryClear && <p className={classes.title}>История пустая</p>}
            <div className={classes.container}>
                {history.map((file, index) => (
                    <div key={index} className={classes.file}>
                        <File
                            status={file.status}
                            fileName={file.fileName}
                            date={file.date}
                            onClick={() => {
                                openModal(file);
                            }}
                        />
                        <DeleteFile
                            deleteFile={() => {
                                deleteFile(file.id);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className={classes.buttons}>
                <GegerateMoreButton />
                <ClearHistoryButton
                    clearHistory={() => {
                        localStorage.removeItem("files");
                        setHistory([]);
                        setIsHistoryClear(true);
                    }}
                />
            </div>
            <Modal isOpen={isOpen} onClose={onClose} file={selectedFile} />
        </>
    );
};
